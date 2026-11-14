/**
 * Investor Dashboard — Panels Layer (Mary Allen Wilkes Architecture)
 * Portfolio KPI metrics cards and asset allocation table
 */

import React from 'react';
import { DollarSign, TrendingUp, Target, Activity } from 'lucide-react';
import type { InvestorMetrics, PortfolioAssetItem } from './InvestorDashboard.types';

export const InvestorMetricsCards: React.FC<{ metrics: InvestorMetrics }> = ({ metrics }) => (
  <div
    className="investor-metrics-grid"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1.25rem',
    }}
  >
    <div
      style={{
        background: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>
          PORTFOLIO VALUE
        </span>
        <DollarSign size={18} color="#0F766E" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E293B', marginTop: '6px' }}>
        {metrics.portfolioValue}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '4px' }}>
        Cost Basis: {metrics.totalInvested}
      </div>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>
          TOTAL CAPITAL GAIN
        </span>
        <TrendingUp size={18} color="#10B981" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16A34A', marginTop: '6px' }}>
        {metrics.totalGain}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '4px' }}>
        {metrics.gainPercentage} Unrealized Gain
      </div>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>
          ANNUALIZED ROI
        </span>
        <Target size={18} color="#F59E0B" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D97706', marginTop: '6px' }}>
        {metrics.yearlyROI}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
        Benchmark: 12.0%
      </div>
    </div>

    <div
      style={{
        background: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>
          DIVERSIFICATION
        </span>
        <Activity size={18} color="#7C3AED" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7C3AED', marginTop: '6px' }}>
        {metrics.diversificationScore}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
        Risk Rating: {metrics.riskLevel}
      </div>
    </div>
  </div>
);

export const PortfolioAssetTable: React.FC<{ assets: PortfolioAssetItem[] }> = ({ assets }) => (
  <div
    style={{
      background: '#FFFFFF',
      borderRadius: '10px',
      border: '1px solid #E2E8F0',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid #E2E8F0',
        fontWeight: 800,
        fontSize: '0.95rem',
        color: '#1E293B',
      }}
    >
      Asset Allocation & Gain Analysis
    </div>
    <table
      style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}
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
          <th style={{ padding: '10px 14px' }}>Asset Category</th>
          <th style={{ padding: '10px 14px' }}>Invested</th>
          <th style={{ padding: '10px 14px' }}>Current Value</th>
          <th style={{ padding: '10px 14px' }}>Total Gain</th>
          <th style={{ padding: '10px 14px' }}>Weight</th>
          <th style={{ padding: '10px 14px' }}>ROI</th>
        </tr>
      </thead>
      <tbody>
        {assets.map(a => (
          <tr key={a.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
            <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1E293B' }}>
              <span style={{ marginRight: 6 }}>{a.image}</span>
              {a.name}
            </td>
            <td style={{ padding: '10px 14px', color: '#64748B' }}>{a.invested}</td>
            <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0F766E' }}>
              {a.currentValue}
            </td>
            <td style={{ padding: '10px 14px', fontWeight: 700, color: '#16A34A' }}>+{a.gain}</td>
            <td style={{ padding: '10px 14px', color: '#475569' }}>{a.allocation}%</td>
            <td style={{ padding: '10px 14px' }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  background: '#DCFCE7',
                  color: '#166534',
                }}
              >
                +{a.roi}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
