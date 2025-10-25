export type GeoResult = {
    latitude: number;
    longitude: number;
    name: string;
    country?: string;
    admin1?: string;
}

export type GeoData = {
    results: GeoResult[];
}

export type WeatherData = {
    city_name?: string; 
    timezone?: string;
    current_weather?: {
        temperature: number;
        time: string;
        weathercode?: number;
        windspeed?: number;
    };
    hourly?: {
        time: string[];
        relative_humidity_2m?: number[];
        apparent_temperature?: number[];
        precipitation?: number[];
        temperature_2m?: number[];
        wind_speed_10m?: number[];
        weathercode?: number[];
    };
    daily?: {
        time?: string[];
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
        weathercode?: number[];
    };
}

export type City =
{
    name: string;
}
