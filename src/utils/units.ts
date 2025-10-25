import type { UnitPrecip, UnitTemp, UnitWind } from "./Props";


export function toTemp(valueC: number, unit: UnitTemp): number {
  return unit === "f" ? valueC * 9 / 5 + 32 : valueC;
}

export function toWind(valueKmh: number, unit: UnitWind): number {
  return unit === "mph" ? valueKmh * 0.621371 : valueKmh;
}

export function toPrecip(valueMm: number, unit: UnitPrecip): number {
  return unit === "in" ? valueMm / 25.4 : valueMm;
}


export function roundTemp(n: number | undefined): number | undefined {
  if (n === undefined || n === null) return undefined;
  return Math.round(n);
}

export function roundWind(n: number | undefined): number | undefined {
  if (n === undefined || n === null) return undefined;
  return Math.round(n);
}

export function roundPrecip(n: number | undefined): number | undefined {
  if (n === undefined || n === null) return undefined;
  return Math.round(n * 10) / 10; 
}

export function windSuffix(unit: UnitWind): string {
  return unit === "mph" ? "mph" : "km/h";
}

export function precipSuffix(unit: UnitPrecip): string {
  return unit === "in" ? "in" : "mm";
}

export function tempSuffix(unit: UnitTemp): string {
  return unit === "f" ? "°F" : "°C";
}
