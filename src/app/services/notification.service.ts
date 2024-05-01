import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private user: string = 'echnTJ7VHi97uFZSt';
  private service: string = 'service_2auuiz3';

  constructor() {
    emailjs.init(this.user);
  }

  sendEmail(guestEmail: string, message: string) {
    const templateParams = {
        email: guestEmail,
        message: message,
    };
    console.log(templateParams);
    return emailjs.send(this.service, 'template_h1c58kp', templateParams);  
}

}
