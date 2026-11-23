import React from 'react';
import type { HandoverChecklistState } from './types';

interface VestaChecklistTabProps {
  checklist: HandoverChecklistState;
  onChecklistChange: (updated: HandoverChecklistState) => void;
  onProceedToCertificate: () => void;
}

export const VestaChecklistTab: React.FC<VestaChecklistTabProps> = ({
  checklist,
  onChecklistChange,
  onProceedToCertificate,
}) => {
  const allComplete = Object.values(checklist).every(Boolean);

  const handleToggle = (key: keyof HandoverChecklistState, checked: boolean) => {
    onChecklistChange({
      ...checklist,
      [key]: checked,
    });
  };

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
          margin: '0 0 1rem 0',
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--color-1e293b, #1E293B)',
        }}
      >
        Move-In & Key Handover Readiness Gate
      </h4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        {(Object.entries(checklist) as [keyof HandoverChecklistState, boolean][]).map(([k, v]) => (
          <label
            key={k}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: 'var(--color-f8fafc, #F8FAFC)',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--text-secondary, #E2E8F0)',
              cursor: 'pointer',
            }}
          >
            <input type="checkbox" checked={v} onChange={e => handleToggle(k, e.target.checked)} />
            <span>{k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
          </label>
        ))}
      </div>

      <button
        onClick={onProceedToCertificate}
        style={{
          background: allComplete ? 'var(--accent-green, #10B981)' : 'var(--accent-gold, #D97706)',
          color: 'var(--white, #FFF)',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: 800,
          fontSize: '0.85rem',
          cursor: 'pointer',
        }}
      >
        {allComplete
          ? 'Issue Official Key Handover Certificate'
          : 'Proceed to Certificate (Pending Checklist)'}
      </button>
    </div>
  );
};
