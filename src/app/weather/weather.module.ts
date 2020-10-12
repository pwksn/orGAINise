import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from './weather.service';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';

const weatherRoutes: Routes = [{ path: '', component: WeatherComponent }];

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(weatherRoutes)
  ],
  exports: [RouterModule],
  providers: [],
})
export class WeatherModule {}
