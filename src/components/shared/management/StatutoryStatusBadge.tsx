/**
 * StatutoryStatusBadge.tsx — Shared UAE DLD / RERA / Ejari / AML Compliance Badge
 * Reusable across DMS, TMS, and ERMS viewports (AEG-042 < 350 lines).
 */
import React, { FC } from 'react';
import { ShieldCheck, AlertTriangle, Clock, ShieldAlert } from 'lucide-react';

export type StatutoryStatus = 'COMPLIANT' | 'PENDING' | 'WARNING' | 'BLOCKED';

export interface StatutoryStatusBadgeProps {
  status: StatutoryStatus;
  label?: string;
}

const STATUS_STYLES: Record<
  StatutoryStatus,
  { bg: string; border: string; color: string; icon: React.ReactNode; defaultLabel: string }
> = {
  COMPLIANT: {
    bg: 'rgba(16, 185, 129, 0.14)',
    border: 'rgba(16, 185, 129, 0.35)',
    color: '#34D399',
    icon: <ShieldCheck size={11} />,
    defaultLabel: 'RERA / DLD Compliant',
  },
  PENDING: {
    bg: 'rgba(59, 130, 246, 0.14)',
    border: 'rgba(59, 130, 246, 0.35)',
    color: '#60A5FA',
    icon: <Clock size={11} />,
    defaultLabel: 'Pending Filing',
  },
  WARNING: {
    bg: 'rgba(245, 158, 11, 0.14)',
    border: 'rgba(245, 158, 11, 0.35)',
    color: '#FBBF24',
    icon: <AlertTriangle size={11} />,
    defaultLabel: 'SLA Warning',
  },
  BLOCKED: {
    bg: 'rgba(239, 68, 68, 0.14)',
    border: 'rgba(239, 68, 68, 0.35)',
    color: '#F87171',
    icon: <ShieldAlert size={11} />,
    defaultLabel: 'Statutory Hold',
  },
};

export const StatutoryStatusBadge: FC<StatutoryStatusBadgeProps> = React.memo(
  ({ status, label }) => {
    const cfg = STATUS_STYLES[status];
    return (
      <span
        data-testid={`statutory-badge-${status.toLowerCase()}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 8px',
          borderRadius: '9999px',
          fontSize: '0.68rem',
          fontWeight: 700,
          backgroundColor: cfg.bg,
          border: `1px solid ${cfg.border}`,
          color: cfg.color,
          whiteSpace: 'nowrap',
        }}
      >
        {cfg.icon}
        <span>{label || cfg.defaultLabel}</span>
      </span>
    );
  }
);

StatutoryStatusBadge.displayName = 'StatutoryStatusBadge';
export default StatutoryStatusBadge;
