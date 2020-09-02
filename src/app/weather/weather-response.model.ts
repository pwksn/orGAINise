export class WeatherForecastResponse {
    daily: [
        {},
        {
            temp: {
                min: number;
                max: number;
            },
            weather: [{
                description: string;
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