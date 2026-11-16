/**
 * Cipher Market CRM — Sub-Panels Layer (Mary Allen Wilkes Architecture)
 * Modular presentation panels for CMA Builder, DLD Regressor, Trends, and Forecast
 */

import React from 'react';
import type { CmaValuation, DldClusterItem } from './CipherMarketCRM.types';
import { COMMUNITIES_TREND } from './CipherMarketCRM.data';

export const CmaBuilderPanel: React.FC<{
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
}> = ({
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
        CMA Valuation Parameters
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
            Community / Location
          </label>
          <select
            value={community}
            onChange={e => setCommunity(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              fontSize: '0.85rem',
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
            <label
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-secondary, #64748B)',
              }}
            >
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid var(--text-secondary, #CBD5E1)',
                fontSize: '0.85rem',
              }}
            >
              <option value="Villa">Villa / Mansion</option>
              <option value="Apartment">Apartment</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
          <div>
            <label
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-secondary, #64748B)',
              }}
            >
              Bedrooms
            </label>
            <input
              type="number"
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid var(--text-secondary, #CBD5E1)',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
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
            Built-Up Area (Sq.Ft)
          </label>
          <input
            type="number"
            value={builtUpArea}
            onChange={e => setBuiltUpArea(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              fontSize: '0.85rem',
              fontWeight: 700,
              boxSizing: 'border-box',
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
        Appraisal Valuation Output
      </h4>
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
            <div
              style={{
                padding: '0.75rem',
                background: 'var(--color-f8fafc, #F8FAFC)',
                borderRadius: '6px',
                border: '1px solid var(--text-secondary, #E2E8F0)',
              }}
            >
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
            <div
              style={{
                padding: '0.75rem',
                background: 'var(--color-f8fafc, #F8FAFC)',
                borderRadius: '6px',
                border: '1px solid var(--text-secondary, #E2E8F0)',
              }}
            >
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

export const DldRegressorPanel: React.FC<{ dldCluster: DldClusterItem[] }> = ({ dldCluster }) => (
  <div
    style={{
      background: 'var(--white, #FFFFFF)',
      borderRadius: '12px',
      border: '1px solid var(--text-secondary, #E2E8F0)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        padding: '0.75rem 1rem',
        background: 'var(--color-f8fafc, #F8FAFC)',
        borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-1e293b, #1E293B)' }}>
        Recent DLD Registered Transfers
      </span>
      <span style={{ fontSize: '0.75rem', color: 'var(--accent-teal, #0D9488)', fontWeight: 800 }}>
        Live Telemetry Sync
      </span>
    </div>
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
          <th style={{ padding: '10px 14px' }}>DLD Ref</th>
          <th style={{ padding: '10px 14px' }}>Property Unit</th>
          <th style={{ padding: '10px 14px' }}>Area (SqFt)</th>
          <th style={{ padding: '10px 14px' }}>Transfer Price</th>
          <th style={{ padding: '10px 14px' }}>Price / SqFt</th>
          <th style={{ padding: '10px 14px' }}>Type</th>
        </tr>
      </thead>
      <tbody>
        {dldCluster.map(d => (
          <tr key={d.ref} style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 800,
                color: 'var(--accent-teal, #0D9488)',
              }}
            >
              {d.ref}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 700,
                color: 'var(--color-1e293b, #1E293B)',
              }}
            >
              {d.unit}
            </td>
            <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #64748B)' }}>
              {d.sqft.toLocaleString()}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 800,
                color: 'var(--color-1e293b, #1E293B)',
              }}
            >
              AED {d.priceAed.toLocaleString()}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontWeight: 700,
                color: 'var(--accent-teal, #0D9488)',
              }}
            >
              AED {d.rateSqft.toLocaleString()}
            </td>
            <td
              style={{
                padding: '10px 14px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary, #64748B)',
              }}
            >
              {d.type}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const TrendsPanel: React.FC = () => (
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
      Dubai Prime Neighborhood Price Growth & Demand Index
    </h4>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}
    >
      {COMMUNITIES_TREND.map(c => (
        <div
          key={c.name}
          style={{
            padding: '1.25rem',
            background: 'var(--color-f8fafc, #F8FAFC)',
            borderRadius: '8px',
            border: '1px solid var(--text-secondary, #E2E8F0)',
          }}
        >
          <div
            style={{ fontWeight: 800, color: 'var(--color-1e293b, #1E293B)', fontSize: '0.95rem' }}
          >
            {c.name}
          </div>
          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--accent-teal, #0D9488)',
              marginTop: '4px',
            }}
          >
            {c.avgPriceSqft}
          </div>
          <div
            style={{
              display: 'flex',
              justifySelf: 'stretch',
              justifyContent: 'space-between',
              marginTop: '8px',
              fontSize: '0.75rem',
            }}
          >
            <span style={{ color: 'var(--accent-green, #10B981)', fontWeight: 800 }}>
              {c.change12m} (12 Mo)
            </span>
            <span
              style={{
                background: 'var(--color-ccfbf1, #CCFBF1)',
                color: 'var(--accent-teal, #0F766E)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 700,
              }}
            >
              {c.demand}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ForecastPanel: React.FC = () => (
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
      12-Month Predictive Price Appreciation Model
    </h4>
    <p
      style={{
        margin: '0 0 1.25rem 0',
        fontSize: '0.8rem',
        color: 'var(--text-secondary, #64748B)',
      }}
    >
      Multi-variable forecast taking into account supply pipeline, DLD velocity, and interest rate
      macro trends.
    </p>
    <div
      style={{
        background: 'var(--color-f0fdfa, #F0FDFA)',
        border: '1px solid var(--color-99f6e4, #99F6E4)',
        padding: '1.25rem',
        borderRadius: '8px',
      }}
    >
      <div style={{ fontWeight: 800, color: 'var(--accent-teal, #0F766E)' }}>
        Projected Dubai Prime Capital Appreciation: +11.2% in 2026-2027
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--color-475569, #475569)', marginTop: '4px' }}>
        Highest velocity forecast in luxury waterfront properties and green master-planned villa
        communities.
      </div>
    </div>
  </div>
);

