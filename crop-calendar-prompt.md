# Build Crop Calendar Inside the Existing Crop Monitoring Module

I am working on an existing Next.js Smart Crop project.

## IMPORTANT

- All crop-monitoring functionality already exists inside the `crop-monitoring` folder.
- Do NOT create a new crop-monitoring architecture.
- Do NOT duplicate existing components, APIs, types, services, layouts, authentication, or data models.
- First inspect the entire existing `crop-monitoring` folder and understand how it currently works.
- Your task is to add/complete the Crop Calendar page inside the existing crop-monitoring module, using the existing architecture.

---

## 1. First: Inspect the Existing Code

Before writing any code, inspect:

`crop-monitoring/`

Understand:

- Existing pages
- Existing components
- Existing layouts
- Existing API calls
- Existing crop data
- Existing authentication
- Existing farmer information
- Existing crop state
- Existing crop stages
- Existing weather data
- Existing health data
- Existing styling
- Existing TypeScript types
- Existing hooks
- Existing utilities

Search the entire folder for:

```
crop
farmer
monitor
stage
health
weather
harvest
calendar
activity
sowing
```

Reuse existing functionality wherever possible.

---

## 2. Main Requirement

Add a Crop Calendar to the existing crop-monitoring system.

The farmer should be able to:

```
Login
  ↓
Open Crop Monitoring
  ↓
Select their registered crop
  ↓
Open Crop Calendar
  ↓
See crop lifecycle
  ↓
See current crop stage
  ↓
See today's farming activities
  ↓
See upcoming activities
  ↓
See expected harvesting date
  ↓
See crop-health/weather alerts
```

The calendar must be connected to the farmer's existing registered crop.

---

## 3. Do NOT Create Fake Registration

The crop is already registered through the existing crop-monitoring functionality.

Therefore:

- Do not create another crop-registration system.
- Use the existing registered crop data.

For example, if the existing system already provides:

```
cropId
cropName
sowingDate
landArea
location
currentStage
harvestDate
health
```

use those values directly.

Do not hardcode:

```
Paddy
2.5 acres
Mayurbhanj
15 Aug 2026
```

unless they are already present as existing mock/test data.

---

## 4. Calendar Route

Follow the existing routing convention.

If appropriate, create:

```
/crop-monitoring/[cropId]/calendar
```

or use the existing crop-monitoring route structure.

Do NOT force this route if the project already has a different routing architecture. Follow the existing project convention.

---

## 5. Calendar Page

The page should contain:

```
Crop Header
      ↓
Crop Current State
      ↓
Crop Lifecycle
      ↓
Interactive Calendar
      ↓
Selected Date Details
      ↓
Today's Activities
      ↓
Upcoming Activities
      ↓
Expected Harvest
```

---

## 6. Crop Header

Use existing crop information.

Display something similar to:

```
🌾 Paddy

2.5 Acres
Mayurbhanj, Odisha

Sowing Date
15 Aug 2026

Expected Harvest
13 Dec 2026

Current Stage
🌿 Vegetative

Status
🟢 Healthy
```

The actual values must come from the existing crop-monitoring data.

---

## 7. Current Crop State

Create a clear current-state section.

Show:

```
Current Stage
🌿 Vegetative

Crop Health
82%

Soil Moisture
Medium

Risk
Low

Days Since Sowing
38

Expected Harvest
78 days remaining
```

If some of these values already exist in the crop-monitoring module, use them.

If a value does not exist, do not invent a backend API. Use a clearly isolated mock/fallback only if necessary.

---

## 8. Crop Lifecycle

Display the crop lifecycle using the existing crop-stage data.

Example:

```
🌱 Sowing
   ✓

🌿 Germination
   ✓

🌾 Vegetative
   ● CURRENT

🌼 Flowering
   ○

🌾 Maturity
   ○

🚜 Harvest
   ○
```

If the project already has crop-stage definitions, use those. Do not create conflicting crop stages.

---

## 9. Interactive Calendar

Use the existing calendar component if one already exists.

If there is no calendar implementation, use:

