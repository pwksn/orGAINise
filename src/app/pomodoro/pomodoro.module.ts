import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PomodoroComponent } from './pomodoro.component';

const pomodoroRoutes: Routes = [
  { path: '', component: PomodoroComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(pomodoroRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PomodoroModule { }
