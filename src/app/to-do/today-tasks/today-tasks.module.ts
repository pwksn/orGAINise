import { SharedModule } from 'src/app/shared/shared.module';
import { ToDoModule } from './../to-do.module';
import { WeatherWidgetComponent } from './../../weather/weather-widget/weather-widget.component';
import { InfoBarComponent } from './../info-bar/info-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodayTasksComponent } from './today-tasks.component';
import { Routes, RouterModule } from '@angular/router';


const todayTasksRoutes: Routes = [
  { path: '', component: TodayTasksComponent }
];

@NgModule({
  // declarations: [TodayTasksComponent, InfoBarComponent, WeatherWidgetComponent],
  declarations: [TodayTasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(todayTasksRoutes),
    SharedModule
  ],
  exports: [RouterModule],
})
export class TodayTasksModule { }
