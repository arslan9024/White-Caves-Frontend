import React from 'react';
import type { EvictionDispute } from '../EvangelineLegalCRM.types';
import { cardStyle } from '../EvangelineLegalCRM.styles';

export interface EvictionTrackerPanelProps {
  disputes: EvictionDispute[];
}

export const EvictionTrackerPanel: React.FC<EvictionTrackerPanelProps> = ({ disputes }) => (
  <div style={cardStyle}>
    <h4
      style={{
        margin: '0 0 0.5rem 0',
        fontSize: '1rem',
        fontWeight: 800,
        color: 'var(--color-1e293b, #1E293B)',
      }}
    >
      Statutory 12-Month Eviction Notice Tracker (Dubai Law No. 33 of 2008)
    </h4>
    <p
      style={{
        margin: '0 0 1.25rem 0',
        fontSize: '0.8rem',
        color: 'var(--text-secondary, #64748B)',
      }}
    >
      Real-time tracking of certified notary public eviction notices, 365-day expiry countdowns, and
      Rental Dispute Center (RDC) filings.
    </p>

    <table
      style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}
    >
      <thead>
        <tr
          style={{
            background: 'var(--color-f8fafc, #F8FAFC)',
            borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
            color: 'var(--color-475569, #475569)',
            fontWeight: 800,
          }}
        >
          <th style={{ padding: '10px 14px' }}>Notice Ref</th>
          <th style={{ padding: '10px 14px' }}>Tenant & Property</th>
          <th style={{ padding: '10px 14px' }}>Statutory Grounds</th>
          <th style={{ padding: '10px 14px' }}>Notary Date</th>
          <th style={{ padding: '10px 14px' }}>Days Left (365 Law)</th>
          <th style={{ padding: '10px 14px' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {disputes.map(d => (
          <tr key={d.id} style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 800,
                color: 'var(--accent-purple, #7C3AED)',
              }}
            >
              {d.id}
            </td>
            <td style={{ padding: '10px 14px' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-1e293b, #1E293B)' }}>
                {d.tenant}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #64748B)' }}>
                {d.unit}
              </div>
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontSize: '0.78rem',
                color: 'var(--color-334155, #334155)',
              }}
            >
              {d.reason}
            </td>
            <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #64748B)' }}>
              {d.notaryDate}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 800,
                color: 'var(--accent-gold, #D97706)',
              }}
            >
              {d.daysRemaining} Days
            </td>
            <td style={{ padding: '10px 14px' }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  background: 'var(--color-fef3c7, #FEF3C7)',
                  color: 'var(--color-b45309, #B45309)',
                }}
              >
                {d.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
