import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PomodoroComponent } from './pomodoro.component';
import { TimerComponent } from './timer/timer.component';

const pomodoroRoutes: Routes = [
  { path: '', component: PomodoroComponent },
]

@NgModule({
  declarations: [
    TimerComponent,
    PomodoroComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pomodoroRoutes),
  ],
  exports: [
    RouterModule,
    TimerComponent
  ]
})
export class PomodoroModule { }
