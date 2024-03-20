import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuestDTO } from 'models';

@Injectable({
  providedIn: 'root'
})

export class GuestService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<GuestDTO[]>('api/guests/');
  }

  getOne(id: number) {
    return this.http.get<GuestDTO>('api/guests/' + id);
  }

  create(guest: GuestDTO) {
    return this.http.post<GuestDTO>('api/guests', guest);
  }

  update(guest: GuestDTO) {
    return this.http.put<GuestDTO>('api/guests', guest);
  }

  delete(id: number) {
    return this.http.delete('api/guests/' + id);
  }
}
