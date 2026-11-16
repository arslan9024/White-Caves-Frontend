import React, { FC, useEffect, useRef } from 'react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import { LindaChatThreadInputDock } from './LindaChatThreadInputDock';
import { LindaChatThreadHeader } from './LindaChatThreadHeader';
import { LindaChatBubble } from './LindaChatBubble';
import { LindaTypingIndicator } from './LindaTypingIndicator';

export interface ChatMessage {
  id: string;
  sender: 'client' | 'agent' | 'bot';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  mediaType?: string | null;
  mediaUrl?: string;
}

export interface LindaChatThreadPaneProps {
  isDark: boolean;
  selectedConv: LindaConversationItem | undefined;
  activeMessages: ChatMessage[];
  inputMessage: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
  onAiDraft: (lang?: 'EN' | 'AR') => void;
  onHumanTakeover?: () => void;
  isAiComposing?: boolean;
}

const QUICK_REPLIES = ['Send Brochure', 'Schedule Viewing', 'Request Title Deed', 'DLD Valuation'];

export const LindaChatThreadPane: FC<LindaChatThreadPaneProps> = ({
  isDark,
  selectedConv,
  activeMessages,
  inputMessage,
  onInputChange,
  onSend,
  onAiDraft,
  onHumanTakeover,
  isAiComposing = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [selectedConv?.id, activeMessages.length, isAiComposing]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        height: '100%',
        background: isDark ? '#0B141A' : '#EFEAE2',
      }}
    >
      <LindaChatThreadHeader
        isDark={isDark}
        selectedConv={selectedConv}
        onAiDraft={onAiDraft}
        onHumanTakeover={onHumanTakeover}
      />

      {/* Message Thread Body */}
      <div
        data-testid="wa-message-thread"
        style={{
          flex: 1,
          padding: '20px 24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(17,27,33,0.9) 0%, rgba(11,20,26,1) 100%)'
            : 'radial-gradient(ellipse at center, rgba(240,242,245,0.7) 0%, rgba(239,234,226,1) 100%)',
        }}
      >
        {activeMessages.length > 0 && (
          <div
            data-testid="linda-date-separator"
            style={{
              alignSelf: 'center',
              padding: '3px 12px',
              borderRadius: 12,
              background: isDark ? '#182229' : '#E1F3FB',
              color: isDark ? '#8696A0' : '#54656F',
              fontSize: 11,
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            Today
          </div>
        )}

        {activeMessages.map(msg => (
          <LindaChatBubble key={msg.id} message={msg} isDark={isDark} />
        ))}

        {isAiComposing && <LindaTypingIndicator authorName="Linda AI" isDark={isDark} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick-Reply Templates Bar */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '6px 16px',
          overflowX: 'auto',
          background: isDark ? '#182229' : '#F8FAFC',
          borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E2E8F0',
        }}
      >
        {QUICK_REPLIES.map(label => (
          <button
            key={label}
            type="button"
            onClick={() =>
              onInputChange(
                `Hello ${selectedConv?.contactName || 'there'}, regarding ${selectedConv?.unit || 'your property'}: ${label}.`
              )
            }
            style={{
              padding: '3px 10px',
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              border: isDark ? '1px solid #2A3942' : '1px solid #CBD5E1',
              background: isDark ? '#202C33' : '#FFFFFF',
              color: isDark ? '#E9EDEF' : '#334155',
            }}
          >
            ⚡ {label}
          </button>
        ))}
      </div>

      <LindaChatThreadInputDock
        isDark={isDark}
        inputMessage={inputMessage}
        onInputChange={onInputChange}
        onSend={onSend}
      />
    </div>
  );
};
