export type TimeFrame = "7D" | "30D" | "3M" | "6M";

export interface PricePoint {
  date: string;
  price: number;
  label: string;
}

export interface MandiFacility {
  name: string;
  available: boolean;
  icon: string;
  description: string;
}

export interface Market {
  id: string;
  name: string;
  district: string;
  state: string;
  crop: string;
  cropId: string;
  pricePerQuintal: number;
  yesterdayPrice: number;
  thirtyDayAgoPrice: number;
  distanceKm: number;
  transportCostPerQuintal: number;
  msp: number;
  updatedAt: string;
  tradingHours: string;
  dailyArrivalQtl: number;
  contactPerson: string;
  contactPhone: string;
  isEnamEnabled: boolean;
  paymentTerms: string;
  gradeAccepted: string;
  address: string;
  rating: number;
  reviewCount: number;
  facilities: MandiFacility[];
  priceHistory: {
    "7D": PricePoint[];
    "30D": PricePoint[];
    "3M": PricePoint[];
    "6M": PricePoint[];
  };
}

export interface ComputedMarketMetrics {
  netRealization: number;
  mspDifference: number;
  netVsMspDifference: number;
  grossRevenue: number;
  totalTransportCost: number;
  totalNetEarnings: number;
  isAboveMsp: boolean;
  isNetAboveMsp: boolean;
  priceChange30d: number;
  priceChange30dPct: number;
  rank: number;
  isBest: boolean;
  savingsVsLowest: number;
}

export interface CropMarketInfo {
  id: string;
  name: string;
  variety: string;
  icon: string;
  landArea: string;
  expectedYieldQtl: number;
  defaultQuantityQtl: number;
  harvestWindow: string;
  msp: number;
  category: string;
}

export type SortField = "netRealization" | "pricePerQuintal" | "distanceKm" | "transportCostPerQuintal" | "dailyArrivalQtl";
export type SortDirection = "asc" | "desc";

export interface MarketFilterState {
  searchQuery: string;
  maxDistanceKm: number;
  onlyEnam: boolean;
  onlyAboveMsp: boolean;
  sortField: SortField;
  sortDirection: SortDirection;
}
