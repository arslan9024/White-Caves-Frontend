// FILE: src/components/dashboard/ExecutiveAIVSCodeSidebar/RightSidebarSupervisorQuickLaunch.tsx
/**
 * RightSidebarSupervisorQuickLaunch.tsx
 * 1-Click Launch Stack for AIAMS, AICC-Sanctum, MD Daily Leasing Cockpit & All 5 Operational
 * AI Supervisors (Mary, Linda, Diana, Daisy, Henry) inside the Right AI Command Sidebar.
 * Standard: AEGIS Single Purpose File Law (< 350 lines, AEG-042).
 */

import React, { FC } from 'react';
import {
  Bot,
  Building2,
  Crown,
  FileCheck2,
  Home,
  Mail,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export interface RightSidebarSupervisorQuickLaunchProps {
  onSelectAgent?: (agentId: string, agentName: string) => void;
  onTileClick: (agentId: string, agentName: string) => void;
}

const BUTTON_BASE: React.CSSProperties = {
  width: '100%',
  marginBottom: '6px',
  padding: '7px 9px',
  borderRadius: '7px',
  fontSize: '0.7rem',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const RightSidebarSupervisorQuickLaunch: FC<RightSidebarSupervisorQuickLaunchProps> = ({
  onSelectAgent,
  onTileClick,
}) => {
  const launchItems = [
    {
      id: 'linda',
      testId: 'open-linda-main-btn',
      label: 'AI Linda · WhatsApp (10-SIM)',
      tag: 'SUP-08-1-01-1',
      bg: 'linear-gradient(135deg, rgba(37, 211, 102, 0.18), rgba(15, 23, 42, 0.85))',
      border: '1px solid rgba(37, 211, 102, 0.45)',
      color: '#ECFDF5',
      tagColor: '#86EFAC',
      Icon: MessageSquare,
    },
    {
      id: 'mary',
      testId: 'open-mary-main-btn',
      label: 'AI Mary · DH2 Inventory',
      tag: 'SUP-06-1-01-1',
      bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(15, 23, 42, 0.85))',
      border: '1px solid rgba(59, 130, 246, 0.45)',
      color: '#EFF6FF',
      tagColor: '#93C5FD',
      Icon: Building2,
    },
    {
      id: 'diana',
      testId: 'open-diana-main-btn',
      label: 'AI Diana · Owner Email',
      tag: 'SUP-02-6-01-1',
      bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(15, 23, 42, 0.85))',
      border: '1px solid rgba(245, 158, 11, 0.45)',
      color: '#FFFBEB',
      tagColor: '#FDE68A',
      Icon: Mail,
    },
    {
      id: 'daisy',
      testId: 'open-daisy-main-btn',
      label: 'AI Daisy · Leasing CRM',
      tag: 'SUP-05-2-01-1',
      bg: 'linear-gradient(135deg, rgba(20, 184, 166, 0.18), rgba(15, 23, 42, 0.85))',
      border: '1px solid rgba(20, 184, 166, 0.45)',
      color: '#F0FDFA',
      tagColor: '#99F6E4',
      Icon: Home,
    },
    {
      id: 'henry',
      testId: 'open-henry-main-btn',
      label: 'AI Henry · Records & Drive',
      tag: 'SUP-11-1-01-1',
      bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.18), rgba(15, 23, 42, 0.85))',
      border: '1px solid rgba(239, 68, 68, 0.45)',
      color: '#FEF2F2',
      tagColor: '#FCA5A5',
      Icon: FileCheck2,
    },
  ];

  return (
    <div style={{ marginBottom: '8px' }}>
      <button
        type="button"
        data-testid="open-ai-command-center-main-btn"
        onClick={() => onSelectAgent?.('ai-command', 'AI Command Center')}
        style={{
          ...BUTTON_BASE,
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(15, 23, 42, 0.85))',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          color: '#F8FAFC',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <Bot size={12} color="#EF4444" /> AIAMS Workforce Hub
        </span>
        <span style={{ color: '#FCA5A5', fontSize: '0.62rem' }}>AIAMS →</span>
      </button>

      <button
        type="button"
        data-testid="open-aicc-sanctum-right-btn"
        onClick={() => onSelectAgent?.('aicc-sanctum', 'AICC-Sanctum 8-Tier Command')}
        style={{
          ...BUTTON_BASE,
          background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.18), rgba(15, 23, 42, 0.88))',
          border: '1px solid rgba(244, 63, 94, 0.4)',
          color: '#FFF1F2',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <Crown size={12} color="#FB7185" /> AICC-Sanctum (1-12-108)
        </span>
        <span style={{ color: '#FDA4AF', fontSize: '0.62rem' }}>Sanctum →</span>
      </button>

      <button
        type="button"
        data-testid="open-leasing-cockpit-right-btn"
        onClick={() => onTileClick('leasing-cockpit', 'MD Daily Leasing Cockpit (DH2)')}
        style={{
          ...BUTTON_BASE,
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(15, 23, 42, 0.88))',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#ECFDF5',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <Sparkles size={12} color="#34D399" /> MD Daily Leasing Cockpit
        </span>
        <span style={{ color: '#6EE7B7', fontSize: '0.62rem' }}>DH2 →</span>
      </button>

      {launchItems.map(({ id, testId, label, tag, bg, border, color, tagColor, Icon }) => (
        <button
          key={id}
          type="button"
          data-testid={testId}
          onClick={() => onTileClick(id, label)}
          style={{ ...BUTTON_BASE, background: bg, border, color }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Icon size={12} color={tagColor} /> {label}
          </span>
          <span style={{ color: tagColor, fontSize: '0.58rem', fontFamily: 'monospace' }}>
            {tag}
          </span>
        </button>
      ))}
    </div>
  );
};

export default RightSidebarSupervisorQuickLaunch;
