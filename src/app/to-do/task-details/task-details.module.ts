import { TaskDetailsComponent } from './task-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const taskDetailsRoutes: Routes = [
  { path: '', component: TaskDetailsComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(taskDetailsRoutes),
  ],
  exports: [RouterModule]
})
export class TaskDetailsModule { }
