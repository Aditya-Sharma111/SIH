import { Suspense } from 'react';
import ManageFacilitiesPage from '@/Bank Portal/facilities/ManageFacilitiesPage';

export const metadata = {
  title: 'Manage Facilities | Bank Partner Portal',
  description: 'Manage listed financial facilities.',
};

export default function ManageFacilitiesRoute() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading facilities...</div>}>
      <ManageFacilitiesPage />
    </Suspense>
  );
}
