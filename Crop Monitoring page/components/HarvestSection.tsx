"use client";

import React from "react";
import { RegisteredCrop } from "../types";
import { formatDateString, getDaysDifference } from "../mockData";

interface HarvestSectionProps {
  currentCrop: RegisteredCrop;
}

export const HarvestSection: React.FC<HarvestSectionProps> = ({ currentCrop }) => {
  return (
    <section className="rounded-2xl bg-amber-800/70 backdrop-blur-md text-white p-6 sm:p-7 border border-amber-600/30 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-extrabold bg-white/15 text-amber-100 border border-white/20 uppercase tracking-wider">
            🚜 Yield &amp; Harvest Forecast
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Expected Harvest: {formatDateString(currentCrop.expectedHarvestDate)}
          </h3>
          <p className="text-sm text-amber-100 font-medium">
            Window: {currentCrop.harvestWindow} ·{" "}
            <strong>{getDaysDifference(currentCrop.expectedHarvestDate)} days remaining</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/15 backdrop-blur-xs">
          <div>
            <p className="text-xs text-amber-200 uppercase font-semibold">Projected Yield</p>
            <p className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
              {currentCrop.expectedYield}
            </p>
          </div>
          <div>
            <p className="text-xs text-amber-200 uppercase font-semibold">Estimated Gross Value</p>
            <p className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
              {currentCrop.estimatedRevenue}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
