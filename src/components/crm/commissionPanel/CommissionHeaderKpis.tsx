import React, { FC } from 'react';
import {
  RED,
  WHITE,
  SLATE,
  BORDER,
  CARD_BG,
  TEXT_MUTED,
  GREEN,
  ORANGE,
} from '../CommissionManagementPanel.data';
import type { CommissionTab, KpiTotals } from './types';

interface CommissionHeaderKpisProps {
  totals: KpiTotals;
  activeTab: CommissionTab;
  onTabChange: (tab: CommissionTab) => void;
  onExportAll: () => void;
}

export const CommissionHeaderKpis: FC<CommissionHeaderKpisProps> = ({
  totals,
  activeTab,
  onTabChange,
  onExportAll,
}) => {
  const kpiCards = [
    {
      label: 'Total Gross Commission',
      value: `AED ${(totals.totalGross / 1000).toFixed(0)}K`,
      color: SLATE,
    },
    {
      label: 'Paid Out YTD',
      value: `AED ${(totals.totalPaid / 1000).toFixed(0)}K`,
      color: GREEN,
    },
    {
      label: 'Pending Payouts',
      value: `AED ${(totals.totalPending / 1000).toFixed(0)}K`,
      color: ORANGE,
    },
    {
      label: 'VAT Collected (5%)',
      value: `AED ${(totals.totalVAT / 1000).toFixed(0)}K`,
      color: RED,
    },
  ];

  return (
    <>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: SLATE }}>
            💰 Commission Management
          </h2>
          <p style={{ margin: '6px 0 0 0', color: TEXT_MUTED, fontSize: '0.875rem' }}>
            Agent commission ledger · Split calculations · VAT 5% · Payout approval workflow
          </p>
        </div>
        <button
          onClick={onExportAll}
          style={{
            background: RED,
            color: WHITE,
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.875rem',
          }}
        >
          📥 Export All Statements
        </button>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '14px',
          marginBottom: '20px',
        }}
      >
        {kpiCards.map(s => (
          <div
            key={s.label}
            style={{
              background: CARD_BG,
              padding: '16px',
              borderRadius: '8px',
              borderLeft: `4px solid ${s.color}`,
            }}
          >
            <div
              style={{
                fontSize: '0.72rem',
                color: TEXT_MUTED,
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: s.color, marginTop: '4px' }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `2px solid ${BORDER}`, marginBottom: '20px' }}>
        {(['ledger', 'summary'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? `3px solid ${RED}` : '3px solid transparent',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? RED : TEXT_MUTED,
              fontSize: '0.9rem',
              marginBottom: '-2px',
            }}
          >
            {tab === 'ledger' ? '📊 Commission Ledger' : '👥 Agent Summary'}
          </button>
        ))}
      </div>
    </>
  );
};
