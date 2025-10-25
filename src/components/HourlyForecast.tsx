import type { Props, Units } from "../utils/Props";
import getWeatherIcon from "../utils/GetIcons";
import { useState } from "react";
import { roundTemp, toTemp } from "../utils/units";

function HourlyForecast({ weather, loading, units }: Props & { units?: Units }) {
    const hours = weather?.hourly?.time ?? [];
    const dayNames = weather?.daily?.time ?? [];
    const [selectedDay, setSelectedDay] = useState<string | null>(dayNames[0] || null);
    const [menuOpen, setMenuOpen] = useState(false);

    const getHoursForSelectedDay = () => {
        if (!selectedDay) return hours.slice(0, 8);

        const selectedDate = new Date(selectedDay);
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);

        const allHoursForDay = hours.filter((hourTime) => {
            const hourDate = new Date(hourTime);
            return hourDate >= selectedDate && hourDate < nextDay;
        });
        return allHoursForDay.slice(0, 8);
    }

    const hoursForSelectedDay = getHoursForSelectedDay();

    if (loading) {
        return (
            <section className="bg-[#3a3a5c] rounded-3xl p-4  m-4 md:m-0 md:w-[22rem] lg:w-[24rem]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-300 font-dm-sans text-2xl font-semibold">Hourly forecast</h3>
                    <div className="w-24 h-8 bg-[#505079] rounded-md" />
                </div>

                <div className="flex flex-col gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-[#505079] h-14 rounded-2xl border border-gray-500 animate-pulse"
                        />
                    ))}
                </div>
            </section>
        )
    }

    return weather ? (
        <section className="bg-[#3a3a5c] rounded-3xl p-4  m-4 md:m-0 md:w-[22rem] lg:w-[24rem]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-300 font-dm-sans text-2xl font-semibold">
                    Hourly forecast
                </h3>
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen((s) => !s)}
                        className="text-white cursor-pointer px-5 py-1 font-dm-sans text-md bg-[#75759b] rounded-lg border-transparent hover:border-gray-600"
                    >
                        {selectedDay
                            ? new Date(selectedDay).toLocaleDateString("en-US", { weekday: "long" })
                            : "Select day"}
                            <img src="/images/icon-dropdown.svg" alt="arrow" className="inline px-1 ml-1" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2.5 w-48 bg-[#0a0a33] border border-gray-600 rounded-xl text-center">
                            {dayNames.map((d) => (
                                <button
                                    key={d}
                                    onClick={() => {
                                        setSelectedDay(d);
                                        setMenuOpen(false);
                                    }}
                                    className="w-full font-dm-sans text-lg text-center px-3 py-2 hover:bg-[#1a1a3a] cursor-pointer text-gray-200"
                                >
                                    {new Date(d).toLocaleDateString("en-US", { weekday: "long" })}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-[#505079] h-14 rounded-2xl border border-gray-500 animate-pulse"
                        />
                    ))
                    : hoursForSelectedDay.map((hourTime, i) => 
                    {
                        //  Encontrar el índice usando comparación de timestamps
                        const originalIndex = hours.findIndex(h => 
                            new Date(h).getTime() === new Date(hourTime).getTime()
                        );
                        
                        //  Si lo anterior no funciona, usar el índice del día
                        const dayIndex = dayNames.findIndex(day => 
                            new Date(day).getDate() === new Date(hourTime).getDate()
                        );

                        const iconCode = weather?.hourly?.weathercode?.[originalIndex] ?? weather?.daily?.weathercode?.[dayIndex];
                        const icon = iconCode !== undefined ? getWeatherIcon(iconCode) : null;
                        const tRaw = weather?.hourly?.temperature_2m?.[originalIndex]
                        const temp = tRaw !== undefined && units ? roundTemp(toTemp(tRaw, units.temp)) : (tRaw ?? "-");

                        const label = new Date(hourTime).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            hour12: true,
                        });

                        return (
                            <div
                                key={i}
                                className="bg-[#505079] h-14 rounded-2xl border border-gray-500 flex items-center justify-between px-4"
                            >
                                <div className="flex items-center gap-3">
                                    {icon && <img src={icon} alt="icon" className="h-12 w-12" />}
                                    <h4 className="text-gray-300 font-dm-sans text-lg">{label}</h4>
                                </div>
                                <span className="text-gray-200 font-dm-sans text-lg">
                                    {temp !== "-" ? `${temp}°` : "-"}
                                </span>
                            </div>
                        );
                    })}
            </div>
        </section>
    )
    : null;
}

export default HourlyForecast;