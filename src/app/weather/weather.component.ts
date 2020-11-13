import { DateService } from './../shared/date.service';
import { Component, OnInit } from '@angular/core';
import { NextDayWeather, WeatherDataFields, AirConditionData } from './weather-response.model';
import { WeatherService } from './weather.service';
import { LocationService } from '../shared/location.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public fetchedLocation: WeatherDataFields;
  public nextDayForecast: NextDayWeather;
  public airConditions: AirConditionData;
  public indexCAQI: number;

  public isWeatherFetched: boolean;
  public isAirFetched: boolean;

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.locationService.getPosition().then(pos => {
      this.weatherService.getWeather(pos.lng, pos.lat);
      this.weatherService.getAirCondition(pos.lng, pos.lat);
    })
    this.fetchedLocation = this.weatherService.getCurrentWeather();
    this.nextDayForecast = this.weatherService.getNextDayWeather();
    this.airConditions = this.weatherService.getAirConditions();
    this.indexCAQI = +this.airConditions.value;
    console.log(this.airConditions);
    // console.log(this.indexCAQI);
    this.checkWeatherFetched();
    this.checkAirFetched();
  }

  onWeatherRefresh() {
    this.weatherService.refreshWeather();
  }

  checkWeatherFetched() {
    if (this.fetchedLocation.locationName.length) {
      this.isWeatherFetched = true;
    } else {
      this.isWeatherFetched = false;
    }
  }

  checkAirFetched() {
    if (this.airConditions.description.length) {
      this.isAirFetched = true;
    } else {
      this.isAirFetched = false;
    }
  }
}
