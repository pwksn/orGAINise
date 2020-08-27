import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface WeatherResponseData {
    main: {
        temp: number,
        feels_like: number,
    },
    name: string,
    weather: [{
        description: string,
        icon: string
    }]
}

@Injectable({providedIn: 'root'})
export class WeatherService {
    constructor(private http: HttpClient) {}

    userLocation = {
        locationName: '',
        currentTemp: 0,
        feelsLikeTemp: 0,
        weatherDesc: '',
        weatherIconName: '',
    }

    getWeather(latitute: number, longtitute: number) {
        this.http.get<WeatherResponseData>('https://api.openweathermap.org/data/2.5/weather?lat='+ longtitute + '&lon=' + latitute + '&appid=bffb31e7ffc6eedf1f1311e3c8d3bf9f&lang=pl&units=metric').subscribe(response => {
            console.log(response);
            this.userLocation.locationName = response.name;
            this.userLocation.currentTemp = response.main.temp;
            this.userLocation.feelsLikeTemp = response.main.feels_like;
            this.userLocation.weatherDesc = response.weather[0].description;
            this.userLocation.weatherIconName = response.weather[0].icon;
            console.log(this.userLocation);
        });
    }


}