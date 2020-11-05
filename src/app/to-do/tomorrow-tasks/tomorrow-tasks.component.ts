import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tomorrow-tasks',
  templateUrl: './tomorrow-tasks.component.html',
  styleUrls: ['./tomorrow-tasks.component.css']
})
export class TomorrowTasksComponent implements OnInit {
  public tomorrowTasksCounter: number;

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.tomorrowTasksLength();
  }

  private tomorrowTasksLength() {
    this.tomorrowTasksCounter = this.tasksService.getTomorrowTasks().length;
  }

}