```
npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction
```

Only install it if the project does not already use another calendar library.

Calendar features:

- Month view
- Previous month
- Next month
- Today
- Date selection
- Event display
- Event click
- Responsive layout

---

## 10. Calendar Events

Generate calendar events from the existing crop-monitoring data.

Possible event types:

**Crop stages**
```
Sowing
Germination
Vegetative
Flowering
Maturity
Harvest
```

**Activities**
```
Irrigation
Fertilizer
Field Inspection
Weed Management
Disease Monitoring
```

**Alerts**
```
Weather Alert
Low Soil Moisture
Crop Health Alert
Risk Alert
```

Do not create duplicate data sources. If the project already has an activity/event model, use that model.

---

## 11. Selected Date

When the farmer clicks a calendar date, display the details for that date.

Example:

```
25 August 2026

Crop Stage
🌿 Vegetative

Activities

🔍 Field Inspection
Check crop for disease or abnormal growth.

💧 Irrigation Check
Check soil moisture.

Weather
🌧️ Rain Expected

Crop Health
82%

Advisory
Monitor soil moisture before irrigation.

[ Mark Complete ]
```

The selected date should update dynamically.

---

## 12. Activity Completion

If the existing crop-monitoring module already supports activity completion:

- Use the existing API/function.

If it does not:

- Implement temporary local state only.

Example:

```
☐ Field Inspection
```

After clicking:

```
✓ Field Inspection
Completed
```

Do not create an unnecessary backend system just for this UI unless the existing project architecture requires it.

---

## 13. Today's Activities

Create a section:

**Today's Farming Activities**

```
🔍 Field Inspection
Due Today

💧 Irrigation Check
Due Today

🧪 Fertilizer Application
Completed
```

Use existing activity data wherever available.

---

## 14. Upcoming Activities

Show:

**Upcoming Activities**

```
27 Aug
💧 Irrigation Check

02 Sep
🧪 Fertilizer Application

05 Sep
🔍 Field Inspection
```

Sort activities chronologically.

---

## 15. Harvest Section

Show the existing crop's expected harvest information.

Example:

```
🚜 Expected Harvest

13 December 2026

78 days remaining

Current Stage
🌿 Vegetative

Harvest Window
13 Dec – 18 Dec
```

If the existing system calculates harvest dates, use that calculation. Do not create a second harvest calculation system.

---

## 16. Crop Health

Use the existing crop-health functionality.

If the crop-monitoring folder already provides:

```
healthScore
NDVI
soilMoisture
riskScore
```

display them.

For example:

```
Crop Health

82%
Good

NDVI
0.72

Soil Moisture
Medium

Risk Score
24/100
```

If a chart already exists, reuse the existing chart. Do not duplicate the chart implementation.

---

## 17. Weather

Use the existing weather integration from the crop-monitoring folder.

Show relevant information on the calendar page:

```
🌦️ Weather Alert

Rain expected tomorrow.

Current Crop Stage
🌿 Vegetative

Recommendation
Monitor field moisture.
```

Do not create a new weather API if one already exists.

---

## 18. AI Advisory

If an existing AI advisory component/API exists inside crop monitoring, reuse it.

Display:

```
🤖 Smart Crop Advisory

Your crop is currently in the
vegetative stage.

Current soil moisture is medium
and rainfall is expected.

Recommended action:

Check field moisture before irrigation.

[ Ask AI Assistant ]
```

The AI should explain verified crop/weather/soil information. Do not make the LLM independently determine agricultural facts.

---

## 19. UI Design

Follow the existing Smart Crop design system.

IMPORTANT: Before creating new UI styles, inspect the existing project for:

```
Tailwind classes
shadcn components
colors
buttons
cards
badges
fonts
spacing
navigation
sidebar
```

Reuse them. The calendar should feel like a natural part of the existing application. Do not make it look like a separate application.

---

## 20. Responsive Design

**Desktop:**

