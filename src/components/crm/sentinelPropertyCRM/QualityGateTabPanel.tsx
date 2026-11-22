import React from 'react';
import type { SentinelChecklist } from './types';

interface QualityGateTabPanelProps {
  checklist: SentinelChecklist;
  onToggleItem: (key: keyof SentinelChecklist, val: boolean) => void;
  passedCount: number;
  isGateApproved: boolean;
}

export const QualityGateTabPanel: React.FC<QualityGateTabPanelProps> = ({
  checklist,
  onToggleItem,
  passedCount,
  isGateApproved,
}) => {
  return (
    <div
      style={{
        background: 'var(--white, #FFFFFF)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--text-secondary, #E2E8F0)',
      }}
    >
      <h4
        style={{
          margin: '0 0 0.5rem 0',
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--color-1e293b, #1E293B)',
        }}
      >
        Listing Verification Quality Gate (6-Pillar Compliance Check)
      </h4>
      <p
        style={{
          margin: '0 0 1.25rem 0',
          fontSize: '0.8rem',
          color: 'var(--text-secondary, #64748B)',
        }}
      >
        All 6 criteria must be verified before a property is permitted to be broadcast to Bayut,
        Property Finder, and website portals.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        {(Object.entries(checklist) as [keyof SentinelChecklist, boolean][]).map(([key, val]) => (
          <label
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--color-1e293b, #1E293B)',
              cursor: 'pointer',
              background: 'var(--color-f8fafc, #F8FAFC)',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--text-secondary, #E2E8F0)',
            }}
          >
            <input
              type="checkbox"
              checked={val}
              onChange={e => onToggleItem(key, e.target.checked)}
            />
            <span>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </span>
          </label>
        ))}
      </div>

      <div
        style={{
          background: isGateApproved
            ? 'var(--color-ecfdf5, #ECFDF5)'
            : 'var(--color-fef2f2, #FEF2F2)',
          border: `1px solid ${isGateApproved ? 'var(--color-a7f3d0, #A7F3D0)' : 'var(--color-fecaca, #FECACA)'}`,
          padding: '1rem',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 800,
              color: isGateApproved
                ? 'var(--color-065f46, #065F46)'
                : 'var(--color-991b1b, #991B1B)',
              fontSize: '0.9rem',
            }}
          >
            {isGateApproved
              ? '✓ Gate Approved: Ready for Multi-Portal Syndication'
              : `⚠️ Incomplete: ${passedCount}/6 Criteria Met`}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary, #64748B)',
              marginTop: '2px',
            }}
          >
            {isGateApproved
              ? 'Trakheesi barcode generated and locked.'
              : 'Floorplan and KYC documents must be uploaded before launch.'}
          </div>
        </div>
        {isGateApproved && (
          <button
            style={{
              background: 'var(--color-047857, #047857)',
              color: 'var(--white, #FFF)',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 14px',
              fontWeight: 800,
              fontSize: '0.78rem',
              cursor: 'pointer',
            }}
          >
            Publish Syndication
          </button>
        )}
      </div>
    </div>
  );
};
