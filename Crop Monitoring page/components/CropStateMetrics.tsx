"use client";

import React from "react";
import { RegisteredCrop } from "../types";

interface CropStateMetricsProps {
  currentCrop: RegisteredCrop;
}

// Shared glass card class
const glass =
  "rounded-2xl bg-white/60 backdrop-blur-md p-4 border border-white/70 shadow-sm hover:bg-white/75 transition-all group";

export const CropStateMetrics: React.FC<CropStateMetricsProps> = ({ currentCrop }) => {
  const totalTasksCount = currentCrop.activities.length;
  const completedTasksCount = currentCrop.activities.filter((a) => a.status === "completed").length;
  const taskProgressPercent =
    totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {/* Crop Health */}
      <div className={glass}>
        <div className="flex items-center justify-between text-green-700/70 text-xs">
          <span className="font-semibold">Crop Health</span>
          <span className="text-base group-hover:scale-110 transition-transform">💚</span>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
            {currentCrop.healthScore}%
          </span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded-full">
            Good
          </span>
        </div>
        <div className="w-full bg-emerald-100/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full"
            style={{ width: `${currentCrop.healthScore}%` }}
          />
        </div>
      </div>

      {/* NDVI */}
      <div className={glass}>
        <div className="flex items-center justify-between text-green-700/70 text-xs">
          <span className="font-semibold">Canopy NDVI</span>
          <span className="text-base group-hover:scale-110 transition-transform">🛰️</span>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-zinc-800">
            {currentCrop.ndviIndex}
          </span>
          <span className="text-xs text-zinc-500">/ 1.0</span>
        </div>
        <p className="text-[11px] text-emerald-700 mt-2 font-medium">Dense Photosynthesis</p>
      </div>

      {/* Soil Moisture */}
      <div className={glass}>
        <div className="flex items-center justify-between text-blue-700/70 text-xs">
          <span className="font-semibold">Soil Moisture</span>
          <span className="text-base group-hover:scale-110 transition-transform">💧</span>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
            {currentCrop.soilMoisture}%
          </span>
          <span className="text-xs font-semibold text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded-full">
            {currentCrop.soilMoistureStatus}
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">Sensor at 15cm depth</p>
      </div>

      {/* Soil Temp & pH */}
      <div className={glass}>
        <div className="flex items-center justify-between text-amber-700/70 text-xs">
          <span className="font-semibold">Soil Condition</span>
          <span className="text-base group-hover:scale-110 transition-transform">🌡️</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-zinc-800">
            {currentCrop.soilTemp}°C
          </span>
          <span className="text-xs font-bold text-zinc-600">pH {currentCrop.soilPh}</span>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">Nutrient absorption ideal</p>
      </div>

      {/* Risk */}
      <div className={glass}>
        <div className="flex items-center justify-between text-green-700/70 text-xs">
          <span className="font-semibold">Pest / Risk</span>
          <span className="text-base group-hover:scale-110 transition-transform">🛡️</span>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
            {currentCrop.riskScore}
          </span>
          <span className="text-xs text-zinc-500">/ 100</span>
        </div>
        <p className="text-[11px] text-emerald-700 mt-2 font-medium">
          🟢 {currentCrop.riskLevel} Risk
        </p>
      </div>

      {/* Task Progress */}
      <div className={glass}>
        <div className="flex items-center justify-between text-purple-700/70 text-xs">
          <span className="font-semibold">Task Progress</span>
          <span className="text-base group-hover:scale-110 transition-transform">📋</span>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-purple-700">
            {completedTasksCount}
          </span>
          <span className="text-xs text-zinc-500">/ {totalTasksCount}</span>
        </div>
        <div className="w-full bg-purple-100/60 h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div
            className="bg-purple-500 h-full rounded-full"
            style={{ width: `${taskProgressPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
};
