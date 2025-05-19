import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get("http://localhost:8000/api/tasks/dashboard-data");
  }

  getUserDashboardData():Observable<any>{
    return this.http.get("http://localhost:8000/api/tasks/user-dashboard-data")
  }

    getGreeting(): string {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }
}
