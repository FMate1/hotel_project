import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room-list/room-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HotelSevicesListComponent } from './hotel-sevices-list/hotel-sevices-list.component';
import { DoubleRoomComponent } from './double-room/double-room.component';
import { TwinRoomComponent } from './twin-room/twin-room.component';
import { FamilyRoomComponent } from './family-room/family-room.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
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
    path: 'employee-form/:id',
    component: EmployeeFormComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'hotel-services-list',
    component: HotelSevicesListComponent
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'double-room',
    component: DoubleRoomComponent
  },
  {
    path: 'twin-room',
    component: TwinRoomComponent
  },
  {
    path: 'family-room',
    component: FamilyRoomComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
