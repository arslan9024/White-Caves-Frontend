import React, { FC } from 'react';
import { Smile, Paperclip, Send } from 'lucide-react';

export interface LindaChatThreadInputDockProps {
  isDark: boolean;
  inputMessage: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
}

export const LindaChatThreadInputDock: FC<LindaChatThreadInputDockProps> = ({
  isDark,
  inputMessage,
  onInputChange,
  onSend,
}) => {
  return (
    <div
      style={{
        padding: '10px 16px',
        background: isDark ? '#202C33' : '#F0F2F5',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #D1D7DB',
      }}
    >
      <Smile size={20} color={isDark ? '#8696A0' : '#54656F'} style={{ cursor: 'pointer' }} />
      <Paperclip size={20} color={isDark ? '#8696A0' : '#54656F'} style={{ cursor: 'pointer' }} />
      <input
        type="text"
        placeholder="Type a message (or click Linda Copilot Draft)..."
        data-testid="wa-message-input"
        value={inputMessage}
        onChange={e => onInputChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') onSend();
        }}
        style={{
          flex: 1,
          background: isDark ? '#2A3942' : '#FFFFFF',
          border: 'none',
          outline: 'none',
          borderRadius: 8,
          padding: '10px 14px',
          color: isDark ? '#D1D7DB' : '#111B21',
          fontSize: 13,
        }}
      />
      <button
        onClick={onSend}
        data-testid="wa-send-btn"
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: '#25D366',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#FFFFFF',
        }}
      >
        <Send size={16} />
      </button>
    </div>
  );
};

