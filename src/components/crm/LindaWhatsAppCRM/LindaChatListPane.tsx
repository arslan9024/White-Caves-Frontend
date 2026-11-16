// FILE: src/components/crm/LindaWhatsAppCRM/LindaChatListPane.tsx
/**
 * White Caves Real Estate LLC - Linda WhatsApp Web Chat List Pane
 * Standard: AEGIS Canonical 12-Way Architecture Standard (<350 lines)
 */

import React, { FC, useState } from 'react';
import {
  Search,
  CheckSquare,
  Square,
  Filter,
  Plus,
  Megaphone,
  Users,
  User,
  MessagesSquare,
} from 'lucide-react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import { LindaChatRow } from './LindaChatRow';

export interface LindaChatListPaneProps {
  isDark: boolean;
  conversations: LindaConversationItem[];
  selectedConvId: string;
  searchFilter: string;
  onSearchChange: (val: string) => void;
  onSelectConversation: (id: string) => void;
  accountOptions?: Array<{
    id: string;
    label: string;
    status?: 'connected' | 'needs_auth' | 'offline';
  }>;
  selectedAccount?: string;
  onSelectAccount?: (accountId: string) => void;
  chatTypeFilter?: 'all' | 'campaign' | 'direct' | 'groups';
  onSelectChatType?: (type: 'all' | 'campaign' | 'direct' | 'groups') => void;
  onOpenLinkModal?: () => void;
}

export const LindaChatListPane: FC<LindaChatListPaneProps> = ({
  isDark,
  conversations,
  selectedConvId,
  searchFilter,
  onSearchChange,
  onSelectConversation,
  accountOptions = [],
  selectedAccount = 'ALL',
  onSelectAccount,
  chatTypeFilter = 'all',
  onSelectChatType,
  onOpenLinkModal,
}) => {
  const [visibleCount, setVisibleCount] = useState(50);
  const [selectedChatIds, setSelectedChatIds] = useState<Set<string>>(new Set());
  const [bulkMode, setBulkMode] = useState<boolean>(false);
  const visibleConversations = conversations.slice(0, visibleCount);

  const toggleSelectChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedChatIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedChatIds(
      selectedChatIds.size === visibleConversations.length
        ? new Set()
        : new Set(visibleConversations.map(c => c.id))
    );
  };

  const getStatusBadge = (status?: string) => {
    if (status === 'connected') return '🟢 ';
    if (status === 'needs_auth') return '🟡 ';
    if (status === 'offline') return '🔴 ';
    return '';
  };

  return (
    <div
      style={{
        borderRight: isDark ? '1px solid #202C33' : '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        background: isDark ? '#111B21' : '#F0F2F5',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: '10px 14px',
          background: isDark ? '#202C33' : '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#25D366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            WA
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: isDark ? '#E9EDEF' : '#111B21' }}>
              WhatsApp Desk
            </div>
            <div
              style={{
                fontSize: 10,
                color: '#25D366',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#25D366' }} />
              Live Daemon
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {onOpenLinkModal && (
            <button
              type="button"
              data-testid="wa-link-account-btn"
              onClick={onOpenLinkModal}
              style={{
                background: 'rgba(37, 211, 102, 0.15)',
                border: '1px solid #25D366',
                color: '#25D366',
                borderRadius: 6,
                padding: '3px 8px',
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Plus size={12} />
              <span>Link</span>
            </button>
          )}
          <button
            type="button"
            data-testid="wa-bulk-mode-toggle"
            onClick={() => setBulkMode(b => !b)}
            style={{
              background: bulkMode ? 'rgba(37, 211, 102, 0.2)' : 'transparent',
              border: '1px solid rgba(37, 211, 102, 0.4)',
              color: '#25D366',
              borderRadius: 6,
              padding: '3px 8px',
              fontSize: 10,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <CheckSquare size={12} />
            <span>{bulkMode ? 'Cancel' : 'Bulk'}</span>
          </button>
          <span style={{ fontSize: 10, fontWeight: 700, color: isDark ? '#8696A0' : '#54656F' }}>
            {conversations.length}
          </span>
        </div>
      </div>

      {/* Bulk Actions */}
      {bulkMode && (
        <div
          data-testid="wa-bulk-actions-bar"
          style={{
            padding: '6px 12px',
            background: isDark ? '#1E293B' : '#E2E8F0',
            borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
          }}
        >
          <button
            type="button"
            onClick={toggleSelectAll}
            data-testid="wa-bulk-select-all"
            style={{
              background: 'transparent',
              border: 'none',
              color: isDark ? '#F8FAFC' : '#0F172A',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {selectedChatIds.size === visibleConversations.length ? (
              <CheckSquare size={13} color="#25D366" />
            ) : (
              <Square size={13} />
            )}
            <span>All ({selectedChatIds.size})</span>
          </button>
          <button
            type="button"
            data-testid="wa-bulk-broadcast-btn"
            disabled={selectedChatIds.size === 0}
            style={{
              padding: '3px 8px',
              borderRadius: 4,
              background: '#25D366',
              border: 'none',
              color: '#FFF',
              fontSize: 10,
              fontWeight: 700,
              cursor: selectedChatIds.size > 0 ? 'pointer' : 'not-allowed',
              opacity: selectedChatIds.size > 0 ? 1 : 0.5,
            }}
          >
            Broadcast ({selectedChatIds.size})
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div style={{ padding: '6px 10px', background: isDark ? '#111B21' : '#FFFFFF' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: isDark ? '#202C33' : '#F0F2F5',
            padding: '6px 10px',
            borderRadius: 8,
          }}
        >
          <Search size={14} color={isDark ? '#8696A0' : '#54656F'} />
          <input
            type="text"
            placeholder="Search or start new chat"
            data-testid="wa-chat-search"
            value={searchFilter}
            onChange={e => onSearchChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: isDark ? '#D1D7DB' : '#111B21',
              fontSize: 12,
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Account Selector Bar with Status Badges */}
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

      {/* Campaign Leads & Category Filter Pills */}
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
            { id: 'campaign', label: 'Campaign Leads', icon: Megaphone },
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

      {/* Conversations Scrollable List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {visibleConversations.map(conv => (
          <LindaChatRow
            key={conv.id}
            conversation={conv}
            isSelected={conv.id === selectedConvId}
            isChecked={selectedChatIds.has(conv.id)}
            bulkMode={bulkMode}
            isDark={isDark}
            onSelect={onSelectConversation}
            onToggleSelect={toggleSelectChat}
          />
        ))}
        {conversations.length > visibleCount && (
          <button
            type="button"
            data-testid="wa-load-more-chats"
            onClick={() => setVisibleCount(c => c + 50)}
            style={{
              width: '100%',
              padding: '8px',
              background: isDark ? '#202C33' : '#F8FAFC',
              color: '#25D366',
              border: 'none',
              fontWeight: 700,
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            Load More Chats ({conversations.length - visibleCount} remaining)
          </button>
        )}
      </div>
    </div>
  );
};
