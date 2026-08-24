/**
 * soilService.ts
 *
 * Fetches real soil data from two sources:
 *
 * 1. NASA POWER API (free, no key) — daily soil wetness & earth skin temp
 *    https://power.larc.nasa.gov/api/temporal/daily/point
 *    Parameters:
 *      GWETROOT – Root Zone Soil Wetness (0-1 fraction of saturation)
 *      GWETTOP  – Surface Soil Wetness  (0-1 fraction of saturation)
 *      TS       – Earth Skin Temperature (°C)
 *      RH2M     – Relative Humidity at 2m (%)
 *      PRECTOTCORR – Precipitation corrected (mm/day)
 *
 * 2. Ambee Weather API (your key) — UV index, summary, apparent temp,
 *    precip intensity, wind gust for enriched crop advisories
 *    https://api.ambeedata.com/weather/latest/by-lat-lng
 */

// Mayurbhanj / Baripada coordinates
const LAT = 21.935;
const LNG = 86.7214;

const AMBEE_KEY = process.env.NEXT_PUBLIC_SOIL_API ?? "";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SoilData {
  // From NASA POWER
  soilMoistureSurface: number;   // GWETTOP  × 100  → %
  soilMoistureRoot: number;      // GWETROOT × 100  → %
  soilTempC: number;             // TS  (°C)
  precipitation: number;         // PRECTOTCORR (mm/day)
  humidity: number;              // RH2M (%)

  // From Ambee
  uvIndex: number;
  apparentTempC: number;         // Ambee returns °F — converted to °C
  precipIntensity: number;       // mm/hr
  windGust: number;              // m/s
  summary: string;
  icon: string;

  // Derived helpers
  soilMoistureStatus: "Low" | "Medium" | "Optimal" | "High";
  soilTempStatus: string;
  updatedAt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fToC(f: number): number {
  return Math.round(((f - 32) * 5) / 9 * 10) / 10;
}

function moistureStatus(pct: number): SoilData["soilMoistureStatus"] {
  if (pct < 25) return "Low";
  if (pct < 40) return "Medium";
  if (pct < 75) return "Optimal";
  return "High";
}

function soilTempLabel(c: number): string {
  if (c < 15) return "Too Cool — slow nutrient uptake";
  if (c < 20) return "Cool — adequate for germination";
  if (c < 30) return "Optimal — active root growth";
  if (c < 35) return "Warm — monitor irrigation";
  return "Hot — risk of root stress";
}

/** Returns yesterday's date in YYYYMMDD (IST) for NASA POWER */
function nasaDateRange(): { start: string; end: string } {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  now.setDate(now.getDate() - 1); // yesterday (latest available)
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const dateStr = `${y}${m}${d}`;
  return { start: dateStr, end: dateStr };
}

// ─── Fetch functions ──────────────────────────────────────────────────────────

async function fetchNASASoil(): Promise<Partial<SoilData>> {
  const { start, end } = nasaDateRange();
  const params = "T2M,PRECTOTCORR,RH2M,WS2M,GWETROOT,GWETTOP,TS";
  const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${params}&community=AG&longitude=${LNG}&latitude=${LAT}&start=${start}&end=${end}&format=JSON`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`NASA POWER ${res.status}`);
  const data = await res.json();

  const p = data.properties?.parameter ?? {};
  const dateKey = start;

  const GWETTOP  = p.GWETTOP?.[dateKey]  ?? -999;
  const GWETROOT = p.GWETROOT?.[dateKey] ?? -999;
  const TS       = p.TS?.[dateKey]       ?? -999;
  const RH2M     = p.RH2M?.[dateKey]    ?? -999;
  const PREC     = p.PRECTOTCORR?.[dateKey] ?? 0;

  const soilMoistureSurface = GWETTOP  !== -999 ? Math.round(GWETTOP  * 100) : 0;
  const soilMoistureRoot    = GWETROOT !== -999 ? Math.round(GWETROOT * 100) : 0;
  const soilTempC           = TS       !== -999 ? Math.round(TS * 10) / 10   : 0;
  const humidity            = RH2M     !== -999 ? Math.round(RH2M)           : 0;
  const precipitation       = PREC     !== -999 ? Math.round(PREC * 10) / 10 : 0;

  return {
    soilMoistureSurface,
    soilMoistureRoot,
    soilTempC,
    humidity,
    precipitation,
    soilMoistureStatus: moistureStatus(soilMoistureRoot),
    soilTempStatus: soilTempLabel(soilTempC),
  };
}

async function fetchAmbeeWeather(): Promise<Partial<SoilData>> {
  if (!AMBEE_KEY) return {};
  const url = `https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${LAT}&lng=${LNG}`;
  const res = await fetch(url, {
    headers: { "x-api-key": AMBEE_KEY, "Content-type": "application/json" },
  });
  if (!res.ok) throw new Error(`Ambee Weather ${res.status}`);
  const json = await res.json();
  const d = json.data ?? {};

  return {
    uvIndex: d.uvIndex ?? 0,
    apparentTempC: d.apparentTemperature ? fToC(d.apparentTemperature) : 0,
    precipIntensity: d.precipIntensity ?? 0,
    windGust: d.windGust ?? 0,
    summary: d.summary ?? "",
    icon: d.icon ?? "",
  };
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function fetchSoilData(): Promise<SoilData> {
  const [nasaResult, ambeeResult] = await Promise.allSettled([
    fetchNASASoil(),
    fetchAmbeeWeather(),
  ]);

  const nasa   = nasaResult.status  === "fulfilled" ? nasaResult.value  : {};
  const ambee  = ambeeResult.status === "fulfilled" ? ambeeResult.value : {};

  const merged: SoilData = {
    soilMoistureSurface: nasa.soilMoistureSurface ?? 0,
    soilMoistureRoot:    nasa.soilMoistureRoot    ?? 0,
    soilTempC:           nasa.soilTempC           ?? 0,
    humidity:            nasa.humidity            ?? 0,
    precipitation:       nasa.precipitation       ?? 0,
    soilMoistureStatus:  nasa.soilMoistureStatus  ?? "Optimal",
    soilTempStatus:      nasa.soilTempStatus      ?? "",

    uvIndex:          ambee.uvIndex          ?? 0,
    apparentTempC:    ambee.apparentTempC    ?? 0,
    precipIntensity:  ambee.precipIntensity  ?? 0,
    windGust:         ambee.windGust         ?? 0,
    summary:          ambee.summary          ?? "",
    icon:             ambee.icon             ?? "",

    updatedAt: new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return merged;
}
