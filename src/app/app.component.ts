import { Router } from '@angular/router';
import { Component, OnInit, OnChanges, AfterContentChecked } from '@angular/core';
import { WeatherService } from './weather/weather.service';
import { LocationService } from './shared/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'orgApp2';
  userPosition = {};
  currentRoute: string;

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.locationService.getPosition().then(pos => {
      this.weatherService.getWeather(pos.lng, pos.lat);
    })
    console.log(this.router.url);
  }

  ngAfterContentChecked() {
    this.currentRoute = this.router.url;
  }
}
