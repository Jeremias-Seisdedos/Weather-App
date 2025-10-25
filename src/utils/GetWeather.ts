import type { GeoData, WeatherData, City } from "../types/weather"

type SearchProps = {
    onSearch: (data: WeatherData | null) => void;
};

const getWeather = async (city: City, { onSearch }: SearchProps) => {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city.name}`);
        const geoData: GeoData = await response.json();

        if (!geoData.results || geoData.results.length === 0) {
            console.log("No results found");
            onSearch(null);
            return;
        }

        const { latitude, longitude, name, country, } = geoData.results[0];

       const weatherRes = await fetch(
           `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&timezone=auto`
       );
        const weatherData: WeatherData = await weatherRes.json();
        let cityLabel = name;
        if (country) {
            cityLabel = ` ${name} , ${country}`;
        }
        weatherData.city_name = cityLabel;
        onSearch(weatherData);

    }
    catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

export default getWeather;