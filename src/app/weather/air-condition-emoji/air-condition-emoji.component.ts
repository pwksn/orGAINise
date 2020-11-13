import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-air-condition-emoji',
  templateUrl: './air-condition-emoji.component.html',
  styleUrls: ['./air-condition-emoji.component.css']
})
export class AirConditionEmojiComponent implements OnInit {
  @Input() caqiValue: number;

  public airQualityValue: string;

  constructor() { }

  ngOnInit(): void {
    this.setAirQuality(+this.caqiValue);
  }

  setAirQuality(caqiValue: number) {
    if (caqiValue >= 0 && caqiValue < 25) {
      this.airQualityValue = 'veryLow';
    } else if (caqiValue >= 25 && caqiValue < 50) {
      this.airQualityValue = 'low';
    } else if (caqiValue >= 51 && caqiValue < 75) {
      this.airQualityValue = 'medium';
    } else if (caqiValue >= 76 && caqiValue < 100) {
      this.airQualityValue = 'high';
    } else {
      this.airQualityValue = 'veryHigh';
    }
  }
}
