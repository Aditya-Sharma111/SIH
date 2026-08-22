"use client";

import React from "react";
import { RegisteredCrop, WeatherDay } from "../types";
import { formatDateString, getActivityTypeBadge, WEATHER_FORECAST } from "../mockData";

interface SelectedDatePanelProps {
  currentCrop: RegisteredCrop;
  selectedDate: string;
  onToggleActivity: (activityId: string) => void;
  onOpenAddModalForDate: (dateStr: string) => void;
  onOpenAiWithPrompt: (prompt: string) => void;
}

export const SelectedDatePanel: React.FC<SelectedDatePanelProps> = ({
  currentCrop,
  selectedDate,
  onToggleActivity,
  onOpenAddModalForDate,
  onOpenAiWithPrompt,
}) => {
  const selectedDateActivities = currentCrop.activities.filter((act) => act.date === selectedDate);
  const selectedDateWeather: WeatherDay =
    WEATHER_FORECAST.find((w) => w.date === selectedDate) || WEATHER_FORECAST[0];

  return (
    <div className="rounded-2xl bg-white/60 backdrop-blur-md p-5 sm:p-6 border border-white/70 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/50">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Selected Calendar Day
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-zinc-800">
            📅 {formatDateString(selectedDate)}
          </h3>
        </div>
        <button
          onClick={() => onOpenAddModalForDate(selectedDate)}
          className="px-2.5 py-1.5 rounded-lg bg-emerald-100/80 text-emerald-700 hover:bg-emerald-200/80 text-xs font-semibold border border-emerald-200/60 transition-colors"
        >
          + Add Task
        </button>
      </div>

      {/* Weather snapshot */}
      <div className="rounded-xl bg-white/50 backdrop-blur-sm p-3.5 border border-white/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">
            {selectedDateWeather.condition === "rainy"
              ? "🌧️"
              : selectedDateWeather.condition === "sunny"
              ? "☀️"
              : "⛅"}
          </span>
          <div>
            <p className="text-xs font-bold text-zinc-700 capitalize">
              {selectedDateWeather.condition.replace("_", " ")} ({selectedDateWeather.tempHigh}°C /{" "}
              {selectedDateWeather.tempLow}°C)
            </p>
            <p className="text-[11px] text-zinc-500">
              Rain: {selectedDateWeather.rainChance}% · Humidity: {selectedDateWeather.humidity}% · Wind:{" "}
              {selectedDateWeather.windSpeed} km/h
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/70 text-zinc-700 border border-white/60">
          🌿 {currentCrop.currentStage}
        </span>
      </div>

      {/* Activities */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-zinc-700 flex items-center gap-1.5">
          <span>📋</span> Scheduled Activities ({selectedDateActivities.length})
        </h4>

        {selectedDateActivities.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-white/60 bg-white/30 text-center space-y-2">
            <span className="text-2xl">🌱</span>
            <p className="text-xs text-zinc-500">No tasks scheduled for this day.</p>
            <button
              onClick={() => onOpenAddModalForDate(selectedDate)}
              className="text-xs font-semibold text-emerald-600 hover:underline"
            >
              + Schedule custom field task
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {selectedDateActivities.map((act) => {
              const badge = getActivityTypeBadge(act.type);
              const isDone = act.status === "completed";
              return (
                <div
                  key={act.id}
                  className={`p-3.5 rounded-xl border transition-all backdrop-blur-sm ${
                    isDone
                      ? "bg-emerald-50/60 border-emerald-200/50"
                      : "bg-white/55 border-white/60 shadow-xs"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleActivity(act.id)}
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center text-xs transition-colors shrink-0 ${
                        isDone
                          ? "bg-emerald-500 border-emerald-500 text-white font-bold"
                          : "border-zinc-300 hover:border-emerald-400 bg-white/70"
                      }`}
                      title={isDone ? "Mark Incomplete" : "Mark Complete"}
                    >
                      {isDone && "✓"}
                    </button>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <h5 className={`text-sm font-bold ${isDone ? "line-through text-zinc-400" : "text-zinc-800"}`}>
                          {act.title}
                        </h5>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border bg-white/70 ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600">{act.description}</p>
                      {act.dosage && (
                        <p className="text-[11px] text-emerald-700 font-medium">
                          Dosage: {act.dosage}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
                        <span>{act.time}</span>
                        {isDone && (
                          <span className="text-emerald-600 font-semibold">
                            ✓ Completed {act.completedAt}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI Advisory */}
      <div className="rounded-xl bg-emerald-900/75 backdrop-blur-md text-white p-4 border border-emerald-700/40 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Agronomist Guidance
            </h5>
          </div>
          <button
            onClick={() =>
              onOpenAiWithPrompt(
                `What are the key farm advisories for ${currentCrop.name} in the ${currentCrop.currentStage} stage?`
              )
            }
            className="text-[11px] font-semibold text-emerald-300 underline hover:text-white"
          >
            Ask Assistant →
          </button>
        </div>
        <p className="text-xs text-zinc-200 leading-relaxed">
          During tillering, maintain 3cm water depth. If rain exceeds 20mm, drain surplus standing water
          immediately to avoid root asphyxiation.
        </p>
      </div>
    </div>
  );
};
