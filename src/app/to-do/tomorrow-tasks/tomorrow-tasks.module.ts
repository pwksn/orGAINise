import { ToDoModule } from './../to-do.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TomorrowTasksComponent } from './tomorrow-tasks.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const tomorrowTasksRoutes: Routes = [
  { path: '', component: TomorrowTasksComponent }
];

@NgModule({
  declarations: [TomorrowTasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(tomorrowTasksRoutes),
    SharedModule
  ],
  exports: [RouterModule],
})
export class TomorrowTasksModule { }
