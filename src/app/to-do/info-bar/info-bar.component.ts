import { WeatherService } from './../../weather/weather.service';
import { DateService } from './../../shared/date.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.css']
})
export class InfoBarComponent implements OnInit {
  @Input() daySelected: string;
  public dayText: string;

  public currentDay: number;
  public currentMonth: string;
  public currentYear: number;
  public tomorrowDay: number;
  public tomorrowMonth: string;
  public tomorrowYear: number;
  public isWeatherData: boolean;

  constructor(
    private dateService: DateService,
    private router: Router,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.onDaySelected(this.daySelected);
    this.isWeatherData = this.checkWeatherData();
  }

  onTaskAdd() {
    this.router.navigate(['/todo/new'],
    {queryParams: {
      day: this.daySelected
    }});
  }

  onWidgetClick() {
    this.router.navigateByUrl('/weather');
  }

  onDaySelected(day: string) {
    if (day === 'today') {
      this.dayText = 'Dzisiaj';
      this.currentDay = this.dateService.currentDay;
      this.currentMonth = this.dateService.currentMonth;
      this.currentYear = this.dateService.currentYear;
    } else if (day === 'tomorrow') {
      this.dayText = 'Jutro';
      this.tomorrowDay = this.dateService.tomorrowDay;
      this.tomorrowMonth = this.dateService.tomorrowMonth;
      this.tomorrowYear = this.dateService.tomorrowYear;
    } else {
      this.dayText = 'Na później'
    }
  }

  checkWeatherData() {
    return this.weatherService.currentWeatherData.locationName ? true : false;
  }

}
