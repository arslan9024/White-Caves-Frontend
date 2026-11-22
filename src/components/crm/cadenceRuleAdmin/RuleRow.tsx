import React from 'react';
import type { CadenceRule } from './types';

export function TierBadge({ tier }: { tier: string }): React.ReactElement {
  const colours: Record<string, string> = {
    hot: '#EF4444',
    warm: '#d97706',
    cold: '#EF4444',
    inactive: '#6b7280',
  };
  return (
    <span
      style={{
        background: colours[tier] ?? '#6b7280',
        color: '#fff',
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 600,
        marginRight: 4,
      }}
    >
      {tier}
    </span>
  );
}

export interface RuleRowProps {
  rule: CadenceRule;
  onToggle: (id: string, active: boolean) => void;
  onEdit: (rule: CadenceRule) => void;
  toggling: boolean;
}

export function RuleRow({ rule, onToggle, onEdit, toggling }: RuleRowProps): React.ReactElement {
  return (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <td style={{ padding: '10px 12px' }}>
        <strong style={{ color: rule.isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
          {rule.name}
        </strong>
        {rule.description && (
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            {rule.description}
          </div>
        )}
      </td>
      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: rule.isActive ? '#22c55e' : '#6b7280',
            marginRight: 6,
          }}
        />
        {rule.isActive ? 'Active' : 'Inactive'}
      </td>
      <td style={{ padding: '10px 12px', textAlign: 'center' }}>{rule.priority}</td>
      <td style={{ padding: '10px 12px' }}>
        {rule.leadTiers.length > 0 ? (
          rule.leadTiers.map(t => <TierBadge key={t} tier={t} />)
        ) : (
          <span style={{ color: 'var(--text-secondary, #6b7280)', fontSize: 12 }}>all tiers</span>
        )}
      </td>
      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
        {rule.channelSequence.length} steps
      </td>
      <td style={{ padding: '10px 12px' }}>
        <button
          aria-label={rule.isActive ? `Deactivate ${rule.name}` : `Activate ${rule.name}`}
          onClick={() => onToggle(rule.id, !rule.isActive)}
          disabled={toggling}
          style={{
            background: rule.isActive ? '#7f1d1d' : '#14532d',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 12,
            cursor: toggling ? 'not-allowed' : 'pointer',
            marginRight: 6,
          }}
        >
          {rule.isActive ? 'Deactivate' : 'Activate'}
        </button>
        <button
          aria-label={`Edit ${rule.name}`}
          onClick={() => onEdit(rule)}
          style={{
            background: '#1e3a5f',
            color: '#f5f5f0',
            border: 'none',
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
