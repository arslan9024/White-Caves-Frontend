import React, { FC } from 'react';

export interface LindaLiveTopBarProps {
  isDark: boolean;
  isLiveConnected: boolean;
  heartbeatLatency: number;
  unreadOnly: boolean;
  unreadTotal: number;
  showContextPane: boolean;
  onToggleUnread: () => void;
  onToggleContextPane: () => void;
}

export const LindaLiveTopBar: FC<LindaLiveTopBarProps> = ({
  isDark,
  isLiveConnected,
  heartbeatLatency,
  unreadOnly,
  unreadTotal,
  showContextPane,
  onToggleUnread,
  onToggleContextPane,
}) => {
  return (
    <>
      <div
        data-testid="linda-master-status-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 14px',
          borderRadius: 10,
          background: isDark ? 'rgba(15, 23, 42, 0.9)' : '#F8FAFC',
          border: isDark ? '1px solid rgba(37, 211, 102, 0.25)' : '1px solid #CBD5E1',
          fontSize: 12,
          color: isDark ? '#E2E8F0' : '#0F172A',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: isLiveConnected ? '#22C55E' : '#EF4444',
              display: 'inline-block',
            }}
          />
          <strong>Primary Master +971505760056</strong>
          <span style={{ color: isLiveConnected ? '#22C55E' : '#EF4444', fontWeight: 600 }}>
            {isLiveConnected ? 'Connected' : 'Reconnecting...'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>Latency: {heartbeatLatency}ms</span>
          <button
            type="button"
            data-testid="linda-unread-filter-btn"
            onClick={onToggleUnread}
            style={{
              padding: '2px 8px',
              borderRadius: 6,
              border: '1px solid rgba(148, 163, 184, 0.35)',
              background: unreadOnly ? '#EF4444' : 'transparent',
              color: unreadOnly ? '#FFFFFF' : 'inherit',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Unread ({unreadTotal})
          </button>
          <button
            type="button"
            data-testid="linda-context-pane-toggle"
            onClick={onToggleContextPane}
            style={{
              padding: '2px 8px',
              borderRadius: 6,
              border: '1px solid rgba(148, 163, 184, 0.35)',
              background: showContextPane ? 'rgba(37, 211, 102, 0.15)' : 'transparent',
              color: 'inherit',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {showContextPane ? 'Hide Context' : 'Show Context'}
          </button>
        </div>
      </div>

      {!isLiveConnected && (
        <div
          data-testid="linda-reconnect-banner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 14px',
            borderRadius: 8,
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: isDark ? '#FCA5A5' : '#991B1B',
            fontSize: 12,
          }}
        >
          <span>
            Primary Master (+971505760056) socket disconnected. Showing cached conversations.
          </span>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '2px 10px',
              borderRadius: 6,
              border: 'none',
              background: '#EF4444',
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Reconnect
          </button>
        </div>
      )}
    </>
  );
};

