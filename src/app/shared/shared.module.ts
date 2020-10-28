import { NewTaskComponent } from './../to-do/new-task/new-task.component';
import { CommonModule } from '@angular/common';
import { WeatherWidgetComponent } from './../weather/weather-widget/weather-widget.component';
import { InfoBarComponent } from './../to-do/info-bar/info-bar.component';
import { DateService } from './date.service';
import { SoundEffectService } from './sound-effects.service';
import { NgModule } from "@angular/core";
import { LocationService } from './location.service';
import { TasksListComponent } from '../to-do/tasks-list/tasks-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        InfoBarComponent,
        WeatherWidgetComponent,
        TasksListComponent,
        NewTaskComponent
    ],
    providers: [
        LocationService,
        SoundEffectService,
        DateService
    ],
    exports: [
        InfoBarComponent,
        WeatherWidgetComponent,
        TasksListComponent,
        NewTaskComponent
    ]
})
export class SharedModule {}