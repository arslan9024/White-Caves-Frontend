import React from 'react';
import type { CmaValuation } from '../CipherMarketCRM.types';
import {
  panelCardStyle,
  panelHeaderStyle,
  labelStyle,
  inputStyle,
  metricSubCardStyle,
} from './CipherMarketCRM.panelStyles';

export interface CmaBuilderPanelProps {
  community: string;
  setCommunity: (val: string) => void;
  propertyType: string;
  setPropertyType: (val: string) => void;
  bedrooms: string;
  setBedrooms: (val: string) => void;
  builtUpArea: number;
  setBuiltUpArea: (val: number) => void;
  cmaValuation: CmaValuation | null;
  onCalculateCma: () => void;
}

export const CmaBuilderPanel: React.FC<CmaBuilderPanelProps> = ({
  community,
  setCommunity,
  propertyType,
  setPropertyType,
  bedrooms,
  setBedrooms,
  builtUpArea,
  setBuiltUpArea,
  cmaValuation,
  onCalculateCma,
}) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.25rem' }}>
    <div style={panelCardStyle}>
      <h4 style={panelHeaderStyle}>CMA Valuation Parameters</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <label style={labelStyle}>Community / Location</label>
          <select
            value={community}
            onChange={e => setCommunity(e.target.value)}
            style={{
              ...inputStyle,
              fontWeight: 700,
            }}
          >
            <option value="Palm Jumeirah">Palm Jumeirah</option>
            <option value="Downtown Dubai">Downtown Dubai</option>
            <option value="Dubai Hills Estate">Dubai Hills Estate</option>
            <option value="Business Bay">Business Bay</option>
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={labelStyle}>Property Type</label>
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              style={inputStyle}
            >
              <option value="Villa">Villa / Mansion</option>
              <option value="Apartment">Apartment</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Bedrooms</label>
            <input
              type="number"
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Built-Up Area (Sq.Ft)</label>
          <input
            type="number"
            value={builtUpArea}
            onChange={e => setBuiltUpArea(Number(e.target.value))}
            style={{
              ...inputStyle,
              fontWeight: 700,
            }}
          />
        </div>
        <button
          onClick={onCalculateCma}
          style={{
            marginTop: '0.5rem',
            background: 'var(--accent-teal, #0D9488)',
            color: 'var(--white, #FFF)',
            border: 'none',
            borderRadius: '8px',
            padding: '10px',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Generate AI Comparative Market Analysis
        </button>
      </div>
    </div>

    <div style={panelCardStyle}>
      <h4 style={panelHeaderStyle}>Appraisal Valuation Output</h4>
      {cmaValuation ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              background: 'var(--color-f0fdfa, #F0FDFA)',
              border: '1px solid var(--color-99f6e4, #99F6E4)',
              padding: '1.25rem',
              borderRadius: '8px',
            }}
          >
            <div
              style={{ fontSize: '0.75rem', color: 'var(--accent-teal, #0F766E)', fontWeight: 800 }}
            >
              ESTIMATED FAIR MARKET VALUE
            </div>
            <div
              style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                color: 'var(--color-115e59, #115E59)',
                marginTop: '4px',
              }}
            >
              AED {cmaValuation.estimatedValue.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--accent-teal, #0F766E)',
                marginTop: '4px',
              }}
            >
              Benchmark Rate: AED {cmaValuation.sqftRate} / sqft | Confidence:{' '}
              {cmaValuation.confidenceScore}%
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={metricSubCardStyle}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #64748B)' }}>
                Recommended Listing Band
              </div>
              <div
                style={{
                  fontWeight: 800,
                  color: 'var(--color-1e293b, #1E293B)',
                  fontSize: '0.85rem',
                  marginTop: '2px',
                }}
              >
                AED {(cmaValuation.lowerBound / 1000000).toFixed(2)}M -{' '}
                {(cmaValuation.upperBound / 1000000).toFixed(2)}M
              </div>
            </div>
            <div style={metricSubCardStyle}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #64748B)' }}>
                Suggested Annual Rent
              </div>
              <div
                style={{
                  fontWeight: 800,
                  color: 'var(--accent-teal, #0D9488)',
                  fontSize: '0.85rem',
                  marginTop: '2px',
                }}
              >
                AED {Number(cmaValuation.suggestedRent).toLocaleString()} / yr
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--color-94a3b8, #94A3B8)',
            fontSize: '0.85rem',
          }}
        >
          Enter property parameters on the left and click &quot;Generate AI CMA&quot; to view
          real-time valuation metrics.
        </div>
      )}
    </div>
  </div>
);
