// FILE: src/components/crm/LindaWhatsAppCRM/LindaStatusBar.tsx
/**
 * Linda Multi-Account Status Bar
 * Shows live green/amber/red connection status for all 5 WhatsApp lines.
 * Upgrade #1 — white-caves-frontend
 */
import React, { memo } from 'react';
import type { AccountOption, AccountStatus } from './useLindaAccountAutoload';

interface LindaStatusBarProps {
  accounts: AccountOption[];
  selectedAccount: string;
  onSelect: (id: string) => void;
}

const STATUS_COLOR: Record<AccountStatus, string> = {
  connected: '#25D366',
  needs_auth: '#FFA500',
  offline: '#FF5252',
};

const STATUS_LABEL: Record<AccountStatus, string> = {
  connected: '●',
  needs_auth: '◉',
  offline: '○',
};

const ROLE_ICON: Record<string, string> = {
  master: '👑',
  employee: '🏢',
  servant: '📡',
  all: '🌐',
};

export const LindaStatusBar = memo<LindaStatusBarProps>(
  ({ accounts, selectedAccount, onSelect }) => {
    return (
      <div
        style={{
          display: 'flex',
          gap: '6px',
          padding: '6px 12px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '10px',
          flexWrap: 'wrap',
          alignItems: 'center',
          border: '1px solid rgba(37,211,102,0.15)',
        }}
      >
        {accounts.map(acc => {
          const isSelected = acc.id === selectedAccount;
          const color = STATUS_COLOR[acc.status];
          return (
            <button
              key={acc.id}
              onClick={() => onSelect(acc.id)}
              title={`${acc.label} — ${acc.status}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                background: isSelected ? 'rgba(37,211,102,0.18)' : 'transparent',
                border: isSelected
                  ? '1px solid rgba(37,211,102,0.5)'
                  : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#e0e0e0',
                fontSize: '11px',
                fontWeight: isSelected ? 700 : 400,
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '14px' }}>{ROLE_ICON[acc.role ?? 'all'] ?? '📱'}</span>
              <span style={{ color, fontSize: '10px', fontWeight: 900 }}>
                {STATUS_LABEL[acc.status]}
              </span>
              <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {acc.id === 'ALL' ? 'All Lines' : (acc.phone ?? acc.id)}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);

LindaStatusBar.displayName = 'LindaStatusBar';
export default LindaStatusBar;
