import { Suspense } from "react";
import AcknowledgementPage from "@/Financial Support/acknowledgement/AcknowledgementPage";

export default function AcknowledgementRoute() {
  return (
    <Suspense>
      <AcknowledgementPage />
    </Suspense>
  );
}
