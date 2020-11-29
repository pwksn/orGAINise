import { FormsModule } from '@angular/forms';
import { PomodoroRoutingModule } from './pomodoro-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PomodoroComponent } from './pomodoro.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    TimerComponent,
    PomodoroComponent,
  ],
  imports: [
    CommonModule,
    PomodoroRoutingModule,
    FormsModule
  ],
  exports: [
    TimerComponent
  ]
})
export class PomodoroModule { }
