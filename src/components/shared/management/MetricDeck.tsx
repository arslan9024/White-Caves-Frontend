/**
 * MetricDeck.tsx — Reusable Executive KPI & Statutory Metric Deck
 * Shared across DMS, TMS, ERMS, and MD Executive Cockpit (AEG-042 < 350 lines).
 */
import React, { FC } from 'react';

export interface MetricDeckItem {
  id: string;
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface MetricDeckProps {
  items: MetricDeckItem[];
}

export const MetricDeck: FC<MetricDeckProps> = React.memo(({ items }) => (
  <div
    data-testid="shared-metric-deck"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '14px',
      width: '100%',
    }}
  >
    {items.map(item => (
      <div
        key={item.id}
        onClick={item.onClick}
        style={{
          backgroundColor: '#1E293B',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '14px 18px',
          cursor: item.onClick ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFFFF',
        }}
      >
        <div>
          <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>{item.label}</div>
          <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '4px' }}>{item.value}</div>
          {item.sublabel && (
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              {item.sublabel}
            </div>
          )}
        </div>
        {item.icon && (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.icon}
          </div>
        )}
      </div>
    ))}
  </div>
));

MetricDeck.displayName = 'MetricDeck';
export default MetricDeck;
