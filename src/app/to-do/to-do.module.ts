import { ToDoRoutingModule } from './to-do-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './task-details/task-details.component';

@NgModule({
  declarations: [TaskDetailsComponent],
  imports: [
    CommonModule,
    ToDoRoutingModule
  ],
  exports: []
})
export class ToDoModule { }
