import React, { FC, useEffect, useRef, useState, useCallback, UIEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import { LindaChatThreadInputDock } from './LindaChatThreadInputDock';
import { LindaChatThreadHeader } from './LindaChatThreadHeader';
import { LindaChatBubble } from './LindaChatBubble';
import { LindaTypingIndicator } from './LindaTypingIndicator';
import styles from './LindaWhatsAppWeb.module.css';

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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [unreadBelow, setUnreadBelow] = useState(0);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
    setShowScrollBottom(false);
    setUnreadBelow(0);
  }, []);

  // WhatsApp Web style scroll observer
  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    // Show button if scrolled more than 150px up from bottom
    const isUp = distanceToBottom > 150;
    setShowScrollBottom(isUp);
    if (!isUp) {
      setUnreadBelow(0);
    }
  }, []);

  // When switching chats or receiving new messages
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const el = scrollContainerRef.current;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

    // If user is already near bottom, auto-scroll down smoothly
    if (distanceToBottom < 200 || !showScrollBottom) {
      scrollToBottom('smooth');
    } else {
      // User is reading history higher up -> increment unread indicator
      setUnreadBelow(prev => prev + 1);
    }
  }, [selectedConv?.id, activeMessages.length, isAiComposing, scrollToBottom]);

  return (
    <div
      style={{
        position: 'relative',
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

      {/* Message Thread Body with WhatsApp Web custom scrollbar */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        data-testid="wa-message-thread"
        className={styles.waScrollbar}
        style={{
          flex: 1,
          padding: '16px 24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(17,27,33,0.92) 0%, rgba(11,20,26,1) 100%)'
            : 'radial-gradient(ellipse at center, rgba(240,242,245,0.7) 0%, rgba(239,234,226,1) 100%)',
        }}
      >
        {activeMessages.length > 0 && (
          <div
            data-testid="linda-date-separator"
            className={styles.waStickyDate}
            style={{
              background: isDark ? 'rgba(24, 34, 41, 0.95)' : 'rgba(225, 243, 251, 0.95)',
              color: isDark ? '#8696A0' : '#54656F',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
            }}
          >
            Today
          </div>
        )}

        {activeMessages.map(msg => (
          <LindaChatBubble key={msg.id} message={msg} isDark={isDark} />
        ))}

        {isAiComposing && <LindaTypingIndicator authorName="Linda AI" isDark={isDark} />}

        <div ref={messagesEndRef} style={{ height: 1 }} />
      </div>

      {/* Floating Scroll to Bottom pill */}
      {showScrollBottom && (
        <button
          type="button"
          onClick={() => scrollToBottom('smooth')}
          aria-label="Scroll to bottom"
          className={styles.waScrollToBottomBtn}
          style={{
            background: isDark ? '#202C33' : '#FFFFFF',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #CBD5E1',
            color: isDark ? '#8696A0' : '#54656F',
          }}
        >
          <ChevronDown size={20} />
          {unreadBelow > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: '#25D366',
                color: '#FFF',
                borderRadius: '50%',
                fontSize: 10,
                fontWeight: 700,
                width: 18,
                height: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {unreadBelow}
            </span>
          )}
        </button>
      )}

      {/* Quick-Reply Templates Bar */}
      <div
        className={styles.waScrollbar}
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
