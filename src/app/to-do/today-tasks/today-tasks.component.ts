// import { TasksService } from './../tasks.service';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-today-tasks',
//   templateUrl: './today-tasks.component.html',
//   styleUrls: ['./today-tasks.component.css']
// })
// export class TodayTasksComponent implements OnInit {
//   public todayTasksCounter: number;

//   constructor(
//     private tasksService: TasksService
//   ) { }

//   ngOnInit(): void {
//     this.todayTasksLength();
//   }

//   private todayTasksLength() {
//     this.todayTasksCounter = this.tasksService.getTodayTasks().length;
//   }

// }
import { forkJoin } from 'rxjs';
import { DataStorageService } from './../../shared/data-storage.service';
import { TasksService } from './../tasks.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-today-tasks',
  templateUrl: './today-tasks.component.html',
  styleUrls: ['./today-tasks.component.css']
})
export class TodayTasksComponent implements OnInit {
  public todayTasksCounter: number;
  public isTasksDataLoading: boolean;

  constructor(
    private tasksService: TasksService,
    private dataStorageService: DataStorageService
  ) { }

  private invitationalTasks: Task[] = [];
  private taskCombined: Task[] = [];

  ngOnInit(): void {
    console.log(this.dataStorageService.localId);
    if (this.tasksService.allTasks.length !== 0) {
      this.todayTasksLength();
      return;
    }
    this.tasksService.clearAllTasks();
    this.prepareTasks();
  }

  private todayTasksLength() {
    this.todayTasksCounter = this.tasksService.getTodayTasks().length;
  }

  private prepareTasks() {
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
      this.todayTasksLength();
      this.isTasksDataLoading = false;
    })
  }

}
