import { Component, OnInit } from '@angular/core';
import { RoomDTO } from 'models';
import { RoomService } from '../services/room.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  rooms: RoomDTO[] = [];

  constructor(
    private roomService: RoomService,
    private toastrService: ToastrService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.roomService.getAll().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
      },
      error: (err) => {
        this.toastrService.error('A szobák betöltése nem sikerült.', 'Hiba');
      }
    });
  }

  navigateToRoom(roomType: string, id: number) {
    switch (roomType) {
      case 'Double':
        this.router.navigate(['/double-room', id]);
        break;
      case 'Twin':
        this.router.navigate(['/twin-room', id]);
        break;
      case 'Family':
        this.router.navigate(['/family-room', id]);
        break;
      default:
        this.router.navigate(['']);
        break;
    }
  }
}
