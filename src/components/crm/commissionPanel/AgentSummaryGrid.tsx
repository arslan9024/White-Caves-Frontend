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
import type { AgentSummaryRow } from './types';

interface AgentSummaryGridProps {
  agentSummary: AgentSummaryRow[];
  onGenerateStatement: (agent: string) => void;
}

export const AgentSummaryGrid: FC<AgentSummaryGridProps> = ({
  agentSummary,
  onGenerateStatement,
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      {agentSummary.map(a => {
        const paidPct = Math.round((a.paid / (a.totalEarnings || 1)) * 100);
        return (
          <div
            key={a.agent}
            style={{
              background: CARD_BG,
              padding: '20px',
              borderRadius: '12px',
              border: `1px solid ${BORDER}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '14px',
              }}
            >
              <div>
                <h3 style={{ margin: 0, color: SLATE, fontSize: '1rem', fontWeight: 800 }}>
                  {a.agent}
                </h3>
                <div style={{ fontSize: '0.78rem', color: TEXT_MUTED }}>
                  {a.role} · {a.deals} deals closed
                </div>
              </div>
              <div
                style={{
                  background: 'var(--color-fef2f2, #FEF2F2)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.7rem', color: RED, fontWeight: 700 }}>SPLIT</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: RED }}>{a.avgSplit}%</div>
              </div>
            </div>

            {[
              {
                label: 'Gross Commission',
                value: `AED ${a.totalGross.toLocaleString()}`,
                color: SLATE,
              },
              {
                label: 'Agent Earnings',
                value: `AED ${a.totalEarnings.toLocaleString()}`,
                color: GREEN,
              },
              { label: 'Paid Out', value: `AED ${a.paid.toLocaleString()}`, color: GREEN },
              { label: 'Pending', value: `AED ${a.pending.toLocaleString()}`, color: ORANGE },
            ].map(row => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '7px 0',
                  borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
                  fontSize: '0.82rem',
                }}
              >
                <span style={{ color: TEXT_MUTED, fontWeight: 600 }}>{row.label}</span>
                <span style={{ fontWeight: 700, color: row.color }}>{row.value}</span>
              </div>
            ))}

            {/* Progress bar: paid vs total */}
            <div style={{ marginTop: '12px' }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: TEXT_MUTED,
                  fontWeight: 700,
                  marginBottom: '4px',
                }}
              >
                Payout Progress: {paidPct}% paid
              </div>
              <div
                style={{
                  background: 'var(--color-e2e8f0, #E2E8F0)',
                  borderRadius: '99px',
                  height: '8px',
                }}
              >
                <div
                  style={{
                    background: GREEN,
                    width: `${Math.min(100, paidPct)}%`,
                    height: '100%',
                    borderRadius: '99px',
                    transition: 'width 0.4s',
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => onGenerateStatement(a.agent)}
              style={{
                marginTop: '14px',
                width: '100%',
                padding: '8px',
                background: SLATE,
                color: WHITE,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            >
              📄 Generate Agent Statement
            </button>
          </div>
        );
      })}
    </div>
  );
};
