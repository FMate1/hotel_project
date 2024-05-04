import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserDTO } from 'models';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {

  registrationForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    email: this.formBuilder.control(''),
    password: this.formBuilder.control(''),
    firstName: this.formBuilder.control(''),
    lastName: this.formBuilder.control(''),
    dateOfBirth: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    isActive: true,
    isAdmin: false
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ){ }

  isValidUser = true;

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validateForm(inputForm: UserDTO): void {
    if (!this.isValidEmail(inputForm.email) || !inputForm.password || !inputForm.firstName || !inputForm.lastName 
      || !inputForm.dateOfBirth
    ) {
      this.isValidUser = false;
    }
  }

  registrate() {
    const user = this.registrationForm.value as UserDTO;

    this.isValidUser = true;
    this.validateForm(user);
   
    if (this.isValidUser) {
      this.userService.create(user).subscribe({
        next: (user) => {
          this.toastrService.success('Felhasználó sikeresen regisztrálva' , 'Siker');
          this.router.navigateByUrl('');
        },
        error: (err) => { 
          this.toastrService.error('A felhasznéló regisztrálása nem sikerült.', 'Hiba');
        }
      });
    } else {
      this.toastrService.error('A felhasznéló regisztrálása nem sikerült.', 'Hiba');
    }
  }

}
