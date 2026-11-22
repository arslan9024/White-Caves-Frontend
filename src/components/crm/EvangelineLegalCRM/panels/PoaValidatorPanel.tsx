import React from 'react';
import { ShieldCheck } from 'lucide-react';
import type { PoaValidationResult } from '../EvangelineLegalCRM.types';
import { cardStyle, inputStyle, primaryBtnStyle } from '../EvangelineLegalCRM.styles';

export interface PoaValidatorPanelProps {
  poaNumber: string;
  setPoaNumber: (val: string) => void;
  poaPrincipal: string;
  setPoaPrincipal: (val: string) => void;
  poaAttorney: string;
  setPoaAttorney: (val: string) => void;
  poaExpiry: string;
  setPoaExpiry: (val: string) => void;
  poaHasSellPower: boolean;
  setPoaHasSellPower: (val: boolean) => void;
  poaValidationResult: PoaValidationResult | null;
  onValidatePoa: () => void;
}

export const PoaValidatorPanel: React.FC<PoaValidatorPanelProps> = ({
  poaNumber,
  setPoaNumber,
  poaPrincipal,
  setPoaPrincipal,
  poaAttorney,
  setPoaAttorney,
  poaExpiry,
  setPoaExpiry,
  poaHasSellPower,
  setPoaHasSellPower,
  poaValidationResult,
  onValidatePoa,
}) => (
  <div style={cardStyle}>
    <h4
      style={{
        margin: '0 0 0.5rem 0',
        fontSize: '1rem',
        fontWeight: 800,
        color: 'var(--color-1e293b, #1E293B)',
      }}
    >
      Dubai Courts Power of Attorney (POA) Statutory Validator
    </h4>
    <p
      style={{
        margin: '0 0 1.25rem 0',
        fontSize: '0.8rem',
        color: 'var(--text-secondary, #64748B)',
      }}
    >
      Verifies official notary registration, expiration dates, and explicit real estate disposition
      authority.
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
            display: 'block',
            marginBottom: '4px',
          }}
        >
          POA Registry Number
        </label>
        <input value={poaNumber} onChange={e => setPoaNumber(e.target.value)} style={inputStyle} />
      </div>
      <div>
        <label
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--text-secondary, #64748B)',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Principal (Grantor)
        </label>
        <input
          value={poaPrincipal}
          onChange={e => setPoaPrincipal(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--text-secondary, #64748B)',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Attorney (Agent)
        </label>
        <input
          value={poaAttorney}
          onChange={e => setPoaAttorney(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--text-secondary, #64748B)',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Expiry Date
        </label>
        <input
          type="date"
          value={poaExpiry}
          onChange={e => setPoaExpiry(e.target.value)}
          style={inputStyle}
        />
      </div>
    </div>

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
      }}
    >
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--color-1e293b, #1E293B)',
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={poaHasSellPower}
          onChange={e => setPoaHasSellPower(e.target.checked)}
        />
        Explicit Clause: Authority to Sell & Collect Purchase Funds on Principal&apos;s Behalf
      </label>
      <button onClick={onValidatePoa} style={primaryBtnStyle}>
        Run Dubai Courts Verification
      </button>
    </div>

    {poaValidationResult && (
      <div
        style={{
          background:
            poaValidationResult.status === 'VALID_APPROVED'
              ? 'var(--color-ecfdf5, #ECFDF5)'
              : 'var(--color-fef2f2, #FEF2F2)',
          border: `1px solid ${poaValidationResult.status === 'VALID_APPROVED' ? 'var(--color-a7f3d0, #A7F3D0)' : 'var(--color-fecaca, #FECACA)'}`,
          padding: '1rem',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 800,
            color:
              poaValidationResult.status === 'VALID_APPROVED'
                ? 'var(--color-065f46, #065F46)'
                : 'var(--color-991b1b, #991B1B)',
            fontSize: '0.9rem',
          }}
        >
          <ShieldCheck size={20} />
          <span>
            Validation Result: {poaValidationResult.validity} — {poaValidationResult.authorityCheck}
          </span>
        </div>
        <div
          style={{
            fontSize: '0.78rem',
            color: 'var(--color-475569, #475569)',
            marginTop: '0.35rem',
          }}
        >
          {poaValidationResult.notaryRegistry} | Risk Classification:{' '}
          <strong>{poaValidationResult.riskScore}</strong>
        </div>
      </div>
    )}
  </div>
);
