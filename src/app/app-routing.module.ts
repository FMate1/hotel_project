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
import { AttractionsActivitiesComponent } from './attractions-activities/attractions-activities.component';
import { HotelServicesFormComponent } from './hotel-services-form/hotel-services-form.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
    canActivate: [() => inject(AuthService).preventGuestAccess(),() => inject(AuthService).onlyAdminAccess()]
  },
  {
    path: 'room-list',
    component: RoomListComponent
  },
  {
    path: 'employee-form',
    component: EmployeeFormComponent,
    canActivate: [() => inject(AuthService).preventGuestAccess(),() => inject(AuthService).onlyAdminAccess()]
  },
  {
    path: 'employee-form/:id',
    component: EmployeeFormComponent,
    canActivate: [() => inject(AuthService).preventGuestAccess(),() => inject(AuthService).onlyAdminAccess()]
  },
  {
    path: 'hotel-services-list',
    component: HotelSevicesListComponent
  },
  {
    path: 'hotel-services-form',
    component: HotelServicesFormComponent,
    canActivate: [() => inject(AuthService).preventGuestAccess(),() => inject(AuthService).onlyAdminAccess()]
  },
  {
    path: 'hotel-services-form/:id',
    component: HotelServicesFormComponent,
    canActivate: [() => inject(AuthService).preventGuestAccess(),() => inject(AuthService).onlyAdminAccess()]
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
    path: 'double-room/:id',
    component: DoubleRoomComponent
  },
  {
    path: 'twin-room/:id',
    component: TwinRoomComponent
  },
  {
    path: 'family-room/:id',
    component: FamilyRoomComponent
  },
  {
    path: 'attractions-activities',
    component: AttractionsActivitiesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
