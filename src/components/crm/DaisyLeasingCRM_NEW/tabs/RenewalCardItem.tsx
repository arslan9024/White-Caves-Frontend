import React from 'react';
import { RenewalRecord } from '../data/leasing';

export const RESPONSE_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  accepted: { bg: 'rgba(16,185,129,0.15)', text: '#10B981' },
  negotiating: { bg: 'rgba(59,130,246,0.15)', text: '#60A5FA' },
  rejected: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
};

export const getDaysColor = (days: number) => {
  if (days < 30) return '#EF4444';
  if (days < 60) return '#F59E0B';
  return '#10B981';
};

export interface RenewalCardItemProps {
  renewal: RenewalRecord;
  onSendNotice: (id: number) => void;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

export const RenewalCardItem: React.FC<RenewalCardItemProps> = ({
  renewal,
  onSendNotice,
  onAccept,
  onReject,
}) => {
  const rentIncreasePct = Math.round(
    ((renewal.proposedRent - renewal.currentRent) / renewal.currentRent) * 100
  );
  const respStyle = RESPONSE_COLORS[renewal.tenantResponse] || RESPONSE_COLORS.pending;
  const daysColor = getDaysColor(renewal.daysUntilExpiry);

  return (
    <div
      key={renewal.id}
      className="renewal-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '16px 20px',
        background: 'var(--rgba-white-03)',
        borderRadius: '12px',
        border: '1px solid var(--rgba-white-08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: '15px',
              color: 'var(--color-text-primary)',
            }}
          >
            {renewal.property} - Unit {renewal.unit}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Tenant: {renewal.tenantName} · Landlord: {renewal.landlordName}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span
            style={{
              padding: '3px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              background: respStyle.bg,
              color: respStyle.text,
              textTransform: 'capitalize',
            }}
          >
            {renewal.tenantResponse}
          </span>
          {renewal.noticeSent ? (
            <span
              style={{
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                background: 'rgba(16,185,129,0.15)',
                color: '#10B981',
              }}
            >
              ✓ Notice Sent
            </span>
          ) : (
            <span
              style={{
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                background: 'rgba(245,158,11,0.15)',
                color: '#F59E0B',
              }}
            >
              Notice Pending
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
        }}
      >
        <div
          style={{
            background: 'var(--rgba-white-05)',
            borderRadius: '8px',
            padding: '10px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-secondary)',
              marginBottom: '4px',
            }}
          >
            Current Rent
          </div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            AED {renewal.currentRent.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
            per year
          </div>
        </div>
        <div
          style={{
            background: 'rgba(20,184,166,0.08)',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid rgba(20,184,166,0.2)',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-secondary)',
              marginBottom: '4px',
            }}
          >
            Proposed Rent
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--accent-teal, #14B8A6)' }}>
            AED {renewal.proposedRent.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent-teal, #14B8A6)' }}>
            +{rentIncreasePct}% increase
          </div>
        </div>
        <div
          style={{
            background: 'var(--rgba-white-05)',
            borderRadius: '8px',
            padding: '10px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-secondary)',
              marginBottom: '4px',
            }}
          >
            Renewal Date
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            {renewal.renewalDate}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: daysColor }}>
            {renewal.daysUntilExpiry} days left
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
        }}
      >
        {!renewal.noticeSent && (
          <button
            onClick={() => onSendNotice(renewal.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #14B8A6',
              background: 'rgba(20,184,166,0.1)',
              color: '#14B8A6',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Send Notice
          </button>
        )}
        {renewal.tenantResponse !== 'accepted' && (
          <button
            onClick={() => onAccept(renewal.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #10B981',
              background: 'rgba(16,185,129,0.1)',
              color: '#10B981',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Mark Accepted
          </button>
        )}
        {renewal.tenantResponse !== 'rejected' && (
          <button
            onClick={() => onReject(renewal.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #EF4444',
              background: 'rgba(239,68,68,0.1)',
              color: '#EF4444',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Mark Rejected
          </button>
        )}
      </div>
    </div>
  );
};

