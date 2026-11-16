/**
 * Owner Dashboard — Panels Layer (Mary Allen Wilkes Architecture)
 * Portfolio KPI metrics cards and properties table
 */

import React from 'react';
import { Home, TrendingUp, DollarSign, Users } from 'lucide-react';
import type { OwnerMetrics, OwnerPropertyItem } from './OwnerDashboard.types';

export const OwnerMetricsCards: React.FC<{ metrics: OwnerMetrics }> = ({ metrics }) => (
  <div
    className="owner-metrics-grid"
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
          PORTFOLIO UNITS
        </span>
        <Home size={18} color="#3B82F6" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E293B', marginTop: '6px' }}>
        {metrics.totalProperties}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '4px' }}>
        {metrics.occupancyRate} Occupancy
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
          MONTHLY GROSS RENT
        </span>
        <DollarSign size={18} color="#10B981" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16A34A', marginTop: '6px' }}>
        {metrics.totalMonthlyRent}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
        Net: {metrics.netIncome}
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
        <TrendingUp size={18} color="#F59E0B" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D97706', marginTop: '6px' }}>
        {metrics.yearlyROI}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '4px' }}>
        Target: 10.0% (+2.5%)
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
          ACTIVE TENANTS
        </span>
        <Users size={18} color="#8B5CF6" />
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7C3AED', marginTop: '6px' }}>
        {metrics.occupiedUnits}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
        2 Vacancies Available
      </div>
    </div>
  </div>
);

export const OwnerPropertiesTable: React.FC<{ properties: OwnerPropertyItem[] }> = ({
  properties,
}) => (
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
      Managed Properties & Tenancy Status
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
          <th style={{ padding: '10px 14px' }}>Property</th>
          <th style={{ padding: '10px 14px' }}>Location</th>
          <th style={{ padding: '10px 14px' }}>Monthly Rent</th>
          <th style={{ padding: '10px 14px' }}>Tenant</th>
          <th style={{ padding: '10px 14px' }}>Lease Expiry</th>
          <th style={{ padding: '10px 14px' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {properties.map(p => (
          <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
            <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1E293B' }}>
              <span style={{ marginRight: 6 }}>{p.image}</span>
              {p.name}
            </td>
            <td style={{ padding: '10px 14px', color: '#64748B' }}>{p.location}</td>
            <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0F766E' }}>
              {p.monthlyRent}
            </td>
            <td style={{ padding: '10px 14px', color: '#334155' }}>{p.tenant}</td>
            <td style={{ padding: '10px 14px', color: '#64748B', fontSize: '0.78rem' }}>
              {p.leaseExpiry}
            </td>
            <td style={{ padding: '10px 14px' }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  background: p.status === 'occupied' ? '#DCFCE7' : '#FEF3C7',
                  color: p.status === 'occupied' ? '#166534' : '#92400E',
                }}
              >
                {p.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

