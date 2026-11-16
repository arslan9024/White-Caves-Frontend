import React, { FC } from 'react';
import { Clock, Volume2, VolumeX, RefreshCw } from 'lucide-react';

export interface LindaExecutiveControlsProps {
  isDark: boolean;
  isConnected: boolean;
  lindaStatus: string;
  loadingAction: 'start' | 'stop' | 'restart' | null;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  currentTimeGST: string;
  heartbeatLatency: number;
  confirmEmergencyStop: boolean;
  setConfirmEmergencyStop: (val: boolean) => void;
  onRefreshStatus: () => void;
  onToggleRuntime: () => void;
  badgeBg: string;
  badgeBorder: string;
  primaryTextColor: string;
}

export const LindaExecutiveControls: FC<LindaExecutiveControlsProps> = ({
  isDark,
  isConnected,
  lindaStatus,
  loadingAction,
  soundEnabled,
  setSoundEnabled,
  currentTimeGST,
  heartbeatLatency,
  confirmEmergencyStop,
  setConfirmEmergencyStop,
  onRefreshStatus,
  onToggleRuntime,
  badgeBg,
  badgeBorder,
  primaryTextColor,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {/* Live Clock & Latency Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: badgeBg,
          padding: '6px 12px',
          borderRadius: 8,
          border: badgeBorder,
          fontSize: 11,
          color: isDark ? '#CBD5E1' : '#475569',
        }}
      >
        <Clock size={13} color="#38BDF8" />
        <strong style={{ color: primaryTextColor }}>{currentTimeGST || 'Asia/Dubai'}</strong>
        <span style={{ color: '#64748B' }}>•</span>
        <span style={{ color: '#16A34A', fontWeight: 700 }}>{heartbeatLatency}ms</span>
      </div>

      {/* Sound Toggle */}
      <button
        type="button"
        title={soundEnabled ? 'Mute sound alerts' : 'Enable sound alerts'}
        onClick={() => setSoundEnabled(!soundEnabled)}
        style={{
          background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF',
          border: isDark ? '1px solid rgba(148, 163, 184, 0.25)' : '1px solid #CBD5E1',
          color: soundEnabled ? '#10B981' : '#94A3B8',
          borderRadius: 8,
          padding: '6px 10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      </button>

      {/* Health Refresh */}
      <button
        type="button"
        title="Refresh Health & Diagnostics"
        onClick={onRefreshStatus}
        style={{
          background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF',
          border: isDark ? '1px solid rgba(148, 163, 184, 0.25)' : '1px solid #CBD5E1',
          color: primaryTextColor,
          borderRadius: 8,
          padding: '6px 10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 12,
        }}
      >
        <RefreshCw size={13} /> Check Health
      </button>

      <span
        role="status"
        aria-live="polite"
        style={{
          color: isConnected ? (isDark ? '#86EFAC' : '#15803D') : isDark ? '#FCA5A5' : '#B91C1C',
          fontSize: 12,
          fontWeight: 700,
          background: badgeBg,
          padding: '6px 12px',
          borderRadius: 8,
          border: badgeBorder,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: isConnected ? '#22C55E' : '#EF4444',
            boxShadow: isConnected ? '0 0 10px #22C55E' : '0 0 10px #EF4444',
          }}
        />
        Linda Runtime: {isConnected ? 'CONNECTED' : lindaStatus.toUpperCase()}
      </span>

      {/* Emergency Stop Safeguard */}
      {confirmEmergencyStop ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            type="button"
            onClick={() => {
              onToggleRuntime();
              setConfirmEmergencyStop(false);
            }}
            style={{
              background: '#DC2626',
              border: '1px solid #EF4444',
              color: '#FFFFFF',
              borderRadius: 8,
              padding: '7px 12px',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            Confirm Stop
          </button>
          <button
            type="button"
            onClick={() => setConfirmEmergencyStop(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#CBD5E1',
              borderRadius: 8,
              padding: '7px 10px',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (isConnected) {
              setConfirmEmergencyStop(true);
            } else {
              onToggleRuntime();
            }
          }}
          disabled={loadingAction !== null}
          style={{
            background: isConnected ? 'rgba(220,38,38,0.24)' : 'rgba(22,163,74,0.28)',
            border: isConnected
              ? '1px solid rgba(248,113,113,0.5)'
              : '1px solid rgba(34,197,94,0.55)',
            color: isConnected ? '#FECACA' : '#DCFCE7',
            borderRadius: 8,
            padding: '7px 14px',
            cursor: loadingAction !== null ? 'not-allowed' : 'pointer',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {loadingAction === 'start'
            ? 'Starting Linda…'
            : loadingAction === 'stop'
              ? 'Stopping Linda…'
              : isConnected
                ? 'Stop Linda Runtime'
                : 'Start Linda Runtime'}
        </button>
      )}
    </div>
  );
};
