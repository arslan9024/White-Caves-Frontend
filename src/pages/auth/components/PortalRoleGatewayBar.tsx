/**
 * PortalRoleGatewayBar.tsx — Branded Role-Based Portal Selector (MD / Landlord / Tenant)
 * Enforces White Caves Brand (#EF4444, #0F172A, #FFFFFF) and lucide-react icons exclusively.
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { memo } from 'react';
import { Crown, Building2, Home, ArrowRight } from 'lucide-react';
import { PORTAL_GATEWAY_OPTIONS, type PortalGatewayRole } from './authTypes';

interface PortalRoleGatewayBarProps {
  selectedRole: PortalGatewayRole;
  onSelectRole: (role: PortalGatewayRole) => void;
  disabled?: boolean;
}

const ROLE_ICON: Record<PortalGatewayRole, React.ReactNode> = {
  managing_director: <Crown size={15} />,
  landlord: <Building2 size={15} />,
  tenant: <Home size={15} />,
};

export const PortalRoleGatewayBar = memo(function PortalRoleGatewayBar({
  selectedRole,
  onSelectRole,
  disabled = false,
}: PortalRoleGatewayBarProps) {
  const activeOption =
    PORTAL_GATEWAY_OPTIONS.find(opt => opt.id === selectedRole) ?? PORTAL_GATEWAY_OPTIONS[0];

  return (
    <div
      data-testid="portal-role-gateway"
      style={{
        marginBottom: '18px',
        padding: '12px',
        borderRadius: '14px',
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: '#94A3B8',
        }}
      >
        <span>Select White Caves Portal</span>
        <span style={{ color: '#EF4444', fontFamily: 'monospace' }}>
          {activeOption.targetRoute}
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Portal role selection"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6px',
        }}
      >
        {PORTAL_GATEWAY_OPTIONS.map(option => {
          const isSelected = option.id === selectedRole;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              data-testid={`portal-gateway-${option.id}`}
              onClick={() => onSelectRole(option.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '9px 6px',
                borderRadius: '10px',
                border: isSelected ? '1.5px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.1)',
                background: isSelected ? 'rgba(239, 68, 68, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                color: isSelected ? '#FFFFFF' : '#CBD5E1',
                fontSize: '11px',
                fontWeight: 700,
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ color: isSelected ? '#EF4444' : '#94A3B8' }}>
                {ROLE_ICON[option.id]}
              </span>
              <span>{option.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          fontSize: '11px',
          color: '#CBD5E1',
        }}
      >
        <span>{activeOption.description}</span>
        <ArrowRight size={12} color="#EF4444" style={{ flexShrink: 0 }} />
      </div>
    </div>
  );
});

export default PortalRoleGatewayBar;
