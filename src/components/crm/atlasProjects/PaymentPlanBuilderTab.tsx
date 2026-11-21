import React, { useState, type FC } from 'react';

export const PaymentPlanBuilderTab: FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(2500000);
  const [downpaymentPct, setDownpaymentPct] = useState(20);
  const [duringConstructionPct, setDuringConstructionPct] = useState(50);
  const [postHandoverPct, setPostHandoverPct] = useState(30);

  const dpAmount = propertyPrice * (downpaymentPct / 100);
  const duringAmount = propertyPrice * (duringConstructionPct / 100);
  const postAmount = propertyPrice * (postHandoverPct / 100);

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
        Developer Payment Plan & Milestone Schedule Builder
      </h4>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginTop: '1rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-secondary, #64748B)',
              }}
            >
              Property Base Price (AED)
            </label>
            <input
              type="number"
              value={propertyPrice}
              onChange={e => setPropertyPrice(Number(e.target.value))}
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
              Down Payment: {downpaymentPct}%
            </label>
            <input
              type="range"
              min="10"
              max="40"
              step="5"
              value={downpaymentPct}
              onChange={e => setDownpaymentPct(Number(e.target.value))}
              style={{ width: '100%' }}
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
              During Construction: {duringConstructionPct}%
            </label>
            <input
              type="range"
              min="30"
              max="70"
              step="5"
              value={duringConstructionPct}
              onChange={e => setDuringConstructionPct(Number(e.target.value))}
              style={{ width: '100%' }}
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
              Post-Handover / On Handover: {postHandoverPct}%
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={postHandoverPct}
              onChange={e => setPostHandoverPct(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div
          style={{
            background: 'var(--color-f8fafc, #F8FAFC)',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--text-secondary, #E2E8F0)',
          }}
        >
          <h5
            style={{
              margin: '0 0 1rem 0',
              fontWeight: 800,
              color: 'var(--color-1e293b, #1E293B)',
            }}
          >
            Installment Breakdown
          </h5>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
              fontSize: '0.85rem',
            }}
          >
            <span>1. Booking & Down Payment ({downpaymentPct}%):</span>
            <strong>AED {dpAmount.toLocaleString()}</strong>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
              fontSize: '0.85rem',
            }}
          >
            <span>2. Construction Linked ({duringConstructionPct}%):</span>
            <strong>AED {duringAmount.toLocaleString()}</strong>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
              fontSize: '0.85rem',
            }}
          >
            <span>3. On Handover ({postHandoverPct}%):</span>
            <strong>AED {postAmount.toLocaleString()}</strong>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 0 0 0',
              fontWeight: 800,
              color: 'var(--color-ea580c, #EA580C)',
              fontSize: '0.95rem',
            }}
          >
            <span>Total Commitment:</span>
            <span>AED {propertyPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
