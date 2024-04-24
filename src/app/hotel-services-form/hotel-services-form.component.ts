import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../services/hotel.service';
import { ActivatedRoute } from '@angular/router';
import { HotelServicesService } from '../services/hotel-services.service';
import { HotelDTO, ServiceDTO } from 'models';

@Component({
  selector: 'app-hotel-services-form',
  templateUrl: './hotel-services-form.component.html',
  styleUrls: ['./hotel-services-form.component.css']
})
export class HotelServicesFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private hotelServicesService: HotelServicesService,
    private hotelService: HotelService,
    private activatedRoute: ActivatedRoute
  ) { }

  hotelServiceForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    serviceName: this.formBuilder.control(''),
    price: this.formBuilder.control(0),
    hotel: this.formBuilder.control<null | HotelDTO>(null),
  });

  isNewHotelService = true;
  isValidHotelService = true;
  hotels: HotelDTO[] = [];

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isNewHotelService = false;

      this.hotelServicesService.getOne(id).subscribe({
        next: (hotelService) => this.hotelServiceForm.setValue(hotelService),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A szolgáltatások adatainak betöltése sikertelen', 'Hiba');
        }
      });
    }

    this.hotelService.getAll().subscribe({
      next: (hotels) => this.hotels = hotels,
      error: (err) => {
        console.error(err);
        this.toastrService.error('A hotelek betöltése sikertelen', 'Hiba');
      }
    });
  }

  validateForm(inputForm: ServiceDTO): void {
    if (!inputForm.serviceName || !inputForm.price ||  !inputForm.hotel ||  inputForm.price < 1000) {
      this.isValidHotelService = false;
    }
  }

  saveHotelService() {
    const hotelService = this.hotelServiceForm.value as ServiceDTO;

    this.isValidHotelService = true;
    this.validateForm(hotelService);
   
    if (this.isValidHotelService) {
      if (this.isNewHotelService) {
        this.hotelServicesService.create(hotelService).subscribe({
          next: (hotelService) => {
            this.toastrService.success('Szolgáltatás sikeresen rögzítve, id:' + hotelService.id , 'Siker');
          },
          error: (err) => { 
            this.toastrService.error('A szolgáltatás rögzítése nem sikerült.', 'Hiba');
          }
        });
      } else {
        this.hotelServicesService.update(hotelService).subscribe({
          next: (hotelService) => {
            this.toastrService.success('A szolgáltatás adatai sikeresen szerkesztve.' , 'Siker');
          },
          error: (err) => { 
            this.toastrService.error('A szolgáltatás adatainak szerkesztése nem sikerült.', 'Hiba');
          }
        });
      }
    } else {
      this.toastrService.error('A szolgáltatás rögzítése nem sikerült.', 'Hiba');
    }
  }
}
