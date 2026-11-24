import { ActiveLease, PDCCheque, RentalInquiry } from '../data/leasing';

export type PnLSummary = {
  totalMRR: number;
  totalAnnualRent: number;
  totalCommission: number;
  totalMaintenanceCost: number;
  netIncome: number;
};

export interface AnalyticsTabProps {
  leases: ActiveLease[];
  pdcCheques: PDCCheque[];
  inquiries: RentalInquiry[];
  pnl: PnLSummary;
}

import React from 'react';

export const KPICard: React.FC<{ label: string; value: string; sub?: string; color: string }> = ({
  label,
  value,
  sub,
  color,
}) => (
  <div
    style={{
      background: 'var(--rgba-white-05)',
      border: `1px solid ${color}33`,
      borderRadius: '12px',
      padding: '18px',
      borderLeft: `3px solid ${color}`,
    }}
  >
    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
      {label}
    </div>
    <div style={{ fontSize: '22px', fontWeight: 700, color, marginBottom: '4px' }}>{value}</div>
    {sub && <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{sub}</div>}
  </div>
);

export const ProgressBar: React.FC<{ label: string; pct: number; color: string; value?: string }> = ({
  label,
  pct,
  color,
  value,
}) => (
  <div style={{ marginBottom: '10px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
      <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{label}</span>
      <span style={{ fontSize: '12px', color, fontWeight: 600 }}>
        {value ?? `${pct.toFixed(1)}%`}
      </span>
    </div>
    <div
      style={{
        height: '8px',
        background: 'var(--rgba-white-10)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${Math.min(pct, 100)}%`,
          height: '100%',
          background: color,
          borderRadius: '4px',
          transition: 'width 0.3s',
