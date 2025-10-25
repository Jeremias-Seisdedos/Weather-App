import type { WeatherData } from "../types/weather"

type UnitTemp = "c" | "f"
type UnitWind = "kmh" | "mph"
type UnitPrecip = "mm" | "in"

type Units = {
    temp: UnitTemp
    wind: UnitWind
    precip: UnitPrecip
}

type Props = {
    weather: WeatherData | null
    loading: boolean
    units?: Units
}

export type { Props, Units, UnitTemp, UnitWind, UnitPrecip };