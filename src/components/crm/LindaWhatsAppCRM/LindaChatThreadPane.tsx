// FILE: src/components/crm/LindaWhatsAppCRM/LindaChatThreadPane.tsx
/**
 * White Caves Real Estate LLC - Linda WhatsApp Web Chat Thread Pane
 * Standard: AEGIS Canonical 12-Way Architecture Standard
 * Single Purpose File Law: < 350 lines
 */

import React, { FC, useEffect, useRef } from 'react';
import {
  Sparkles,
  Check,
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  Bot,
  UserCheck,
} from 'lucide-react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import { LindaRichMediaMessage } from './LindaRichMediaMessage';
import { LindaChatThreadInputDock } from './LindaChatThreadInputDock';

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
}

const QUICK_REPLIES = [
  'Send Brochure',
  'Schedule Viewing',
  'Request Title Deed',
  'DLD Valuation',
];

export const LindaChatThreadPane: FC<LindaChatThreadPaneProps> = ({
  isDark,
  selectedConv,
  activeMessages,
  inputMessage,
  onInputChange,
  onSend,
  onAiDraft,
  onHumanTakeover,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [selectedConv?.id, activeMessages.length]);

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
      {/* Header */}
      <div
        style={{
          padding: '10px 16px',
          background: isDark ? '#202C33' : '#F0F2F5',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #D1D7DB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: selectedConv?.gorahaSaved ? '#059669' : '#0284C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {(selectedConv?.contactName || 'WA').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: isDark ? '#E9EDEF' : '#111B21' }}>
              {selectedConv?.contactName || 'No Conversation Selected'}
            </div>
            <div style={{ fontSize: 11, color: isDark ? '#8696A0' : '#667781' }}>
              {selectedConv?.phone} · <span style={{ color: '#25D366' }}>{selectedConv?.unit}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {onHumanTakeover && (
            <button
              onClick={onHumanTakeover}
              data-testid="linda-takeover-btn"
              title="1-Click Human Takeover"
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #EF4444',
                color: isDark ? '#FCA5A5' : '#DC2626',
                borderRadius: 8,
                padding: '5px 9px',
                fontSize: 11,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              <UserCheck size={12} /> Takeover
            </button>
          )}
          <button
            onClick={() => onAiDraft('EN')}
            data-testid="linda-ai-draft-btn"
            style={{
              background: 'rgba(37, 211, 102, 0.15)',
              border: '1px solid #25D366',
              color: isDark ? '#4ADE80' : '#15803D',
              borderRadius: 8,
              padding: '5px 8px',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
            }}
          >
            <Sparkles size={12} /> EN
          </button>
          <button
            onClick={() => onAiDraft('AR')}
            data-testid="linda-ai-draft-ar-btn"
            style={{
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid #3B82F6',
              color: isDark ? '#93C5FD' : '#2563EB',
              borderRadius: 8,
              padding: '5px 8px',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
            }}
          >
            <Sparkles size={12} /> AR
          </button>
          <Phone size={17} color={isDark ? '#AEBAC1' : '#54656F'} style={{ cursor: 'pointer' }} />
          <Video size={17} color={isDark ? '#AEBAC1' : '#54656F'} style={{ cursor: 'pointer' }} />
          <MoreVertical size={17} color={isDark ? '#AEBAC1' : '#54656F'} style={{ cursor: 'pointer' }} />
        </div>
      </div>

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
        {activeMessages.map(msg => {
          const isOutbound = msg.sender === 'agent' || msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              style={{
                alignSelf: isOutbound ? 'flex-end' : 'flex-start',
                maxWidth: '72%',
                background: isOutbound
                  ? isDark ? '#005C4B' : '#D9FDD3'
                  : isDark ? '#202C33' : '#FFFFFF',
                color: isDark ? '#E9EDEF' : '#111B21',
                borderRadius: 10,
                padding: '8px 12px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                fontSize: 13,
                lineHeight: '18px',
              }}
            >
              {msg.sender === 'bot' && (
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: isDark ? '#25D366' : '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    marginBottom: 4,
                  }}
                >
                  <Bot size={11} /> AI Auto-Assisted (Linda)
                </div>
              )}
              {msg.mediaType && (
                <LindaRichMediaMessage
                  mediaType={msg.mediaType}
                  mediaUrl={msg.mediaUrl}
                  text={msg.text}
                />
              )}
              <div>{msg.text}</div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 4,
                  fontSize: 10,
                  color: isDark ? '#8696A0' : '#667781',
                }}
              >
                <span>{msg.timestamp}</span>
                {isOutbound &&
                  (msg.status === 'read' ? (
                    <CheckCheck size={12} color="#53BDEB" />
                  ) : msg.status === 'delivered' ? (
                    <CheckCheck size={12} color="#8696A0" />
                  ) : (
                    <Check size={12} color="#8696A0" />
                  ))}
              </div>
            </div>
          );
        })}
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

      {/* Input Dock Delegated Subcomponent */}
      <LindaChatThreadInputDock
        isDark={isDark}
        inputMessage={inputMessage}
        onInputChange={onInputChange}
        onSend={onSend}
      />
    </div>
  );
};

