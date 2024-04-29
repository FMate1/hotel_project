import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingDTO } from 'models';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<BookingDTO[]>('api/bookings');
  }

  getOne(id: number) {
    return this.http.get<BookingDTO>('api/bookings/' + id);
  }

  create(booking: BookingDTO) {
    return this.http.post<BookingDTO>('api/bookings', booking);
  }

  update(booking: BookingDTO) {
    return this.http.put<BookingDTO>('api/bookings', booking);
  }

  delete(id: number) {
    return this.http.delete('api/bookings/' + id);
  }

  getUserBookings() {
    return this.http.get<BookingDTO[]>('api/bookings');
  }

}
