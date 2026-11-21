import React, { FC } from 'react';
import { spacing } from '../../../design-tokens';
import { TrainingTrackerWidget } from '../../../components/compliance/TrainingTrackerWidget/TrainingTrackerWidget';
import { Card } from './ProfilePage.styles';

const CORPORATE_LICENSES = [
  {
    header: 'DET COMMERCIAL LICENSE',
    number: 'No. 1388443',
    subtitle: 'Office Classification: General Brokerage',
    expiry: '31-Jul-2026',
    statusNote: 'Audit Valid',
  },
  {
    header: 'RERA REGISTRATION (ORN)',
    number: 'ORN: 44483',
    subtitle: 'Real Estate Regulatory Agency Dubai',
    expiry: '15-Aug-2026',
    statusNote: 'Verified',
  },
  {
    header: 'HQ EJARI CERTIFICATE',
    number: '0120250814005322',
    subtitle: 'Office D-72, El Shaye - 4 Building',
    expiry: '01-Oct-2026',
    statusNote: 'Registered',
  },
  {
    header: 'ICP ESTABLISHMENT CARD',
    number: 'MOL: 2/1/1192499',
    subtitle: 'Ministry of Human Resources & Emiratisation',
    expiry: '20-Nov-2026',
    statusNote: 'Compliant',
  },
];

export const ProfileReraTab: FC = () => (
  <Card>
    <h2>
      <span>📜</span> Dubai Land Department & RERA Government Licenses
    </h2>
    <p style={{ color: 'var(--text-secondary)', marginBottom: spacing[5] }}>
      Official corporate accreditations and active license expiry monitors for White Caves Real
      Estate LLC.
    </p>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
        marginBottom: spacing[6],
      }}
    >
      {CORPORATE_LICENSES.map(license => (
        <div
          key={license.header}
          style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'var(--bg-secondary, rgba(239, 68, 68, 0.05))',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: 'var(--accent-red, #EF4444)',
              }}
            >
              {license.header}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '999px',
                background: 'var(--accent-green, #10B981)',
                color: 'var(--white, #FFF)',
                fontWeight: 800,
              }}
            >
              ACTIVE
            </span>
          </div>
          <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            {license.number}
          </strong>
          <p
            style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              margin: '4px 0 10px',
            }}
          >
            {license.subtitle}
          </p>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            ⏳ Expiry: <span style={{ color: 'var(--accent-red, #EF4444)' }}>{license.expiry}</span>{' '}
            ({license.statusNote})
          </div>
        </div>
      ))}
    </div>

    <TrainingTrackerWidget />
  </Card>
);
