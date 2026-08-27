import { Suspense } from 'react';
import FacilityDetailPage from '@/Financial Support/detail/FacilityDetailPage';

export const metadata = {
  title: 'Facility Details | Smart Crop Financial Support',
  description: 'Detailed information and terms for agricultural loan facility.',
};

export default function DetailRoute() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading facility details...</div>}>
      <FacilityDetailPage />
    </Suspense>
  );
}
