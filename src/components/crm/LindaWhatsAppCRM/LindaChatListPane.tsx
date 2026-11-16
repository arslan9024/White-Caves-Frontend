// FILE: src/components/crm/LindaWhatsAppCRM/LindaChatListPane.tsx
/**
 * White Caves Real Estate LLC - Linda WhatsApp Web Chat List Pane
 * Standard: AEGIS Canonical 12-Way Architecture Standard (<250 lines)
 */

import React, { FC, useState } from 'react';
import { Search, CheckSquare, Square } from 'lucide-react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import { LindaChatRow } from './LindaChatRow';
import { LindaChatFilterBar } from './LindaChatFilterBar';
import { LindaChatListHeader } from './LindaChatListHeader';
import { LindaChatRowSkeleton } from './LindaChatRowSkeleton';

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
  isLoading?: boolean;
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
  isLoading = false,
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

  return (
    <div
      style={{
        borderRight: isDark ? '1px solid #202C33' : '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        background: isDark ? '#111B21' : '#F0F2F5',
        height: '100%',
        minHeight: 0,
      }}
    >
      <LindaChatListHeader
        isDark={isDark}
        bulkMode={bulkMode}
        totalCount={conversations.length}
        onOpenLinkModal={onOpenLinkModal}
        onToggleBulkMode={() => setBulkMode(b => !b)}
      />

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

      {/* Search Input Bar */}
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

      <LindaChatFilterBar
        isDark={isDark}
        accountOptions={accountOptions}
        selectedAccount={selectedAccount}
        onSelectAccount={onSelectAccount}
        chatTypeFilter={chatTypeFilter}
        onSelectChatType={onSelectChatType}
      />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {isLoading ? (
          <LindaChatRowSkeleton count={5} isDark={isDark} />
        ) : (
          visibleConversations.map(conv => (
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
          ))
        )}

        {conversations.length > visibleCount && !isLoading && (
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
