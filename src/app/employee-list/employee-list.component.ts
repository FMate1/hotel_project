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
  //selectedAge: string = '';   //25+ vagy 30+ stb., string kell valszeg date miatt

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
        this.toastrService.error('A alkalmazottak listájának betöltése nem sikerült.', 'Hiba');
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
        this.toastrService.error('A alkalmazottak listájának betöltése nem sikerült.', 'Hiba');
      }
    );
  }

  filterTable() {
    this.filteredEmployees = this.employees.filter((employee) => {
      const matchesRoleSelector = this.selectedRole === '' || employee.role?.roleId === this.selectedRole.roleId;
      const matchesGenderSelector = this.selectedGender === '' || employee.gender === this.selectedGender;

      return matchesRoleSelector && matchesGenderSelector;
    });

    if (!this.selectedRole && !this.selectedGender) {
      this.filteredEmployees = this.employees;
    }
  }

  navigateToEmployeeForm(employeeId : number) {
    this.router.navigate(['/employee-form', employeeId]);
  }

  deleteEmployee(employee: EmployeeDTO) {
    this.employeeService.delete(employee.employeeId).subscribe({
      next: () => {
        const index = this.employees.indexOf(employee);
        if (index > -1) {
          this.employees.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba az alkalmazott törlésekor.', 'Hiba');
      }
    })
  }

}
