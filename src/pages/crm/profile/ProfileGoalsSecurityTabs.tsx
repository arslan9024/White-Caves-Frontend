import React, { FC } from 'react';
import { spacing } from '../../../design-tokens';
import { BiometricSetup } from '../../../features/auth/components/BiometricLogin';
import { Card } from './ProfilePage.styles';

export const ProfileGoalsTab: FC = () => (
  <Card>
    <h2>
      <span>🎯</span> Executive Goals & Sovereign Milestones
    </h2>
    <p style={{ color: 'var(--text-secondary)', marginBottom: spacing[5] }}>
      Track AED volume goals, closed transactions, and investment portfolios for Q3/Q4.
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div
        style={{
          padding: '14px',
          borderRadius: '12px',
          background: 'var(--bg-secondary, #F8FAFC)',
          borderLeft: '4px solid var(--accent-red, #EF4444)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}
        >
          <strong style={{ color: 'var(--text-primary)' }}>
            Q3 Target: AED 250M Gross Transaction Volume
          </strong>
          <span style={{ color: 'var(--accent-red, #EF4444)', fontWeight: 800 }}>88% Achieved</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: 'var(--text-secondary, #E2E8F0)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '88%',
              height: '100%',
              background:
                'linear-gradient(90deg, var(--accent-red, #EF4444), var(--color-f97316, #F97316))',
            }}
          />
        </div>
      </div>

      <div
        style={{
          padding: '14px',
          borderRadius: '12px',
          background: 'var(--bg-secondary, #F8FAFC)',
          borderLeft: '4px solid var(--accent-green, #10B981)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}
        >
          <strong style={{ color: 'var(--text-primary)' }}>
            DAMAC Hills 2 Cluster Portfolio: 9,378 Units Onboarded
          </strong>
          <span style={{ color: 'var(--accent-green, #10B981)', fontWeight: 800 }}>
            100% Synced
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: 'var(--text-secondary, #E2E8F0)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--accent-green, #10B981)',
            }}
          />
        </div>
      </div>
    </div>
  </Card>
);

export const ProfileSecurityTab: FC = () => (
  <Card>
    <h2>
      <span>🔐</span> Biometric Security & Credentials
    </h2>
    <BiometricSetup />
  </Card>
);

export const ProfileSessionsTab: FC = () => (
  <Card>
    <h2>
      <span>💻</span> Active Sessions & Live IP Tickers
    </h2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: spacing[4],
      }}
    >
      <div
        style={{
          padding: '14px',
          borderRadius: '12px',
          background: 'var(--bg-secondary, #F8FAFC)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <strong style={{ display: 'block', color: 'var(--text-primary)' }}>
            Web App Dashboard Session (Current)
          </strong>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            IP: 185.192.68.10 · Dubai, UAE · SSL Encrypted · TLS 1.3
          </span>
        </div>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '999px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--accent-green, #10B981)',
            fontSize: '0.75rem',
            fontWeight: 800,
          }}
        >
          ACTIVE NOW
        </span>
      </div>
    </div>
  </Card>
);
