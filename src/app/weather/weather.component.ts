import { forkJoin } from 'rxjs';
import { DataStorageService } from './../shared/data-storage.service';
import { DateService } from './../shared/date.service';
import { Component, OnInit } from '@angular/core';
import { NextDayWeather, WeatherDataFields, AirConditionData } from './weather-response.model';
import { WeatherService } from './weather.service';
import { LocationService } from '../shared/location.service';
import { Router } from '@angular/router';

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
  public isWeatherDataLoading: boolean;
  public isAirDataLoading: boolean;
  private userPosition: any = [];

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.locationService.getPosition().then(pos => {
    //   this.weatherService.getWeather(pos.lng, pos.lat);
    //   this.weatherService.getAirCondition(pos.lng, pos.lat);
    // })
    this.userPosition = JSON.parse(localStorage.getItem('userPosition'));
    this.isWeatherDataLoading = true;
    this.isAirDataLoading = true;
    this.weatherService.getAirConditionsData(this.userPosition?.lng, this.userPosition?.lat).subscribe(
      res =>{
        this.weatherService.setAirConditionsData(res);
        this.isAirDataLoading = false;
      }
    )
    forkJoin([
      this.weatherService.getWeatherData(this.userPosition?.lat, this.userPosition?.lng),
      this.weatherService.getWeatherForecastData(this.userPosition?.lat, this.userPosition?.lng),
    ]).subscribe(res => {
      console.log(res);
      this.weatherService.setWeatherData(res);
      this.fetchedLocation = this.weatherService.getCurrentWeather();
      this.nextDayForecast = this.weatherService.getNextDayWeather();
      this.airConditions = this.weatherService.getAirConditions();
      this.indexCAQI = +this.airConditions.value;
      this.checkWeatherFetched();
      this.checkAirFetched();
      this.isWeatherDataLoading = false;
    }, error => {
      this.isWeatherDataLoading = false;
    });
    // this.fetchedLocation = this.weatherService.getCurrentWeather();
    // this.nextDayForecast = this.weatherService.getNextDayWeather();
    // this.airConditions = this.weatherService.getAirConditions();
    // this.indexCAQI = +this.airConditions.value;
    // this.checkWeatherFetched();
    // this.checkAirFetched();
    // this.isWeatherDataLoading = false;
  }

  onWeatherRefresh() {
    // this.weatherService.refreshWeather();
    this.locationService.getPosition().then(pos => {
      localStorage.setItem('userPosition', JSON.stringify(pos));
    });
    this.router.navigateByUrl('', {skipLocationChange: true})
    .then(() => {
      this.router.navigate(['weather']);
    })
  }

  checkWeatherFetched() {
    if (this.fetchedLocation.locationName.length) {
      this.isWeatherFetched = true;
    } else {
      this.isWeatherFetched = false;
    }
  }

  checkAirFetched() {
    if (!this.airConditions.value) {
      this.isAirFetched = false;
      this.dataStorageService.fetchAirCondition().subscribe(
        response => {
          this.airConditions = response
        }
      );
    } else {
      this.isAirFetched = true;
      this.dataStorageService.storeAirCondition(this.airConditions);
    }
    console.log(this.airConditions);
  }
}
