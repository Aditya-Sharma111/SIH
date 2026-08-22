"use client";

import React, { useState, useMemo } from "react";
import { RegisteredCrop, Activity } from "./types";
import { INITIAL_CROPS } from "./mockData";
import { CropHeader } from "./components/CropHeader";
import { CropStateMetrics } from "./components/CropStateMetrics";
import { CropLifecycleTracker } from "./components/CropLifecycleTracker";
import { InteractiveCalendar } from "./components/InteractiveCalendar";
import { SelectedDatePanel } from "./components/SelectedDatePanel";
import { DailyActivitySection } from "./components/DailyActivitySection";
import { HarvestSection } from "./components/HarvestSection";
import { WeatherForecastSection } from "./components/WeatherForecastSection";
import { AddActivityModal } from "./components/AddActivityModal";
import { AiAgronomistDrawer } from "./components/AiAgronomistDrawer";

export default function CropMonitoringPage() {
  // State
  const [crops, setCrops] = useState<RegisteredCrop[]>(INITIAL_CROPS);
  const [selectedCropId, setSelectedCropId] = useState<string>(INITIAL_CROPS[0].id);
  const [selectedDate, setSelectedDate] = useState<string>("2026-08-25");
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date(2026, 7, 1)); // August 2026
  const [filterType, setFilterType] = useState<string>("all");
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState<boolean>(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [aiPromptPrefill, setAiPromptPrefill] = useState<string>("");

  // Currently active crop
  const currentCrop = useMemo(() => {
    return crops.find((c) => c.id === selectedCropId) || crops[0];
  }, [crops, selectedCropId]);

  // Toggle Activity Completion
  const handleToggleActivity = (activityId: string) => {
    setCrops((prevCrops) =>
      prevCrops.map((crop) => {
        if (crop.id !== currentCrop.id) return crop;
        const updatedActivities = crop.activities.map((act) => {
          if (act.id !== activityId) return act;
          const isNowCompleted = act.status !== "completed";
          return {
            ...act,
            status: isNowCompleted ? ("completed" as const) : ("pending" as const),
            completedAt: isNowCompleted
              ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : undefined
          };
        });
        return { ...crop, activities: updatedActivities };
      })
    );
  };

  // Add Custom Activity from Modal
  const handleAddActivity = (newAct: Activity) => {
    setCrops((prev) =>
      prev.map((c) => (c.id === currentCrop.id ? { ...c, activities: [...c.activities, newAct] } : c))
    );
  };

  // Switch Selected Crop
  const handleSelectCrop = (cropId: string) => {
    setSelectedCropId(cropId);
    const newCrop = crops.find((c) => c.id === cropId);
    if (newCrop && newCrop.stages.length > 0) {
      setSelectedDate(newCrop.stages[0].startDate || "2026-08-25");
    }
  };

  // Open AI with prompt
  const handleOpenAiWithPrompt = (prompt: string) => {
    setAiPromptPrefill(prompt);
    setIsAiDrawerOpen(true);
  };

  return (
    /*
     * Root wrapper — fixed full-screen background image:
     *   • Mobile  (<768px): bg-phone.png  (portrait crop field)
    *   • Desktop (≥768px): bg-laptop.png (landscape farmer spraying)
     * A semi-transparent white tint sits on top of the photo so cards
     * remain legible, while all UI surfaces use frosted-glass styling.
     */
    <div
      className="relative min-h-screen font-sans pb-16 selection:bg-emerald-500 selection:text-white"
      style={{ color: "#1a2e1a" }}
    >
      {/* ── Fixed background layer ── */}
      {/* Mobile background (hidden on md+) */}
      <div
        className="fixed inset-0 -z-20 block md:hidden bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url('/bg-phone.png')" }}
        aria-hidden="true"
      />
      {/* Desktop background (hidden below md) */}
      <div
        className="fixed inset-0 -z-20 hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-laptop.png')" }}
        aria-hidden="true"
      />
      {/* Frosted white overlay — lightens photo so text stays readable */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: "rgba(240,248,235,0.78)" }}
        aria-hidden="true"
      />

      {/* ── Sticky top header ── */}
      <CropHeader
        crops={crops}
        selectedCropId={selectedCropId}
        onSelectCrop={handleSelectCrop}
        onOpenAiDrawer={() => {
          setAiPromptPrefill("");
          setIsAiDrawerOpen(true);
        }}
        onOpenAddModal={() => setIsAddActivityModalOpen(true)}
      />

      {/* ── Main content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <CropStateMetrics currentCrop={currentCrop} />
        <CropLifecycleTracker currentCrop={currentCrop} onSelectDate={(date) => setSelectedDate(date)} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <InteractiveCalendar
              currentCrop={currentCrop}
              selectedDate={selectedDate}
              onSelectDate={(date) => setSelectedDate(date)}
              currentMonthDate={currentMonthDate}
              onChangeMonth={(newDate) => setCurrentMonthDate(newDate)}
              filterType={filterType}
              onFilterChange={(newFilter) => setFilterType(newFilter)}
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <SelectedDatePanel
              currentCrop={currentCrop}
              selectedDate={selectedDate}
              onToggleActivity={handleToggleActivity}
              onOpenAddModalForDate={(date) => {
                setSelectedDate(date);
                setIsAddActivityModalOpen(true);
              }}
              onOpenAiWithPrompt={handleOpenAiWithPrompt}
            />
          </div>
        </section>

        <DailyActivitySection
          currentCrop={currentCrop}
          onToggleActivity={handleToggleActivity}
          onSelectDate={(date) => setSelectedDate(date)}
        />

        <HarvestSection currentCrop={currentCrop} />

        <WeatherForecastSection selectedDate={selectedDate} onSelectDate={(date) => setSelectedDate(date)} />
      </main>

      <AddActivityModal
        cropId={currentCrop.id}
        defaultDate={selectedDate}
        isOpen={isAddActivityModalOpen}
        onClose={() => setIsAddActivityModalOpen(false)}
        onAddActivity={handleAddActivity}
      />

      <AiAgronomistDrawer
        currentCrop={currentCrop}
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        prefilledPrompt={aiPromptPrefill}
      />
    </div>
  );
}
