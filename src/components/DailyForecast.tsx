import type { Props, Units } from "../utils/Props"
import { toTemp, roundTemp } from "../utils/units"
import getWeatherIcon from "../utils/GetIcons"

function DailyForecast({ weather, loading, units }: Props & { units?: Units }) {
    const days = weather?.daily?.time ?? [] // si no existe o es undefined, asignar un array vacío

    
     if (loading) {
    return (
      <section>
        <h3 className="mb-7 pl-3 mt-6 font-dm-sans text-gray-300 text-3xl font-semibold">
          Daily forecast
        </h3>

        <div className="grid grid-cols-3 md:grid-cols-7 gap-3 md:gap-5 m-2 justify-items-center">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#3a3a5c] h-40 w-full max-w-28 md:w-25 rounded-2xl border-gray-500 border-x mb-2 flex flex-col items-center justify-between p-3"
            >
              <div className="h-6 w-16 bg-gray-400/30 rounded animate-pulse mt-1" />
              <div className="h-12 w-12 bg-gray-400/40 rounded-full animate-pulse" />
              <div className="w-full flex justify-between">
                <div className="h-4 w-8 bg-gray-400/30 rounded animate-pulse" />
                <div className="h-4 w-8 bg-gray-400/30 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

    return weather ? (
        <section>
            <h3 className="mb-7 pl-3 mt-6 font-dm-sans text-gray-300 text-2xl md:text-3xl font-semibold">Daily forecast</h3>

            <div className="grid grid-cols-3 md:grid-cols-7 gap-3 md:gap-5 m-2 justify-items-center">
                {
                    (days.slice(0, 7).map((dayTime, i) => {
                        const label = new Date(dayTime).toLocaleDateString('en-US', { weekday: 'short' }) 
                        const iconCode = weather?.daily?.weathercode?.[i]
                        const icon = iconCode !== undefined ? getWeatherIcon(iconCode) : null
                        const minRaw = weather?.daily?.temperature_2m_min?.[i]
                        const maxRaw = weather?.daily?.temperature_2m_max?.[i]
                        const min = minRaw !== undefined && units ? roundTemp(toTemp(minRaw, units.temp)) : (minRaw ?? "-")
                        const max = maxRaw !== undefined && units ? roundTemp(toTemp(maxRaw, units.temp)) : (maxRaw ?? "-")

                         return (
                            <div key={dayTime} className="bg-[#3a3a5c] h-40 w-full max-w-28 md:w-25 rounded-2xl border-gray-500 border-x mb-2 flex flex-col items-center justify-between p-3">
                                <h4 className="text-gray-300 font-dm-sans text-lg sm:text-xl md:text-2xl text-center">{label}</h4>
                                {icon && <img src={icon} alt="icon" className="h-10 w-10 sm:h-12 sm:w-12" />}
                                <div className="w-full flex justify-between text-gray-200 font-dm-sans text-base sm:text-lg">
                                    <span className="text-left"> {min !== "-" ? `${min}°` : "-"}</span>
                                    <span className="text-right">{max !== "-" ? `${max}°` : "-"}</span>
                                </div>
                            </div>
                        )
                    }))
                }
            </div>
        </section>
    ) : null;
}

export default DailyForecast;