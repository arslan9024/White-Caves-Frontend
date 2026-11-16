/**
 * UnifiedWorkspaceMdHub.tsx — MD Hub Exclusive Sidebar Accordion
 */

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface UnifiedWorkspaceMdHubProps {
  isMdHubOpen: boolean;
  setIsMdHubOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alertBadge: React.ReactNode;
  onSelectView: (code: string, route: string) => void;
}

export const UnifiedWorkspaceMdHub: React.FC<UnifiedWorkspaceMdHubProps> = ({
  isMdHubOpen,
  setIsMdHubOpen,
  alertBadge,
  onSelectView,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.06)',
        borderBottom: '1.5px solid rgba(239, 68, 68, 0.35)',
      }}
    >
      <button
        onClick={() => setIsMdHubOpen(prev => !prev)}
        style={{
          width: '100%',
          padding: '12px 18px',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: 'none',
          color: 'var(--primary-red, #EF4444)',
          fontWeight: 800,
          fontSize: '0.82rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>👑 [Managing Director Hub]</span>
          {alertBadge}
        </div>
        <span>{isMdHubOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
      </button>

      {isMdHubOpen && (
        <div
          style={{
            padding: '10px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <button
            onClick={() => onSelectView('MD-BRIEF', '/crm')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '10px 12px',
              borderRadius: '8px',
              background: 'var(--card-dark, #1E293B)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--bg-light, #F8FAFC)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <span style={{ fontSize: '16px' }}>📊</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--white, #FFFFFF)', fontWeight: 800 }}>
                Morning Briefing (08:00 AM)
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted, #94A3B8)' }}>
                12-Department Overview
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelectView('MD-CRED', '/profile')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '10px 12px',
              borderRadius: '8px',
              background: 'var(--card-dark, #1E293B)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--bg-light, #F8FAFC)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '16px' }}>🏛️</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--white, #FFFFFF)', fontWeight: 800 }}>
                DET & RERA License Monitor
              </div>
              <div style={{ fontSize: '10px', color: 'var(--accent-green, #10B981)' }}>
                License 1388443 Valid
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelectView('PROG-01', '/crm')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '10px 12px',
              borderRadius: '8px',
              background: 'var(--card-dark, #1E293B)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: 'var(--bg-light, #F8FAFC)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '16px' }}>🌟</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--white, #FFFFFF)', fontWeight: 800 }}>
                Project Progress Telemetry
              </div>
              <div style={{ fontSize: '10px', color: 'var(--accent-blue, #3B82F6)' }}>
                Waves 1–68 · 100% Green
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default UnifiedWorkspaceMdHub;

