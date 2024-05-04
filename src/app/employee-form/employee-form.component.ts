import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDTO, HotelDTO, RoleDTO } from 'models';
import { EmployeeService } from '../services/employee.service';
import { HotelService } from '../services/hotel.service';
import { RoleService } from '../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  hotels: HotelDTO[] = [];
  roles: RoleDTO[] = [];

  isValidEmployee = true;
  isNewEmployee = true;

  employeeForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    name: this.formBuilder.control(''),
    gender: this.formBuilder.control(''),
    dateOfBirth: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    taxIdNumber: this.formBuilder.control(''),
    TAJ: this.formBuilder.control(''),
    phoneNo: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    salary: this.formBuilder.control(0),
    hotel: this.formBuilder.control<null | HotelDTO>(null),
    role: this.formBuilder.control<null | RoleDTO>(null),
  });

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private employeeService: EmployeeService,
    private hotelService: HotelService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isNewEmployee = false;

      this.employeeService.getOne(id).subscribe({
        next: (employee) => this.employeeForm.setValue(employee),
        error: (err) => {
          console.error(err);
          this.toastrService.error('Az alkalmazott adatainak betöltése sikertelen', 'Hiba');
        }
      });
    }

    this.hotelService.getAll().subscribe({
      next: (hotels) => this.hotels = hotels,
      error: (err) => {
        console.error(err);
        this.toastrService.error('A hotelek betöltése sikertelen', 'Hiba');
      }
    });

    this.roleService.getAll().subscribe({
      next: (roles) => this.roles = roles,
      error: (err) => {
        console.error(err);
        this.toastrService.error('A szerepkörök betöltése sikertelen', 'Hiba');
      }
    });
  }

  validateTAJnumber(taj: string): boolean {
    if (taj.length !== 9 || !/^\d{9}$/.test(taj)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 8; i++) {
      const digit = parseInt(taj[i], 10);
      if (i % 2 === 0) {
        sum += digit * 3;
      } else {
        sum += digit * 7;
      }
    }

    const remainder = sum % 10;
    const checkDigit = parseInt(taj[8], 10);

    return checkDigit === remainder;
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    if (phoneNumber.length !== 11) {
      return false;
    }

    if (!phoneNumber.startsWith('06')) {
      return false;
    }

    const isNumeric = /^\d+$/.test(phoneNumber);
    if (!isNumeric) {
      return false;
    }

    return true;
  }

  isOlderThan16(birthDateString: string): boolean {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age >= 16;
  }

  isValidTaxIdNumber(taxId: string): boolean {
    if (taxId.length !== 10 || !/^\d+$/.test(taxId)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += (i + 1) * parseInt(taxId.charAt(i));
    }

    const division = sum / 11;

    const fractionalPart = division - Math.floor(division);
  
    const decimalDigit = fractionalPart * 10;
    
    const roundedDigit = Math.ceil(decimalDigit);

    if (roundedDigit === 10) {
      return false;
    }


    console.log(division);
    console.log(fractionalPart);
    console.log(decimalDigit);
    console.log(roundedDigit);
    console.log(taxId.charAt(9));

    return roundedDigit === parseInt(taxId.charAt(9));
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validateForm(inputForm: EmployeeDTO): void {
    if (!inputForm.name || !inputForm.gender || !this.isOlderThan16(inputForm.dateOfBirth) || !this.isValidTaxIdNumber(inputForm.taxIdNumber) || !this.validatePhoneNumber(inputForm.phoneNo)
      || !this.isValidEmail(inputForm.email) || !inputForm.salary || inputForm.salary <= 220000 || !inputForm.hotel || !inputForm.role || !this.validateTAJnumber(inputForm.TAJ)) {
      this.isValidEmployee = false;
    }
  }

  saveEmployee() {
    const employee = this.employeeForm.value as EmployeeDTO;

    this.isValidEmployee = true;
    this.validateForm(employee);

    if (this.isValidEmployee) {
      if (this.isNewEmployee) {
        this.employeeService.create(employee).subscribe({
          next: (employee) => {
            this.toastrService.success('Alkalmazott sikeresen rögzítve, id:' + employee.id, 'Siker');
            this.router.navigate(['/employee-list']);
          },
          error: (err) => {
            this.toastrService.error('Az alkalmazott rögzítése nem sikerült.', 'Hiba');
          }
        });
      } else {
        this.employeeService.update(employee).subscribe({
          next: (employee) => {
            this.toastrService.success('Alkalmazott adatai sikeresen szerkesztve.', 'Siker');
            this.router.navigate(['/employee-list']);
          },
          error: (err) => {
            this.toastrService.error('Alkalmazott adatainak szerkesztése nem sikerült.', 'Hiba');
          }
        });
      }
    } else {
      this.toastrService.error('Az alkalmazott rögzítése nem sikerült.', 'Hiba');
    }
  }
}
