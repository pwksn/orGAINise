import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationService } from '../shared/location.service';
import { WeatherForecastResponse, WeatherCurrentResponse, WeatherDataFields, NextDayWeather, AirConditionResponse, AirConditionData } from './weather-response.model';

@Injectable({providedIn: 'root'})
export class WeatherService {
    constructor(
        private http: HttpClient,
        private locationService: LocationService
    ) {}

    public currentWeatherData: WeatherDataFields = {
        locationName: '',
        currentTemp: 0,
        feelsLikeTemp: 0,
        weatherDesc: '',
        weatherIconName: '',
        pressure: 0,
        humidity: 0,
    };

    public nextDayWeather: NextDayWeather = {
        temp: 0,
        minTemp: 0,
        maxTemp: 0,
        weatherDesc: '',
        weatherIconName: '',
    };

    public currentAirCondition: AirConditionData = {
        color: '',
        description: '',
        value: '',
    }
    
    getWeather(longitude: number, latitude: number) {
        // Get current weather
        this.http.get<WeatherCurrentResponse>('https://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + '&appid=bffb31e7ffc6eedf1f1311e3c8d3bf9f&lang=pl&units=metric').subscribe(response => {
            console.log(response);
            this.currentWeatherData.locationName = response.name;
            this.currentWeatherData.currentTemp = response.main.temp;
            this.currentWeatherData.feelsLikeTemp = response.main.feels_like;
            this.currentWeatherData.weatherDesc = response.weather[0].description;
            this.currentWeatherData.weatherIconName = response.weather[0].icon;
            this.currentWeatherData.pressure = response.main.pressure;
            this.currentWeatherData.humidity = response.main.humidity;
            console.log(this.currentWeatherData);
        });

        // Get forecast for next days 
        this.http.get<WeatherForecastResponse>('https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +'&lon=' + longitude +'&exclude=hourly,minutely,current&appid=bffb31e7ffc6eedf1f1311e3c8d3bf9f&lang=pl&units=metric').subscribe(
            response => {
                console.log(response.daily[1]);
                this.nextDayWeather.minTemp = response.daily[1].temp.min;
                this.nextDayWeather.maxTemp = response.daily[1].temp.max;
                this.nextDayWeather.weatherDesc = response.daily[1].weather[0].description;
                this.nextDayWeather.temp = response.daily[1].temp.day;
                this.nextDayWeather.weatherIconName = response.daily[1].weather[0].icon;
                console.log(this.nextDayWeather);
                
            }
        )
    }

    getAirCondition(longitude: number, latitude: number) {
        this.http.get<any>('https://airapi.airly.eu/v2/measurements/point?lat='+ latitude +'&lng='+ longitude +'&apikey=Oeam5hSEwezqPTEj1ElYB4i1uOh9ZD5b').subscribe(
            response => {
                this.currentAirCondition.color = response.current.indexes[0].color;
                this.currentAirCondition.description = response.current.indexes[0].description;
                this.currentAirCondition.value = response.current.indexes[0].value;
                console.log(this.currentAirCondition);
            }
        )
    }

    getCurrentWeather() {
        return this.currentWeatherData;
    }

    getNextDayWeather() {
        return this.nextDayWeather;
    }

    public getAirConditions() { 
        return this.currentAirCondition;
    }

    refreshWeather() {
        this.locationService.getPosition().then(pos => {
            this.getWeather(pos.lng, pos.lat);
            this.getAirCondition(pos.lng, pos.lat);
        })   
        this.getCurrentWeather();
        this.getNextDayWeather();
    }


}