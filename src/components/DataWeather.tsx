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
                <section className=" bg-[#3a3a5c] mx-3 rounded-2xl h-64 md:h-75 md:w-203 flex flex-col items-center justify-center">
                    <div className="flex  space-x-2 mb-4">
                        <span className="block w-3 h-3 bg-gray-300 rounded-full animate-bounce"></span>
                        <span className="block w-3 h-3 bg-gray-300 rounded-full animate-bounce"></span>
                        <span className="block w-3 h-3 bg-gray-300 rounded-full animate-bounce"></span>
                    </div>
                    <span className="text-2xl md:text-3xl text-gray-300 font-dm-sans tracking-wide animate-pulse">Loading...</span>
                </section>
        ) : weather ? (
                    <section className="bg-[url('/images/bg-today-large.svg')] bg-center bg-no-repeat bg-cover mx-3 rounded-2xl h-64 md:h-75 md:w-203  flex  items-center justify-center md:justify-between p-6 md:p-8">
                        <div className="md:flex md:items-center md:justify-between md:w-full">
                            <div className="text-left">
                                <h2 className="text-white font-semibold text-4xl md:text-5xl font-dm-sans">{city}</h2>
                                <p className="text-xl text-center md:text-3xl font-semibold text-gray-300">{date}</p>
                            </div>
                            <div className="flex items-center ml-4">
                                {icon && <img src={icon} alt="Weather Icon" className="h-20 w-20 md:h-32 md:w-32 mr-4" />}
                                <p className="text-gray-200 font-semibold text-center text-7xl md:text-8xl ml-2 md:ml-4 flex font-dm-sans italic items-center">{temp !== undefined ? `${temp}°` : " "}</p>
                            </div>
                        </div>
                    </section>
            )
                : (
                        <p className="text-white font-dm-sans text-center   md:ml-45 md:w-full    text-3xl my-15 font-semibold">No search result found!</p>
                )}
            </>
        )
    }

export default DataWeather;

