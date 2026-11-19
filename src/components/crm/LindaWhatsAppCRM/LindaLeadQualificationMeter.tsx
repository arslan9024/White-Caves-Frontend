import React, { memo } from 'react';
import { Award } from 'lucide-react';

export const LindaLeadQualificationMeter: React.FC<{ score?: number }> = memo(({ score = 78 }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: 'rgba(37,211,102,0.1)',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '10px',
      color: '#25D366',
    }}
  >
    <Award size={12} />
    <span>Qualified: {score}/100</span>
  </div>
));
export default LindaLeadQualificationMeter;
