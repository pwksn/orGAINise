import { TimerService } from './timer.service';
import { AfterContentInit, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  private currentMins: number = this.timerService.getValue()[0];
  private currentSecs: number = this.timerService.getValue()[1];

  private running: boolean = false;
  public value = [this.currentMins, this.currentSecs];
  private subscription: Subscription;
  private isTimerRunning: boolean = false;
  public isServiceRunning: boolean = false;

  constructor(
    private timerService: TimerService
  ) { }

  ngOnInit() {
    if (this.timerService.subscription) {
      this.subscription = interval(1000).subscribe(x => this.onTimerUpdate());
      this.isServiceRunning = this.timerService.isRunning;
    }    
  }

  ngOnDestroy() {
    if (this.subscription) {
    this.subscription.unsubscribe();
    }
  }

  onTimerStart() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    this.isTimerRunning = true;
    this.timerService.onTimerStart();
    if (this.timerService.subscription) {
      this.subscription = interval(1000).subscribe(x => this.onTimerUpdate());
      this.isServiceRunning = this.timerService.isRunning;
    }
  }

  onTimerStop() {
    this.timerService.onTimerStop();
    if (this.subscription) {
      this.isServiceRunning = this.timerService.isRunning
      this.subscription.unsubscribe();
    }
    this.isTimerRunning = false;
  }

  onTimerReset() {
    this.timerService.onTimerReset();
    if (this.subscription) {
      this.isServiceRunning = this.timerService.isRunning
      this.subscription.unsubscribe();
    }
    this.value = this.timerService.getValue();
  }

  onTimerUpdate() {
    if (this.timerService.isRunning) {
      this.value = this.timerService.getValue();
    }
  }
}
