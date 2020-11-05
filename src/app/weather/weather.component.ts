import { DateService } from './../shared/date.service';
import { Component, OnInit } from '@angular/core';
import { NextDayWeather, WeatherDataFields } from './weather-response.model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  fetchedLocation: WeatherDataFields;
  nextDayForecast: NextDayWeather;
  public isWeatherFetched: boolean;

  constructor(
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {
    console.log(this.weatherService.getCurrentWeather());
    this.fetchedLocation = this.weatherService.getCurrentWeather();
    this.nextDayForecast = this.weatherService.getNextDayWeather();
    this.checkWeatherFetched();
    console.log(this.isWeatherFetched);
    console.log(this.fetchedLocation);
    console.log(this.nextDayForecast);
  }

  onWeatherRefresh() {
    console.log('Refreshed!');
    this.weatherService.refreshWeather();
  }

  checkWeatherFetched() {
    if (this.fetchedLocation.locationName.length) {
      this.isWeatherFetched = true;
    } else {
      this.isWeatherFetched = false;
    }
  }

}
