import React, { FC } from 'react';
import { Smartphone } from 'lucide-react';

export interface LindaExecutiveBrandBadgeProps {
  isDark: boolean;
  titleColor: string;
  subtitleColor: string;
}

export const LindaExecutiveBrandBadge: FC<LindaExecutiveBrandBadgeProps> = ({
  isDark,
  titleColor,
  subtitleColor,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)',
          flexShrink: 0,
        }}
      >
        <Smartphone size={24} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0, color: titleColor, fontSize: 19 }}>
            Linda — WhatsApp Bot Visual Operations Center
          </h2>
          <span
            style={{
              background: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.5)',
              color: isDark ? '#86EFAC' : '#15803D',
              borderRadius: 999,
              padding: '2px 10px',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            v2.0.0-enterprise · 300/300 Upgrades
          </span>
          <span
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#EF4444',
              borderRadius: 999,
              padding: '2px 8px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            TOP #1 PRIORITY ASSISTANT
          </span>
        </div>
        <p style={{ margin: '4px 0 0 0', color: subtitleColor, fontSize: 12 }}>
          SUP-08-1-01-1 · AMGR-08-1-01 AI Samira → MGR-08-1 AI Nadia → DIR-08 AI Maya · Multi-SIM
          LocalAuth (10-SIM Fleet) · 35 Features (F1–F35) · 10 Playbooks (P1–P10)
        </p>
      </div>
    </div>
  );
};
