/**
 * EntityDataGrid.tsx — Reusable Normalized Entity Data Grid across DMS, TMS, and ERMS
 * Memoized to prevent redundant parent/sidebar re-renders (AEG-042 < 350 lines).
 */
import React, { FC } from 'react';
import { StatutoryStatusBadge, StatutoryStatus } from './StatutoryStatusBadge';

export interface EntityGridRow {
  id: string;
  code: string;
  name: string;
  roleOrType: string;
  departmentCode?: string;
  status?: StatutoryStatus;
}

export interface EntityDataGridProps {
  title: string;
  rows: EntityGridRow[];
  onSelectRow?: (row: EntityGridRow) => void;
}

export const EntityDataGrid: FC<EntityDataGridProps> = React.memo(
  ({ title, rows, onSelectRow }) => (
    <div
      data-testid="shared-entity-data-grid"
      style={{
        backgroundColor: '#0F172A',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        overflow: 'hidden',
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 800 }}>{title}</span>
        <span style={{ fontSize: '11px', color: '#94A3B8' }}>{rows.length} Records</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#1E293B', color: '#94A3B8', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px' }}>Code</th>
              <th style={{ padding: '10px 14px' }}>Entity Name</th>
              <th style={{ padding: '10px 14px' }}>Role / Type</th>
              <th style={{ padding: '10px 14px' }}>Department</th>
              <th style={{ padding: '10px 14px' }}>Statutory Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr
                key={row.id}
                onClick={() => onSelectRow?.(row)}
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: onSelectRow ? 'pointer' : 'default',
                }}
              >
                <td
                  style={{
                    padding: '10px 14px',
                    fontFamily: 'monospace',
                    color: '#EF4444',
                    fontWeight: 700,
                  }}
                >
                  {row.code}
                </td>
                <td style={{ padding: '10px 14px', fontWeight: 600 }}>{row.name}</td>
                <td style={{ padding: '10px 14px', color: '#CBD5E1' }}>{row.roleOrType}</td>
                <td style={{ padding: '10px 14px', color: '#94A3B8' }}>
                  {row.departmentCode || '—'}
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <StatutoryStatusBadge status={row.status || 'COMPLIANT'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
);

EntityDataGrid.displayName = 'EntityDataGrid';
export default EntityDataGrid;
