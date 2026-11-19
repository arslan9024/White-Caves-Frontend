import React, { memo } from 'react';
import { FileCheck2 } from 'lucide-react';

export const LindaReraListingFormAStatusPill: React.FC<{ hasFormA?: boolean }> = memo(
  ({ hasFormA = true }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        color: hasFormA ? '#25D366' : '#EF4444',
        fontSize: '9px',
      }}
    >
      <FileCheck2 size={11} /> {hasFormA ? 'Form A Valid' : 'No Broker Mandate'}
    </span>
  )
);
export default LindaReraListingFormAStatusPill;
