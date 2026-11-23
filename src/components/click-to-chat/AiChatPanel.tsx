import React, { FC, useRef, useEffect } from 'react';
import { ChatMessage } from './types';

interface AiChatPanelProps {
  aiMessages: ChatMessage[];
  isAiTyping: boolean;
  aiInput: string;
  onAiInputChange: (value: string) => void;
  onSendAiMessage: (text: string) => void;
}

export const AiChatPanel: FC<AiChatPanelProps> = ({
  aiMessages,
  isAiTyping,
  aiInput,
  onAiInputChange,
  onSendAiMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, isAiTyping]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSendAiMessage(aiInput);
  };

  return (
    <>
      <div
        style={{
          height: 240,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '0.25rem 0',
        }}
      >
        {aiMessages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '0.5rem 0.75rem',
                borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                background: msg.role === 'user' ? '#E31E24' : '#f3f4f6',
                color: msg.role === 'user' ? '#fff' : '#111827',
                fontSize: '0.82rem',
                lineHeight: 1.4,
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isAiTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '12px 12px 12px 2px',
                background: '#f3f4f6',
                color: '#6b7280',
                fontSize: '0.82rem',
                fontStyle: 'italic',
              }}
            >
              Zoe is typing…
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
        <input
          type="text"
          value={aiInput}
          onChange={e => onAiInputChange(e.target.value)}
          placeholder="Ask Zoe anything…"
          disabled={isAiTyping}
          aria-label="Ask Zoe"
          style={{
            flex: 1,
            padding: '0.5rem 0.75rem',
            borderRadius: 20,
            border: '1px solid #e5e7eb',
            fontSize: '0.85rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={!aiInput.trim() || isAiTyping}
          aria-label="Send to Zoe"
          style={{
            background: '#E31E24',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: aiInput.trim() && !isAiTyping ? 'pointer' : 'not-allowed',
            flexShrink: 0,
            opacity: aiInput.trim() && !isAiTyping ? 1 : 0.5,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </>
  );
};
