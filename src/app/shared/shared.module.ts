import { CommonModule } from '@angular/common';
import { WeatherWidgetComponent } from './../weather/weather-widget/weather-widget.component';
import { InfoBarComponent } from './../to-do/info-bar/info-bar.component';
import { DateService } from './date.service';
import { SoundEffectService } from './sound-effects.service';
import { NgModule } from "@angular/core";
import { LocationService } from './location.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InfoBarComponent,
        WeatherWidgetComponent
    ],
    providers: [
        LocationService,
        SoundEffectService,
        DateService
    ],
    exports: [
        InfoBarComponent,
        WeatherWidgetComponent
    ]
})
export class SharedModule {}