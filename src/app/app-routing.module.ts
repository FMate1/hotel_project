import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room-list/room-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'employee-list',
    component: EmployeeListComponent
  },
  {
    path: 'room-list',
    component: RoomListComponent
  },
  {
    path: 'employee-form',
    component: EmployeeFormComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'employee-form/:employeeId',
    component: EmployeeFormComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
