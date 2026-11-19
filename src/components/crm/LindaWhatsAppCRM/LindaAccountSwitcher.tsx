// FILE: src/components/crm/LindaWhatsAppCRM/LindaAccountSwitcher.tsx
/**
 * Linda Account Switcher Dropdown
 * Displays all 5 accounts with unread count badges and status dots.
 * Zero full-page refresh — uses optimistic React state update.
 * Upgrade #2 — white-caves-frontend
 */
import React, { memo, useRef, useState } from 'react';
import type { AccountOption } from './useLindaAccountAutoload';

interface LindaAccountSwitcherProps {
  accounts: AccountOption[];
  selectedAccount: string;
  onSelect: (id: string) => void;
  unreadCounts?: Record<string, number>;
}

const STATUS_COLORS: Record<string, string> = {
  connected: '#25D366',
  needs_auth: '#FFA500',
  offline: '#FF5252',
};

export const LindaAccountSwitcher = memo<LindaAccountSwitcherProps>(
  ({ accounts, selectedAccount, onSelect, unreadCounts = {} }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const current = accounts.find(a => a.id === selectedAccount) ?? accounts[0];

    const totalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

    return (
      <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(37,211,102,0.12)',
            border: '1px solid rgba(37,211,102,0.3)',
            borderRadius: '10px',
            padding: '6px 14px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            minWidth: '180px',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: STATUS_COLORS[current?.status ?? 'connected'],
              flexShrink: 0,
            }}
          />
          <span
            style={{
              flex: 1,
              textAlign: 'left',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {current?.id === 'ALL' ? '🌐 All Linked Lines' : (current?.phone ?? current?.id ?? '—')}
          </span>
          {totalUnread > 0 && (
            <span
              style={{
                background: '#FF5252',
                color: '#fff',
                borderRadius: '10px',
                padding: '1px 7px',
                fontSize: '10px',
                fontWeight: 800,
              }}
            >
              {totalUnread > 99 ? '99+' : totalUnread}
            </span>
          )}
          <span style={{ fontSize: '10px', opacity: 0.7 }}>{open ? '▲' : '▼'}</span>
        </button>

        {open && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              minWidth: '260px',
              background: '#1a1a2e',
              border: '1px solid rgba(37,211,102,0.3)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              zIndex: 999,
              overflow: 'hidden',
            }}
          >
            {accounts.map(acc => {
              const unread = unreadCounts[acc.id] ?? 0;
              const isSelected = acc.id === selectedAccount;
              return (
                <button
                  key={acc.id}
                  onClick={() => {
                    onSelect(acc.id);
                    setOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 14px',
                    background: isSelected ? 'rgba(37,211,102,0.15)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    color: '#e0e0e0',
                    fontSize: '12px',
                    textAlign: 'left',
                    transition: 'background 0.12s',
                  }}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: STATUS_COLORS[acc.status],
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ flex: 1 }}>{acc.label}</span>
                  {unread > 0 && (
                    <span
                      style={{
                        background: '#FF5252',
                        color: '#fff',
                        borderRadius: '8px',
                        padding: '1px 6px',
                        fontSize: '10px',
                        fontWeight: 800,
                      }}
                    >
                      {unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

LindaAccountSwitcher.displayName = 'LindaAccountSwitcher';
export default LindaAccountSwitcher;
