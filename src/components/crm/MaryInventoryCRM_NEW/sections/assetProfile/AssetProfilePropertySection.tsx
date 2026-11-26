import React, { FC } from 'react';
import { Building2 } from 'lucide-react';
import type { InventoryProperty } from '../types';

interface AssetProfilePropertySectionProps {
  property: InventoryProperty;
}

export const AssetProfilePropertySection: FC<AssetProfilePropertySectionProps> = ({ property }) => (
  <div
    style={{
      background: 'var(--color-f8fafc, #F8FAFC)',
      border: '1px solid var(--text-secondary, #E2E8F0)',
      borderRadius: '12px',
      padding: '1rem',
    }}
  >
    <h5
      style={{
        margin: '0 0 0.75rem 0',
        fontSize: '0.88rem',
        fontWeight: 800,
        color: 'var(--accent-purple, #8B5CF6)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <Building2 size={15} />
      <span>Section 1: Property Operational Status &amp; Profile Details</span>
    </h5>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.85rem' }}>
      <span
        style={{
          background: 'rgba(139, 92, 246, 0.12)',
          color: 'var(--accent-purple, #8B5CF6)',
          fontWeight: 800,
          fontSize: '0.75rem',
          padding: '3px 10px',
          borderRadius: '6px',
        }}
      >
        Furnishing: {property.furnishing}
      </span>
      <span
        style={{
          background: 'rgba(16, 185, 129, 0.12)',
          color: 'var(--accent-green, #10B981)',
          fontWeight: 800,
          fontSize: '0.75rem',
          padding: '3px 10px',
          borderRadius: '6px',
        }}
      >
        Occupancy: {property.occupancy}
      </span>
      <span
        style={{
          background: 'rgba(239, 68, 68, 0.12)',
          color: 'var(--accent-red, #EF4444)',
          fontWeight: 800,
          fontSize: '0.75rem',
          padding: '3px 10px',
          borderRadius: '6px',
        }}
      >
        Terms: {property.paymentTerms}
      </span>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
        fontSize: '0.8rem',
      }}
    >
      <div>
        <span
          style={{
            color: 'var(--text-secondary, #64748B)',
            display: 'block',
            fontSize: '0.72rem',
          }}
        >
          Asking Price / Rent (AED)
        </span>
        <strong style={{ color: 'var(--accent-green, #10B981)', fontSize: '0.9rem' }}>
          {property.askingPrice}
        </strong>
      </div>
      <div>
        <span
          style={{
            color: 'var(--text-secondary, #64748B)',
            display: 'block',
            fontSize: '0.72rem',
          }}
        >
          Ejari Registration Number
        </span>
        <strong style={{ color: 'var(--color-1e293b, #1E293B)' }}>{property.ejariNumber}</strong>
      </div>
      <div>
        <span
          style={{
            color: 'var(--text-secondary, #64748B)',
            display: 'block',
            fontSize: '0.72rem',
          }}
        >
          Current Annual Rent (AED)
        </span>
        <strong style={{ color: 'var(--color-475569, #475569)' }}>{property.rentAED}</strong>
      </div>
      <div>
        <span
          style={{
            color: 'var(--text-secondary, #64748B)',
            display: 'block',
            fontSize: '0.72rem',
          }}
        >
          12-Month DLD Notice Status
        </span>
        <strong
          style={{
            color: property.noticeServed.includes('Yes')
              ? 'var(--accent-red, #EF4444)'
              : 'var(--accent-green, #10B981)',
          }}
        >
          {property.noticeServed}
        </strong>
      </div>
    </div>
  </div>
);
