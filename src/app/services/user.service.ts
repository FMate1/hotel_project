import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessTokenDTO, LoginDTO, UserDTO } from 'models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserDTO[]>('/api/users/');
  }

  getOne(id: number) {
    return this.http.get<UserDTO>('/api/users/' + id);
  }

  create(user: UserDTO) {
    return this.http.post<UserDTO>('api/users', user);
  }

  update(user: UserDTO) {
    return this.http.put<UserDTO>('/api/users/', user);
  }

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('/api/users/login', data);
  }

  toggleActiveStatus(user: UserDTO) {
    return this.http.post<UserDTO>(`/api/users/${user.id}`, user);
  }

  toggleAdminStatus(user: UserDTO) {
    return this.http.put<UserDTO>(`/api/users/${user.id}`, user);
  }

  getLoggedInUserEmail() {
    return this.http.get<UserDTO>('/api/users/logged-in');
  }

  getGuests(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>('/api/users/guests');
  }
  
}
