import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';
import { FormBuilder } from '@angular/forms';
import { BookingDTO, RoleDTO, UserDTO } from 'models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-twin-room',
  templateUrl: './twin-room.component.html',
  styleUrls: ['./twin-room.component.css']
})
export class TwinRoomComponent {

  constructor(
    private toastrService: ToastrService,
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
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

  roomId = this.activatedRoute.snapshot.params['id'];

  bookRoom() {
    const booking = this.bookingForm.value as BookingDTO;

    booking.room = this.roomId;

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
