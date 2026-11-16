import React, { FC } from 'react';
import styles from './LindaWhatsAppWeb.module.css';

export interface LindaChatRowSkeletonProps {
  count?: number;
  isDark?: boolean;
}

export const LindaChatRowSkeleton: FC<LindaChatRowSkeletonProps> = ({
  count = 3,
  isDark = true,
}) => {
  return (
    <div data-testid="wa-chat-skeleton-list" style={{ display: 'grid', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid #E2E8F0',
          }}
        >
          <div
            className={styles.waSkeleton}
            style={{ width: 42, height: 42, borderRadius: '50%', flexShrink: 0 }}
          />
          <div style={{ flex: 1, display: 'grid', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                className={styles.waSkeleton}
                style={{ width: '40%', height: 12, borderRadius: 4 }}
              />
              <div
                className={styles.waSkeleton}
                style={{ width: '15%', height: 10, borderRadius: 4 }}
              />
            </div>
            <div
              className={styles.waSkeleton}
              style={{ width: '70%', height: 10, borderRadius: 4 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
