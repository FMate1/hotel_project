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

  filterTable() {
    this.filteredEmployees = this.employees.filter((employee) => {
      const matchesRoleSelector = this.selectedRole === '' || employee.role?.id === this.selectedRole.id;
      const matchesGenderSelector = this.selectedGender === '' || employee.gender === this.selectedGender;

      return matchesRoleSelector && matchesGenderSelector;
    });

    if (!this.selectedRole && !this.selectedGender) {
      this.filteredEmployees = this.employees;
    }
  }

  navigateToEmployeeForm(id : number) {
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
