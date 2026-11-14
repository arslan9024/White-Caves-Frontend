import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { PropertyValuation, ComparableSale } from './CrestCRM.types';
import { AREA_RATES } from './CrestCRM.data';

interface ValuationsTabPanelProps {
  valuations: PropertyValuation[];
}

export const ValuationsTabPanel: React.FC<ValuationsTabPanelProps> = ({ valuations }) => (
  <div className="tab-content">
    {valuations.map(v => (
      <div
        key={v.id}
        style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 16,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <div>
            <strong style={{ fontSize: 15 }}>{v.property}</strong>
            <div
              style={{
                fontSize: 12,
                color: 'var(--text-secondary, #6b7280)',
                marginTop: 2,
              }}
            >
              <MapPin size={11} style={{ display: 'inline' }} /> {v.area} · {v.beds || 'Studio'} bed
              · {v.sqft.toLocaleString()} sqft
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: 'var(--color-e31e24, #E31E24)',
              }}
            >
              {v.estimate}
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-secondary, #6b7280)',
              }}
            >
              {v.range}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)' }}>Confidence:</span>
          <div
            style={{
              flex: 1,
              height: 6,
              background: '#e5e7eb',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${v.confidence}%`,
                height: '100%',
                background:
                  v.confidence >= 90 ? '#22C55E' : v.confidence >= 75 ? '#F59E0B' : '#E31E24',
                borderRadius: 4,
              }}
            />
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 13,
              color: v.confidence >= 90 ? '#22C55E' : '#F59E0B',
            }}
          >
            {v.confidence}%
          </span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)' }}>
          {v.comparable} comparable sales · Requested {v.requested}
        </div>
      </div>
    ))}
  </div>
);

interface ComparablesTabPanelProps {
  comps: ComparableSale[];
}

export const ComparablesTabPanel: React.FC<ComparablesTabPanelProps> = ({ comps }) => (
  <div className="tab-content">
    <div
      style={{
        display: 'flex',
        gap: 10,
        marginBottom: 16,
        fontSize: 12,
        color: '#6b7280',
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '10px 14px',
      }}
    >
      <AlertCircle size={14} color="#0EA5E9" />
      Showing comparables for Palm Jumeirah Villa G-12
    </div>
    <table className="data-table">
      <thead>
        <tr>
          <th>Address</th>
          <th>Sold Price</th>
          <th>Sqft</th>
          <th>PSF (AED)</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {comps.map((c, i) => (
          <tr key={i}>
            <td>
              <strong>{c.address}</strong>
            </td>
            <td>{c.sold}</td>
            <td>{c.sqft.toLocaleString()}</td>
            <td>{c.psf.toLocaleString()}</td>
            <td style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)' }}>{c.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface CalculatorTabPanelProps {
  calcArea: string;
  setCalcArea: (area: string) => void;
  calcSqft: number;
  setCalcSqft: (sqft: number) => void;
  calcBeds: number;
  setCalcBeds: (beds: number) => void;
  estVal: number;
}

export const CalculatorTabPanel: React.FC<CalculatorTabPanelProps> = ({
  calcArea,
  setCalcArea,
  calcSqft,
  setCalcSqft,
  calcBeds,
  setCalcBeds,
  estVal,
}) => (
  <div className="tab-content">
    <h3 style={{ marginBottom: 16 }}>Quick Valuation Estimator</h3>
    <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
      <div>
        <label
          style={{
            fontSize: 13,
            color: 'var(--text-secondary, #6b7280)',
            marginBottom: 6,
            display: 'block',
          }}
        >
          Area
        </label>
        <select
          value={calcArea}
          onChange={e => setCalcArea(e.target.value)}
          style={{
            width: '100%',
            padding: '9px 12px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            fontSize: 14,
          }}
        >
          {Object.keys(AREA_RATES).map(a => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>
      <div>
        <label
          style={{
            fontSize: 13,
            color: 'var(--text-secondary, #6b7280)',
            marginBottom: 6,
            display: 'block',
          }}
        >
          Size (sqft)
        </label>
        <input
          type="number"
          value={calcSqft}
          onChange={e => setCalcSqft(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '9px 12px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            fontSize: 14,
          }}
        />
      </div>
      <div>
        <label
          style={{
            fontSize: 13,
            color: 'var(--text-secondary, #6b7280)',
            marginBottom: 6,
            display: 'block',
          }}
        >
          Bedrooms
        </label>
        <select
          value={calcBeds}
          onChange={e => setCalcBeds(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '9px 12px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            fontSize: 14,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map(n => (
            <option key={n} value={n}>
              {n === 0 ? 'Studio' : `${n} BR`}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div
      style={{
        background: '#fff7f7',
        border: '1px solid #fecaca',
        borderRadius: 12,
        padding: 20,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: 'var(--text-secondary, #6b7280)',
          marginBottom: 8,
        }}
      >
        Estimated Value
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          color: 'var(--color-e31e24, #E31E24)',
        }}
      >
        AED {estVal.toLocaleString()}
      </div>
      <div
        style={{
          fontSize: 12,
          color: 'var(--text-secondary, #9ca3af)',
          marginTop: 6,
        }}
      >
        Based on {AREA_RATES[calcArea]} AED/sqft avg for {calcArea}
      </div>
    </div>
  </div>
);
