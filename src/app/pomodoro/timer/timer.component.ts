import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input() m: number;
  @Input() s: number;
  // @Output() onComplete: EventEmitter<any> = new EventEmitter();
  @Output() onComplete = new Subject<any>();

  running: boolean = false;
  value = [25, 0];
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.m) {
      this.value[0] = this.m;
    } else { 
      this.m = 25;
    }
    if (this.s) {
      this.value[1] = this.s;
    } else {
      this.s = 0;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      //this.subscription.unsubscribe();
      console.log('sub1');
    }
  }

  onTimerStart() {
    if (!this.running) {
      this.running = true;
      if (this.value[0] === 0 && this.value[1] === 0) {
        this.onTimerReset();
      }
      this.subscription = interval(1000).subscribe(x => this.onTimerUpdate());
    }
  }

  onTimerStop() {
    if (this.running) {
      this.running = false;
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }

  onTimerReset() {
    this.onTimerStop();
    this.value = [this.m, this.s];
  }

  onTimerUpdate() {
    if (this.running) {
      if (this.value[0] === 0 && this.value[1] === 0) {
        this.onTimerStop();
        // this.onComplete.emit()
        this.onComplete.next()
      } else if (this.value[0] !== 0 && this.value[1] === 0) {
        this.value = [this.value[0] - 1, 59];
      } else if (this.value[1] !== 0) {
        this.value = [this.value[0], this.value[1] - 1];
      }
    }
  }
}
