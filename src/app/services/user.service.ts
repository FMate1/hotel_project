import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessTokenDTO, LoginDTO, UserDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: UserDTO) {
    return this.http.post<UserDTO>('api/users', user);
  }
  
  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('/api/users/login', data);
}

}
