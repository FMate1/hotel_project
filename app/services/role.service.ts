import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<RoleDTO[]>('api/roles');
  }

  getOne(id: number) {
    return this.http.get<RoleDTO>('api/roles/' + id);
  }

  create(role: RoleDTO) {
    return this.http.post<RoleDTO>('api/roles', role);
  }

  update(role: RoleDTO) {
    return this.http.put<RoleDTO>('api/roles', role);
  }

  delete(id: number) {
    return this.http.delete('api/roles/' + id);
  }

}
