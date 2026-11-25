/**
 * AutoReplyRuleCard.tsx — Single Nina AI Auto-Reply trigger rule card
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { type FC } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import type { AutoReplyRule } from '../autoReplyPlanner.data';

interface AutoReplyRuleCardProps {
  rule: AutoReplyRule;
  onToggleActive: (ruleId: string) => void;
}

export const AutoReplyRuleCard: FC<AutoReplyRuleCardProps> = ({ rule, onToggleActive }) => (
  <div
    style={{
      background: '#FFFFFF',
      border: rule.active ? '1.5px solid #06B6D4' : '1px solid #CBD5E1',
      borderRadius: '14px',
      padding: '1.25rem',
      boxShadow: rule.active ? '0 4px 16px rgba(6, 182, 212, 0.08)' : 'none',
      opacity: rule.active ? 1 : 0.65,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <h4
          style={{
            margin: 0,
            fontSize: '1.05rem',
            fontWeight: 800,
            color: 'var(--color-1e293b, #1E293B)',
          }}
        >
          {rule.name}
        </h4>
        <span
          style={{
            background: 'rgba(6, 182, 212, 0.12)',
            color: 'var(--color-06b6d4, #06B6D4)',
            fontWeight: 800,
            fontSize: '0.75rem',
            padding: '3px 10px',
            borderRadius: '6px',
          }}
        >
          Tag: {rule.intentTag}
        </span>
        {rule.dldInventoryLookup && (
          <span
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              color: 'var(--accent-green, #10B981)',
              fontWeight: 800,
              fontSize: '0.75rem',
              padding: '3px 10px',
              borderRadius: '6px',
            }}
          >
            9,210 DLD DB Matcher Active
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onToggleActive(rule.id)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: rule.active ? '#06B6D4' : '#64748B',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontWeight: 800,
          fontSize: '0.85rem',
        }}
      >
        {rule.active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
        {rule.active ? 'Active' : 'Disabled'}
      </button>
    </div>

    <div style={{ marginBottom: '0.75rem' }}>
      <span
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary, #64748B)',
          fontWeight: 700,
          display: 'block',
          marginBottom: '4px',
        }}
      >
        Trigger Keywords:
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {rule.keywords.map(kw => (
          <span
            key={kw}
            style={{
              background: 'var(--color-f1f5f9, #F1F5F9)',
              color: 'var(--color-334155, #334155)',
              fontWeight: 700,
              fontSize: '0.78rem',
              padding: '3px 8px',
              borderRadius: '6px',
            }}
          >
            &quot;{kw}&quot;
          </span>
        ))}
      </div>
    </div>

    <div
      style={{
        background: 'var(--color-f8fafc, #F8FAFC)',
        border: '1px solid var(--text-secondary, #E2E8F0)',
        borderRadius: '10px',
        padding: '0.85rem',
      }}
    >
      <span
        style={{
          fontSize: '0.72rem',
          color: 'var(--text-secondary, #64748B)',
          display: 'block',
          marginBottom: '4px',
        }}
      >
        Automated Response Template (Nina AI Response):
      </span>
      <p
        style={{
          margin: 0,
          fontSize: '0.88rem',
          color: 'var(--color-1e293b, #1E293B)',
          fontStyle: 'italic',
          lineHeight: 1.45,
        }}
      >
        &quot;{rule.responseTemplate}&quot;
      </p>
    </div>
  </div>
);

export default AutoReplyRuleCard;
