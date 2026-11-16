import React, { FC } from 'react';
import { Plus, CheckSquare } from 'lucide-react';

export interface LindaChatListHeaderProps {
  isDark: boolean;
  bulkMode: boolean;
  totalCount: number;
  onOpenLinkModal?: () => void;
  onToggleBulkMode: () => void;
}

export const LindaChatListHeader: FC<LindaChatListHeaderProps> = ({
  isDark,
  bulkMode,
  totalCount,
  onOpenLinkModal,
  onToggleBulkMode,
}) => {
  return (
    <div
      style={{
        padding: '10px 14px',
        background: isDark ? '#202C33' : '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E2E8F0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#25D366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            fontWeight: 800,
            fontSize: 13,
          }}
        >
          WA
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: isDark ? '#E9EDEF' : '#111B21' }}>
            WhatsApp Desk
          </div>
          <div
            style={{
              fontSize: 10,
              color: '#25D366',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#25D366' }} />
            Live Daemon
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {onOpenLinkModal && (
          <button
            type="button"
            data-testid="wa-link-account-btn"
            onClick={onOpenLinkModal}
            style={{
              background: 'rgba(37, 211, 102, 0.15)',
              border: '1px solid #25D366',
              color: '#25D366',
              borderRadius: 6,
              padding: '3px 8px',
              fontSize: 10,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Plus size={12} />
            <span>Link</span>
          </button>
        )}
        <button
          type="button"
          data-testid="wa-bulk-mode-toggle"
          onClick={onToggleBulkMode}
          style={{
            background: bulkMode ? 'rgba(37, 211, 102, 0.2)' : 'transparent',
            border: '1px solid rgba(37, 211, 102, 0.4)',
            color: '#25D366',
            borderRadius: 6,
            padding: '3px 8px',
            fontSize: 10,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <CheckSquare size={12} />
          <span>{bulkMode ? 'Cancel' : 'Bulk'}</span>
        </button>
        <span style={{ fontSize: 10, fontWeight: 700, color: isDark ? '#8696A0' : '#54656F' }}>
          {totalCount}
        </span>
      </div>
    </div>
  );
};
