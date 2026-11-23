import React from 'react';
import type { SnagItem } from './types';

interface VestaSnaggingTableProps {
  snags: SnagItem[];
}

export const VestaSnaggingTable: React.FC<VestaSnaggingTableProps> = ({ snags }) => {
  return (
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
            <th style={{ padding: '10px 14px' }}>Snag ID</th>
            <th style={{ padding: '10px 14px' }}>Location / Room</th>
            <th style={{ padding: '10px 14px' }}>Defect Description</th>
            <th style={{ padding: '10px 14px' }}>Assigned Contractor</th>
            <th style={{ padding: '10px 14px' }}>Severity</th>
            <th style={{ padding: '10px 14px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {snags.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}>
              <td
                style={{
                  padding: '10px 14px',
                  fontWeight: 800,
                  color: 'var(--accent-gold, #D97706)',
                }}
              >
                {s.id}
              </td>
              <td
                style={{
                  padding: '10px 14px',
                  fontWeight: 700,
                  color: 'var(--color-1e293b, #1E293B)',
                }}
              >
                {s.room}
              </td>
              <td style={{ padding: '10px 14px', color: 'var(--color-475569, #475569)' }}>
                {s.item}
              </td>
              <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #64748B)' }}>
                {s.contractor}
              </td>
              <td style={{ padding: '10px 14px' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    background:
                      s.priority === 'HIGH'
                        ? 'var(--color-fef2f2, #FEF2F2)'
                        : 'var(--color-fef3c7, #FEF3C7)',
                    color:
                      s.priority === 'HIGH'
                        ? 'var(--accent-red, #DC2626)'
                        : 'var(--color-b45309, #B45309)',
                  }}
                >
                  {s.priority}
                </span>
              </td>
              <td style={{ padding: '10px 14px' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    background:
                      s.status === 'RECTIFIED'
                        ? 'var(--color-ecfdf5, #ECFDF5)'
                        : 'var(--color-eff6ff, #EFF6FF)',
                    color:
                      s.status === 'RECTIFIED'
                        ? 'var(--color-047857, #047857)'
                        : 'var(--color-1e40af, #1E40AF)',
                  }}
                >
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
