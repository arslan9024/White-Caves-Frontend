/**
 * Import History Page — Panels Layer (Mary Allen Wilkes Architecture)
 * Filter toolbars, import batch tables, and pagination controls
 */

import React from 'react';
import type { ImportBatchItem } from './ImportHistoryPage.types';

export const ImportHistoryControls: React.FC<{
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filterStatus: string;
  onFilterChange: (s: string) => void;
  sortBy: string;
  onSortChange: (s: string) => void;
  onRefresh: () => void;
}> = ({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  sortBy,
  onSortChange,
  onRefresh,
}) => (
  <div
    className="import-history-controls"
    style={{
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
      marginBottom: '1.25rem',
      alignItems: 'center',
    }}
  >
    <input
      type="text"
      placeholder="Search imported inventory files..."
      value={searchQuery}
      onChange={e => onSearchChange(e.target.value)}
      style={{
        flex: 1,
        padding: '8px 12px',
        borderRadius: 6,
        border: '1px solid #CBD5E1',
        fontSize: '0.85rem',
        minWidth: 200,
      }}
    />
    <select
      value={filterStatus}
      onChange={e => onFilterChange(e.target.value)}
      style={{
        padding: '8px 12px',
        borderRadius: 6,
        border: '1px solid #CBD5E1',
        fontSize: '0.85rem',
      }}
    >
      <option value="all">All Statuses</option>
      <option value="completed">Completed</option>
      <option value="failed">Failed</option>
      <option value="processing">Processing</option>
    </select>
    <select
      value={sortBy}
      onChange={e => onSortChange(e.target.value)}
      style={{
        padding: '8px 12px',
        borderRadius: 6,
        border: '1px solid #CBD5E1',
        fontSize: '0.85rem',
      }}
    >
      <option value="date">Most Recent</option>
      <option value="records">Total Records</option>
    </select>
    <button
      onClick={onRefresh}
      style={{
        padding: '8px 14px',
        borderRadius: 6,
        border: '1px solid #CBD5E1',
        background: '#FFFFFF',
        cursor: 'pointer',
        fontSize: '0.82rem',
      }}
    >
      🔄 Refresh
    </button>
  </div>
);

export const ImportHistoryTable: React.FC<{
  imports: ImportBatchItem[];
  isLoading: boolean;
  onSelect: (imp: ImportBatchItem) => void;
}> = ({ imports, isLoading, onSelect }) => {
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
        Loading import batches...
      </div>
    );
  }

  if (imports.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem',
          background: '#FFFFFF',
          borderRadius: 8,
          border: '1px solid #E2E8F0',
          color: '#64748B',
        }}
      >
        No historical inventory imports found.
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 8,
        border: '1px solid #E2E8F0',
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
              background: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              color: '#475569',
              fontWeight: 800,
            }}
          >
            <th style={{ padding: '10px 14px' }}>File Name</th>
            <th style={{ padding: '10px 14px' }}>Source</th>
            <th style={{ padding: '10px 14px' }}>Success / Total</th>
            <th style={{ padding: '10px 14px' }}>Status</th>
            <th style={{ padding: '10px 14px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {imports.map(imp => (
            <tr
              key={imp.id}
              onClick={() => onSelect(imp)}
              style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}
            >
              <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1E293B' }}>
                {imp.fileName}
              </td>
              <td style={{ padding: '10px 14px', color: '#64748B' }}>{imp.sourceType}</td>
              <td style={{ padding: '10px 14px', fontWeight: 700 }}>
                <span style={{ color: '#16A34A' }}>{imp.successfulRecords}</span> /{' '}
                {imp.totalRecords}
              </td>
              <td style={{ padding: '10px 14px' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    background: imp.status === 'completed' ? '#DCFCE7' : '#FEE2E2',
                    color: imp.status === 'completed' ? '#166534' : '#991B1B',
                  }}
                >
                  {imp.status}
                </span>
              </td>
              <td style={{ padding: '10px 14px', color: '#64748B', fontSize: '0.78rem' }}>
                {new Date(imp.uploadedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
