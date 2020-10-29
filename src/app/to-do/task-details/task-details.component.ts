import { TasksService } from './../tasks.service';
import { Task } from './../task.model';
import { DataStorageService } from './../../shared/data-storage.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  private daySelected: string;
  private tasksList: Task[];
  public task: Task;
  private taskIndex: number;

  constructor(
    private _location: Location,
    private dataStorageService: DataStorageService,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.daySelected = this.dataStorageService.getQueryParam('day');
    this.taskIndex = +this.dataStorageService.getQueryParam('i');
    this.setTask(this.daySelected);
    console.log(this.taskIndex);
  }

  onGoBack() {
    this._location.back();
  }

  onTaskEdit() {
    console.log('task edit');
  }

  setTask(day: string) {
    if (day === 'today') {
      this.tasksList = this.tasksService.getTodayTasks();
    } else if (day === 'tomorrow') {
      this.tasksList = this.tasksService.getTomorrowTasks();
    } else {
      this.tasksList = this.tasksService.getLaterTasks();
    }
    this.task = this.tasksList[this.taskIndex];
    console.log(this.task);
  }

}
