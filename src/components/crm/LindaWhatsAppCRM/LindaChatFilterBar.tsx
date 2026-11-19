// FILE: src/components/crm/LindaWhatsAppCRM/LindaChatFilterBar.tsx
import React, { FC } from 'react';
import { Filter, MessagesSquare, Megaphone, User, Users } from 'lucide-react';

export interface LindaChatFilterBarProps {
  isDark: boolean;
  accountOptions: Array<{
    id: string;
    label: string;
    status?: 'connected' | 'needs_auth' | 'offline';
  }>;
  selectedAccount: string;
  onSelectAccount?: (accountId: string) => void;
  chatTypeFilter: 'all' | 'landlords' | 'campaign' | 'direct' | 'groups';
  onSelectChatType?: (type: 'all' | 'landlords' | 'campaign' | 'direct' | 'groups') => void;
}

export const LindaChatFilterBar: FC<LindaChatFilterBarProps> = ({
  isDark,
  accountOptions,
  selectedAccount,
  onSelectAccount,
  chatTypeFilter,
  onSelectChatType,
}) => {
  const getStatusBadge = (status?: string) => {
    if (status === 'connected') return '🟢 ';
    if (status === 'needs_auth') return '🟡 ';
    if (status === 'offline') return '🔴 ';
    return '';
  };

  return (
    <>
      {accountOptions.length > 0 && onSelectAccount && (
        <div
          data-testid="wa-account-filter-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 10px',
            background: isDark ? '#111B21' : '#FFFFFF',
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid #E2E8F0',
          }}
        >
          <Filter size={12} color={isDark ? '#8696A0' : '#64748B'} />
          <select
            aria-label="Filter by WhatsApp Account"
            data-testid="wa-account-dropdown"
            value={selectedAccount}
            onChange={e => onSelectAccount(e.target.value)}
            style={{
              flex: 1,
              background: isDark ? '#202C33' : '#F8FAFC',
              border: '1px solid rgba(37, 211, 102, 0.4)',
              borderRadius: 6,
              color: isDark ? '#86EFAC' : '#15803D',
              padding: '4px 6px',
              fontSize: 10,
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {accountOptions.map(opt => (
              <option key={opt.id} value={opt.id}>
                {getStatusBadge(opt.status)}
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {onSelectChatType && (
        <div
          data-testid="wa-chat-filter-tabs"
          style={{
            display: 'flex',
            gap: 4,
            padding: '6px 10px',
            background: isDark ? '#111B21' : '#FFFFFF',
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid #E2E8F0',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'all', label: 'All', icon: MessagesSquare },
            { id: 'landlords', label: 'Landlords (Rentals)', icon: User },
            { id: 'campaign', label: 'Outreach Leads', icon: Megaphone },
            { id: 'direct', label: 'Direct', icon: User },
            { id: 'groups', label: 'Groups', icon: Users },
          ].map(tab => {
            const Icon = tab.icon;
            const active = chatTypeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-testid={`wa-tab-${tab.id}`}
                onClick={() => onSelectChatType(tab.id as 'all' | 'campaign' | 'direct' | 'groups')}
                style={{
                  padding: '4px 8px',
                  borderRadius: 6,
                  border: active ? '1px solid #25D366' : '1px solid transparent',
                  background: active ? 'rgba(37, 211, 102, 0.15)' : isDark ? '#202C33' : '#F1F5F9',
                  color: active ? '#25D366' : isDark ? '#94A3B8' : '#64748B',
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={11} />
                <span>{tab.label}</span>
              </button>
            );
          })}
          <select
            aria-label="Filter by Chat Type"
            data-testid="wa-type-dropdown"
            value={chatTypeFilter}
            onChange={e =>
              onSelectChatType(e.target.value as 'all' | 'campaign' | 'direct' | 'groups')
            }
            style={{ display: 'none' }}
          >
            <option value="all">All Chats</option>
            <option value="campaign">Campaign Leads</option>
            <option value="direct">Direct Chats</option>
            <option value="groups">Groups</option>
          </select>
        </div>
      )}
    </>
  );
};
