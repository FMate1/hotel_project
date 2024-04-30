import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HotelDTO } from 'models';

@Injectable({
  providedIn: 'root'
})

export class HotelService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<HotelDTO[]>('api/hotels');
  }

  getOne(id: number) {
    return this.http.get<HotelDTO>('api/hotels/' + id);
  }

  create(hotel: HotelDTO) {
    return this.http.post<HotelDTO>('api/hotels', hotel);
  }

  update(hotel: HotelDTO) {
    return this.http.put<HotelDTO>('api/hotels', hotel);
  }

  delete(id: number) {
    return this.http.delete('api/hotels/' + id);
  }
}
