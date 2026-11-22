import React, { useState } from 'react';
import { GOLDEN_VISA_MIN_EQUITY_AED } from './constants';

export const GoldenVisaTab: React.FC = () => {
  const [totalRealEstateEquity, setTotalRealEstateEquity] = useState<number>(2600000);
  const [isOffPlan, setIsOffPlan] = useState<boolean>(false);
  const [icpNotice, setIcpNotice] = useState<string | null>(null);

  const effectiveEquity = totalRealEstateEquity;
  const isGoldenVisaEligible = effectiveEquity >= GOLDEN_VISA_MIN_EQUITY_AED;

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
          margin: '0 0 0.5rem 0',
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--color-1e293b, #1E293B)',
        }}
      >
        UAE 10-Year Real Estate Investor Golden Visa Eligibility Engine
      </h4>
      <p
        style={{
          margin: '0 0 1.25rem 0',
          fontSize: '0.8rem',
          color: 'var(--text-secondary, #64748B)',
        }}
      >
        Statutory requirement: Minimum <strong>AED 2,000,000</strong> property value/equity owned
        directly under applicant&apos;s name.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-secondary, #64748B)',
            }}
          >
            Total Property Valuation (AED)
          </label>
          <input
            type="number"
            value={totalRealEstateEquity}
            onChange={e => setTotalRealEstateEquity(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-secondary, #64748B)',
            }}
          >
            Property Category
          </label>
          <select
            value={isOffPlan ? 'OFF_PLAN' : 'READY'}
            onChange={e => setIsOffPlan(e.target.value === 'OFF_PLAN')}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              fontSize: '0.85rem',
            }}
          >
            <option value="READY">Ready Property (Title Deed Issued)</option>
            <option value="OFF_PLAN">Off-Plan (Oqood Initial Contract)</option>
          </select>
        </div>
      </div>

      <div
        style={{
          background: isGoldenVisaEligible
            ? 'var(--color-ecfdf5, #ECFDF5)'
            : 'var(--color-fef2f2, #FEF2F2)',
          border: `1px solid ${isGoldenVisaEligible ? 'var(--color-a7f3d0, #A7F3D0)' : 'var(--color-fecaca, #FECACA)'}`,
          padding: '1.25rem',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '1.1rem',
              fontWeight: 900,
              color: isGoldenVisaEligible
                ? 'var(--color-065f46, #065F46)'
                : 'var(--color-991b1b, #991B1B)',
            }}
          >
            {isGoldenVisaEligible
              ? '✓ 100% ELIGIBLE FOR 10-YEAR UAE GOLDEN VISA'
              : '✗ BELOW AED 2,000,000 STATUTORY THRESHOLD'}
          </div>
          <div
            style={{
              fontSize: '0.78rem',
              color: 'var(--color-475569, #475569)',
              marginTop: '4px',
            }}
          >
            Total Eligible Equity: <strong>AED {effectiveEquity.toLocaleString()}</strong> |
            Eligible for spouse, children, and domestic staff sponsorship.
          </div>
        </div>
        {isGoldenVisaEligible && (
          <button
            type="button"
            onClick={() => setIcpNotice('Generated Golden Visa ICP Application Packet.')}
            style={{
              background: 'var(--color-047857, #047857)',
              color: 'var(--white, #FFF)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            Generate ICP Application Pack
          </button>
        )}
      </div>

      {icpNotice && (
        <div
          role="status"
          style={{
            marginTop: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            background: 'var(--color-ecfdf5, #ECFDF5)',
            border: '1px solid var(--color-a7f3d0, #A7F3D0)',
            color: 'var(--color-065f46, #065F46)',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{icpNotice}</span>
          <button
            type="button"
            onClick={() => setIcpNotice(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-065f46, #065F46)',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
