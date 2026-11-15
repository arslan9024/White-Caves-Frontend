import React, { useState } from 'react';
import { PDCCheque, PDCStatus } from '../data/leasing';
import { STATUS_FILTERS } from './PDCPaymentsTab.helpers';
import { PDCChequeRow } from './PDCChequeRow';

export interface PDCPaymentsTabProps {
  pdcCheques: PDCCheque[];
  onUpdateStatus: (id: number, status: PDCStatus) => void;
}

export const PDCPaymentsTab: React.FC<PDCPaymentsTabProps> = ({ pdcCheques, onUpdateStatus }) => {
  const [filterStatus, setFilterStatus] = useState<PDCStatus | 'all'>('all');
  const [localCheques, setLocalCheques] = useState<PDCCheque[]>(pdcCheques);

  const handleUpdate = (id: number, status: PDCStatus) => {
    const today = new Date().toISOString().split('T')[0];
    setLocalCheques(prev =>
      prev.map(c => {
        if (c.id !== id) return c;
        return {
          ...c,
          status,
          presentedDate: status === 'presented' ? today : c.presentedDate,
          clearedDate: status === 'cleared' ? today : c.clearedDate,
        };
      })
    );
    onUpdateStatus(id, status);
  };

  const filtered =
    filterStatus === 'all' ? localCheques : localCheques.filter(c => c.status === filterStatus);

  const stats = {
    total: localCheques.length,
    cleared: localCheques.filter(c => c.status === 'cleared').length,
    presented: localCheques.filter(c => c.status === 'presented').length,
    pending: localCheques.filter(c => c.status === 'pending').length,
    bounced: localCheques.filter(c => c.status === 'bounced').length,
  };

  const totalValue = localCheques.reduce((s, c) => s + c.amount, 0);
  const clearedValue = localCheques
    .filter(c => c.status === 'cleared')
    .reduce((s, c) => s + c.amount, 0);

  return (
    <div className="pdc-view">
      <div className="view-header" style={{ marginBottom: '16px' }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--color-text-primary)' }}>PDC Cheque Management</h3>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            {stats.total} cheques · AED {totalValue.toLocaleString()} total · AED{' '}
            {clearedValue.toLocaleString()} cleared
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        {[
          { label: 'Total', value: stats.total, color: '#94A3B8' },
          { label: 'Cleared', value: stats.cleared, color: '#10B981' },
          { label: 'Presented', value: stats.presented, color: '#60A5FA' },
          { label: 'Pending', value: stats.pending, color: '#F59E0B' },
          { label: 'Bounced', value: stats.bounced, color: '#EF4444' },
        ].map(s => (
          <div
            key={s.label}
            style={{
              background: 'var(--rgba-white-05)',
              border: '1px solid var(--rgba-white-10)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '24px', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div
              style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="filter-buttons" style={{ marginBottom: '16px' }}>
        {STATUS_FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid',
              fontSize: '13px',
              cursor: 'pointer',
              borderColor: filterStatus === f ? '#14B8A6' : 'var(--color-border-default)',
              background: filterStatus === f ? 'rgba(20,184,166,0.15)' : 'var(--rgba-white-05)',
              color: filterStatus === f ? '#14B8A6' : 'var(--color-text-secondary)',
            }}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: '700px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr 1.2fr 0.8fr 1fr 1fr 1fr 1.2fr',
              padding: '10px 14px',
              background: 'var(--rgba-white-05)',
              borderRadius: '8px 8px 0 0',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              borderBottom: '1px solid var(--rgba-white-10)',
            }}
          >
            <span>Cheque #</span>
            <span>Bank</span>
            <span>Tenant</span>
            <span>Unit</span>
            <span>Amount (AED)</span>
            <span>Due Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {filtered.map((cheque: PDCCheque) => (
            <PDCChequeRow key={cheque.id} cheque={cheque} onUpdate={handleUpdate} />
          ))}

          {filtered.length === 0 && (
            <div
              style={{
                padding: '40px',
                textAlign: 'center',
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
                background: 'var(--rgba-white-05)',
                borderRadius: '0 0 8px 8px',
              }}
            >
              No cheques match the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDCPaymentsTab;
