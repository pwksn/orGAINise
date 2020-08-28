import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather/weather.service';
import { LocationService } from './shared/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'orgApp2';
  userPosition = {}

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.locationService.getPosition().then(pos => {
      this.weatherService.getWeather(pos.lng, pos.lat);
    })
  }
}
