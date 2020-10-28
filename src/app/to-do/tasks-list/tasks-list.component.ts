import { Subscription } from 'rxjs';
import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  @Input() daySelected: string;
  public tasks: Task[];
  private subscription: Subscription;

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.onDaySelected(this.daySelected);
    this.subscription = this.tasksService.tasksChanged
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
      )
      if (this.daySelected === 'today') {
        this.tasks = this.tasksService.getTodayTasks();
      } else if (this.daySelected === 'tomorrow') {
        this.tasks === this.tasksService.getTomorrowTasks();
      } else {
        this.tasks = this.tasksService.getLaterTasks();
      }
  }

  onDaySelected(day: string) {
    if (day === 'today') {
      this.tasks = this.tasksService.getTodayTasks();
    } else if (day === 'tomorrow') {
      this.tasks = this.tasksService.getTomorrowTasks();
    } else {
      this.tasks = this.tasksService.getLaterTasks();
    }
  }

  onDeleteTask(index: number) {
    console.log(index); // toDo
    this.tasksService.removeTask(index, this.daySelected);
  }

}
