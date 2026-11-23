import * as React from 'react';
import type { MaintenanceTicket } from './types';
import { junoCommunityStyles } from './styles';

export interface MaintenanceTicketDeskProps {
  tickets: MaintenanceTicket[];
}

export const MaintenanceTicketDesk: React.FC<MaintenanceTicketDeskProps> = ({ tickets }) => {
  return (
    <div style={junoCommunityStyles.card}>
      <table style={junoCommunityStyles.table}>
        <thead>
          <tr style={junoCommunityStyles.tableHeadRow}>
            <th style={junoCommunityStyles.th}>Ticket #</th>
            <th style={junoCommunityStyles.th}>Location</th>
            <th style={junoCommunityStyles.th}>Category Issue</th>
            <th style={junoCommunityStyles.th}>SLA Timer</th>
            <th style={junoCommunityStyles.th}>Priority</th>
            <th style={junoCommunityStyles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id} style={junoCommunityStyles.tr}>
              <td
                style={{
                  ...junoCommunityStyles.td,
                  fontWeight: 800,
                  color: 'var(--accent-purple, #7C3AED)',
                }}
              >
                {t.id}
              </td>
              <td
                style={{
                  ...junoCommunityStyles.td,
                  fontWeight: 700,
                  color: 'var(--color-1e293b, #1E293B)',
                }}
              >
                {t.unit}
              </td>
              <td
                style={{
                  ...junoCommunityStyles.td,
                  color: 'var(--color-475569, #475569)',
                }}
              >
                {t.category}
              </td>
              <td
                style={{
                  ...junoCommunityStyles.td,
                  fontWeight: 800,
                  color: 'var(--accent-red, #DC2626)',
                }}
              >
                {t.slaRemaining}
              </td>
              <td style={junoCommunityStyles.td}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    background:
                      t.priority === 'CRITICAL'
                        ? 'var(--color-fef2f2, #FEF2F2)'
                        : 'var(--color-fef3c7, #FEF3C7)',
                    color:
                      t.priority === 'CRITICAL'
                        ? 'var(--accent-red, #DC2626)'
                        : 'var(--color-b45309, #B45309)',
                  }}
                >
                  {t.priority}
                </span>
              </td>
              <td
                style={{
                  ...junoCommunityStyles.td,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-1e293b, #1E293B)',
                }}
              >
                {t.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
