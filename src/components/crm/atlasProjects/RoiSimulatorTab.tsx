import React, { useState, type FC } from 'react';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid var(--text-secondary, #CBD5E1)',
  fontSize: '0.85rem',
  fontWeight: 700,
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 800,
  color: 'var(--text-secondary, #64748B)',
};

export const RoiSimulatorTab: FC = () => {
  const [purchasePrice, setPurchasePrice] = useState(2000000);
  const [expectedHandoverPrice, setExpectedHandoverPrice] = useState(2700000);
  const [annualRent, setAnnualRent] = useState(190000);

  const capitalGain = expectedHandoverPrice - purchasePrice;
  const capitalGainPct = ((capitalGain / purchasePrice) * 100).toFixed(1);
  const grossRentalYield = ((annualRent / expectedHandoverPrice) * 100).toFixed(2);

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
        Off-Plan Capital Appreciation & Rental Yield Simulator
      </h4>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <label style={labelStyle}>Off-Plan Launch Price (AED)</label>
          <input
            type="number"
            value={purchasePrice}
            onChange={e => setPurchasePrice(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Expected Handover Market Value (AED)</label>
          <input
            type="number"
            value={expectedHandoverPrice}
            onChange={e => setExpectedHandoverPrice(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Projected Annual Rent (AED)</label>
          <input
            type="number"
            value={annualRent}
            onChange={e => setAnnualRent(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div
          style={{
            background: 'var(--color-ecfdf5, #ECFDF5)',
            border: '1px solid var(--color-a7f3d0, #A7F3D0)',
            padding: '1.25rem',
            borderRadius: '8px',
          }}
        >
          <div
            style={{ fontSize: '0.75rem', color: 'var(--color-065f46, #065F46)', fontWeight: 800 }}
          >
            CAPITAL APPRECIATION UPON HANDOVER
          </div>
          <div
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: 'var(--color-047857, #047857)',
              marginTop: '4px',
            }}
          >
            AED {capitalGain.toLocaleString()} (+{capitalGainPct}%)
          </div>
        </div>
        <div
          style={{
            background: 'var(--color-eff6ff, #EFF6FF)',
            border: '1px solid var(--color-bfdbfe, #BFDBFE)',
            padding: '1.25rem',
            borderRadius: '8px',
          }}
        >
          <div
            style={{ fontSize: '0.75rem', color: 'var(--color-1e40af, #1E40AF)', fontWeight: 800 }}
          >
            GROSS RENTAL YIELD AT HANDOVER
          </div>
          <div
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: 'var(--accent-blue, #1D4ED8)',
              marginTop: '4px',
            }}
          >
            {grossRentalYield}% p.a.
          </div>
        </div>
      </div>
    </div>
  );
};
