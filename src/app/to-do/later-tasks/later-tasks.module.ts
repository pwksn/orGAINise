import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaterTasksComponent } from './later-tasks.component';
import { Routes, RouterModule } from '@angular/router';

const laterTasksRoutes: Routes = [
  { path: '', component: LaterTasksComponent }
];

@NgModule({
  declarations: [LaterTasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(laterTasksRoutes),
    SharedModule
  ],
  exports: [RouterModule],
})
export class LaterTasksModule { }
