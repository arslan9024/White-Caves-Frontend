import React from 'react';
import type { DcfCalculationResult } from './types';

export interface MavenDcfTabProps {
  initialInvestment: number;
  setInitialInvestment: (val: number) => void;
  holdingYears: number;
  setHoldingYears: (val: number) => void;
  annualRentalGrowth: number;
  setAnnualRentalGrowth: (val: number) => void;
  initialRent: number;
  setInitialRent: (val: number) => void;
  dcfResults: DcfCalculationResult;
}

export const MavenDcfTab: React.FC<MavenDcfTabProps> = ({
  initialInvestment,
  setInitialInvestment,
  holdingYears,
  setHoldingYears,
  annualRentalGrowth,
  setAnnualRentalGrowth,
  initialRent,
  setInitialRent,
  dcfResults,
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.25rem' }}>
      <div
        style={{
          background: 'var(--white, #FFFFFF)',
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid var(--text-secondary, #E2E8F0)',
        }}
      >
        <h4
          style={{
            margin: '0 0 1rem 0',
            fontSize: '0.95rem',
            fontWeight: 800,
            color: 'var(--color-1e293b, #1E293B)',
          }}
        >
          DCF Simulation Variables
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-secondary, #64748B)',
              }}
            >
              Initial Purchase Price (AED)
            </label>
            <input
              type="number"
              value={initialInvestment}
              onChange={e => setInitialInvestment(Number(e.target.value))}
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--text-secondary, #64748B)',
                }}
              >
                Holding Horizon ({holdingYears} Yrs)
              </label>
              <input
                type="number"
                min="1"
                max="15"
                value={holdingYears}
                onChange={e => setHoldingYears(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid var(--text-secondary, #CBD5E1)',
                  fontSize: '0.85rem',
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
                Annual Rent Growth ({annualRentalGrowth}%)
              </label>
              <input
                type="number"
                value={annualRentalGrowth}
                onChange={e => setAnnualRentalGrowth(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid var(--text-secondary, #CBD5E1)',
                  fontSize: '0.85rem',
                }}
              />
            </div>
          </div>
          <div>
            <label
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-secondary, #64748B)',
              }}
            >
              Year 1 Annual Net Rent (AED)
            </label>
            <input
              type="number"
              value={initialRent}
              onChange={e => setInitialRent(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid var(--text-secondary, #CBD5E1)',
                fontSize: '0.85rem',
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'var(--white, #FFFFFF)',
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid var(--text-secondary, #E2E8F0)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            background: 'var(--color-f0fdf4, #F0FDF4)',
            border: '1px solid var(--color-bbf7d0, #BBF7D0)',
            padding: '1.25rem',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-166534, #166534)',
              fontWeight: 800,
            }}
          >
            ESTIMATED INTERNAL RATE OF RETURN (IRR)
          </div>
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 900,
              color: 'var(--color-15803d, #15803D)',
              marginTop: '4px',
            }}
          >
            {dcfResults.irr}% p.a.
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-166534, #166534)',
              marginTop: '4px',
            }}
          >
            Projected {holdingYears}-Year Net Profit:{' '}
            <strong>AED {dcfResults.totalReturn.toLocaleString()}</strong>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.75rem',
              background: 'var(--color-f8fafc, #F8FAFC)',
              borderRadius: '6px',
              border: '1px solid var(--text-secondary, #E2E8F0)',
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #64748B)' }}>
              Cumulative Rental Cash Flow
            </div>
            <div
              style={{
                fontWeight: 800,
                color: 'var(--color-1e293b, #1E293B)',
                fontSize: '0.85rem',
                marginTop: '2px',
              }}
            >
              AED {dcfResults.totalCashFlow.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              padding: '0.75rem',
              background: 'var(--color-f8fafc, #F8FAFC)',
              borderRadius: '6px',
              border: '1px solid var(--text-secondary, #E2E8F0)',
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #64748B)' }}>
              Projected Year {holdingYears} Exit Value
            </div>
            <div
              style={{
                fontWeight: 800,
                color: 'var(--accent-green, #16A34A)',
                fontSize: '0.85rem',
                marginTop: '2px',
              }}
            >
              AED {dcfResults.exitPrice.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
