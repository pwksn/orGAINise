import { DataStorageService } from './../../shared/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  private totalTasksDone: number;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
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
        this.tasks = this.tasksService.getTerminatedTasks().concat(this.tasksService.getTodayTasks());
        console.log(this.tasks);
      } else if (this.daySelected === 'tomorrow') {
        this.tasks === this.tasksService.getTomorrowTasks();
      } else {
        this.tasks = this.tasksService.getLaterTasks();
      }
    this.dataStorageService.fetchTotalTasks().subscribe(
      response => {
        if (response >= 0) {
          this.totalTasksDone = response;
        } else {
          this.totalTasksDone = 0;
        }
      }
    )
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
    this.tasksService.removeTask(index, this.daySelected);
  }

  onTaskDone(index: number) {
    this.totalTasksDone++;
    this.dataStorageService.storeTotalTasks(this.totalTasksDone);
    this.tasksService.removeTask(index, this.daySelected);
  }

  goToDetails(index: number) {
    console.log(index);
    this.router.navigate([`../details`, index], 
    { 
      relativeTo: this.route.parent,
      queryParams: {
        day: this.daySelected,
        // i: index
      } });
  }

}
