import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';
import { FormBuilder } from '@angular/forms';
import { BookingDTO, RoleDTO, UserDTO } from 'models';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-twin-room',
  templateUrl: './twin-room.component.html',
  styleUrls: ['./twin-room.component.css']
})
export class TwinRoomComponent implements OnInit{

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

  loggedInUser? : UserDTO;

  ngOnInit(): void {
    this.userService.getLoggedInUserEmail().subscribe(user => { this.loggedInUser = user });
  }

  roomId = this.activatedRoute.snapshot.params['id'];

  validateBookingForm(inputForm: BookingDTO): boolean {
    const checkInDate = new Date(inputForm.checkInDate);
    const checkOutDate = new Date(inputForm.checkOutDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate.getTime() === checkOutDate.getTime()) {
      return false;
    }

    if (checkInDate.getTime() > checkOutDate.getTime()) {
      return false;
    }

    if (checkInDate.getTime() <= today.getTime()) {
      return false;
    }
    
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

    booking.room = { id: this.roomId };

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

    if (!this.loggedInUser) {
      return;
    }

    const message = `Foglalt szoba: Két ágyas szoba | Érkezés időpontja: ${booking.checkInDate} 
    | Távozás időpontja : ${booking.checkOutDate} | Felnőttek száma: ${booking.numAdults} | Gyerekek száma: ${booking.numChildren}`;

    this.notificationService.sendEmail(this.loggedInUser.email, message).then(
      (response) => {
        this.toastrService.success('Email elküldve!');
      },
      (error) => {
        this.toastrService.error('Hiba az email elküldése során!', 'Hiba');
      }
    );
  }

}
