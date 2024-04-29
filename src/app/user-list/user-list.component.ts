import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'models';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserDTO[] = [];

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) { this.loadData(); }

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        this.toastrService.error('A felhasználók listájának betöltése nem sikerült.', 'Hiba');
      }
    });
  }

  loadData(): void {
    this.userService.getAll().subscribe(
      (users) => {
        this.users = users;
        //this.filterTable();
      },
      (error) => {
        this.toastrService.error('A felhasználók listájának betöltése nem sikerült.', 'Hiba');
      }
    );
  }

  toggleActiveStatus(user: UserDTO) {
    this.userService.toggleActiveStatus(user).subscribe({
      next: () => {
      },
      error: (err) => {
        this.toastrService.success('A felhasználó sikeresen módosítva!');
        this.loadData();
      }
    });
  }

  toggleAdminStatus(user: UserDTO) {
    this.userService.toggleAdminStatus(user).subscribe({
      next: () => {
      },
      error: (err) => {
        this.toastrService.success('A felhasználó sikeresen módosítva!');
        this.loadData();
      }
    });
  }

}
