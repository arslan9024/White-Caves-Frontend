import React, { FC } from 'react';
import { Bot } from 'lucide-react';
import type { ChatMessage } from './LindaChatThreadPane';
import { LindaRichMediaMessage } from './LindaRichMediaMessage';
import { LindaDeliveryTick } from './LindaDeliveryTick';
import styles from './LindaWhatsAppWeb.module.css';

export interface LindaChatBubbleProps {
  message: ChatMessage;
  isDark: boolean;
}

/**
 * Authentic WhatsApp Speech Bubble with SVG Corner Tails & Delivery Ticks
 * Turing Law Compliant (< 250 lines)
 */
export const LindaChatBubble: FC<LindaChatBubbleProps> = ({ message: msg, isDark }) => {
  const isOutbound = msg.sender === 'agent' || msg.sender === 'bot';
  const bubbleBg = isOutbound ? (isDark ? '#005C4B' : '#D9FDD3') : isDark ? '#202C33' : '#FFFFFF';
  const textColor = isDark ? '#E9EDEF' : '#111B21';

  return (
    <div
      className={`${styles.waBubbleWrap} ${isOutbound ? styles.waBubbleOutbound : styles.waBubbleInbound}`}
      style={{
        background: bubbleBg,
        color: textColor,
        padding: '7px 11px',
      }}
    >
      {/* Authentic Corner Tail SVG */}
      {isOutbound ? (
        <svg
          viewBox="0 0 8 12"
          className={styles.waTailOutbound}
          fill={bubbleBg}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0 C3,0 8,2 8,6 C8,10 4,12 0,12 L0,0 Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 8 12"
          className={styles.waTailInbound}
          fill={bubbleBg}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8,0 C5,0 0,2 0,6 C0,10 4,12 8,12 L8,0 Z" />
        </svg>
      )}

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
        <LindaRichMediaMessage mediaType={msg.mediaType} mediaUrl={msg.mediaUrl} text={msg.text} />
      )}

      <div style={{ fontSize: 13, lineHeight: '19px', whiteSpace: 'pre-wrap' }}>{msg.text}</div>

      {/* Timestamp & Delivery Tick */}
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
        {isOutbound && <LindaDeliveryTick status={msg.status} size={14} />}
      </div>
    </div>
  );
};
