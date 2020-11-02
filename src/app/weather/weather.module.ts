import { WeatherRoutingModule } from './weather-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule, 
    WeatherRoutingModule
  ],
  exports: [],
  providers: [],
})
export class WeatherModule {}
