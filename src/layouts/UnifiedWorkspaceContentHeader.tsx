/**
 * UnifiedWorkspaceContentHeader.tsx — Top Header Banner for Workspace Canvas
 */

import React from 'react';
import type { WorkspaceViewItem } from './UnifiedWorkspaceLayout.data';

interface UnifiedWorkspaceContentHeaderProps {
  richViewData?: WorkspaceViewItem;
  activeView: {
    title: string;
    category?: string;
    group?: string;
  };
  onNavigate: (route: string) => void;
}

export const UnifiedWorkspaceContentHeader: React.FC<UnifiedWorkspaceContentHeaderProps> = ({
  richViewData,
  activeView,
  onNavigate,
}) => {
  return (
    <header
      style={{
        height: '64px',
        borderBottom: '1px solid var(--border-color, #E2E8F0)',
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--white, #FFFFFF)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '11px',
            color: 'var(--text-secondary, #64748B)',
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          {richViewData?.departmentFloor || activeView.group} · {activeView.category}
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 800,
            color: 'var(--bg-dark, #0F172A)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>{activeView.title}</span>
          {richViewData?.assistantCode && (
            <span
              style={{
                fontSize: '11px',
                background: 'var(--slate-100, #F1F5F9)',
                color: 'var(--border-color, #475569)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: 700,
              }}
            >
              🤖 {richViewData.assistantCode}
            </span>
          )}
        </h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => onNavigate('/crm')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border-color, #E2E8F0)',
            backgroundColor: 'var(--white, #FFFFFF)',
            color: 'var(--bg-dark, #0F172A)',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>🏛️</span> Zoe Business Hub
        </button>

        <button
          onClick={() => onNavigate('/owner/governance')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'var(--primary-red, #EF4444)',
            color: 'var(--white, #FFFFFF)',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
          }}
        >
          <span>🛡️</span> Sovereign Governance
        </button>
      </div>
    </header>
  );
};

export default UnifiedWorkspaceContentHeader;

