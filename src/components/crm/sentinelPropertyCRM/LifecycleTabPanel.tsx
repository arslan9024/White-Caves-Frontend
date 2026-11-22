import React from 'react';
import { RefreshCw } from 'lucide-react';
import type { SentinelProperty } from './types';

interface LifecycleTabPanelProps {
  properties: SentinelProperty[];
  onAdvanceStage: (id: string) => void;
}

export const LifecycleTabPanel: React.FC<LifecycleTabPanelProps> = ({
  properties,
  onAdvanceStage,
}) => {
  return (
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
        <span
          style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-1e293b, #1E293B)' }}
        >
          Managed Units State Machine
        </span>
        <span
          style={{ fontSize: '0.75rem', color: 'var(--accent-blue, #2563EB)', fontWeight: 800 }}
        >
          Click Stage to Transition
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
            <th style={{ padding: '10px 14px' }}>Property Ref</th>
            <th style={{ padding: '10px 14px' }}>Title & Description</th>
            <th style={{ padding: '10px 14px' }}>Price</th>
            <th style={{ padding: '10px 14px' }}>Current Lifecycle State</th>
            <th style={{ padding: '10px 14px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}>
              <td
                style={{
                  padding: '10px 14px',
                  fontWeight: 800,
                  color: 'var(--accent-blue, #2563EB)',
                }}
              >
                {p.id}
              </td>
              <td
                style={{
                  padding: '10px 14px',
                  fontWeight: 700,
                  color: 'var(--color-1e293b, #1E293B)',
                }}
              >
                {p.title}
              </td>
              <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #64748B)' }}>
                AED {p.priceAed}
              </td>
              <td style={{ padding: '10px 14px' }}>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    background:
                      p.currentStage === 'LISTED'
                        ? 'var(--color-ecfdf5, #ECFDF5)'
                        : p.currentStage === 'UNDER_OFFER'
                          ? 'var(--color-fef3c7, #FEF3C7)'
                          : 'var(--color-eff6ff, #EFF6FF)',
                    color:
                      p.currentStage === 'LISTED'
                        ? 'var(--color-047857, #047857)'
                        : p.currentStage === 'UNDER_OFFER'
                          ? 'var(--color-b45309, #B45309)'
                          : 'var(--color-1e40af, #1E40AF)',
                  }}
                >
                  {p.currentStage}
                </span>
              </td>
              <td style={{ padding: '10px 14px' }}>
                <button
                  onClick={() => onAdvanceStage(p.id)}
                  style={{
                    background: 'var(--color-f1f5f9, #F1F5F9)',
                    border: '1px solid var(--text-secondary, #CBD5E1)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <RefreshCw size={12} /> Advance Stage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
