import { SoundEffectService } from './../../shared/sound-effects.service';
import { Injectable } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(
    private soundEffectService: SoundEffectService
  ) { }

  isRunning: boolean = false;
  timerInterval = new Subject<number>();
  subscription: Subscription;
  cyclesDone: number = 0;
  value: number[] = [25, 0];
  startingMinutes: number = this.value[0];
  startingSeconds: number = this.value[1];
  currentMode: string = 'focus';

  private _modeChanged: Subject<any> = new Subject<any>();
  public modeChangedObs = this._modeChanged.asObservable();

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
        this.startingMinutes = 0;
        this.startingSeconds = 7;
        break;
      case 'short':
        this.startingMinutes = 0;
        this.startingSeconds = 3;
        break;
      case 'long':
        this.startingMinutes = 0;
        this.startingSeconds = 5;
        break;
    }
    console.log(this.startingMinutes, this.startingSeconds);
    this.value = [this.startingMinutes, this.startingSeconds];
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
        this.onTimerComplete();
        this._modeChanged.next(this.currentMode);
      } else if (this.value[0] !== 0 && this.value[1] === 0) {
        this.value = [this.value[0] - 1, 59];
      } else if (this.value[1] !== 0) {
        this.value = [this.value[0], this.value[1] - 1];
      }
    }
    console.log(this.value[0] +  ':' + this.value[1]);
    this.getValue();
  }

  onTimerComplete() {
    console.log('completed!');
    this.soundEffectService.playBellRing();
    if (this.currentMode === 'short' || this.currentMode === 'long') {
      this.currentMode = 'focus';
    } else if (this.currentMode === 'focus' && this.cyclesDone !== 0 && this.cyclesDone % 3 === 0) {
      this.cyclesDone++;
      this.currentMode = 'long';
    } else {
      this.cyclesDone++;
      this.currentMode = 'short';
    }
  }
}
