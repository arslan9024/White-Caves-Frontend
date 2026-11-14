// FILE: src/components/crm/LindaWhatsAppCRM/LindaChatListPane.tsx
/**
 * White Caves Real Estate LLC - Linda WhatsApp Web Chat List Pane
 * Standard: AEGIS Canonical 12-Way Architecture Standard
 * Single Purpose File Law: < 350 lines
 */

import React, { FC, useState } from 'react';
import { Search } from 'lucide-react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';

export interface LindaChatListPaneProps {
  isDark: boolean;
  conversations: LindaConversationItem[];
  selectedConvId: string;
  searchFilter: string;
  onSearchChange: (val: string) => void;
  onSelectConversation: (id: string) => void;
  accountOptions?: Array<{ id: string; label: string }>;
  selectedAccount?: string;
  onSelectAccount?: (accountId: string) => void;
  chatTypeFilter?: 'all' | 'direct' | 'groups';
  onSelectChatType?: (type: 'all' | 'direct' | 'groups') => void;
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
}) => {
  const [visibleCount, setVisibleCount] = useState(50);
  const visibleConversations = conversations.slice(0, visibleCount);
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
          padding: '12px 16px',
          background: isDark ? '#202C33' : '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#25D366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            WA
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: isDark ? '#E9EDEF' : '#111B21' }}>
              WhatsApp Web Desk
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
              Online (Background Daemon)
            </div>
          </div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#8696A0' : '#54656F' }}>
          {conversations.length} Active
        </span>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '8px 12px', background: isDark ? '#111B21' : '#FFFFFF' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: isDark ? '#202C33' : '#F0F2F5',
            padding: '6px 12px',
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

      {/* Account Filter Pill Bar */}
      {accountOptions.length > 0 && onSelectAccount && (
        <div
          data-testid="wa-account-filter-bar"
          style={{
            display: 'flex',
            gap: 6,
            padding: '6px 12px',
            overflowX: 'auto',
            background: isDark ? '#111B21' : '#FFFFFF',
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid #E2E8F0',
          }}
        >
          {accountOptions.map(opt => {
            const active = selectedAccount === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                data-testid={`wa-account-pill-${opt.id}`}
                onClick={() => onSelectAccount(opt.id)}
                style={{
                  padding: '3px 10px',
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: active
                    ? '1px solid #25D366'
                    : isDark
                      ? '1px solid #2A3942'
                      : '1px solid #CBD5E1',
                  background: active ? 'rgba(37, 211, 102, 0.16)' : 'transparent',
                  color: active ? '#25D366' : isDark ? '#8696A0' : '#475569',
                }}
              >
                {opt.label}
              </button>
            );
          })}
          {onSelectChatType && (
            <>
              {(['all', 'direct', 'groups'] as const).map(t => {
                const active = chatTypeFilter === t;
                return (
                  <button
                    key={t}
                    type="button"
                    data-testid={`wa-type-pill-${t}`}
                    onClick={() => onSelectChatType(t)}
                    style={{
                      padding: '3px 10px',
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      border: active
                        ? '1px solid #38BDF8'
                        : isDark
                          ? '1px solid #2A3942'
                          : '1px solid #CBD5E1',
                      background: active ? 'rgba(56, 189, 248, 0.16)' : 'transparent',
                      color: active ? '#38BDF8' : isDark ? '#8696A0' : '#475569',
                    }}
                  >
                    {t === 'all' ? 'All Chats' : t === 'direct' ? 'Direct' : 'Groups'}
                  </button>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* Conversations Scrollable List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {visibleConversations.map(conv => {
          const isSelected = conv.id === selectedConvId;
          return (
            <div
              key={conv.id}
              data-testid={`wa-chat-item-${conv.id}`}
              onClick={() => onSelectConversation(conv.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid #E2E8F0',
                background: isSelected ? (isDark ? '#2A3942' : '#E9EDEF') : 'transparent',
                transition: 'background 0.15s ease',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: conv.gorahaSaved ? '#059669' : '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {(conv.contactName || conv.phone || 'WA').slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: isDark ? '#E9EDEF' : '#111B21',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {conv.contactName}
                  </span>
                  <span style={{ fontSize: 10, color: isDark ? '#8696A0' : '#667781' }}>
                    {conv.timestamp}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: isDark ? '#8696A0' : '#667781',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginTop: 2,
                  }}
                >
                  {conv.lastMessage ? (
                    conv.lastMessage
                  ) : (
                    <span style={{ fontStyle: 'italic', opacity: 0.7 }}>
                      Tap to load recent messages
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {conversations.length > visibleCount && (
          <button
            type="button"
            data-testid="wa-load-more-chats"
            onClick={() => setVisibleCount(c => c + 50)}
            style={{
              width: '100%',
              padding: '10px',
              background: isDark ? '#202C33' : '#F8FAFC',
              color: '#25D366',
              border: 'none',
              borderTop: isDark ? '1px solid #2A3942' : '1px solid #E2E8F0',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Load 50 more ({conversations.length - visibleCount} remaining)
          </button>
        )}
      </div>
    </div>
  );
};
