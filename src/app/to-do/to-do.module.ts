import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TodayTasksModule } from './today-tasks/today-tasks.module';

const toDoRoutes: Routes = [
  { 
    path: '',
    loadChildren: () => import('./today-tasks/today-tasks.module').then(m => m.TodayTasksModule),
  },
  {
    path: 'today',
    loadChildren: () => import('./today-tasks/today-tasks.module').then(m => m.TodayTasksModule),
  },
  {
    path: 'tomorrow',
    loadChildren: () => import('./tomorrow-tasks/tomorrow-tasks.module').then(m => m.TomorrowTasksModule),
  }, 
  {
    path: 'later',
    loadChildren: () => import('./later-tasks/later-tasks.module').then(m => m.LaterTasksModule),
  }
]

@NgModule({
  declarations: [TasksTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(toDoRoutes),
    TodayTasksModule
  ],
  exports: [
    RouterModule,
    TasksTableComponent,
  ]
})
export class ToDoModule { }
