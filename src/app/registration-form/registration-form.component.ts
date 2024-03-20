import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserDTO } from 'models';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

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
    lastName: this.formBuilder.control('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ){ }

  isValidUser = true;

  validateForm(inputForm: UserDTO): void {
    if (!inputForm.email || !inputForm.password || !inputForm.firstName || !inputForm.lastName ) {
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
