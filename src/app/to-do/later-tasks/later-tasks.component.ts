// import { Component, OnInit } from '@angular/core';
// import { TasksService } from '../tasks.service';

// @Component({
//   selector: 'app-later-tasks',
//   templateUrl: './later-tasks.component.html',
//   styleUrls: ['./later-tasks.component.css']
// })
// export class LaterTasksComponent implements OnInit {

//   public laterTasksCounter: number;

//   constructor(
//     private tasksService: TasksService
//   ) { }

//   ngOnInit(): void {
//     this.laterTasksLength();
//   }

//   private laterTasksLength() {
//     this.laterTasksCounter = this.tasksService.getLaterTasks().length;
//   }

// }

import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-later-tasks',
  templateUrl: './later-tasks.component.html',
  styleUrls: ['./later-tasks.component.css']
})
export class LaterTasksComponent implements OnInit {

  public laterTasksCounter: number;
  public isTasksDataLoading: boolean;

  constructor(
    private tasksService: TasksService,
    private dataStorageService: DataStorageService
  ) { }

  private invitationalTasks: Task[] = [];
  private taskCombined: Task[] = [];

  ngOnInit(): void {
    console.log(this.dataStorageService.localId);
    this.tasksService.clearAllTasks();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userEmail = userData?.email;
    this.isTasksDataLoading = true;
    forkJoin([
      this.dataStorageService.fetchTasks(),
      this.dataStorageService.fetchInvitations(userEmail)
    ]).subscribe(res => {
      console.log(res);
      if (!!res[1]) {
        for (let [uid, task] of Object.entries(res[1])) {
          console.log(task);
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
      this.laterTasksLength();
      this.isTasksDataLoading = false;
    })
  }

  private laterTasksLength() {
    this.laterTasksCounter = this.tasksService.getLaterTasks().length;
  }

}