import { ToDoModule } from './to-do/to-do.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { } from './shared/location.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { WeatherModule } from './weather/weather.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: LayoutComponent },
  {
    path: 'todo',
    children: [
      {
        path: 'today',
        loadChildren: () => import('./to-do/today-tasks/today-tasks.module').then(m => m.TodayTasksModule),
      },
      {
        path: 'tomorrow',
        loadChildren: () => import('./to-do/tomorrow-tasks/tomorrow-tasks.module').then(m => m.TomorrowTasksModule),
      },
      {
        path: 'later',
        loadChildren: () => import('./to-do/later-tasks/later-tasks.module').then(m => m.LaterTasksModule),
      },
      {
        path: 'new',
        loadChildren: () => import('./to-do/new-task/new-task.module').then(m => m.NewTaskModule),
      }, 
      {
        path: 'details',
        loadChildren: () => import('./to-do/task-details/task-details.module').then(m => m.TaskDetailsModule),
      }
    ]
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule)
  },
  {
    path: 'pomodoro',
    loadChildren: () => import('./pomodoro/pomodoro.module').then(m => m.PomodoroModule)
  },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    // WeatherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherModule,
    ToDoModule,
    PomodoroModule,
    SharedModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
