import { DateService } from './../../shared/date.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private dateService: DateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.onDaySelected(this.daySelected);
  }

  onTaskAdd() {
    this.router.navigateByUrl('/todo/new');
  }

  onWidgetClick() {
    this.router.navigateByUrl('/weather');
  }

  onDaySelected(day) {
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

}
