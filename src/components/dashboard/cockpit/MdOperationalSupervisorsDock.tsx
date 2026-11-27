// FILE: src/components/dashboard/cockpit/MdOperationalSupervisorsDock.tsx
/**
 * MdOperationalSupervisorsDock.tsx
 * White Caves Real Estate LLC — Managing Director 1-Click Launch Dock for Zoe + All 5 Operational
 * AI Supervisors (Mary, Linda, Diana, Daisy, Henry) powering DAMAC Hills 2 Residential Leasing.
 * Standard: AEGIS Single Purpose File Law (< 350 lines, AEG-042).
 */

import React, { FC } from 'react';
import {
  Building2,
  MessageSquare,
  Mail,
  Home,
  FileCheck2,
  Sparkles,
  Crown,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import {
  CANONICAL_AI_SUPERVISOR_CHAINS,
  type OperationalAssistantKey,
} from '../../../portals/md/aicc/formulas/aiAssistantSupervisorHierarchy.formula';

export interface MdOperationalSupervisorsDockProps {
  onNavigate?: (route: string) => void;
}

interface SupervisorWorkflowTile {
  key: OperationalAssistantKey;
  step: string;
  dh2Duty: string;
  accent: string;
  Icon: typeof Building2;
}

const DH2_WORKFLOW_TILES: SupervisorWorkflowTile[] = [
  {
    key: 'mary',
    step: 'STEP 1 · INVENTORY',
    dh2Duty: '9,210 DH2 Units · 28+ Clusters · Sheets Sync',
    accent: '#38BDF8',
    Icon: Building2,
  },
  {
    key: 'linda',
    step: 'STEP 2 · WHATSAPP',
    dh2Duty: '10-SIM Fleet · Hunter Outreach · MD Queue',
    accent: '#22C55E',
    Icon: MessageSquare,
  },
  {
    key: 'diana',
    step: 'STEP 3 · OWNER EMAIL',
    dh2Duty: 'Gmail Owner Campaigns · Preview & Dispatch',
    accent: '#F59E0B',
    Icon: Mail,
  },
  {
    key: 'daisy',
    step: 'STEP 4 · LEASING CRM',
    dh2Duty: '12-Stage Deals · Viewings · PDC · RERA 90d',
    accent: '#14B8A6',
    Icon: Home,
  },
  {
    key: 'henry',
    step: 'STEP 5 · VAULT & OCR',
    dh2Duty: 'EID/Deed/Contract OCR · Drive · Sole Male AI',
    accent: '#EF4444',
    Icon: FileCheck2,
  },
];

export const MdOperationalSupervisorsDock: FC<MdOperationalSupervisorsDockProps> = ({
  onNavigate,
}) => {
  return (
    <section
      data-testid="md-operational-supervisors-dock"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#1E293B',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '18px',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '12px',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 800,
              color: '#EF4444',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            <Layers size={14} /> DAMAC Hills 2 End-to-End Leasing Squad · AI Zoe (WC-COO-01)
          </div>
          <h2 style={{ margin: '3px 0 0', fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
            5 Operational AI Supervisors — 1-Click Workspace Launch
          </h2>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            type="button"
            data-testid="md-dock-open-leasing-cockpit"
            onClick={() => onNavigate?.('/dashboard/leasing-cockpit')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              background: '#EF4444',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            <Sparkles size={13} /> MD Daily Leasing Cockpit
          </button>
          <button
            type="button"
            data-testid="md-dock-open-aicc-sanctum"
            onClick={() => onNavigate?.('/aicc-sanctum')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              background: '#0F172A',
              border: '1px solid rgba(239, 68, 68, 0.45)',
              color: '#FCA5A5',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            <Crown size={13} /> AICC-Sanctum (1-12-108)
          </button>
          <button
            type="button"
            data-testid="md-dock-open-zoe"
            onClick={() => onNavigate?.('/dashboard/zoe')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              background: '#0F172A',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            AI Zoe COO Console <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '10px',
        }}
      >
        {DH2_WORKFLOW_TILES.map(({ key, step, dh2Duty, accent, Icon }) => {
          const chain = CANONICAL_AI_SUPERVISOR_CHAINS[key as OperationalAssistantKey];
          return (
            <button
              key={key}
              type="button"
              data-testid={`md-supervisor-launch-${key}`}
              onClick={() => onNavigate?.(chain.workspaceRoute)}
              style={{
                textAlign: 'left',
                background: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '12px 14px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                transition: 'border-color 0.15s ease, transform 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    color: accent,
                  }}
                >
                  {step}
                </span>
                <Icon size={15} color={accent} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                {chain.supervisor.name}
              </div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', lineHeight: 1.35 }}>{dh2Duty}</div>
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '6px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  color: '#94A3B8',
                }}
              >
                <span>
                  {chain.supervisor.code} · {chain.manager.code}
                </span>
                <ArrowUpRight size={12} color={accent} />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default MdOperationalSupervisorsDock;
