/**
 * Evangeline Legal CRM — Sub-Panels Layer (Mary Allen Wilkes Architecture)
 * Modular tabs for Contract Assembler, POA Validator, VIP NDA Studio, and Eviction Tracker
 */

import React from 'react';
import { Check, Copy, ShieldCheck } from 'lucide-react';
import type { DldFormType, PoaValidationResult, EvictionDispute } from './EvangelineLegalCRM.types';
import { DLD_FORM_OPTIONS } from './EvangelineLegalCRM.data';
import { cardStyle, inputStyle, primaryBtnStyle } from './EvangelineLegalCRM.styles';

export const ContractAssemblerPanel: React.FC<{
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
  copiedContract: boolean;
  compiledContractText: string;
  onCopyContract: () => void;
}> = ({
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
  copiedContract,
  compiledContractText,
  onCopyContract,
}) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.25rem' }}>
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

    <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <span
          style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-1e293b, #1E293B)' }}
        >
          Live Official DLD Contract Preview
        </span>
        <button
          onClick={onCopyContract}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--color-f1f5f9, #F1F5F9)',
            border: '1px solid var(--text-secondary, #CBD5E1)',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {copiedContract ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
          <span>{copiedContract ? 'Copied!' : 'Copy Legal Text'}</span>
        </button>
      </div>
      <pre
        style={{
          flex: 1,
          background: 'var(--color-f8fafc, #F8FAFC)',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid var(--text-secondary, #E2E8F0)',
          fontSize: '0.75rem',
          color: 'var(--color-1e293b, #1E293B)',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          overflowY: 'auto',
          maxHeight: '360px',
          margin: 0,
        }}
      >
        {compiledContractText}
      </pre>
    </div>
  </div>
);

export const PoaValidatorPanel: React.FC<{
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
}> = ({
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

export const NdaStudioPanel: React.FC<{
  ndaParty: string;
  setNdaParty: (val: string) => void;
  ndaDamages: string;
  setNdaDamages: (val: string) => void;
}> = ({ ndaParty, setNdaParty, ndaDamages, setNdaDamages }) => (
  <div style={cardStyle}>
    <h4
      style={{
        margin: '0 0 0.5rem 0',
        fontSize: '1rem',
        fontWeight: 800,
        color: 'var(--color-1e293b, #1E293B)',
      }}
    >
      VIP Ultra-High-Net-Worth Non-Disclosure Agreement (NDA) Generator
    </h4>
    <p
      style={{
        margin: '0 0 1.25rem 0',
        fontSize: '0.8rem',
        color: 'var(--text-secondary, #64748B)',
      }}
    >
      Protects confidential off-market penthouses, private island portfolios, and client identities
      under DIFC jurisdiction.
    </p>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
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
          Counterparty Name
        </label>
        <input value={ndaParty} onChange={e => setNdaParty(e.target.value)} style={inputStyle} />
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
          Liquidated Damages Breach Penalty (AED)
        </label>
        <input
          value={ndaDamages}
          onChange={e => setNdaDamages(e.target.value)}
          style={inputStyle}
        />
      </div>
    </div>

    <button
      onClick={() =>
        alert(
          `Generated DIFC-Compliant VIP NDA for ${ndaParty} with AED ${ndaDamages} breach penalty clause.`
        )
      }
      style={primaryBtnStyle}
    >
      Export Signed VIP NDA PDF
    </button>
  </div>
);

export const EvictionTrackerPanel: React.FC<{ disputes: EvictionDispute[] }> = ({ disputes }) => (
  <div style={cardStyle}>
    <h4
      style={{
        margin: '0 0 0.5rem 0',
        fontSize: '1rem',
        fontWeight: 800,
        color: 'var(--color-1e293b, #1E293B)',
      }}
    >
      Statutory 12-Month Eviction Notice Tracker (Dubai Law No. 33 of 2008)
    </h4>
    <p
      style={{
        margin: '0 0 1.25rem 0',
        fontSize: '0.8rem',
        color: 'var(--text-secondary, #64748B)',
      }}
    >
      Real-time tracking of certified notary public eviction notices, 365-day expiry countdowns, and
      Rental Dispute Center (RDC) filings.
    </p>

    <table
      style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}
    >
      <thead>
        <tr
          style={{
            background: 'var(--color-f8fafc, #F8FAFC)',
            borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
            color: 'var(--color-475569, #475569)',
            fontWeight: 800,
          }}
        >
          <th style={{ padding: '10px 14px' }}>Notice Ref</th>
          <th style={{ padding: '10px 14px' }}>Tenant & Property</th>
          <th style={{ padding: '10px 14px' }}>Statutory Grounds</th>
          <th style={{ padding: '10px 14px' }}>Notary Date</th>
          <th style={{ padding: '10px 14px' }}>Days Left (365 Law)</th>
          <th style={{ padding: '10px 14px' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {disputes.map(d => (
          <tr key={d.id} style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 800,
                color: 'var(--accent-purple, #7C3AED)',
              }}
            >
              {d.id}
            </td>
            <td style={{ padding: '10px 14px' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-1e293b, #1E293B)' }}>
                {d.tenant}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #64748B)' }}>
                {d.unit}
              </div>
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontSize: '0.78rem',
                color: 'var(--color-334155, #334155)',
              }}
            >
              {d.reason}
            </td>
            <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #64748B)' }}>
              {d.notaryDate}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 800,
                color: 'var(--accent-gold, #D97706)',
              }}
            >
              {d.daysRemaining} Days
            </td>
            <td style={{ padding: '10px 14px' }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  background: 'var(--color-fef3c7, #FEF3C7)',
                  color: 'var(--color-b45309, #B45309)',
                }}
              >
                {d.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