```
┌──────────────────────────────────────────────┐
│ Crop Header                                  │
├──────────────────────────────────────────────┤
│ Health │ Stage │ Soil │ Risk                 │
├──────────────────────────────────────────────┤
│ Lifecycle                                    │
├─────────────────────────┬────────────────────┤
│                         │ Selected Date       │
│ Calendar                │ Activities         │
│                         │ Weather            │
│                         │ Advisory            │
├─────────────────────────┴────────────────────┤
│ Upcoming Activities                          │
├──────────────────────────────────────────────┤
│ Harvest                                     │
└──────────────────────────────────────────────┘
```

**Mobile:**

```
Crop Header
      ↓
Health Cards
      ↓
Current Stage
      ↓
Lifecycle
      ↓
Calendar
      ↓
Selected Date
      ↓
Today's Activities
      ↓
Upcoming Activities
      ↓
Harvest
```

Do not simply shrink the desktop layout.

---

## 21. Empty State

If there is no crop:

Use the existing crop-monitoring empty state if available.

Otherwise:

```
🌱 No Crop Registered

Register a crop to start monitoring
its lifecycle and farming activities.

[ Register Crop ]
```

The button should navigate to the existing crop-registration page. Do not create another registration page.

---

## 22. Loading State

Use the project's existing loading/skeleton components.

If none exist, create simple skeletons for:

- Crop header
- Health cards
- Calendar
- Activities

---

## 23. Error State

Use the project's existing error handling.

Example:

```
Unable to load crop monitoring data.

[ Try Again ]
```

---

## 24. Component Architecture

First reuse existing components. Only create new components when necessary.

Possible new components:

```
CropCalendar
CropLifecycle
CalendarEvent
SelectedDateDetails
UpcomingActivities
HarvestSummary
```

Place them inside the existing `crop-monitoring/` folder structure. Do not create a completely separate application/module.

---

## 25. Data Flow

The final data flow should be:

```
Authenticated Farmer
        ↓
Existing Crop Monitoring Module
        ↓
Registered Crop
        ↓
Crop Details
        ↓
Crop Stage
        ↓
Crop Activities
        ↓
Crop Health
        ↓
Weather
        ↓
Calendar
```

The calendar is a view of the existing crop-monitoring data, not a separate source of truth.

---

## 26. Important Rules

**DO:**

- Inspect existing code first.
- Reuse existing components.
- Reuse existing APIs.
- Reuse existing authentication.
- Reuse existing crop data.
- Reuse existing crop stages.
- Reuse existing weather data.
- Reuse existing health data.
- Follow existing styling.
- Follow existing routing.
- Keep TypeScript types consistent.
- Keep the page responsive.

**DO NOT:**

- Create duplicate crop registration.
- Create duplicate authentication.
- Create duplicate farmer profiles.
- Create duplicate crop models.
- Create duplicate weather APIs.
- Create duplicate health APIs.
- Hardcode farmer data unnecessarily.
- Replace the existing architecture.
- Install unnecessary dependencies.
- Create a separate design system.

---

## 27. Final Testing

After implementation:

Run:

```
npm run lint
```

and:

```
npm run build
```

Fix all errors.

Then run the development server and verify:

1. Farmer can access crop monitoring.
2. Registered crop appears.
3. Calendar loads.
4. Crop stages appear.
5. Events appear.
6. Clicking a date works.
7. Activities display.
8. Activity completion works.
9. Harvest information displays.
10. Weather information displays.
11. Crop health displays.
12. Mobile layout works.
13. No console errors.
14. No TypeScript errors.
15. No broken navigation.

---

## FINAL OBJECTIVE

The final result should feel like this:

```
Farmer Login
      ↓
Crop Monitoring
      ↓
Registered Crop
      ↓
🌾 Crop Dashboard
      ↓
🌱 Crop Lifecycle
      ↓
📅 Crop Calendar
      ↓
🌿 Current Crop Stage
      ↓
📋 Today's Activities
      ↓
🌦️ Weather / Health Alerts
      ↓
🚜 Expected Harvest
```

Build this inside the existing `crop-monitoring` folder, using the existing project functionality wherever possible.

Start by inspecting the existing `crop-monitoring` folder before making any changes.
