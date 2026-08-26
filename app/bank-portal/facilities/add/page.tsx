import { Suspense } from 'react';
import AddFacilityPage from '@/Bank Portal/facilities/AddFacilityPage';

export const metadata = {
  title: 'Add / Edit Facility | Bank Partner Portal',
  description: 'Publish and manage agricultural finance products.',
};

export default function AddFacilityRoute() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading form...</div>}>
      <AddFacilityPage />
    </Suspense>
  );
}
