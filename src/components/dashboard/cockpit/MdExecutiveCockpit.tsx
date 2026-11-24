/**
 * MdExecutiveCockpit.tsx
 * White Caves HQ Executive Cockpit for Managing Director (Arslan Malik)
 * Standard: AEGIS Canonical Architecture Standard & Single Purpose File Law (< 350 lines, AEG-042).
 * Colors: Pure White (#FFFFFF), Slate (#0F172A), Crimson Red (#EF4444).
 */

import React, { FC, useState } from 'react';
import { PortalLogoRing } from '../../portal/PortalLogoRing';
import { AIOrganogramTree } from '../organogram/AIOrganogramTree';
import type { SupervisorDef } from '../../../data/assistants108Registry.data';
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  FileCheck,
  Zap,
} from 'lucide-react';

export interface MdExecutiveCockpitProps {
  onNavigate?: (route: string) => void;
  onSelectAssistant?: (assistant: SupervisorDef) => void;
}

export const MdExecutiveCockpit: FC<MdExecutiveCockpitProps> = ({
  onNavigate,
  onSelectAssistant,
}) => {
  const [activeMetricDeck, setActiveMetricDeck] = useState<'all' | 'statutory' | 'revenue'>('all');

  const executiveKpis = [
    {
      label: 'Corporate Entities',
      value: '13,081 Seats',
      sublabel: '1-12-108 Fractal Cap',
      icon: <Users size={18} className="text-red-500" />,
      route: '/dashboard/employees/roster',
    },
    {
      label: 'DLD Escrow Pipeline',
      value: 'AED 42.8M',
      sublabel: '100% Statutory Compliant',
      icon: <ShieldCheck size={18} className="text-emerald-500" />,
      route: '/dashboard/deals/escrow',
    },
    {
      label: 'Corporate Floors',
      value: '12 Directorates',
      sublabel: 'Fully Synced (DMS/ERMS/TMS)',
      icon: <Building2 size={18} className="text-blue-500" />,
      route: '/dashboard/departments/slots',
    },
    {
      label: 'Active Mandates',
      value: '248 Deals',
      sublabel: 'Q4 Luxury Closings',
      icon: <Briefcase size={18} className="text-amber-500" />,
      route: '/dashboard/deals/pipeline',
    },
  ];

  return (
    <div
      data-testid="md-executive-cockpit"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        minHeight: '100%',
        overflowY: 'auto',
      }}
    >
      {/* ── TOP APEX PODIUM: Central Illuminated Logo Ring ─────────────────── */}
      <section style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <PortalLogoRing
          role="managing_director"
          title="WHITE CAVES REAL ESTATE LLC"
          subtitle="Founder & Managing Director Sovereign Executive Cockpit — Arslan Malik"
          badgeLabel="APEX LEVEL 5 • SOVEREIGN NODE"
          metricPrimary={{
            label: 'Monthly Net Volume',
            value: 'AED 124.5M',
          }}
          metricSecondary={{
            label: 'Statutory Health',
            value: '100% RERA/Ejari',
          }}
          onRingClick={() => onNavigate?.('/dashboard/analytics')}
        />
      </section>

      {/* ── QUICK EXECUTIVE TELEMETRY DECK ────────────────────────────────── */}
      <section
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {executiveKpis.map((kpi, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate?.(kpi.route)}
            style={{
              backgroundColor: '#1E293B',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '16px 20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'transform 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <div>
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>
                {kpi.label}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                {kpi.sublabel}
              </div>
            </div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {kpi.icon}
            </div>
          </div>
        ))}
      </section>

      {/* ── CENTRAL APEX: Live Bhakti 1-12-108 Organogram Command Tree ─────── */}
      <section
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} className="text-red-500" />
            <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0, letterSpacing: '0.5px' }}>
              LIVE CORPORATE ORGANOGRAM & SOVEREIGN DISPATCH
            </h2>
          </div>
          <span
            style={{
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#EF4444',
              fontWeight: 700,
            }}
          >
            1-12-108 RECURSIVE FRACTAL
          </span>
        </div>

        <AIOrganogramTree onSelectAssistant={onSelectAssistant} />
      </section>
    </div>
  );
};

export default MdExecutiveCockpit;
