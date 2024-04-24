import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-double-room',
  templateUrl: './double-room.component.html',
  styleUrls: ['./double-room.component.css']
})
export class DoubleRoomComponent {
  
  constructor(
    private toastrService: ToastrService,
    private bookingService: BookingService
  ) { }

  bookDoubleRoom() {
    
  }
}
