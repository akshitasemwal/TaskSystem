import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from './dashboard.task';
import { HttpClient } from '@angular/common/http';
import { CrudTaskService } from 'src/app/services/crud.task.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  hours: string[] = [];
  minutes: string[] = [];

  selectedHour: string = '12';
  selectedMinute: string = '00';
  selectedAmpm: string = 'PM';
  selectedTaskType: string = 'Call';

  tasks: Task[] = [];

  constructor(private router: Router, private http: HttpClient, private taskService: CrudTaskService) {
    this.populateHours();
    this.populateMinutes();
  }

  ngOnInit(): void {
    this.fetchTasks();
  }

  populateHours() {
    for (let i = 1; i <= 12; i++) {
      this.hours.push(i < 10 ? '0' + i : i.toString());
    }
  }

  populateMinutes() {
    for (let i = 0; i < 60; i++) {
      this.minutes.push(i < 10 ? '0' + i : i.toString());
    }
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
          this.tasks = data;
      },
      error: (error) => {
          console.error('Error fetching tasks:', error);
      }
  });  
  }

  submitTask(form: any) {
    const task = {
      entityName: form.value.entityName,
      date: form.value.date,
      time: `${form.value.hour}:${form.value.minute} ${form.value.ampm}`,
      taskType: form.value.taskType,
      phoneNumber: form.value.phoneNumber,
      contactPerson: form.value.contactPerson,
      note: form.value.note,
      status: 'open' 
    };
    

    this.taskService.addTask(task).subscribe({
      next: (response) => {
          console.log('Task added successfully:', response);
          this.fetchTasks(); 
      },
      error: (error) => {
          console.error('Error adding task:', error);
      }
  });  
  }
}
