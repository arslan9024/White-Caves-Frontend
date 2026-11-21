import React, { type FC } from 'react';
import type { AtlasProject } from './types';

interface DeveloperTrackerTabProps {
  projects: AtlasProject[];
}

export const DeveloperTrackerTab: FC<DeveloperTrackerTabProps> = ({ projects }) => (
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
        Master Developer Off-Plan Matrix
      </span>
      <span
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary, #64748B)',
          fontWeight: 700,
        }}
      >
        {projects.length} Active Key Projects
      </span>
    </div>
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
            background: 'var(--color-f8fafc, #F8FAFC)',
            borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
            color: 'var(--color-475569, #475569)',
            fontWeight: 800,
          }}
        >
          <th style={{ padding: '10px 14px' }}>Project Name</th>
          <th style={{ padding: '10px 14px' }}>Developer</th>
          <th style={{ padding: '10px 14px' }}>Location</th>
          <th style={{ padding: '10px 14px' }}>DLD Progress</th>
          <th style={{ padding: '10px 14px' }}>DLD Escrow Balance</th>
          <th style={{ padding: '10px 14px' }}>Target Handover</th>
          <th style={{ padding: '10px 14px' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(p => (
          <tr key={p.id} style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 800,
                color: 'var(--color-1e293b, #1E293B)',
              }}
            >
              {p.name}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 700,
                color: 'var(--color-ea580c, #EA580C)',
              }}
            >
              {p.developer}
            </td>
            <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #64748B)' }}>
              {p.area}
            </td>
            <td style={{ padding: '10px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '80px',
                    height: '6px',
                    background: 'var(--text-secondary, #E2E8F0)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${p.progressPct}%`,
                      height: '100%',
                      background: 'var(--color-ea580c, #EA580C)',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>{p.progressPct}%</span>
              </div>
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 700,
                color: 'var(--accent-green, #10B981)',
              }}
            >
              {p.escrowBalance}
            </td>
            <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #64748B)' }}>
              {p.completion}
            </td>
            <td style={{ padding: '10px 14px' }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  background: 'var(--color-ecfdf5, #ECFDF5)',
                  color: 'var(--color-047857, #047857)',
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
