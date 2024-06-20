import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../components/dashboard/dashboard.task';

@Injectable({
  providedIn: 'root'
})
export class CrudTaskService {
  private baseUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addTask(task: Task): Observable<any> {
    return this.http.post(this.baseUrl, task, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
