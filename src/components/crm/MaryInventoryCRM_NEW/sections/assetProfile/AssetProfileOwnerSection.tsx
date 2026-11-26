import React, { FC } from 'react';
import { Lock } from 'lucide-react';
import type { OwnerRecord } from '../types';

interface AssetProfileOwnerSectionProps {
  owner: OwnerRecord;
}

const CARD_STYLE: React.CSSProperties = {
  background: 'var(--white, #FFFFFF)',
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid rgba(59, 130, 246, 0.2)',
};

const LABEL_STYLE: React.CSSProperties = {
  color: 'var(--text-secondary, #64748B)',
  display: 'block',
  fontSize: '0.72rem',
};

export const AssetProfileOwnerSection: FC<AssetProfileOwnerSectionProps> = ({ owner }) => (
  <div
    style={{
      background:
        'linear-gradient(135deg, var(--color-fdf4ff, #FDF4FF) 0%, var(--color-eff6ff, #EFF6FF) 100%)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: '12px',
      padding: '1rem',
    }}
  >
    <h5
      style={{
        margin: '0 0 0.75rem 0',
        fontSize: '0.88rem',
        fontWeight: 800,
        color: 'var(--accent-blue, #3B82F6)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <Lock size={15} />
      <span>Section 2: Protected Property Owner Information</span>
    </h5>

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        fontSize: '0.82rem',
      }}
    >
      <div style={CARD_STYLE}>
        <span style={LABEL_STYLE}>Landlord Full Legal Name (Title Deed Match)</span>
        <strong style={{ color: 'var(--color-1e293b, #1E293B)', fontSize: '0.92rem' }}>
          {owner.landlordName}
        </strong>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <div style={CARD_STYLE}>
          <span style={LABEL_STYLE}>Primary Contact Phone</span>
          <strong style={{ color: 'var(--accent-blue, #3B82F6)' }}>{owner.primaryPhone}</strong>
        </div>
        <div style={CARD_STYLE}>
          <span style={LABEL_STYLE}>Verification Status</span>
          <strong
            style={{
              color: owner.verificationStatus.includes('Verified')
                ? 'var(--accent-green, #10B981)'
                : 'var(--accent-gold, #F59E0B)',
            }}
          >
            {owner.verificationStatus}
          </strong>
        </div>
      </div>

      <div style={CARD_STYLE}>
        <span style={LABEL_STYLE}>DLD Title Deed Reference Number</span>
        <strong style={{ color: 'var(--color-1e293b, #1E293B)' }}>{owner.titleDeedRef}</strong>
      </div>

      <div style={CARD_STYLE}>
        <span style={LABEL_STYLE}>Exclusive Retainer Mandate</span>
        <strong style={{ color: 'var(--accent-green, #10B981)' }}>{owner.mandate}</strong>
      </div>
    </div>
  </div>
);
