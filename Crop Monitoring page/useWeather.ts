"use client";

/**
 * useWeather.ts
 *
 * Client-side hook that fetches the live 7-day weather forecast from
 * OpenWeatherMap via the weatherService utility.
 *
 * Returns:
 *   forecast  – WeatherDay[] (empty while loading / on error)
 *   loading   – boolean
 *   error     – string | null
 *   refresh   – () => void  (manual re-fetch)
 */

import { useState, useEffect, useCallback } from "react";
import { WeatherDay } from "./types";
import { fetchWeatherForecast } from "./weatherService";

interface UseWeatherResult {
  forecast: WeatherDay[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useWeather(): UseWeatherResult {
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherForecast();
      setForecast(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Weather fetch failed";
      console.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    // Refresh every 30 minutes
    const interval = setInterval(load, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [load]);

  return { forecast, loading, error, refresh: load };
}
