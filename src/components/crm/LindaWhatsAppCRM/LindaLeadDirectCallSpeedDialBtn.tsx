import React, { memo } from 'react';
import { Phone } from 'lucide-react';

export const LindaLeadDirectCallSpeedDialBtn: React.FC<{ phone?: string }> = memo(
  ({ phone = '+971505760056' }) => (
    <a
      href={`tel:${phone}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: '#25D366',
        color: '#000',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '10px',
        fontWeight: 700,
        textDecoration: 'none',
      }}
    >
      <Phone size={11} /> Call
    </a>
  )
);
export default LindaLeadDirectCallSpeedDialBtn;
