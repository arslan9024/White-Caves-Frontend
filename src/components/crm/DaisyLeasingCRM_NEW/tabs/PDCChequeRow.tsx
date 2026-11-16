import React from 'react';
import { PDCCheque, PDCStatus } from '../data/leasing';
import { STATUS_COLORS, isOverdue, isDueSoon } from './PDCPaymentsTab.helpers';

export interface PDCChequeRowProps {
  cheque: PDCCheque;
  onUpdate: (id: number, status: PDCStatus) => void;
}

export const PDCChequeRow: React.FC<PDCChequeRowProps> = ({ cheque, onUpdate }) => {
  const sCol = STATUS_COLORS[cheque.status];
  const overdue = isOverdue(cheque.dueDate, cheque.status);
  const dueSoon = isDueSoon(cheque.dueDate, cheque.status);

  let rowBg = 'transparent';
  if (cheque.status === 'bounced') rowBg = 'rgba(239,68,68,0.07)';
  else if (overdue) rowBg = 'rgba(239,68,68,0.05)';
  else if (dueSoon) rowBg = 'rgba(245,158,11,0.06)';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1.2fr 0.8fr 1fr 1fr 1fr 1.2fr',
        padding: '12px 14px',
        borderBottom: '1px solid var(--rgba-white-10)',
        fontSize: '13px',
        alignItems: 'center',
        background: rowBg,
        transition: 'background 0.15s',
      }}
    >
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: '12px',
          color: 'var(--color-text-primary)',
        }}
      >
        {cheque.chequeNumber}
      </span>
      <span style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
        {cheque.bankName}
      </span>
      <span style={{ color: 'var(--color-text-primary)' }}>{cheque.tenantName}</span>
      <span style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>
        {cheque.unit}
      </span>
      <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
        {cheque.amount.toLocaleString()}
      </span>
      <span
        style={{
          color: overdue
            ? '#EF4444'
            : dueSoon
              ? '#F59E0B'
              : 'var(--color-text-secondary)',
          fontSize: '12px',
        }}
      >
        {cheque.dueDate}
        {overdue && (
          <span style={{ marginLeft: '4px', fontSize: '10px' }}>🔴 Overdue</span>
        )}
        {dueSoon && !overdue && (
          <span style={{ marginLeft: '4px', fontSize: '10px' }}>⚠️ Soon</span>
        )}
      </span>
      <span>
        {cheque.status === 'bounced' ? (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              padding: '3px 8px',
              borderRadius: '4px',
              background: sCol.bg,
              color: sCol.text,
            }}
          >
            ⚠️ Bounced
          </span>
        ) : (
          <span
            style={{
              fontSize: '12px',
              padding: '3px 8px',
              borderRadius: '4px',
              background: sCol.bg,
              color: sCol.text,
            }}
          >
            {cheque.status}
          </span>
        )}
      </span>
      <span style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {cheque.status === 'pending' && (
          <button
            onClick={() => onUpdate(cheque.id, 'presented')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #60A5FA',
              background: 'rgba(59,130,246,0.1)',
              color: '#60A5FA',
              fontSize: '11px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Mark Presented
          </button>
        )}
        {cheque.status === 'presented' && (
          <>
            <button
              onClick={() => onUpdate(cheque.id, 'cleared')}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #10B981',
                background: 'rgba(16,185,129,0.1)',
                color: '#10B981',
                fontSize: '11px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Mark Cleared
            </button>
            <button
              onClick={() => onUpdate(cheque.id, 'bounced')}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #EF4444',
                background: 'rgba(239,68,68,0.1)',
                color: '#EF4444',
                fontSize: '11px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Mark Bounced
            </button>
          </>
        )}
        {cheque.status === 'bounced' && (
          <button
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #F59E0B',
              background: 'rgba(245,158,11,0.1)',
              color: '#F59E0B',
              fontSize: '11px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Request Replacement
          </button>
        )}
        {cheque.notes && (
          <span
            title={cheque.notes}
            style={{ fontSize: '11px', color: 'var(--text-secondary, #64748B)', cursor: 'help' }}
          >
            📝
          </span>
        )}
      </span>
    </div>
  );
};

