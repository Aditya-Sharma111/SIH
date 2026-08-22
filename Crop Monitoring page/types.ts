export type ActivityType =
  | "irrigation"
  | "fertilizer"
  | "inspection"
  | "pest_control"
  | "weeding"
  | "harvest"
  | "stage_change";

export type ActivityPriority = "high" | "medium" | "low";

export interface Activity {
  id: string;
  cropId: string;
  date: string; // YYYY-MM-DD
  time?: string;
  title: string;
  type: ActivityType;
  description: string;
  status: "pending" | "completed" | "overdue";
  priority: ActivityPriority;
  dosage?: string;
  completedAt?: string;
}

export interface CropStage {
  id: string;
  name: string;
  icon: string;
  startDate: string;
  endDate: string;
  daysDuration: number;
  status: "completed" | "current" | "upcoming";
  description: string;
  nutrientFocus: string;
  waterRequirement: string;
  criticalCare: string;
}

export interface WeatherDay {
  date: string;
  dayName: string;
  condition: "sunny" | "cloudy" | "rainy" | "storm" | "partly_cloudy";
  tempHigh: number;
  tempLow: number;
  rainChance: number;
  humidity: number;
  windSpeed: number;
  alert?: string;
}

export interface RegisteredCrop {
  id: string;
  name: string;
  variety: string;
  cropType: string;
  icon: string;
  landArea: string;
  location: string;
  district: string;
  state: string;
  sowingDate: string;
  expectedHarvestDate: string;
  harvestWindow: string;
  expectedYield: string;
  estimatedRevenue: string;
  currentStage: string;
  currentStageDays: number;
  totalCycleDays: number;
  healthScore: number;
  healthStatus: "Excellent" | "Good" | "Moderate" | "At Risk";
  ndviIndex: number;
  soilMoisture: number; // percentage
  soilMoistureStatus: "Low" | "Medium" | "Optimal" | "High";
  soilTemp: number;
  soilPh: number;
  riskScore: number; // 0-100
  riskLevel: "Low" | "Moderate" | "High";
  stages: CropStage[];
  activities: Activity[];
  weatherAlerts: string[];
}

export interface ActivityBadgeStyle {
  label: string;
  bg: string;
  dot: string;
  icon: string;
}
