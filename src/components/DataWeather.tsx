import getWeatherIcon from "../utils/GetIcons"
import type { Props, Units } from "../utils/Props"
import { roundTemp, toTemp } from "../utils/units"





function DataWeather({ weather, loading, units }: Props & { units?: Units }) {
    const city = weather?.city_name || "—"
    const date = weather?.current_weather?.time
        ? new Date(weather.current_weather.time).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }
        )
        : "—"
    const rawTemp = weather?.current_weather?.temperature
    const temp = rawTemp !== undefined && units
        ? roundTemp(toTemp(rawTemp, units.temp))
        : rawTemp
    const weatherState = weather?.current_weather?.weathercode
    const icon = getWeatherIcon(weatherState)

    
    return (
        <>
            {loading ? (
                <section className="bg-[#3a3a5c] rounded-2xl h-64 md:h-70 lg:h-75 w-full flex flex-col items-center justify-center">
                    <div className="flex space-x-2 mb-4">
                        <span className="block w-3 h-3 bg-gray-300 rounded-full animate-bounce"></span>
                        <span className="block w-3 h-3 bg-gray-300 rounded-full animate-bounce"></span>
                        <span className="block w-3 h-3 bg-gray-300 rounded-full animate-bounce"></span>
                    </div>
                    <span className="text-2xl md:text-3xl text-gray-300 font-dm-sans tracking-wide animate-pulse">Loading...</span>
                </section>
            ) : weather ? (
                <section className="bg-[url('/images/bg-today-large.svg')] bg-center bg-no-repeat bg-cover rounded-2xl h-64 md:h-70 lg:h-75 w-full flex items-center justify-center md:justify-between p-4 md:p-6 lg:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
                        <div className="text-center md:text-left">
                            <h2 className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl font-dm-sans">{city}</h2>
                            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-300 mt-2">{date}</p>
                        </div>
                        <div className="flex items-center justify-center md:justify-end gap-2 md:gap-4">
                            {icon && <img src={icon} alt="Weather Icon" className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24" />}
                            <p className="text-gray-200 font-semibold text-6xl md:text-7xl lg:text-8xl font-dm-sans italic">{temp !== undefined ? `${temp}°` : " "}</p>
                        </div>
                    </div>
                </section>
            ) : (
                <p className="text-white font-dm-sans text-center text-2xl md:text-3xl my-8 md:my-12 font-semibold">No search result found!</p>
            )}
        </>
    )
    }

export default DataWeather;

