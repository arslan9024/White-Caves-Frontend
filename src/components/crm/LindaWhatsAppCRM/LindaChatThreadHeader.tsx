import React, { FC } from 'react';
import { Sparkles, Phone, Video, MoreVertical, UserCheck } from 'lucide-react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';

export interface LindaChatThreadHeaderProps {
  isDark: boolean;
  selectedConv: LindaConversationItem | undefined;
  onAiDraft: (lang?: 'EN' | 'AR') => void;
  onHumanTakeover?: () => void;
}

export const LindaChatThreadHeader: FC<LindaChatThreadHeaderProps> = ({
  isDark,
  selectedConv,
  onAiDraft,
  onHumanTakeover,
}) => {
  return (
    <div
      style={{
        padding: '10px 16px',
        background: isDark ? '#202C33' : '#F0F2F5',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #D1D7DB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
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
        <MoreVertical
          size={17}
          color={isDark ? '#AEBAC1' : '#54656F'}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};
