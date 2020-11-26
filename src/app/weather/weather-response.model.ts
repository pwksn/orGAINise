export class WeatherForecastResponse {
    daily: [
        {},
        {
            temp: {
                min: number;
                max: number;
                day: number;
            },
            weather: [{
                description: string;
                icon: string;
            }]
        }
    ]
}

export class WeatherCurrentResponse {
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    name: string;
    weather: [{
        description: string;
        icon: string;
    }]
}

export class WeatherDataFields {
    locationName?: string;
    currentTemp?: number;
    feelsLikeTemp?: number;
    weatherDesc?: string;
    weatherIconName?: string;
    pressure?: number;
    humidity?: number;
}

export class NextDayWeather {
    temp?: number;
    minTemp?: number;
    maxTemp?: number;
    weatherDesc?: string;
    weatherIconName?: string;
}

export class AirConditionResponse {
    current: {
        indexes: [{
            color: string,
            description: string,
            value: string,
        }],
        values: [{
            name: string,
            value: string
        }],
        tillDateTime: string
    }
}

export class AirConditionData {
    description?: string;
    value?: string;
    dateTime?: string;
}