// import { Component, OnInit } from '@angular/core';
// import { TasksService } from '../tasks.service';

// @Component({
//   selector: 'app-tomorrow-tasks',
//   templateUrl: './tomorrow-tasks.component.html',
//   styleUrls: ['./tomorrow-tasks.component.css']
// })
// export class TomorrowTasksComponent implements OnInit {
//   public tomorrowTasksCounter: number;

//   constructor(
//     private tasksService: TasksService
//   ) { }

//   ngOnInit(): void {
//     this.tomorrowTasksLength();
//   }

//   private tomorrowTasksLength() {
//     this.tomorrowTasksCounter = this.tasksService.getTomorrowTasks().length;
//   }

// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tomorrow-tasks',
  templateUrl: './tomorrow-tasks.component.html',
  styleUrls: ['./tomorrow-tasks.component.css']
})
export class TomorrowTasksComponent implements OnInit {
  public tomorrowTasksCounter: number;
  public isTasksDataLoading: boolean;

  constructor(
    private tasksService: TasksService,
    private dataStorageService: DataStorageService
  ) { }

  private invitationalTasks: Task[] = [];
  private taskCombined: Task[] = [];

  ngOnInit(): void {
    this.tasksService.clearAllTasks();
    this.prepareTasks();
  }

  private tomorrowTasksLength() {
    this.tomorrowTasksCounter = this.tasksService.getTomorrowTasks().length;
  }

  private prepareTasks() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userEmail = userData?.email;
    this.isTasksDataLoading = true;
    forkJoin([
      this.dataStorageService.fetchTasks(),
      this.dataStorageService.fetchInvitations(userEmail)
    ]).subscribe(res => {
      if (!!res[1]) {
        for (let [uid, task] of Object.entries(res[1])) {
          task.isInvitational = true;
          this.invitationalTasks.push(task);
        }
      };
      if (!res[0]) {
        this.taskCombined = this.invitationalTasks;
      } else {
        this.taskCombined = res[0].concat(this.invitationalTasks);
      };
      this.taskCombined ? this.tasksService.sortTasksByDay(this.taskCombined) : null;
      this.tomorrowTasksLength();
      this.isTasksDataLoading = false;
    })
  }

}
