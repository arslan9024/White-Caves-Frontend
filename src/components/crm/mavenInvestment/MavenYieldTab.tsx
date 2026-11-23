import React from 'react';

export interface MavenYieldTabProps {
  longTermRent: number;
  longTermYield: string;
  shortTermGross: number;
  shortTermNet: number;
  shortTermYield: string;
}

export const MavenYieldTab: React.FC<MavenYieldTabProps> = ({
  longTermRent,
  longTermYield,
  shortTermGross,
  shortTermNet,
  shortTermYield,
}) => {
  return (
    <div
      style={{
        background: 'var(--white, #FFFFFF)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--text-secondary, #E2E8F0)',
      }}
    >
      <h4
        style={{
          margin: '0 0 1rem 0',
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--color-1e293b, #1E293B)',
        }}
      >
        Short-Term Holiday Home (Airbnb) vs Long-Term (Ejari) Yield Analysis
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div
          style={{
            background: 'var(--color-f8fafc, #F8FAFC)',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--text-secondary, #E2E8F0)',
          }}
        >
          <div style={{ fontWeight: 800, color: 'var(--color-1e293b, #1E293B)', fontSize: '1rem' }}>
            🏢 Long-Term Annual Lease (Ejari)
          </div>
          <div
            style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              color: 'var(--accent-green, #16A34A)',
              margin: '8px 0',
            }}
          >
            {longTermYield}% Net Yield
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #64748B)' }}>
            • Gross Rent: AED {longTermRent.toLocaleString()} / yr
            <br />
            • Zero management fee, 1-4 PDC Cheques
            <br />• 100% Guaranteed occupancy for 12 months
          </div>
        </div>

        <div
          style={{
            background: 'var(--color-f0fdf4, #F0FDF4)',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--color-bbf7d0, #BBF7D0)',
          }}
        >
          <div style={{ fontWeight: 800, color: 'var(--color-15803d, #15803D)', fontSize: '1rem' }}>
            🏖️ Short-Term Holiday Home (DTCM)
          </div>
          <div
            style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              color: 'var(--color-15803d, #15803D)',
              margin: '8px 0',
            }}
          >
            {shortTermYield}% Net Yield
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-166534, #166534)' }}>
            • Gross Booking Revenue: AED {shortTermGross.toLocaleString()} / yr
            <br />• Net after 20% operator fee + DTCM taxes: AED {shortTermNet.toLocaleString()}
            <br />• Seasonal premium during Q4/Q1 Dubai peak tourism
          </div>
        </div>
      </div>
    </div>
  );
};
