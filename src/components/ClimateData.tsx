import type { Props, Units } from "../utils/Props"
import { roundPrecip, roundTemp, roundWind, toPrecip, toTemp, toWind, precipSuffix, windSuffix } from "../utils/units"


function DataWeather({ weather, loading, units }: Props & { units?: Units }) {


    let humidity: number | string = "-"
    let feelsLike: number | string = "-"
    let precipitation: number | string = "-"

    
if (weather?.hourly?.time && weather.current_weather?.time) {
    
    const current = new Date(weather.current_weather.time).toISOString().slice(0, 13) 
    
    
    const timeIndex = weather.hourly.time.findIndex((t: string) => 
        t.startsWith(current)
    )

    if (timeIndex !== -1) {
        const rh = weather.hourly.relative_humidity_2m?.[timeIndex]
        const fl = weather.hourly.apparent_temperature?.[timeIndex]
        const pr = weather.hourly.precipitation?.[timeIndex]

        humidity = rh ?? "-"
        if (fl !== undefined && units) {
            feelsLike = roundTemp(toTemp(fl, units.temp)) ?? "-"
        } else {
            feelsLike = fl ?? "-"
        }

        if (pr !== undefined && units) {
            precipitation = roundPrecip(toPrecip(pr, units.precip)) ?? "-"
        } else {
            precipitation = pr ?? "-"
        }
    }
}
    return (
        <>
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2.5 m-3">
                    <div className="bg-[#3a3a5c] p-5 rounded-2xl border-gray-500 border-x md: mb-3 ">
                        <h4 className="text-gray-300  font-dm-sans mb-7 text-2xl ">Feels like</h4>
                        <p className="text-4xl text-gray-200 font-dm-sans">-</p>
                    </div>
                    <div className="bg-[#3a3a5c] p-5 rounded-2xl border-gray-500 border-x-2 md: mb-3 ">
                        <h4 className="text-gray-300  font-dm-sans mb-7 text-2xl ">Humidity</h4>
                        <p className="text-4xl text-gray-200 font-dm-sans ">-</p>
                    </div>
                    <div className="bg-[#3a3a5c] p-5 rounded-2xl border-gray-500 border-x-2 md: mb-3 ">
                        <h4 className="text-gray-300  font-dm-sans mb-7 text-2xl ">Wind</h4>
                        <p className="text-4xl text-gray-200 font-dm-sans">-</p>
                    </div>
                    <div className="bg-[#3a3a5c] p-5 rounded-2xl border-gray-500 border-x-2 md: mb-3 ">
                        <h4 className="text-gray-300  font-dm-sans mb-7 text-2xl pr-2 ">Precipitation</h4>
                        <p className="text-4xl text-gray-200 font-dm-sans">-</p>
                    </div>
                </div>
            ) : weather ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2.5 m-3">
                    <div className="bg-[#3a3a5c] p-5 rounded-2xl border-gray-500 border-x ">
                        <h4 className="text-gray-300  font-dm-sans mb-7 text-2xl ">Feels like</h4>
                        <p className="text-4xl text-gray-200 font-dm-sans">{feelsLike}° </p>
                    </div>
                    <div className="bg-[#3a3a5c] p-5 rounded-2xl border-gray-500 border-x-2 ">
                        <h4 className="text-gray-300  font-dm-sans mb-7 text-2xl ">Humidity</h4>
                        <p className="text-4xl text-gray-200 font-dm-sans ">{humidity}%</p>
                    </div>
                    <div className="bg-[#3a3a5c] p-5 rounded-2xl border-gray-500 border-x-2 ">
                        <h4 className="text-gray-300  font-dm-sans mb-7 text-2xl ">Wind</h4>
                        <p className="text-4xl text-gray-200 font-dm-sans">
                            {(() => {
                                const w = weather?.current_weather?.windspeed
                                if (w === undefined) return "—"
                                if (!units) return `${w} km/h`
                                const conv = roundWind(toWind(w, units.wind))
                                return `${conv} ${windSuffix(units.wind)}`
                            })()}
                        </p>
                    </div>
                    <div className="bg-[#3a3a5c] p-5 rounded-2xl border-gray-500 border-x-2 ">
                        <h4 className="text-gray-300  font-dm-sans mb-7 text-2xl pr-2 ">Precipitation</h4>
                        <p className="text-4xl text-gray-200 font-dm-sans">
                            {(() => {
                                const suffix = units ? precipSuffix(units.precip) : 'mm'
                                if (precipitation === '-') return '-'
                                return `${precipitation} ${suffix}`
                            })()}
                        </p>
                    </div>
                </div>
            ) : null}
        </>
    )

}

export default DataWeather;
