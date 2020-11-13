import { AirConditionEmojiComponent } from './air-condition-emoji/air-condition-emoji.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';

@NgModule({
  declarations: [WeatherComponent, AirConditionEmojiComponent],
  imports: [
    CommonModule, 
    WeatherRoutingModule
  ],
  exports: [],
  providers: [],
})
export class WeatherModule {}
