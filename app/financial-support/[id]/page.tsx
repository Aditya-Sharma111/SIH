import { Suspense } from "react";
import FacilityDetailPage from "@/Financial Support/detail/FacilityDetailPage";

export default function FinancialDetailRoute() {
  return (
    <Suspense>
      <FacilityDetailPage />
    </Suspense>
  );
}
