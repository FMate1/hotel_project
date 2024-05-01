import { Component, OnInit } from '@angular/core';
import { BookingDTO, EmployeeDTO, RoomDTO, UserDTO } from 'models';
import { BookingService } from '../services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  bookings: BookingDTO[] = [];
  rooms: RoomDTO[] = [];
  users: UserDTO[] = [];
  guests: UserDTO[] = [];
  employees: EmployeeDTO[] = [];
  femaleEmps: EmployeeDTO[] = [];
  maleEmps: EmployeeDTO[] = [];
  bookingsCount: number = 0;
  doubleRoomBookingCount: number = 0;
  twinRoomBookingCount: number = 0;
  familyRoomBookingCount: number = 0;
  guestsAvgAge: number = 0;
  mostBookedRoom: any = null;
  avgStay: number = 0;
  avgEmpAge: number = 0;
  avgEmpSalary: number = 0;
  femaleEmpCount: number = 0;
  maleEmpCount: number = 0;

  constructor(
    private toastrService: ToastrService,
    private bookingService: BookingService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.employeeService.getAll().subscribe({
    //   next: (employees) => {
    //     this.employees = employees;
    //   },
    //   error: (err) => {
    //     this.toastrService.error('Az alkalmazottak listájának betöltése nem sikerült.', 'Hiba');
    //   }
    // });

    // this.userService.getGuests().subscribe({
    //   next: (guests) => {
    //     this.guests = guests;
    //   },
    //   error: (err) => {
    //     this.toastrService.error('A vendégek betöltése nem sikerült.', 'Hiba');
    //   }
    // });
    this.loadGuests();

    console.log(this.guests);
  }

  loadGuests() {
    this.userService.getGuests().subscribe(
      (guests: UserDTO[]) => {
        this.guests = guests;
      },
      (error) => {
        this.toastrService.error('A vendégek betöltése nem sikerült.', 'Hiba');
      }
    );
  }

}
