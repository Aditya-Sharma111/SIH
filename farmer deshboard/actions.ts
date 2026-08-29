'use server';

import { query } from '@/lib/db';

export interface DashboardData {
  farmer: {
    name: string;
    village: string;
    district: string;
    landArea: number;
  };
  crop: {
    name: string;
  };
  risk: {
    score: number;
    level: string; // "High Risk", "Low Risk", etc.
    reasons: any; // JSON containing risk factors
  };
  health: {
    ndviTrend: number;
    rainfall: number;
    temperature: number;
  };
  advisories: {
    message: string;
    action: string;
  }[];
}

export async function getDashboardData(farmerId: string = 'f1'): Promise<DashboardData | null> {
  try {
    // 1. Fetch Farmer
    const farmers = await query(`SELECT name, village, district, land_area FROM farmers WHERE id = ? LIMIT 1`, [farmerId]);
    if (!farmers || farmers.length === 0) {
      // Fallback: If 'f1' doesn't exist, just get the first available farmer
      const fallbackFarmers = await query(`SELECT id, name, village, district, land_area FROM farmers LIMIT 1`);
      if (fallbackFarmers && fallbackFarmers.length > 0) {
        farmerId = fallbackFarmers[0].id;
        farmers[0] = fallbackFarmers[0];
      } else {
        return null;
      }
    }
    const farmer = farmers[0];

    // 2. Fetch Active Crop
    const crops = await query(`SELECT name FROM crops WHERE farmer_id = ? ORDER BY sowing_date DESC LIMIT 1`, [farmerId]);
    const cropName = crops && crops.length > 0 ? crops[0].name : 'Unknown Crop';

    // 3. Fetch Risk Score
    const risks = await query(`SELECT score, reasons FROM risk_scores WHERE farmer_id = ? ORDER BY created_at DESC LIMIT 1`, [farmerId]);
    const risk = risks && risks.length > 0 ? risks[0] : { score: 0, reasons: '[]' };
    
    // Parse reasons safely
    let parsedReasons = [];
    try {
      if (typeof risk.reasons === 'string') {
        parsedReasons = JSON.parse(risk.reasons);
      } else {
        parsedReasons = risk.reasons || [];
      }
    } catch (e) {
      console.warn("Failed to parse risk reasons", e);
    }
    
    // Determine risk level based on score (matches PRD tokens)
    let riskLevel = "Low Risk";
    if (risk.score > 70) riskLevel = "High Risk";
    else if (risk.score >= 40) riskLevel = "Medium Risk";

    // 4. Fetch Weather / Crop Health (using farm_id. In this DB, farm_id maps to farms.id which maps to farmer_id. We'll simplify by getting a farm for the farmer).
    const farms = await query(`SELECT id FROM farms WHERE farmer_id = ? LIMIT 1`, [farmerId]);
    let health = { ndviTrend: -18, rainfall: 0, temperature: 0 }; // Default mock fallback for NDVI
    
    if (farms && farms.length > 0) {
      const farmId = farms[0].id;
      const weather = await query(`SELECT temperature, rainfall FROM weather_observations WHERE farm_id = ? ORDER BY recorded_at DESC LIMIT 1`, [farmId]);
      if (weather && weather.length > 0) {
        health.temperature = parseFloat(weather[0].temperature) || 0;
        health.rainfall = parseFloat(weather[0].rainfall) || 0;
      }
      
      // Attempt to get crop_health_score from crop_risk as a proxy for NDVI
      const cropRisk = await query(`SELECT crop_health_score FROM crop_risk WHERE farmer_id = ? ORDER BY calculated_at DESC LIMIT 1`, [farmerId]);
      if (cropRisk && cropRisk.length > 0 && cropRisk[0].crop_health_score !== null) {
        health.ndviTrend = cropRisk[0].crop_health_score; 
      }
    }

    // 5. Fetch Advisories (Notifications)
    const notifications = await query(`SELECT message, action_label FROM notifications WHERE farmer_id = ? AND priority = 'critical' AND is_read = 0 ORDER BY created_at DESC LIMIT 3`, [farmerId]);
    const advisories = (notifications || []).map((n: any) => ({
      message: n.message,
      action: n.action_label || 'View'
    }));

    // If no active advisories, push a default one based on weather
    if (advisories.length === 0) {
      if (health.rainfall > 0) {
        advisories.push({ message: "Delay irrigation today", action: "Rain expected" });
      } else {
        advisories.push({ message: "Optimal time for fertilizer", action: "Apply Now" });
      }
    }

    return {
      farmer: {
        name: farmer.name || 'Unknown Farmer',
        village: farmer.village || 'Unknown Village',
        district: farmer.district || 'Unknown District',
        landArea: parseFloat(farmer.land_area) || 0,
      },
      crop: {
        name: cropName,
      },
      risk: {
        score: risk.score,
        level: riskLevel,
        reasons: parsedReasons,
      },
      health,
      advisories
    };
  } catch (error) {
    console.error("Error in getDashboardData Server Action:", error);
    return null;
  }
}
