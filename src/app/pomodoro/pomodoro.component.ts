import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent {

  mode = 'focus';
  message: string;
  pomodoroCount = 0;

  constructor(
    private modalService: NgbModal
  ) { }

  onSwitchToPomodoro() {
    this.mode = 'focus';
  }

  onSwitchToShortBreak() {
    this.mode = 'short';
  }

  onSwitchToLongBreak() {
    this.mode = 'long';
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
