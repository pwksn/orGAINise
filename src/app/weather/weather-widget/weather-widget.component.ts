import { AfterViewInit, Component, OnChanges, OnInit, Input } from '@angular/core';
import { NextDayWeather, WeatherDataFields } from '../weather-response.model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  @Input() daySelected: string;
  public weatherToday: WeatherDataFields;
  public weatherTomorrow: NextDayWeather;
  public temperature: number;
  public iconCode: string;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    if (this.daySelected === 'today') {
      this.weatherToday = this.weatherService.getCurrentWeather();
      this.temperature = this.weatherToday.currentTemp;
      this.iconCode = this.weatherToday.weatherIconName;  
    } else if (this.daySelected === 'tomorrow') {
      this.weatherTomorrow = this.weatherService.nextDayWeather;
      this.temperature = this.weatherTomorrow.temp;
      this.iconCode = this.weatherTomorrow.weatherIconName;
    } 
  }

}
