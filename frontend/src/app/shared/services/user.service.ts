import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<any[]>("http://localhost:8000/api/users");
  }

}
