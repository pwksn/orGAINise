import { Subject } from 'rxjs';
import { DateService } from './../shared/date.service';
import { Task } from './task.model';
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

  // mock tasks
  public mockTasks: Task[] = [
    {taskName: 'Today task test', taskDate: 1605135600000, taskDetails: 'test opis'},
    {taskName: 'Yesterday task test', taskDate: 1605135600000, taskDetails: 'test opis 111'},
    {taskName: 'Tomorrow task test', taskDate: 1605222000000, taskDetails: 'test opis 123'},
    {taskName: 'Later task test', taskDate: 1607222000000, taskDetails: 'test opis 123'},
  ]

  constructor(
    private dateService: DateService
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
    console.log(task);
  }

  public removeTask(index: number, day: string) {
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
      this.todayTasks[index] = newTask;
      this.tasksChanged.next(this.todayTasks.slice());
    } else if (day === 'tomorrow') {
      this.tomorrowTasks[index] = newTask;
      this.tasksChanged.next(this.tomorrowTasks.slice());
    } else {
      this.laterTasks[index] = newTask;
      this.tasksChanged.next(this.laterTasks.slice());
    }
  }

  public sortTasksByDay(allTasks: Task[]) {
    const todayDate = this.dateService.today;
    const tomorrowDate = this.dateService.tomorrow;

    for (const task of allTasks) {
      if (task.taskDate === todayDate) {
        task.taskDay = 'today';
        this.todayTasks.push(task);
      } else if (task.taskDate === tomorrowDate) {
        task.taskDay = 'tomorrow';
        this.tomorrowTasks.push(task);
      } else if (task.taskDate > tomorrowDate) {
        task.taskDay="later";
        this.laterTasks.push(task);
      } else if(task.taskDate < todayDate) {
        task.taskDay="today";
        task.isTerminated = true;
        this.todayTasks.push(task);
      }
    }
  }

  public setTasks(tasks: Task[]) {

  }


}
