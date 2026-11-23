/**
 * White Caves Real Estate LLC - Deal Detail Header & Navigation Component
 * Standard: AEGIS Canonical 12-Way Architecture Standard
 * Single Purpose File Law: < 350 lines
 */

import React, { FC } from 'react';
import { X, ArrowLeft, LayoutDashboard, FileText } from 'lucide-react';
import { DealItem } from './DealManager.types';

export interface DealDetailHeaderProps {
  deal: DealItem;
  isInline: boolean;
  onClose: () => void;
  activeTab?: 'cockpit' | 'dossier';
  onTabChange?: (tab: 'cockpit' | 'dossier') => void;
}

export const DealDetailHeader: FC<DealDetailHeaderProps> = ({
  deal,
  isInline,
  onClose,
  activeTab = 'dossier',
  onTabChange,
}) => {
  const isLeasing = deal.dealType === 'LEASING';

  return (
    <>
      {isInline && (
        <div
          style={{
            padding: '14px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(255, 255, 255, 0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            data-testid="deal-back-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#38BDF8',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={16} />
            <span>← Back to Deals Pipeline</span>
          </button>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'monospace' }}>
            Active Dossier · {deal.id}
          </span>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '6px',
                background:
                  deal.dealType === 'LEASING'
                    ? 'rgba(239, 68, 68, 0.2)'
                    : 'rgba(168, 85, 247, 0.2)',
                color: deal.dealType === 'LEASING' ? '#EF4444' : '#C084FC',
                border: deal.dealType === 'LEASING' ? '1px solid #EF4444' : '1px solid #C084FC',
              }}
            >
              {deal.dealType}
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8' }}>
              {deal.id} · {deal.dealNumber}
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            {deal.title}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isLeasing && onTabChange && (
            <div
              style={{
                display: 'flex',
                background: 'rgba(15, 23, 42, 0.8)',
                padding: '3px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                gap: '2px',
              }}
            >
              <button
                type="button"
                data-testid="toggle-cockpit-tab"
                onClick={() => onTabChange('cockpit')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTab === 'cockpit' ? '#EF4444' : 'transparent',
                  color: activeTab === 'cockpit' ? '#FFFFFF' : '#94A3B8',
                }}
              >
                <LayoutDashboard size={13} />
                <span>12-Stage Cockpit</span>
              </button>
              <button
                type="button"
                data-testid="toggle-dossier-tab"
                onClick={() => onTabChange('dossier')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeTab === 'dossier' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  color: activeTab === 'dossier' ? '#FFFFFF' : '#94A3B8',
                }}
              >
                <FileText size={13} />
                <span>Dossier Overview</span>
              </button>
            </div>
          )}

          {!isInline && (
            <button
              onClick={onClose}
              data-testid="close-deal-modal"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                color: '#94A3B8',
                padding: '6px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};
