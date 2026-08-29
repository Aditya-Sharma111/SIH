import { Suspense } from "react";
import AddFacilityPage from "@/Bank Portal/facilities/AddFacilityPage";

export default function AddFacilityRoute() {
  return (
    <Suspense>
      <AddFacilityPage />
    </Suspense>
  );
}
