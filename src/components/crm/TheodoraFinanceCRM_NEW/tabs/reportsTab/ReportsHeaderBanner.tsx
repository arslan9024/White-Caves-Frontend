import React from 'react';

interface ReportsHeaderBannerProps {
  activeSchedulesCount: number;
}

export const ReportsHeaderBanner: React.FC<ReportsHeaderBannerProps> = ({
  activeSchedulesCount,
}) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '1.5rem',
        color: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.25rem',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.8rem' }}>📑</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--white, #FFFFFF)',
                }}
              >
                All Reports Explorer — 67 Enterprise Reports
              </h3>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  color: '#93C5FD',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                }}
              >
                67 Active Reports
              </span>
            </div>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '0.85rem',
                color: 'var(--text-secondary, #94A3B8)',
              }}
            >
              Comprehensive real estate financial, VAT 5%, Corporate Tax 9%, escrow ledger, and
              operational reporting matrix.
            </p>
          </div>
        </div>
      </div>

      {/* Executive Quick Stats */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-secondary, #94A3B8)',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Total Reports
          </div>
          <div
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'var(--color-primary-blue, #60A5FA)',
            }}
          >
            67
          </div>
        </div>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-secondary, #94A3B8)',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Categories
          </div>
          <div
            style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-green, #34D399)' }}
          >
            14
          </div>
        </div>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-secondary, #94A3B8)',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Scheduled
          </div>
          <div
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'var(--color-amber-500, #FBBF24)',
            }}
          >
            {activeSchedulesCount} Active
          </div>
        </div>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-secondary, #94A3B8)',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Compliance
          </div>
          <div
            style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-purple, #A78BFA)' }}
          >
            FTA / IFRS
          </div>
        </div>
      </div>
    </div>
  );
};
