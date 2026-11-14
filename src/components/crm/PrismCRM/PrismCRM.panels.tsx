import React from 'react';
import { MapPin, DollarSign, Bed, Bath, Search, SlidersHorizontal, Home } from 'lucide-react';
import { PropertyMatch, AlgorithmStep } from './PrismCRM.types';
import { AREAS, MATCHES } from './PrismCRM.data';

interface MatchesTabPanelProps {
  areaFilter: string;
  setAreaFilter: (area: string) => void;
  matches: PropertyMatch[];
}

export const MatchesTabPanel: React.FC<MatchesTabPanelProps> = ({
  areaFilter,
  setAreaFilter,
  matches,
}) => (
  <div className="tab-content">
    <div className="tab-toolbar">
      <div className="search-box">
        <MapPin size={16} />
        <select
          value={areaFilter}
          onChange={e => setAreaFilter(e.target.value)}
          style={{ border: 'none', outline: 'none', fontSize: 14 }}
        >
          {AREAS.map(a => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>
      <span style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)' }}>
        {matches.length} matches
      </span>
    </div>
    {matches.map(m => (
      <div
        key={m.id}
        style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 10,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{m.property}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)', marginTop: 2 }}>
              For: {m.lead}
            </div>
          </div>
          <div
            style={{
              textAlign: 'center',
              background: m.matchScore >= 90 ? '#fff7f7' : '#f0fdf4',
              border: `1px solid ${m.matchScore >= 90 ? '#fecaca' : '#bbf7d0'}`,
              borderRadius: 8,
              padding: '6px 12px',
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 22,
                color: m.matchScore >= 90 ? '#E31E24' : '#16A34A',
              }}
            >
              {m.matchScore}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary, #6b7280)' }}>match</div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 12,
            fontSize: 13,
            color: '#374151',
            marginBottom: 10,
          }}
        >
          <span>
            <DollarSign size={13} style={{ display: 'inline' }} /> {m.price}
          </span>
          <span>
            <Bed size={13} style={{ display: 'inline' }} /> {m.beds || 'Studio'}
          </span>
          <span>
            <Bath size={13} style={{ display: 'inline' }} /> {m.baths}
          </span>
          <span>
            <MapPin size={13} style={{ display: 'inline' }} /> {m.area}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {m.reasons.map(r => (
            <span
              key={r}
              style={{
                background: '#EEF2FF',
                color: '#4F46E5',
                borderRadius: 20,
                padding: '2px 10px',
                fontSize: 11,
              }}
            >
              {r}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="status-badge">{m.status}</span>
          <button className="action-btn primary" style={{ fontSize: 12, padding: '6px 14px' }}>
            Send to Lead
          </button>
        </div>
      </div>
    ))}
  </div>
);

interface AlgorithmTabPanelProps {
  steps: AlgorithmStep[];
}

export const AlgorithmTabPanel: React.FC<AlgorithmTabPanelProps> = ({ steps }) => (
  <div className="tab-content">
    <h3 style={{ marginBottom: 16 }}>How Prism Matches Properties</h3>
    {steps.map(s => (
      <div
        key={s.step}
        style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#8B5CF6',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {s.step}
        </div>
        <div>
          <strong>{s.title}</strong>
          <p style={{ fontSize: 13, color: 'var(--text-secondary, #6b7280)', margin: '4px 0 0' }}>
            {s.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export const InventoryTabPanel: React.FC = () => (
  <div className="tab-content">
    <div className="tab-toolbar">
      <div className="search-box">
        <Search size={16} />
        <input placeholder="Search inventory…" />
      </div>
      <button className="action-btn" style={{ fontSize: 12 }}>
        <SlidersHorizontal size={14} /> Filters
      </button>
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 14,
      }}
    >
      {MATCHES.map(m => (
        <div
          key={m.id}
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: 100,
              background: `linear-gradient(135deg, #8B5CF633, #6D28D933)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Home size={40} color="#8B5CF6" />
          </div>
          <div style={{ padding: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.property}</div>
            <div style={{ fontSize: 13, color: 'var(--color-e31e24, #E31E24)', fontWeight: 600 }}>
              {m.price}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)', marginTop: 4 }}>
              {m.area} · {m.beds || 'Studio'} bed
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
