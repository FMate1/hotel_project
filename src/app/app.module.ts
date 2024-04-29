import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RoomListComponent } from './room-list/room-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { AccessTokenInterceptor } from './services/access-token.interceptor';
import { UnauthorizedInterceptor } from './services/unauthorized.interceptor';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HotelSevicesListComponent } from './hotel-sevices-list/hotel-sevices-list.component';
import { DoubleRoomComponent } from './double-room/double-room.component';
import { TwinRoomComponent } from './twin-room/twin-room.component';
import { FamilyRoomComponent } from './family-room/family-room.component';
import { AttractionsActivitiesComponent } from './attractions-activities/attractions-activities.component';
import { HotelServicesFormComponent } from './hotel-services-form/hotel-services-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserBookingsListComponent } from './user-bookings-list/user-bookings-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    RoomListComponent,
    RegistrationFormComponent,
    LoginComponent,
    WelcomePageComponent,
    HotelSevicesListComponent,
    DoubleRoomComponent,
    TwinRoomComponent,
    FamilyRoomComponent,
    AttractionsActivitiesComponent,
    HotelServicesFormComponent,
    UserListComponent,
    UserBookingsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
