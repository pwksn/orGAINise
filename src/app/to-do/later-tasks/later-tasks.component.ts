import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-later-tasks',
  templateUrl: './later-tasks.component.html',
  styleUrls: ['./later-tasks.component.css']
})
export class LaterTasksComponent implements OnInit {

  public laterTasksCounter: number;

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.laterTasksLength();
  }

  private laterTasksLength() {
    this.laterTasksCounter = this.tasksService.getLaterTasks().length;
  }

}
