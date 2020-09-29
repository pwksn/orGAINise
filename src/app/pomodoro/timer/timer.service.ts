import { Injectable } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  isRunning: boolean = false;
  timerInterval = new Subject<number>();
  subscription: Subscription;
  cyclesDone: number = 0;
  value = [25, 0];
  startingMinutes: number = this.value[0];
  startingSeconds: number = this.value[1];
  currentMode: string = 'focus';

  setValue(mins, secs) {
    this.value[0] = mins;
    this.value[1] = secs;
  } 

  getValue() {
    return this.value;
  }

  getCurrentMode() {
    return this.currentMode;
  }

  getCyclesDone() {
    return this.cyclesDone;
  }

  setStartingValues(mode) {
    this.currentMode = mode;
    switch (mode) {
      case 'focus':
        this.value = [25, 0];
        this.startingMinutes = 25;
        this.startingSeconds = 0;
        break;
      case 'short':
        this.value = [5, 0];
        this.startingMinutes = 5;
        this.startingSeconds = 0;
        break;
      case 'long':
        this.value = [15, 0];
        this.startingMinutes = 15;
        this.startingSeconds = 0;
        break;
    }
  }

  onTimerStart() {
    if (!this.isRunning) {
      if (this.value[0] === 0 && this.value[1] === 0) {
        this.onTimerReset();
      }
      this.subscription = interval(1000).subscribe(x => this.onTimerUpdate());
    }
    this.isRunning = true;
  }

  onTimerStop() {
    if (this.isRunning) {
      this.isRunning = false;
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }

  onTimerReset() {
    this.onTimerStop();
    this.value = [this.startingMinutes, this.startingSeconds];
  }

  onTimerUpdate() {
    if (this.isRunning) {
      if (this.value[0] === 0 && this.value[1] === 0) {
        this.onTimerStop();
      } else if (this.value[0] !== 0 && this.value[1] === 0) {
        this.value = [this.value[0] - 1, 59];
      } else if (this.value[1] !== 0) {
        this.value = [this.value[0], this.value[1] - 1];
      }
    }
    console.log(this.value[0] +  ':' + this.value[1]);
    this.getValue();
  }
}
