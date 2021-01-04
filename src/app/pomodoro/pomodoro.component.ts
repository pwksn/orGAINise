import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Task } from './../to-do/task.model';
import { TasksService } from './../to-do/tasks.service';
import { forkJoin, Subscription } from 'rxjs';
import { TimerService } from './timer/timer.service';
import { Component, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit, OnDestroy {

  mode: string = 'focus';
  message: string;
  public pomodoroCount = 0;
  private nextModeSub: Subscription;
  public todayTasksCount: number;
  public todayTasksList: Task[];
  public taskCyclesDone: number;
  public currentTask: Task;
  public currentTaskName: string;

  public isTasksDataLoading: boolean;
  private invitationalTasks: Task[] = [];
  private taskCombined: Task[] = [];

  constructor(
    private modalService: NgbModal,
    private timerService: TimerService,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tasksService.getTodayTasks().length === 0) {
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
      this.isTasksDataLoading = false;

      this.mode = this.timerService.getCurrentMode();
      this.pomodoroCount = this.timerService.getCyclesDone();
      this.todayTasksList = this.tasksService.getTodayTasks();
      this.todayTasksCount = this.tasksService.getTodayTasks().length;
      this.currentTaskName = JSON.parse(localStorage.getItem('currentTaskName'));

      this.setNewTask(this.currentTaskName);
      this.onModeChange();
    })
    } else {
      this.mode = this.timerService.getCurrentMode();
      this.pomodoroCount = this.timerService.getCyclesDone();
      this.todayTasksList = this.tasksService.getTodayTasks();
      this.todayTasksCount = this.tasksService.getTodayTasks().length;
      this.currentTaskName = JSON.parse(localStorage.getItem('currentTaskName'));

      this.setNewTask(this.currentTaskName);
      this.onModeChange();
    }
  }

  ngOnDestroy() {
    if (this.nextModeSub) {
      this.nextModeSub.unsubscribe();
    }
  }

  onModeChange() {
    this.nextModeSub = this.timerService.modeChangedObs.subscribe((mode) => {
      this.mode = mode;
      if (this.mode === 'focus') {
        this.onSwitchToPomodoro();
        this.onComponentRefresh();
      } else if (this.mode === 'short') {
        this.onSwitchToShortBreak();
        this.onComponentRefresh();
      } else if (this.mode === 'long') {
        this.onSwitchToLongBreak();
        this.onComponentRefresh();
      }
    });
  }

  onComponentRefresh() {
    this.router.navigateByUrl('', {skipLocationChange: true})
      .then(() => {
        this.router.navigate(['pomodoro']);
      })
  }

  onSwitchToPomodoro() {
    this.mode = 'focus';
    this.timerService.setStartingValues(this.mode);
  }

  onSwitchToShortBreak() {
    this.mode = 'short';
    this.timerService.setStartingValues(this.mode);
  }

  onSwitchToLongBreak() {
    this.mode = 'long';
    this.timerService.setStartingValues(this.mode);
  }

  onTimerComplete(content) {
    switch(this.mode) {
      case 'focus':
        this.pomodoroCount = this.pomodoroCount + 1;
        if (this.pomodoroCount % 4 === 0) {
          this.message = 'Czas na długą przerwę!';
        } else {
          this.message = 'Czas na krótką przerwę!';
        }
        break;
      case 'short':
        this.message = 'Czas wracać do pracy!';
        break;
      case 'long':
        this.message = 'Czas wracać do pracy!';
        break;
    }

    this.modalService.open(content).result.then((result) => this.onModalDismissed(), (reason) => this.onModalDismissed());
  }

  onModalDismissed() {
    if (this.mode === 'short' || this.mode === 'long') {
      this.mode = 'focus';
    } else if (this.mode === 'focus' && this.pomodoroCount % 4 === 0) {
      this.mode = 'long';
    } else {
      this.mode = 'short';
    }
  }

  public setNewTask(name: string) {
    for (let task of this.todayTasksList) {
      if (task.taskName === name) {
        this.currentTask = task;
      }
    }
    if (!this.currentTask) {
      this.currentTask = this.todayTasksList[0];
    }
    if (!this.currentTask?.taskCyclesDone) {
      this.currentTask.taskCyclesDone = 0;
    }
    this.timerService.setCurrentTask(this.currentTask);
    localStorage.setItem('currentTaskName', JSON.stringify(this.currentTask.taskName));
  }

}
