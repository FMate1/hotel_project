import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDTO, HotelDTO, RoleDTO } from 'models';
import { EmployeeService } from '../services/employee.service';
import { HotelService } from '../services/hotel.service';
import { RoleService } from '../services/role.service';
import { ActivatedRoute } from '@angular/router';

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
    taxNumber: this.formBuilder.control(''),
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
    private activatedRoute: ActivatedRoute
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

  validateTAJnumber(TAJnumber: number): boolean {
    const TAJnumberString = TAJnumber.toString();

    if (TAJnumberString.length !== 9) {
      return false;
    }

    const digits = TAJnumberString.substring(0, 8);

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      const digit = parseInt(digits[i], 10);
      sum += i % 2 === 0 ? digit * 3 : digit * 7;
    }
    const remainder = sum % 10;
    const ninthDigit = parseInt(TAJnumberString[8], 10);

    return remainder === ninthDigit;
  }

  validateForm(inputForm: EmployeeDTO): void {
    if (!inputForm.name || !inputForm.gender || !inputForm.dateOfBirth || !inputForm.taxNumber || !inputForm.phoneNo 
      || !inputForm.email || !inputForm.salary || inputForm.salary <= 220000 || !inputForm.hotel || !inputForm.role /*|| !this.validateTAJnumber(inputForm.TAJ)*/) {
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
            this.toastrService.success('Alkalmazott sikeresen rögzítve, id:' + employee.id , 'Siker');
          },
          error: (err) => { 
            this.toastrService.error('Az alkalmazott rögzítése nem sikerült.', 'Hiba');
          }
        });
      } else {
        this.employeeService.update(employee).subscribe({
          next: (employee) => {
            this.toastrService.success('Alkalmazott adatai sikeresen szerkesztve.' , 'Siker');
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
