import React from 'react';
import { cardStyle, inputStyle, primaryBtnStyle } from '../EvangelineLegalCRM.styles';

export interface NdaStudioPanelProps {
  ndaParty: string;
  setNdaParty: (val: string) => void;
  ndaDamages: string;
  setNdaDamages: (val: string) => void;
}

export const NdaStudioPanel: React.FC<NdaStudioPanelProps> = ({
  ndaParty,
  setNdaParty,
  ndaDamages,
  setNdaDamages,
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
