import React, { FC } from 'react';
import styles from './LindaWhatsAppWeb.module.css';

export interface LindaTypingIndicatorProps {
  authorName?: string;
  isDark?: boolean;
}

/**
 * Authentic WhatsApp Web Typing Wave Bubble
 */
export const LindaTypingIndicator: FC<LindaTypingIndicatorProps> = ({
  authorName = 'Linda AI',
  isDark = true,
}) => {
  return (
    <div
      data-testid="wa-typing-indicator"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'flex-start',
        background: isDark ? '#202C33' : '#FFFFFF',
        color: isDark ? '#8696A0' : '#667781',
        borderRadius: '0px 12px 12px 12px',
        padding: '6px 12px',
        fontSize: 12,
        boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
        position: 'relative',
        marginBottom: 6,
      }}
    >
      <span style={{ fontWeight: 600 }}>{authorName} is typing</span>
      <div className={styles.typingWave}>
        <span className={styles.typingDot} />
        <span className={styles.typingDot} />
        <span className={styles.typingDot} />
      </div>
    </div>
  );
};
