import { Component, OnInit } from '@angular/core';
import { ServiceDTO } from 'models';
import { HotelServicesService } from '../services/hotel-services.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-hotel-sevices-list',
  templateUrl: './hotel-sevices-list.component.html',
  styleUrls: ['./hotel-sevices-list.component.css']
})
export class HotelSevicesListComponent implements OnInit{
  hotelServices: ServiceDTO[] = [];

  constructor(
    private hotelServicesService: HotelServicesService,
    private toastrService: ToastrService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {

    this.hotelServicesService.getAll().subscribe({
      next: (hotelServices) => {
        this.hotelServices = hotelServices;
      },
      error: (err) => { 
        this.toastrService.error('A szolgáltatások listájának betöltése nem sikerült.', 'Hiba');
      }
    });
  }

  loadData(): void {
    this.hotelServicesService.getAll().subscribe(
      (hotelServices) => {
        this.hotelServices = hotelServices;
        //this.filterTable();
      },
      (error) => {
        this.toastrService.error('A szerepkörök listájának betöltése nem sikerült.', 'Hiba');
      }
    );
  }

  /*
  navigateToHotelServiceForm(id : number) {
    this.router.navigate(['/hotelServices-form', id]);
  }
  */

  deleteHotelService(hotelService: ServiceDTO) {
    this.hotelServicesService.delete(hotelService.id).subscribe({
      next: () => {
        const index = this.hotelServices.indexOf(hotelService);
        if (index > -1) {
          this.hotelServices.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba a szolgáltatás törlésekor.', 'Hiba');
      }
    })
  }

}
