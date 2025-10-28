import { useState, useEffect } from "react"
import DataWeather from "./components/DataWeather"
import Navbar from "./components/Navbar"
import Search from "./components/Search"
import type { WeatherData } from "./types/weather"
import getWeather from "./utils/GetWeather"
import DailyForecast from "./components/DailyForecast"
import ClimateData from "./components/ClimateData"
import HourlyForecast from "./components/HourlyForecast"
import type { Units } from "./utils/Props"

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true);

  const defaultUnits: Units = { temp: 'c', wind: 'kmh', precip: 'mm' }
  const [units, setUnits] = useState<Units>(() => {
    try {
      const raw = localStorage.getItem('units')
      return raw ? JSON.parse(raw) as Units : defaultUnits
    } catch {
      return defaultUnits
    }
  })

  const handleUnitsChange = (u: Units) => {
    setUnits(u)
    localStorage.setItem('units', JSON.stringify(u))  
  }

  useEffect(() => {
    setLoading(true);
    getWeather({ name: "Berlin" }, {
      onSearch: (data) => {
        setWeather(data);
        setLoading(false);
      }
    });
  }, []);

return (
    <section className="bg-[#0a0a33] min-h-dvh w-full flex flex-col items-center justify-start pb-10">
      <div className="max-w-7xl w-full">
        <Navbar units={units} onChange={handleUnitsChange} />
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl mt-4 md:mt-6 text-white font-bricolage-grotesque font-bold px-4">How's the sky looking today?</h1>
        <div className="px-4">
          <Search onSearch={setWeather} />
        </div>

        
        <div className="flex flex-col xl:grid xl:grid-cols-[1fr_24rem] xl:gap-6 xl:items-start px-4 md:px-6 lg:px-8">
      
          <div className="flex flex-col items-start order-1 w-full">
            <DataWeather weather={weather} loading={loading} units={units} />
            <ClimateData weather={weather} loading={loading} units={units} />
            <DailyForecast weather={weather} loading={loading} units={units} />
          </div>
          
          
          <div className="order-2 xl:order-2 xl:flex xl:justify-center w-full mt-8 md:mt-10 xl:mt-0">
            <HourlyForecast weather={weather} loading={loading} units={units} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default App