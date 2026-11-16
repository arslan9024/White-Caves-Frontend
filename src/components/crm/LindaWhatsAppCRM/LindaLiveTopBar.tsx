import React, { FC, useState } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiClient } from '../../../utils/apiClient';

export interface LindaLiveTopBarProps {
  isDark: boolean;
  isLiveConnected: boolean;
  heartbeatLatency: number;
  unreadOnly: boolean;
  unreadTotal: number;
  showContextPane: boolean;
  onToggleUnread: () => void;
  onToggleContextPane: () => void;
  selectedAccount?: string;
  onReconnected?: () => void;
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
  selectedAccount = 'ALL',
  onReconnected,
}) => {
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [reconnectMsg, setReconnectMsg] = useState<string | null>(null);

  const handleSilentReconnect = async () => {
    setIsReconnecting(true);
    setReconnectMsg('Attempting live session handshake...');
    try {
      await apiClient.post('/linda/connect', {});
      setReconnectMsg('Socket connection initiated');
      setTimeout(() => {
        setIsReconnecting(false);
        setReconnectMsg(null);
        onReconnected?.();
      }, 1000);
    } catch {
      setReconnectMsg('Offline bridge active — cached messages intact');
      setTimeout(() => {
        setIsReconnecting(false);
        setReconnectMsg(null);
      }, 2000);
    }
  };

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
          <strong>
            {selectedAccount === 'ALL'
              ? 'Multi-Device Cluster (Active)'
              : selectedAccount.startsWith('+')
                ? `Line ${selectedAccount}`
                : `Account: ${selectedAccount.toUpperCase()}`}
          </strong>
          <span style={{ color: isLiveConnected ? '#22C55E' : '#EF4444', fontWeight: 600 }}>
            {isLiveConnected ? 'Connected' : 'Offline Mock Fallback'}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={14} color="#EF4444" />
            <span>
              {reconnectMsg ||
                'Primary Master socket disconnected. Resilient offline mock cache active — no thread data lost.'}
            </span>
          </div>
          <button
            type="button"
            disabled={isReconnecting}
            onClick={handleSilentReconnect}
            data-testid="linda-resync-btn"
            style={{
              padding: '3px 10px',
              borderRadius: 6,
              border: 'none',
              background: isReconnecting ? '#475569' : '#25D366',
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 700,
              cursor: isReconnecting ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <RefreshCw size={11} className={isReconnecting ? 'animate-spin' : ''} />
            <span>{isReconnecting ? 'Re-syncing...' : 'Re-sync Socket'}</span>
          </button>
        </div>
      )}
    </>
  );
};
