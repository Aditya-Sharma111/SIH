/**
 * weatherService.ts
 * Fetches 5-day / 3-hour forecast from OpenWeatherMap and maps it
 * into the WeatherDay shape used throughout the Crop Monitoring page.
 *
 * OWM Free tier endpoint:
 *   GET /data/2.5/forecast?q=Baripada,IN&units=metric&cnt=40&appid=KEY
 *
 * The response contains 3-hour intervals.  We group by calendar date (IST)
 * and compute per-day aggregates:
 *   • tempHigh  – max temp across the day's intervals
 *   • tempLow   – min temp across the day's intervals
 *   • humidity  – average humidity
 *   • windSpeed – max wind speed (km/h, converted from m/s × 3.6)
 *   • rainChance– max pop (probability of precipitation) × 100
 *   • condition – derived from the dominant OWM weather id
 */

import { WeatherDay } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ?? "";
const CITY = "Baripada,IN"; // Baripada = Mayurbhanj district HQ, Odisha
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

// ---------------------------------------------------------------------------
// OWM raw types (minimal)
// ---------------------------------------------------------------------------
interface OWMWeatherEntry {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number }; // m/s
  pop: number; // 0-1
  rain?: { "3h": number };
  dt_txt: string; // "YYYY-MM-DD HH:MM:SS"
}

interface OWMForecastResponse {
  list: OWMWeatherEntry[];
  city: {
    name: string;
    timezone: number; // UTC offset in seconds
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert OWM weather id to the WeatherDay condition union.
 * Reference: https://openweathermap.org/weather-conditions
 */
function owmIdToCondition(id: number): WeatherDay["condition"] {
  if (id >= 200 && id < 300) return "storm";      // Thunderstorm
  if (id >= 300 && id < 600) return "rainy";      // Drizzle / Rain
  if (id >= 600 && id < 700) return "cloudy";     // Snow → treat as cloudy
  if (id >= 700 && id < 800) return "cloudy";     // Atmosphere (fog, mist…)
  if (id === 800) return "sunny";                  // Clear sky
  if (id === 801 || id === 802) return "partly_cloudy";
  return "cloudy";                                 // 803, 804 – overcast
}

/** Pick the most "severe" condition from a day's entries. */
function dominantCondition(conditions: WeatherDay["condition"][]): WeatherDay["condition"] {
  const rank: Record<WeatherDay["condition"], number> = {
    storm: 5,
    rainy: 4,
    cloudy: 3,
    partly_cloudy: 2,
    sunny: 1,
  };
  return conditions.reduce(
    (best, c) => (rank[c] > rank[best] ? c : best),
    "sunny" as WeatherDay["condition"]
  );
}

/** Returns "Mon", "Tue", … "Sun" or "Today" for today's date. */
function toDayName(dateStr: string, todayStr: string): string {
  if (dateStr === todayStr) return "Today";
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [y, m, d] = dateStr.split("-").map(Number);
  return days[new Date(y, m - 1, d).getDay()];
}

/** "YYYY-MM-DD" from a timestamp + UTC-offset (seconds) */
function toLocalDateStr(utcTimestamp: number, tzOffsetSec: number): string {
  const localMs = (utcTimestamp + tzOffsetSec) * 1000;
  const d = new Date(localMs);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Build an agronomic alert string for a forecast day. */
function buildAlert(
  condition: WeatherDay["condition"],
  rainChance: number,
  tempHigh: number
): string | undefined {
  if (condition === "storm") {
    return "⛈️ Thunderstorm forecast. Secure irrigation pipes and stay off field.";
  }
  if (condition === "rainy" && rainChance >= 70) {
    return `🌧️ Heavy rain likely (${rainChance}% chance). Delay fertilizer top-dressing to prevent leaching.`;
  }
  if (condition === "rainy" && rainChance >= 40) {
    return `🌦️ Rain expected (${rainChance}% chance). Postpone foliar sprays.`;
  }
  if (condition === "sunny" && tempHigh >= 34) {
    return `☀️ Clear sunny day (${tempHigh}°C). Optimal timing for urea top-dressing & cono-weeder.`;
  }
  if (condition === "sunny") {
    return `☀️ Good field window. Ideal for inspection, scouting & manual weeding.`;
  }
  if (condition === "partly_cloudy") {
    return "⛅ Partly cloudy. Good morning window for field inspection and soil testing.";
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Main fetch function
// ---------------------------------------------------------------------------

export async function fetchWeatherForecast(): Promise<WeatherDay[]> {
  if (!API_KEY) {
    console.warn("[weatherService] NEXT_PUBLIC_OPENWEATHER_API_KEY is not set. Returning empty forecast.");
    return [];
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(CITY)}&units=metric&cnt=40&appid=${API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 1800 } }); // cache 30 min (Next.js)
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[weatherService] OWM API error ${res.status}: ${text}`);
  }

  const data: OWMForecastResponse = await res.json();
  const tzOffset = data.city.timezone; // seconds from UTC

  // Group entries by local date string
  const grouped: Record<string, OWMWeatherEntry[]> = {};
  for (const entry of data.list) {
    const dateStr = toLocalDateStr(entry.dt, tzOffset);
    if (!grouped[dateStr]) grouped[dateStr] = [];
    grouped[dateStr].push(entry);
  }

  // Today in IST (UTC+5:30 = 19800 sec)
  const todayStr = toLocalDateStr(Math.floor(Date.now() / 1000), 19800);

  // Build WeatherDay array – up to 7 days
  const forecast: WeatherDay[] = Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 7)
    .map(([dateStr, entries]) => {
      const temps = entries.map((e) => e.main.temp);
      const humidities = entries.map((e) => e.main.humidity);
      const winds = entries.map((e) => e.wind.speed * 3.6); // m/s → km/h
      const pops = entries.map((e) => e.pop);
      const conditions = entries.map((e) => owmIdToCondition(e.weather[0]?.id ?? 800));

      const tempHigh = Math.round(Math.max(...temps));
      const tempLow = Math.round(Math.min(...temps));
      const humidity = Math.round(humidities.reduce((s, v) => s + v, 0) / humidities.length);
      const windSpeed = Math.round(Math.max(...winds));
      const rainChance = Math.round(Math.max(...pops) * 100);
      const condition = dominantCondition(conditions);
      const alert = buildAlert(condition, rainChance, tempHigh);

      return {
        date: dateStr,
        dayName: toDayName(dateStr, todayStr),
        condition,
        tempHigh,
        tempLow,
        rainChance,
        humidity,
        windSpeed,
        ...(alert ? { alert } : {}),
      };
    });

  return forecast;
}
