import React, { memo } from 'react';
import { Smartphone, ChevronRight } from 'lucide-react';

export const LindaMultiAccountBreadcrumb: React.FC<{ activeAccount?: string; cluster?: string }> =
  memo(({ activeAccount = 'Primary Master (+971505760056)', cluster = 'Damac Hills 2' }) => (
    <nav
      aria-label="WhatsApp account path"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '11px',
        color: '#94A3B8',
        padding: '6px 12px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '6px',
      }}
    >
      <Smartphone size={13} color="#25D366" />
      <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{activeAccount}</span>
      <ChevronRight size={12} color="#64748B" />
      <span>{cluster}</span>
    </nav>
  ));
export default LindaMultiAccountBreadcrumb;
