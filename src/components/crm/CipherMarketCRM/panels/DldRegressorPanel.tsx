import React from 'react';
import type { DldClusterItem } from '../CipherMarketCRM.types';
import { tableHeaderCellStyle } from './CipherMarketCRM.panelStyles';

export interface DldRegressorPanelProps {
  dldCluster: DldClusterItem[];
}

export const DldRegressorPanel: React.FC<DldRegressorPanelProps> = ({ dldCluster }) => (
  <div
    style={{
      background: 'var(--white, #FFFFFF)',
      borderRadius: '12px',
      border: '1px solid var(--text-secondary, #E2E8F0)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        padding: '0.75rem 1rem',
        background: 'var(--color-f8fafc, #F8FAFC)',
        borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-1e293b, #1E293B)' }}>
        Recent DLD Registered Transfers
      </span>
      <span style={{ fontSize: '0.75rem', color: 'var(--accent-teal, #0D9488)', fontWeight: 800 }}>
        Live Telemetry Sync
      </span>
    </div>
    <table
      style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}
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
          <th style={tableHeaderCellStyle}>DLD Ref</th>
          <th style={tableHeaderCellStyle}>Property Unit</th>
          <th style={tableHeaderCellStyle}>Area (SqFt)</th>
          <th style={tableHeaderCellStyle}>Transfer Price</th>
          <th style={tableHeaderCellStyle}>Price / SqFt</th>
          <th style={tableHeaderCellStyle}>Type</th>
        </tr>
      </thead>
      <tbody>
        {dldCluster.map(d => (
          <tr key={d.ref} style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 800,
                color: 'var(--accent-teal, #0D9488)',
              }}
            >
              {d.ref}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 700,
                color: 'var(--color-1e293b, #1E293B)',
              }}
            >
              {d.unit}
            </td>
            <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #64748B)' }}>
              {d.sqft.toLocaleString()}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 800,
                color: 'var(--color-1e293b, #1E293B)',
              }}
            >
              AED {d.priceAed.toLocaleString()}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 700,
                color: 'var(--accent-teal, #0D9488)',
              }}
            >
              AED {d.rateSqft.toLocaleString()}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary, #64748B)',
              }}
            >
              {d.type}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
