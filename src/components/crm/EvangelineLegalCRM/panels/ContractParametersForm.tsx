import React from 'react';
import type { DldFormType } from '../EvangelineLegalCRM.types';
import { DLD_FORM_OPTIONS } from '../EvangelineLegalCRM.data';
import { cardStyle, inputStyle } from '../EvangelineLegalCRM.styles';

export interface ContractParametersFormProps {
  selectedForm: DldFormType;
  setSelectedForm: (form: DldFormType) => void;
  partyA: string;
  setPartyA: (val: string) => void;
  partyB: string;
  setPartyB: (val: string) => void;
  propertyRef: string;
  setPropertyRef: (val: string) => void;
  includeMortgageClause: boolean;
  setIncludeMortgageClause: (val: boolean) => void;
  includeDldFeeClause: boolean;
  setIncludeDldFeeClause: (val: boolean) => void;
}

export const ContractParametersForm: React.FC<ContractParametersFormProps> = ({
  selectedForm,
  setSelectedForm,
  partyA,
  setPartyA,
  partyB,
  setPartyB,
  propertyRef,
  setPropertyRef,
  includeMortgageClause,
  setIncludeMortgageClause,
  includeDldFeeClause,
  setIncludeDldFeeClause,
}) => (
  <div style={cardStyle}>
    <h4
      style={{
        margin: '0 0 1rem 0',
        fontSize: '0.95rem',
        fontWeight: 800,
        color: 'var(--color-1e293b, #1E293B)',
      }}
    >
      Contract Parameters & Clause Generator
    </h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
          DLD Contract Type
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {DLD_FORM_OPTIONS.map(f => (
            <button
              key={f}
              onClick={() => setSelectedForm(f)}
              style={{
                flex: 1,
                padding: '6px',
                borderRadius: '6px',
                border:
                  selectedForm === f
                    ? '1px solid var(--accent-purple, #7C3AED)'
                    : '1px solid var(--text-secondary, #CBD5E1)',
                background:
                  selectedForm === f
                    ? 'var(--accent-purple, #7C3AED)'
                    : 'var(--color-f8fafc, #F8FAFC)',
                color: selectedForm === f ? 'var(--white, #FFF)' : 'var(--color-475569, #475569)',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </div>
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
          Party A (Broker / Seller)
        </label>
        <input value={partyA} onChange={e => setPartyA(e.target.value)} style={inputStyle} />
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
          Party B (Buyer / Client)
        </label>
        <input value={partyB} onChange={e => setPartyB(e.target.value)} style={inputStyle} />
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
          Property Reference
        </label>
        <input
          value={propertyRef}
          onChange={e => setPropertyRef(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--color-334155, #334155)',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={includeMortgageClause}
            onChange={e => setIncludeMortgageClause(e.target.checked)}
          />
          21-Day Mortgage Contingency
        </label>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--color-334155, #334155)',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={includeDldFeeClause}
            onChange={e => setIncludeDldFeeClause(e.target.checked)}
          />
          DLD 4% Transfer Clause
        </label>
      </div>
    </div>
  </div>
);
