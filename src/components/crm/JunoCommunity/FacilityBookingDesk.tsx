import * as React from 'react';
import type { Booking } from './types';
import { junoCommunityStyles } from './styles';

export interface FacilityBookingDeskProps {
  bookings: Booking[];
}

export const FacilityBookingDesk: React.FC<FacilityBookingDeskProps> = ({ bookings }) => {
  return (
    <div style={junoCommunityStyles.card}>
      <table style={junoCommunityStyles.table}>
        <thead>
          <tr style={junoCommunityStyles.tableHeadRow}>
            <th style={junoCommunityStyles.th}>Booking ID</th>
            <th style={junoCommunityStyles.th}>Amenity Facility</th>
            <th style={junoCommunityStyles.th}>Tenant Name & Unit</th>
            <th style={junoCommunityStyles.th}>Date</th>
            <th style={junoCommunityStyles.th}>Slot</th>
            <th style={junoCommunityStyles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id} style={junoCommunityStyles.tr}>
              <td
                style={{
                  ...junoCommunityStyles.td,
                  fontWeight: 800,
                  color: 'var(--accent-purple, #7C3AED)',
                }}
              >
                {b.id}
              </td>
              <td
                style={{
                  ...junoCommunityStyles.td,
                  fontWeight: 700,
                  color: 'var(--color-1e293b, #1E293B)',
                }}
              >
                {b.amenity}
              </td>
              <td
                style={{
                  ...junoCommunityStyles.td,
                  color: 'var(--color-475569, #475569)',
                }}
              >
                {b.tenant}
              </td>
              <td
                style={{
                  ...junoCommunityStyles.td,
                  color: 'var(--text-secondary, #64748B)',
                }}
              >
                {b.date}
              </td>
              <td
                style={{
                  ...junoCommunityStyles.td,
                  fontWeight: 700,
                  color: 'var(--color-1e293b, #1E293B)',
                }}
              >
                {b.time}
              </td>
              <td style={junoCommunityStyles.td}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    background:
                      b.status === 'CONFIRMED'
                        ? 'var(--color-ecfdf5, #ECFDF5)'
                        : 'var(--color-fef3c7, #FEF3C7)',
                    color:
                      b.status === 'CONFIRMED'
                        ? 'var(--color-047857, #047857)'
                        : 'var(--color-b45309, #B45309)',
                  }}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
