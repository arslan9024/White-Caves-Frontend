// FILE: src/components/crm/LindaWhatsAppCRM/LindaChatRow.tsx
/**
 * White Caves Real Estate LLC - Linda Chat Row Component
 * Standard: AEGIS Canonical 12-Way Architecture Standard (<350 lines)
 */

import React, { FC } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';

export interface LindaChatRowProps {
  conversation: LindaConversationItem;
  isSelected: boolean;
  isChecked: boolean;
  bulkMode: boolean;
  isDark: boolean;
  onSelect: (id: string) => void;
  onToggleSelect: (id: string, e: React.MouseEvent) => void;
}

export const LindaChatRow: FC<LindaChatRowProps> = ({
  conversation: conv,
  isSelected,
  isChecked,
  bulkMode,
  isDark,
  onSelect,
  onToggleSelect,
}) => {
  return (
    <div
      data-testid={`wa-chat-item-${conv.id}`}
      onClick={() => onSelect(conv.id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        cursor: 'pointer',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid #E2E8F0',
        background: isSelected ? (isDark ? '#2A3942' : '#E9EDEF') : 'transparent',
        transition: 'background 0.15s ease',
      }}
    >
      {bulkMode && (
        <button
          type="button"
          data-testid={`wa-checkbox-${conv.id}`}
          onClick={e => onToggleSelect(conv.id, e)}
          style={{
            background: 'transparent',
            border: 'none',
            color: isChecked ? '#25D366' : isDark ? '#64748B' : '#94A3B8',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
        </button>
      )}

      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: conv.gorahaSaved ? '#059669' : '#0284C7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: 13,
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
            <span style={{ fontStyle: 'italic', opacity: 0.7 }}>Tap to load recent messages</span>
          )}
        </div>
      </div>
    </div>
  );
};
