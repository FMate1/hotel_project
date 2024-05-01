import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';
import { FormBuilder } from '@angular/forms';
import { BookingDTO, RoleDTO, UserDTO } from 'models';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-double-room',
  templateUrl: './double-room.component.html',
  styleUrls: ['./double-room.component.css']
})
export class DoubleRoomComponent {

  constructor(
    private toastrService: ToastrService,
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService
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

  validateBookingForm(inputForm: BookingDTO): boolean {
    const ctn = inputForm.numAdults + inputForm.numChildren;

    if (ctn <= 0 || ctn > 2) {
      return false;
    } else if (inputForm.numAdults < 1) {
      return false;
    } else {
      return true;
    }
  }

  bookRoom() {
    const booking = this.bookingForm.value as BookingDTO;

    booking.room = this.roomId;

    if (this.validateBookingForm(booking)) {
      this.bookingService.create(booking).subscribe({
        next: (booking) => {
          this.toastrService.success('Sikeres foglalás!', 'Siker');
          this.sendEmail();
        },
        error: (err) => {
          this.toastrService.error('Sikertelen foglalás.', 'Hiba');
        }
      });
    } else {
      this.toastrService.error('Sikertelen foglalás, hibás adatok.', 'Hiba');
    }
  }

  sendEmail(): void {
    const booking = this.bookingForm.value as BookingDTO;
    const loggedInUserEmail: string = this.userService.getLoggedInUserEmail();

    // console.log(loggedInUserEmail);

    const message = `Foglalt szoba: Franciaágyas szoba | Érkezés időpontja: ${booking.checkInDate} 
    | Távozás időpontja : ${booking.checkOutDate} | Felnőttek száma: ${booking.numAdults} | Gyerekek száma: ${booking.numChildren}`;

    this.notificationService.sendEmail(loggedInUserEmail, message).then(
      (response) => {
        this.toastrService.success('Email elküldve!');
      },
      (error) => {
        this.toastrService.error('Hiba az email elküldése során!', 'Hiba');
      }
    );
  }

}
