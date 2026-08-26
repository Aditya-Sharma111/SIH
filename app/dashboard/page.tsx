import FarmerDashboard from "@/deshboard/deshboard";

export const metadata = {
  title: "Farmer Dashboard | Smart Crop",
  description: "Comprehensive agricultural overview, crop health, alerts, and farm telemetry.",
};

export default function DashboardRoute() {
  return <FarmerDashboard />;
}
