import React, { FC } from 'react';
import { Sparkles, X } from 'lucide-react';
import { LindaViewTabs } from './LindaViewTabs';
import { LindaExecutiveBrandBadge } from './LindaExecutiveBrandBadge';
import { LindaExecutiveControls } from './LindaExecutiveControls';
import type { LindaViewTab } from './LindaWhatsAppCRM.types';

export interface LindaExecutiveHeaderProps {
  isDark: boolean;
  isConnected: boolean;
  lindaStatus: string;
  loadingAction: 'start' | 'stop' | 'restart' | null;
  controlError: string;
  activeViewTab: LindaViewTab;
  setActiveViewTab: (tab: LindaViewTab) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  currentTimeGST: string;
  heartbeatLatency: number;
  confirmEmergencyStop: boolean;
  setConfirmEmergencyStop: (val: boolean) => void;
  toastNotification: string | null;
  setToastNotification: (val: string | null) => void;
  onRefreshStatus: () => void;
  onToggleRuntime: () => void;
}

/**
 * LindaExecutiveHeader — Master Header & Ops Status
 * Turing Law Compliant (< 250 lines).
 */
export const LindaExecutiveHeader: React.FC<LindaExecutiveHeaderProps> = ({
  isDark,
  isConnected,
  lindaStatus,
  loadingAction,
  controlError,
  activeViewTab,
  setActiveViewTab,
  soundEnabled,
  setSoundEnabled,
  currentTimeGST,
  heartbeatLatency,
  confirmEmergencyStop,
  setConfirmEmergencyStop,
  toastNotification,
  setToastNotification,
  onRefreshStatus,
  onToggleRuntime,
}) => {
  const headerBg = isDark
    ? 'linear-gradient(135deg, rgba(37,211,102,0.22), rgba(15,23,42,0.92))'
    : 'linear-gradient(135deg, rgba(220,252,231,0.9), #FFFFFF)';
  const headerBorder = isDark
    ? '1px solid rgba(37, 211, 102, 0.4)'
    : '1px solid rgba(34, 197, 94, 0.35)';
  const titleColor = isDark ? '#ECFDF5' : '#064E3B';
  const subtitleColor = isDark ? '#A7F3D0' : '#047857';
  const badgeBg = isDark ? 'rgba(2, 6, 23, 0.75)' : '#F1F5F9';
  const badgeBorder = isDark ? '1px solid rgba(148, 163, 184, 0.25)' : '1px solid #E2E8F0';
  const primaryTextColor = isDark ? '#F8FAFC' : '#0F172A';

  return (
    <header
      style={{
        background: headerBg,
        border: headerBorder,
        borderRadius: 14,
        padding: 18,
        boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 18px rgba(34, 197, 94, 0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <LindaExecutiveBrandBadge
          isDark={isDark}
          titleColor={titleColor}
          subtitleColor={subtitleColor}
        />

        <LindaExecutiveControls
          isDark={isDark}
          isConnected={isConnected}
          lindaStatus={lindaStatus}
          loadingAction={loadingAction}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          currentTimeGST={currentTimeGST}
          heartbeatLatency={heartbeatLatency}
          confirmEmergencyStop={confirmEmergencyStop}
          setConfirmEmergencyStop={setConfirmEmergencyStop}
          onRefreshStatus={onRefreshStatus}
          onToggleRuntime={onToggleRuntime}
          badgeBg={badgeBg}
          badgeBorder={badgeBorder}
          primaryTextColor={primaryTextColor}
        />
      </div>

      {/* Toast Notification Strip */}
      {toastNotification && (
        <div
          role="status"
          style={{
            marginTop: 12,
            background: 'linear-gradient(90deg, rgba(37, 211, 102, 0.18), rgba(15, 23, 42, 0.85))',
            border: '1px solid rgba(37, 211, 102, 0.45)',
            borderRadius: 8,
            padding: '8px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#ECFDF5',
            fontSize: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={14} color="#4ADE80" />
            <span>{toastNotification}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastNotification(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: 2,
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {controlError && (
        <p style={{ margin: '8px 0 0 0', color: '#FCA5A5', fontSize: 12 }}>{controlError}</p>
      )}

      {/* View Tabs */}
      <LindaViewTabs
        isDark={isDark}
        activeViewTab={activeViewTab}
        setActiveViewTab={setActiveViewTab}
      />
    </header>
  );
};
