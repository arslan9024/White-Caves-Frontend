import React, { FC } from 'react';
import { ToastItem } from './types';
import { WHITE } from './constants';

interface DocumentToastListProps {
  toasts: ToastItem[];
}

export const DocumentToastList: FC<DocumentToastListProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none',
      }}
    >
      {toasts.map(t => (
        <div
          key={t.id}
          style={{
            background: t.color,
            color: WHITE,
            padding: '12px 18px',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.85rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
            maxWidth: '360px',
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};
