import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BookingDTO, RoleDTO, UserDTO } from 'models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-double-room',
  templateUrl: './double-room.component.html',
  styleUrls: ['./double-room.component.css']
})
export class DoubleRoomComponent implements OnInit {

  constructor(
    private toastrService: ToastrService,
    private bookingService: BookingService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  bookingForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    bookingDate: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    checkInDate: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    checkOutDate: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    numAdults: this.formBuilder.control(0),
    numChildren: this.formBuilder.control(0),
    user: this.formBuilder.control<null | UserDTO>(null),
    role: this.formBuilder.control<null | RoleDTO>(null),
  });

  currentUser: UserDTO | null = null;

  // ngOnInit(): void {
  //   this.userService.getCurrentUser().subscribe(user => {
  //     this.currentUser = user;
  //   });
  // }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => this.currentUser = user,
      error: (err) => {
        console.error(err);
      }
    });
  }

  roomId = this.activatedRoute.snapshot.params['id'];

  teszt(): void {
    console.log(this.currentUser)
  }

  bookRoom() {
    const booking = this.bookingForm.value as BookingDTO;

    booking.user = this.currentUser;

    this.bookingService.create(booking).subscribe({
      next: (booking) => {
        this.toastrService.success('Sikeres foglalás!', 'Siker');
      },
      error: (err) => {
        this.toastrService.error('Sikertelen foglalás', 'Hiba');
      }
    });

  }
}
