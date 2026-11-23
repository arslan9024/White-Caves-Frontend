/**
 * PortalLogoRing.tsx
 * White Caves Luxury Emblem & Sovereign Telemetry Ring
 * Adheres to AEGIS Canonical Architecture & Single Purpose File Law (< 350 lines).
 *
 * Displays the illuminated logo ring with contextual status rings & telemetry
 * for Landlord, Tenant, and Executive portals.
 */

import React, { FC } from 'react';
import { ShieldCheck, Sparkles, Building2, UserCheck, Clock } from 'lucide-react';

export type PortalRingRole = 'managing_director' | 'landlord' | 'tenant';

export interface PortalLogoRingProps {
  role: PortalRingRole;
  title: string;
  subtitle: string;
  badgeLabel?: string;
  metricPrimary?: {
    label: string;
    value: string | number;
  };
  metricSecondary?: {
    label: string;
    value: string | number;
  };
  onRingClick?: () => void;
}

export const PortalLogoRing: FC<PortalLogoRingProps> = ({
  role,
  title,
  subtitle,
  badgeLabel,
  metricPrimary,
  metricSecondary,
  onRingClick,
}) => {
  const getRoleTheme = () => {
    switch (role) {
      case 'managing_director':
        return {
          glowColor: 'rgba(239, 68, 68, 0.45)',
          borderColor: '#EF4444',
          accentGradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
          badgeBg: 'rgba(239, 68, 68, 0.15)',
          badgeColor: '#EF4444',
          icon: <Sparkles size={16} className="text-red-500" />,
        };
      case 'landlord':
        return {
          glowColor: 'rgba(245, 158, 11, 0.45)',
          borderColor: '#F59E0B',
          accentGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          badgeBg: 'rgba(245, 158, 11, 0.15)',
          badgeColor: '#F59E0B',
          icon: <Building2 size={16} className="text-amber-500" />,
        };
      case 'tenant':
        return {
          glowColor: 'rgba(16, 185, 129, 0.45)',
          borderColor: '#10B981',
          accentGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          badgeBg: 'rgba(16, 185, 129, 0.15)',
          badgeColor: '#10B981',
          icon: <ShieldCheck size={16} className="text-emerald-500" />,
        };
    }
  };

  const theme = getRoleTheme();

  return (
    <div
      data-testid="portal-logo-ring-container"
      style={{
        position: 'relative',
        margin: '1.25rem 0 2rem 0',
        padding: '2rem 1.5rem',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: `0 12px 40px -10px ${theme.glowColor}, 0 4px 20px rgba(0, 0, 0, 0.4)`,
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Center Illuminated Logo Ring */}
      <div
        onClick={onRingClick}
        role={onRingClick ? 'button' : undefined}
        tabIndex={onRingClick ? 0 : undefined}
        aria-label="White Caves Emblem Ring"
        style={{
          position: 'relative',
          width: '104px',
          height: '104px',
          borderRadius: '50%',
          padding: '4px',
          background: `linear-gradient(135deg, ${theme.borderColor} 0%, rgba(255, 255, 255, 0.2) 50%, ${theme.borderColor} 100%)`,
          boxShadow: `0 0 25px ${theme.glowColor}, inset 0 0 15px ${theme.glowColor}`,
          cursor: onRingClick ? 'pointer' : 'default',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          marginBottom: '1.25rem',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: '#0B1120',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src="/company-logo.jpg"
            alt="White Caves Emblem"
            style={{
              width: '82%',
              height: '82%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Role & Title Header */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px' }}>
        {badgeLabel && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: theme.badgeBg,
              color: theme.badgeColor,
              border: `1px solid ${theme.borderColor}40`,
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            {theme.icon}
            <span>{badgeLabel}</span>
          </div>
        )}

        <h2
          style={{
            margin: '0 0 6px 0',
            fontSize: '1.5rem',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '0.88rem',
            color: '#94A3B8',
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>

        {/* Live Telemetry KPI Pills */}
        {(metricPrimary || metricSecondary) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            {metricPrimary && (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  {metricPrimary.label}:
                </span>
                <strong style={{ fontSize: '0.88rem', color: theme.badgeColor, fontWeight: 800 }}>
                  {metricPrimary.value}
                </strong>
              </div>
            )}
            {metricSecondary && (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  {metricSecondary.label}:
                </span>
                <strong style={{ fontSize: '0.88rem', color: '#F8FAFC', fontWeight: 800 }}>
                  {metricSecondary.value}
                </strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalLogoRing;
