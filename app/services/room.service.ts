import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<RoomDTO[]>('api/rooms');
  }

  getOne(id: number) {
    return this.http.get<RoomDTO>('api/rooms/' + id);
  }

  create(room: RoomDTO) {
    return this.http.post<RoomDTO>('api/rooms', room);
  }

  update(room: RoomDTO) {
    return this.http.put<RoomDTO>('api/rooms', room);
  }

  delete(id: number) {
    return this.http.delete('api/rooms/' + id);
  }

  /*
  activateLocationStatus(location: LocationDTO) {
    return this.http.put<LocationDTO>('api/locations/', location);
  }

  deactivateLocationStatus(location: LocationDTO) {
    return this.http.put<LocationDTO>('api/locations/', location);
  }
  */

}
