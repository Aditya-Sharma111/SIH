import { Suspense } from 'react';
import AcknowledgementPage from '@/Financial Support/acknowledgement/AcknowledgementPage';

export const metadata = {
  title: 'Acknowledgement | Smart Crop Financial Support',
  description: 'External redirect confirmation for bank application portal.',
};

export default function AcknowledgementRoute() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading acknowledgement...</div>}>
      <AcknowledgementPage />
    </Suspense>
  );
}
