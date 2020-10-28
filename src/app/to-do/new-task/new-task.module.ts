import { SharedModule } from 'src/app/shared/shared.module';
import { NewTaskComponent } from './new-task.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const newTaskRoutes: Routes = [
  { path: '', component: NewTaskComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(newTaskRoutes),
  ],
  exports: [RouterModule]
})
export class NewTaskModule { }
