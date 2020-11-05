import { TasksService } from './../tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today-tasks',
  templateUrl: './today-tasks.component.html',
  styleUrls: ['./today-tasks.component.css']
})
export class TodayTasksComponent implements OnInit {
  public todayTasksCounter: number;

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.todayTasksLength();
  }

  private todayTasksLength() {
    this.todayTasksCounter = this.tasksService.getTodayTasks().length;
  }

}
