import { FarmerProfile, RiskProfile, DocumentItem, ApplicationInfo } from "../types/insurance";

export const mockFarmer: FarmerProfile = {
  name: "Ramesh",
  fatherName: "Suresh Kumar",
  district: "Mayurbhanj",
  state: "Odisha",
  village: "Baripada",
  mobile: "+91 98765 43210",
  crop: "Paddy",
  area: "2.5 acres",
  season: "Kharif",
  aadhaarLinked: true,
  kccHolder: true,
  sumInsured: "₹62,500",
  farmerPremium: "₹1,250 (2%)",
  govSubsidy: "₹6,250 (Central + State Co-share)",
};

export const mockRisk: RiskProfile = {
  score: 81,
  level: "HIGH",
  factors: [
    {
      id: "rain",
      label: "Rainfall below normal",
      value: "↓ 35% deficit for Kharif cycle",
      icon: "🌧️",
    },
    {
      id: "soil",
      label: "Soil moisture low",
      value: "Root zone moisture at critical 18%",
      icon: "💧",
    },
    {
      id: "health",
      label: "Crop health declining",
      value: "NDVI health score ↓ 18% over 14 days",
      icon: "🌱",
    },
  ],
};

export const initialDocuments: DocumentItem[] = [
  {
    id: "aadhaar",
    name: "Aadhaar / Identity proof",
    description: "UIDAI biometric identity linked to DBT bank account",
    status: "Uploaded",
    mandatory: true,
    updatedAt: "Uploaded · Verified",
  },
  {
    id: "land",
    name: "Land record (RoR / Khatian / Patta)",
    description: "Revenue Record of Rights confirming 2.5 acres in Mayurbhanj",
    status: "Uploaded",
    mandatory: true,
    updatedAt: "Uploaded · Verified",
  },
  {
    id: "bank",
    name: "Bank account details",
    description: "Active bank passbook copy for DBT claim settlement",
    status: "Pending",
    mandatory: true,
  },
  {
    id: "sowing",
    name: "Crop / land information & Sowing declaration",
    description: "VAW or Panchayat certificate confirming Paddy sown for Kharif",
    status: "Pending",
    mandatory: false,
  },
];

export const mockApplication: ApplicationInfo = {
  applicationId: "INS-2026-00124",
  submittedAt: "12 Aug 2026",
  stage: "UNDER_REVIEW",
  policyNumber: "PMFBY-OD-2026-98741",
};
