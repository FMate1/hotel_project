import { Component, OnInit } from '@angular/core';
import { BookingDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-user-bookings-list',
  templateUrl: './user-bookings-list.component.html',
  styleUrls: ['./user-bookings-list.component.css']
})
export class UserBookingsListComponent implements OnInit {
  userBookings: BookingDTO[] = [];

  constructor(
    private bookingService: BookingService,
    private toastrService: ToastrService
  ) { this.loadData(); }

  ngOnInit(): void {
    this.bookingService.getUserBookings().subscribe({
      next: (userBookings) => {
        this.userBookings = userBookings;
      },
      error: (err) => {
        this.toastrService.error('A foglalások listájának betöltése nem sikerült.', 'Hiba');
      }
    });
  }

  loadData(): void {
    this.bookingService.getUserBookings().subscribe(
      (userBookings) => {
        this.userBookings = userBookings;
      },
      (error) => {
        this.toastrService.error('A foglalások listájának betöltése nem sikerült.', 'Hiba');
      }
    );
  }

  deleteBooking(bookingToDelete: BookingDTO) {
    this.bookingService.delete(bookingToDelete.id).subscribe({
      next: () => {
        const bookingIndex = this.userBookings.findIndex((booking) => bookingToDelete.id === booking.id);
        if (bookingIndex > -1) {
          this.userBookings.splice(bookingIndex, 1);
        }
        this.loadData();
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a foglalás törlésekor.', 'Hiba');
      }
    })
  }

}
