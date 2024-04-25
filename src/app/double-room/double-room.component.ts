import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';
import { FormBuilder } from '@angular/forms';
import { BookingDTO, RoleDTO, UserDTO } from 'models';

@Component({
  selector: 'app-double-room',
  templateUrl: './double-room.component.html',
  styleUrls: ['./double-room.component.css']
})
export class DoubleRoomComponent {

  constructor(
    private toastrService: ToastrService,
    private bookingService: BookingService,
    private formBuilder: FormBuilder
  ) { }

  bookingForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    bookingDate: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    checkInDate: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    checkOutDate: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    numAdults: this.formBuilder.control(1),
    numChildren: this.formBuilder.control(0),
    user: this.formBuilder.control<null | UserDTO>(null),
    role: this.formBuilder.control<null | RoleDTO>(null),
  });

  bookRoom() {
    const booking = this.bookingForm.value as BookingDTO;

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
