import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
constructor(private http: HttpClient) {}

  createTask(taskData: any): Observable<any> {
    return this.http.post("http://localhost:8000/api/tasks", taskData);
    
    
  }

  updateTask(taskId: string, taskData: any): Observable<any> {
    return this.http.put(`http://localhost:8000/api/tasks/${taskId}`, taskData);
  }

  getTaskById(taskId: string): Observable<any> {
    return this.http.get(`http://localhost:8000/api/tasks/${taskId}`);
  }
  getAllTasks(filterStatus: string): Observable<any> {
    return this.http.get('http://localhost:8000/api/tasks');
  }

  getUserTasks(filterStatus: string): Observable<any> {
    return this.getAllTasks(filterStatus);  // Reuse getAllTasks to handle user filtering
  }

}
