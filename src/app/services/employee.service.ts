import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<EmployeeDTO[]>('api/employees/');
  }

  getOne(employeeId: number) {
    return this.http.get<EmployeeDTO>('api/employees/' + employeeId);
  }

  create(employee: EmployeeDTO) {
    return this.http.post<EmployeeDTO>('api/employees', employee);
  }

  update(employee: EmployeeDTO) {
    return this.http.put<EmployeeDTO>('api/employees', employee);
  }

  delete(employeeId: number) {
    return this.http.delete('api/employees/' + employeeId);
  }
}
