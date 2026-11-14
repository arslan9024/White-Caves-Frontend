import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LIVE_FEED, INDEX_CARDS, typeConfig } from './FluxCRM.data';

export const FluxFeedPanel: React.FC = () => (
  <div className="tab-content">
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 12,
        alignItems: 'center',
      }}
    >
      <h3 style={{ margin: 0 }}>Live Market Events</h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          color: '#22C55E',
          background: '#f0fdf4',
          padding: '4px 10px',
          borderRadius: 20,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#22C55E',
            display: 'inline-block',
            animation: 'pulse 2s infinite',
          }}
        />
        Live updating
      </div>
    </div>
    {LIVE_FEED.map(e => {
      const cfg = typeConfig[e.type];
      const Icon = cfg.icon;
      return (
        <div
          key={e.id}
          style={{
            display: 'flex',
            gap: 12,
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `${cfg.color}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={14} color={cfg.color} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 13 }}>{e.msg}</p>
            <span style={{ fontSize: 11, color: 'var(--text-secondary, #9ca3af)' }}>
              {e.time}
            </span>
          </div>
          {e.change && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: e.change.startsWith('+') ? '#22C55E' : '#E31E24',
                alignSelf: 'center',
              }}
            >
              {e.change}
            </span>
          )}
        </div>
      );
    })}
  </div>
);

export const FluxIndicesPanel: React.FC = () => (
  <div className="tab-content">
    {INDEX_CARDS.map(c => (
      <div
        key={c.name}
        style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: '16px 18px',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <strong>{c.name}</strong>
          <span
            style={{ fontWeight: 800, fontSize: 20, color: 'var(--accent-purple, #7C3AED)' }}
          >
            {c.value}
            {c.unit && ` ${c.unit}`}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {c.change >= 0 ? (
            <TrendingUp size={14} color="#22C55E" />
          ) : (
            <TrendingDown size={14} color="#E31E24" />
          )}
          <span
            style={{
              fontSize: 13,
              color: c.change >= 0 ? '#22C55E' : '#E31E24',
              fontWeight: 600,
            }}
          >
            {c.change >= 0 ? '+' : ''}
            {c.change}% this month
          </span>
        </div>
      </div>
    ))}
  </div>
);

export const FluxAlertsPanel: React.FC = () => (
  <div className="tab-content">
    <h3 style={{ marginBottom: 16 }}>Alert Configuration</h3>
    {[
      { rule: 'Price movement > 1% in any tracked area', active: true },
      { rule: 'Transaction volume spike > 20%', active: true },
      { rule: 'New off-plan launch in premium areas', active: false },
      { rule: 'Daily DLD transaction summary', active: true },
    ].map((a, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          padding: '12px 16px',
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 16,
            borderRadius: 8,
            background: a.active ? '#22C55E' : '#e5e7eb',
            position: 'relative',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 2,
              [a.active ? 'right' : 'left']: 2,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#fff',
            }}
          />
        </div>
        <span
          style={{
            fontSize: 13,
            color: a.active
              ? 'var(--color-111827, #111827)'
              : 'var(--text-secondary, #9ca3af)',
          }}
        >
          {a.rule}
        </span>
      </div>
    ))}
  </div>
);
