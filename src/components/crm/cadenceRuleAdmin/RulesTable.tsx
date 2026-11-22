import React from 'react';
import type { CadenceRule } from './types';
import { RuleRow } from './RuleRow';

export interface RulesTableProps {
  rules: CadenceRule[];
  togglingId: string | null;
  onToggle: (id: string, active: boolean) => void;
  onEdit: (rule: CadenceRule) => void;
}

const HEADERS = ['Rule', 'Status', 'Priority', 'Lead Tiers', 'Steps', 'Actions'] as const;

export function RulesTable({
  rules,
  togglingId,
  onToggle,
  onEdit,
}: RulesTableProps): React.ReactElement {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {HEADERS.map(h => (
              <th
                key={h}
                style={{
                  padding: '8px 12px',
                  textAlign: h === 'Rule' || h === 'Lead Tiers' ? 'left' : 'center',
                  color: '#9ca3af',
                  fontWeight: 600,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rules.map(rule => (
            <RuleRow
              key={rule.id}
              rule={rule}
              onToggle={onToggle}
              onEdit={onEdit}
              toggling={togglingId === rule.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
