"use client";

/**
 * useSoil.ts
 *
 * Client-side React hook that fetches live soil data from:
 *   • NASA POWER API  — soil moisture (surface + root zone) & soil temp
 *   • Ambee Weather API — UV index, apparent temp, precip intensity, summary
 *
 * Returns:
 *   soilData   – SoilData | null
 *   loading    – boolean
 *   error      – string | null
 *   refresh    – () => void
 */

import { useState, useEffect, useCallback } from "react";
import { SoilData, fetchSoilData } from "./soilService";

interface UseSoilResult {
  soilData: SoilData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useSoil(): UseSoilResult {
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [loading, setLoading]   = useState<boolean>(true);
  const [error, setError]       = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSoilData();
      setSoilData(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Soil data fetch failed";
      console.error("[useSoil]", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    // Refresh every hour (NASA POWER updates daily)
    const interval = setInterval(load, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [load]);

  return { soilData, loading, error, refresh: load };
}
