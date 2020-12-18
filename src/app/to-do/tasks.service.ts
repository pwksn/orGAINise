import { DataStorageService } from './../shared/data-storage.service';
import { Subject } from 'rxjs';
import { DateService } from './../shared/date.service';
import { Task, Partner } from './task.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private todayTasks: Task[] = [];
  private tomorrowTasks: Task[] = [];
  private laterTasks: Task[] = [];
  private terminatedTasks: Task[] = [];
  public allTasks: Task[] = [];
  public tasksChanged = new Subject<Task[]>();
  private todayDate = this.dateService.today;
  private tomorrowDate = this.dateService.tomorrow;
  private _currentUserMail: string;

  constructor(
    private dateService: DateService,
    private dataStorageService: DataStorageService
  ) { }

  public getTask(index: number, day: string) {
    if (day === 'today') {
      return this.todayTasks[index];
    } else if (day === 'tomorrow') {
      return this.tomorrowTasks[index];
    } else {
      return this.laterTasks[index];
    }
  }

  // public getAllTasks() {
  //   return this.mockTasks;
  // }

  public getTerminatedTasks() {
    return this.terminatedTasks.slice();
  }

  public getTodayTasks() {
    return this.todayTasks.slice();
  }

  public getTomorrowTasks() {
    return this.tomorrowTasks.slice();
  }

  public getLaterTasks() {
    return this.laterTasks.slice();
  }

  public addTask(task: Task) {
    if (task.taskDay === 'today') {
      task.taskDate = this.dateService.today;
      this.todayTasks.push(task);
    } else if (task.taskDay === 'tomorrow') {
      task.taskDate = this.dateService.tomorrow;
      this.tomorrowTasks.push(task);
    } else {
      this.laterTasks.push(task);
    }
    // this.storeAllTasks();
  }

  public removeTask(index: number, day: string) {
    let taskToRemove: Task;
    if (day === 'today') {
      taskToRemove = this.todayTasks[index];
      this.todayTasks.splice(index, 1);
      this.tasksChanged.next(this.todayTasks.slice());
    } else if (day === 'tomorrow') {
      taskToRemove = this.tomorrowTasks[index];
      this.tomorrowTasks.splice(index, 1);
      this.tasksChanged.next(this.tomorrowTasks.slice());
    } else {
      taskToRemove = this.laterTasks[index];
      this.laterTasks.splice(index, 1);
      this.tasksChanged.next(this.laterTasks.slice());
    }
    console.log(taskToRemove);
    if (taskToRemove.isInvitational) {
      this.dataStorageService.removeInvitation(taskToRemove);
    } else {
      this.storeAllTasks();
    }
  }

  public removeEditedTask(index: number, day: string) {
    if (day === 'today') {
      this.todayTasks.splice(index, 1);
      this.tasksChanged.next(this.todayTasks.slice());
    } else if (day === 'tomorrow') {
      this.tomorrowTasks.splice(index, 1);
      this.tasksChanged.next(this.tomorrowTasks.slice());
    } else {
      this.laterTasks.splice(index, 1);
      this.tasksChanged.next(this.laterTasks.slice());
    }
  }

  public updateTask(index: number, newTask: Task, day: string) {
    if (day === 'today') {
      newTask.taskDate =this.todayDate;
      this.todayTasks[index] = newTask;
      this.tasksChanged.next(this.todayTasks.slice());
    } else if (day === 'tomorrow') {
      newTask.taskDate = this.tomorrowDate;
      this.tomorrowTasks[index] = newTask;
      this.tasksChanged.next(this.tomorrowTasks.slice());
    } else {
      this.laterTasks[index] = newTask;
      this.tasksChanged.next(this.laterTasks.slice());
    }
    // this.storeAllTasks();
  }

  public sortTasksByDay(allGivenTasks: Task[]) {
    for (const task of allGivenTasks) {
      if (task.taskDate === this.todayDate) {
        task.taskDay = 'today';
        this.todayTasks.push(task);
      } else if (task.taskDate === this.tomorrowDate) {
        task.taskDay = 'tomorrow';
        this.tomorrowTasks.push(task);
      } else if (task.taskDate > this.tomorrowDate || task.taskDay === 'later') {
        task.taskDay="later";
        this.laterTasks.push(task);
      } else if(task.taskDate < this.todayDate) {
        task.taskDay="today";
        task.isTerminated = true;
        this.todayTasks.push(task);
      }
    }
  }

  public storeAllTasks() {
    this.allTasks = this.todayTasks.concat(this.tomorrowTasks, this.laterTasks, this.terminatedTasks);
    const tasksToStore: Task[] = [];
    for (let task of this.allTasks) {
      if (!task.isInvitational) tasksToStore.push(task);
    }
    console.log(tasksToStore);
    this.dataStorageService.storeTasks(tasksToStore);
  }

  public setTasks(tasks: Task[]) {

  }

  public clearAllTasks() {
    this.allTasks = [];
    this.todayTasks = [];
    this.tomorrowTasks = [];
    this.laterTasks = [];
  }

  public calculateTaskTime(taskCycles: number) {
    const taskDuration = taskCycles * 25;
    const taskHours = Math.floor(taskDuration / 60);
    const taskMinutes = taskDuration % 60;
    return [taskHours, taskMinutes];
  }

  set currentUserMail(mail: string) {
    this._currentUserMail = mail;
  }

  get currentUserMail() {
    return this._currentUserMail;
  }

  public swapPartners(partners: Partner[], givenPartner: Partner) {
    const index = partners.indexOf(givenPartner);
    partners[index] = {
      partnerMail: this.currentUserMail
    }
  }


}
