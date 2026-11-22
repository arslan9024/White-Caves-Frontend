import React, { FC } from 'react';
import {
  RED,
  WHITE,
  SLATE,
  CARD_BG,
  TEXT_MUTED,
  GREEN,
  ORANGE,
  BLUE,
  PURPLE,
  type CommissionRecord,
  statusConfig,
} from '../CommissionManagementPanel.data';
import type { BreakdownRow } from './types';

interface CommissionDetailPanelProps {
  record: CommissionRecord;
  onClose: () => void;
  onApprove: (id: string) => void;
  onMarkPaid: (id: string) => void;
  onFlagDisputed: (id: string) => void;
  onGenerateStatement: (agentName: string, color: string) => void;
}

export const CommissionDetailPanel: FC<CommissionDetailPanelProps> = ({
  record,
  onClose,
  onApprove,
  onMarkPaid,
  onFlagDisputed,
  onGenerateStatement,
}) => {
  const breakdownRows: BreakdownRow[] = [
    {
      label: 'Transaction Value',
      value: `AED ${record.transactionValueAED.toLocaleString()}`,
      bold: false,
    },
    {
      label: `Commission Rate (${record.commissionRatePct}%)`,
      value: `AED ${record.grossCommissionAED.toLocaleString()}`,
      bold: false,
    },
    {
      label: `Agent Split (${record.agentSplitPct}%)`,
      value: `AED ${record.agentEarningsAED.toLocaleString()}`,
      bold: true,
      color: GREEN,
    },
    {
      label: `Company Retention (${100 - record.agentSplitPct}%)`,
      value: `AED ${record.companyRetentionAED.toLocaleString()}`,
      bold: false,
    },
    {
      label: 'VAT 5%',
      value: `AED ${record.vatAED.toLocaleString()}`,
      bold: false,
      color: ORANGE,
    },
    {
      label: 'Total Payable to Agent',
      value: `AED ${record.totalPayableAED.toLocaleString()}`,
      bold: true,
      color: RED,
    },
  ];

  return (
    <div
      style={{
        background: CARD_BG,
        padding: '20px',
        borderRadius: '10px',
        border: `2px solid ${statusConfig[record.status].color}40`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>{record.dealReference}</h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: TEXT_MUTED,
          }}
        >
          ✕
        </button>
      </div>

      {/* Commission Breakdown */}
      <div
        style={{
          background: WHITE,
          padding: '14px',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: RED,
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}
        >
          Commission Breakdown
        </div>
        {breakdownRows.map(row => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 0',
              borderBottom: '1px dashed var(--text-secondary, #E2E8F0)',
              fontSize: '0.8rem',
            }}
          >
            <span style={{ color: TEXT_MUTED }}>{row.label}</span>
            <span
              style={{
                fontWeight: row.bold ? 900 : 600,
                color: row.color || SLATE,
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {record.status === 'Pending' && (
          <button
            onClick={() => onApprove(record.id)}
            style={{
              padding: '9px',
              background: BLUE,
              color: WHITE,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            ✔️ Approve Commission
          </button>
        )}
        {record.status === 'Approved' && (
          <button
            onClick={() => onMarkPaid(record.id)}
            style={{
              padding: '9px',
              background: GREEN,
              color: WHITE,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            💰 Mark as Paid
          </button>
        )}
        <button
          onClick={() => onGenerateStatement(record.agentName, PURPLE)}
          style={{
            padding: '9px',
            background: SLATE,
            color: WHITE,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.8rem',
          }}
        >
          📄 Generate Statement PDF
        </button>
        {record.status === 'Pending' && (
          <button
            onClick={() => onFlagDisputed(record.id)}
            style={{
              padding: '9px',
              background: '#FEF2F2',
              color: RED,
              border: `1px solid ${RED}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            ⚠️ Flag as Disputed
          </button>
        )}
      </div>
    </div>
  );
};
