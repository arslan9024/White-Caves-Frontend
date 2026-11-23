import React from 'react';
import { Download } from 'lucide-react';

interface VestaCertificateTabProps {
  onDownload?: () => void;
}

export const VestaCertificateTab: React.FC<VestaCertificateTabProps> = ({ onDownload }) => {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      // Clean fallback: avoid blocking window.alert in test/production environments
      if (typeof window !== 'undefined' && typeof window.alert === 'function') {
        window.alert('Downloaded Official Key Handover Certificate PDF.');
      }
    }
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
      <div
        style={{
          border: '2px dashed var(--text-secondary, #CBD5E1)',
          padding: '1.5rem',
          borderRadius: '12px',
          background: 'var(--color-f8fafc, #F8FAFC)',
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            margin: '0 0 0.5rem 0',
            color: 'var(--color-1e293b, #1E293B)',
            fontWeight: 900,
          }}
        >
          OFFICIAL KEY HANDOVER CERTIFICATE
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #64748B)', margin: 0 }}>
          White Caves Real Estate LLC | Dubai Land Department Registered
        </p>
        <div
          style={{
            margin: '1.5rem 0',
            fontSize: '0.9rem',
            color: 'var(--color-334155, #334155)',
          }}
        >
          This certifies that the keys, access cards, and DEWA utility clearances for{' '}
          <strong>Unit 1402, Downtown Heights</strong> have been inspected and formally handed over
          to the tenant.
        </div>
        <button
          onClick={handleDownload}
          style={{
            background: 'var(--accent-gold, #D97706)',
            color: 'var(--white, #FFF)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 18px',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Download size={16} /> Download Signed Handover PDF
        </button>
      </div>
    </div>
  );
};
