// FILE: src/components/crm/LindaWhatsAppCRM/LindaBreadcrumbBar.tsx
import React, { memo } from 'react';
import { buildLindaBreadcrumbs, type LindaBreadcrumbState } from './lindaTreeNavigation';

interface LindaBreadcrumbBarProps {
  isDark: boolean;
  breadcrumb: LindaBreadcrumbState;
  mdApproved: boolean;
  onReturnToParent: () => void;
  onToggleMdApproval: () => void;
}

export const LindaBreadcrumbBar = memo(
  ({
    isDark,
    breadcrumb,
    mdApproved,
    onReturnToParent,
    onToggleMdApproval,
  }: LindaBreadcrumbBarProps) => {
    const trail = buildLindaBreadcrumbs(breadcrumb);
    const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.12)';

    return (
      <div
        data-testid="linda-breadcrumb-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '6px 12px',
          borderRadius: 8,
          border: `1px solid ${border}`,
          background: isDark ? 'rgba(15,23,42,0.55)' : '#ffffff',
          fontSize: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {trail.map((segment, idx) => (
            <React.Fragment key={`${segment}-${idx}`}>
              {idx > 0 && <span style={{ opacity: 0.45 }}>/</span>}
              <span
                style={{
                  fontWeight: idx === trail.length - 1 ? 700 : 500,
                  color: idx === trail.length - 1 ? '#EF4444' : 'inherit',
                }}
              >
                {segment}
              </span>
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {breadcrumb.leafLabel && (
            <button
              type="button"
              data-testid="linda-leaf-return-btn"
              onClick={onReturnToParent}
              style={{
                padding: '3px 8px',
                borderRadius: 6,
                border: '1px solid #EF4444',
                background: 'transparent',
                color: '#EF4444',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Back to Parent
            </button>
          )}
          <button
            type="button"
            data-testid="linda-md-approval-btn"
            onClick={onToggleMdApproval}
            style={{
              padding: '3px 8px',
              borderRadius: 6,
              border: `1px solid ${mdApproved ? '#10b981' : '#f59e0b'}`,
              background: mdApproved ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
              color: mdApproved ? '#10b981' : '#f59e0b',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {mdApproved ? 'MD Approved' : 'MD Approval Required'}
          </button>
        </div>
      </div>
    );
  }
);

LindaBreadcrumbBar.displayName = 'LindaBreadcrumbBar';
