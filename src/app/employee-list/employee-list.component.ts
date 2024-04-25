import { Component, OnInit } from '@angular/core';
import { EmployeeDTO, RoleDTO } from 'models';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  employees: EmployeeDTO[] = [];
  roles: RoleDTO[] = [];

  selectedRole: any = '';
  selectedGender: any = '';
  selectedAgeRange: number = 0;

  filteredEmployees: EmployeeDTO[] = [];

  constructor(
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private toastrService: ToastrService,
    private router: Router
  ) { this.loadData(); }

  ngOnInit(): void {

    this.employeeService.getAll().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (err) => {
        this.toastrService.error('Az alkalmazottak listájának betöltése nem sikerült.', 'Hiba');
      }
    });

    this.roleService.getAll().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (err) => {
        this.toastrService.error('A szerepkörök betöltése nem sikerült.', 'Hiba');
      }
    });
  }

  loadData(): void {
    this.employeeService.getAll().subscribe(
      (employees) => {
        this.employees = employees;
        this.filterTable();
      },
      (error) => {
        this.toastrService.error('Az alkalmazottak listájának betöltése nem sikerült.', 'Hiba');
      }
    );
  }

  employeeAgeFilter(selectedAgeRange: number, employeeDateOfBirth: string): boolean {
    const birthDate = new Date(employeeDateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const month = today.getMonth() - birthDate.getMonth();
    const day = today.getDate() - birthDate.getDate();

    if (month < 0 || (month === 0 && day < 0)) {
      age--;
    }

    if (selectedAgeRange <= age) {
      return true;
    } else {
      return false;
    }
  }

  filterTable() {
    this.filteredEmployees = this.employees.filter((employee) => {
      const matchesRoleSelector = this.selectedRole === '' || employee.role?.id === this.selectedRole.id;
      const matchesGenderSelector = this.selectedGender === '' || employee.gender === this.selectedGender;
      const matchesAgeRangeSelector = this.selectedAgeRange === 0 || this.employeeAgeFilter(this.selectedAgeRange, employee.dateOfBirth);

      return matchesRoleSelector && matchesGenderSelector && matchesAgeRangeSelector;
    });

    if (!this.selectedRole && !this.selectedGender && !this.selectedAgeRange) {
      this.filteredEmployees = this.employees;
    }
  }

  navigateToEmployeeForm(id: number) {
    this.router.navigate(['/employee-form', id]);
  }

  deleteEmployee(employeeToDelete: EmployeeDTO) {
    this.employeeService.delete(employeeToDelete.id).subscribe({
      next: () => {
        const employeeIndex = this.employees.findIndex((employee) => employeeToDelete.id === employee.id);
        if (employeeIndex > -1) {
          this.employees.splice(employeeIndex, 1);
        }

        this.filterTable()
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba az alkalmazott törlésekor.', 'Hiba');
      }
    })
  }

}
