import { Component, OnInit, TemplateRef } from '@angular/core';
import { BookingDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-bookings-list',
  templateUrl: './user-bookings-list.component.html',
  styleUrls: ['./user-bookings-list.component.css']
})
export class UserBookingsListComponent implements OnInit {
  userBookings: BookingDTO[] = [];

  constructor(
    private bookingService: BookingService,
    private toastrService: ToastrService,
    private modalService: NgbModal
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

  open(content: TemplateRef<any>, bookingId: number) {
    let bookingToDelete: BookingDTO | undefined;

    for (const booking of this.userBookings) {
      if (booking.id === bookingId) {
        bookingToDelete = booking;
        break;
      }
    }

    if (!bookingToDelete) {
      this.toastrService.error('Foglalás nem található!', 'Hiba');
      return;
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (result === 'confirm') {
          if (bookingToDelete) {
            this.deleteBooking(bookingToDelete);
          } else {
            this.toastrService.error('Foglalás nem található!', 'Hiba');
          }
        }
      },
      (reason) => {
        console.error('Modal dismissed with reason: ', reason);
      }
    );
  }

}
