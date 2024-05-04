import { Component, OnInit, TemplateRef } from '@angular/core';
import { ServiceDTO } from 'models';
import { HotelServicesService } from '../services/hotel-services.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    public authService: AuthService,
    private modalService: NgbModal
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
      },
      (error) => {
        this.toastrService.error('A szerepkörök listájának betöltése nem sikerült.', 'Hiba');
      }
    );
  }

  navigateToHotelServiceForm(id : number) {
    this.router.navigate(['/hotel-services-form', id]);
  }

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

  open(content: TemplateRef<any>, hotelServId: number) {
    let hotelServToDelete: ServiceDTO | undefined;

    for (const hotelServ of this.hotelServices) {
      if (hotelServ.id === hotelServId) {
        hotelServToDelete = hotelServ;
        break;
      }
    }

    if (!hotelServToDelete) {
      this.toastrService.error('A szolgáltatás nem található!', 'Hiba');
      return;
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (result === 'confirm') {
          if (hotelServToDelete) {
            this.deleteHotelService(hotelServToDelete);
          } else {
            this.toastrService.error('A szolgáltatás nem található!', 'Hiba');
          }
        }
      },
      (reason) => {
        console.error('Modal dismissed with reason: ', reason);
      }
    );
  }

}
