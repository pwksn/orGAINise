import { TasksService } from './../to-do/tasks.service';
import { Subscription } from 'rxjs';
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
  pomodoroCount = 0;
  private nextModeSub: Subscription;
  public todayTasksCount: number;

  constructor(
    private modalService: NgbModal,
    private timerService: TimerService,
    private tasksService: TasksService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mode = this.timerService.getCurrentMode();
    this.pomodoroCount = this.timerService.getCyclesDone();
    this.todayTasksCount = this.tasksService.getTodayTasks().length;
    console.log(this.todayTasksCount);
    this.onModeChange();
  }

  ngOnDestroy() {
    this.nextModeSub.unsubscribe();
  }

  onModeChange() {
    console.log('sikalafą!');
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

}
