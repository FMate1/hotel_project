import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class HotelServicesService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ServiceDTO[]>('api/services/');
  }

  getOne(id: number) {
    return this.http.get<ServiceDTO>('api/services/' + id);
  }

  create(service: ServiceDTO) {
    return this.http.post<ServiceDTO>('api/services', service);
  }

  update(service: ServiceDTO) {
    return this.http.put<ServiceDTO>('api/services', service);
  }

  delete(id: number) {
    return this.http.delete('api/services/' + id);
  }
  
}
