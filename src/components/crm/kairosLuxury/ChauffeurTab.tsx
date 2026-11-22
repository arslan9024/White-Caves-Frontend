import React from 'react';
import type { VipGuest } from './types';

interface ChauffeurTabProps {
  vipGuests: VipGuest[];
}

export const ChauffeurTab: React.FC<ChauffeurTabProps> = ({ vipGuests }) => (
  <div
    style={{
      background: 'var(--white, #FFFFFF)',
      borderRadius: '12px',
      border: '1px solid var(--text-secondary, #E2E8F0)',
      overflow: 'hidden',
    }}
  >
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        fontSize: '0.85rem',
      }}
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
          <th style={{ padding: '10px 14px' }}>VIP Guest</th>
          <th style={{ padding: '10px 14px' }}>Concierge Transport</th>
          <th style={{ padding: '10px 14px' }}>Date</th>
          <th style={{ padding: '10px 14px' }}>Itinerary</th>
          <th style={{ padding: '10px 14px' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {vipGuests.map(guest => (
          <tr key={guest.id} style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 800,
                color: 'var(--color-1e293b, #1E293B)',
              }}
            >
              {guest.client}
            </td>
            <td
              style={{
                padding: '10px 14px',
                color: 'var(--color-be185d, #BE185D)',
                fontWeight: 700,
              }}
            >
              {guest.service}
            </td>
            <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #64748B)' }}>
              {guest.date}
            </td>
            <td style={{ padding: '10px 14px', color: 'var(--color-334155, #334155)' }}>
              {guest.itinerary}
            </td>
            <td style={{ padding: '10px 14px' }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  background: 'var(--color-ecfdf5, #ECFDF5)',
                  color: 'var(--color-047857, #047857)',
                }}
              >
                {guest.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
