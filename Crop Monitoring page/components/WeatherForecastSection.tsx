"use client";

import React from "react";
import { WeatherDay } from "../types";
import { WEATHER_FORECAST, formatDateString } from "../mockData";

interface WeatherForecastSectionProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const WeatherForecastSection: React.FC<WeatherForecastSectionProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  return (
    <section className="rounded-2xl bg-white/60 backdrop-blur-md p-5 sm:p-6 border border-white/70 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/50">
        <div>
          <h3 className="text-base font-bold text-zinc-800 flex items-center gap-2">
            <span>🌦️</span> 7-Day Local Weather Forecast
          </h3>
          <p className="text-xs text-zinc-500">Mayurbhanj AWS · Plan field operations around weather windows</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {WEATHER_FORECAST.map((w: WeatherDay) => (
          <div
            key={w.date}
            onClick={() => onSelectDate(w.date)}
            className={`p-3 rounded-xl text-center border cursor-pointer transition-all backdrop-blur-sm ${
              selectedDate === w.date
                ? "bg-emerald-100/80 border-emerald-300/70 shadow-sm"
                : "bg-white/45 border-white/55 hover:bg-white/65"
            }`}
          >
            <p className="text-xs font-bold text-zinc-700">{w.dayName}</p>
            <p className="text-[10px] text-zinc-400">{formatDateString(w.date).split(",")[0]}</p>
            <div className="text-2xl my-2">
              {w.condition === "rainy" ? "🌧️" : w.condition === "sunny" ? "☀️" : "⛅"}
            </div>
            <p className="text-xs font-extrabold text-zinc-800">
              {w.tempHigh}° / <span className="text-zinc-400 font-normal">{w.tempLow}°</span>
            </p>
            <div className="mt-2 text-[10px] text-blue-600 font-semibold">
              💧 {w.rainChance}% Rain
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
