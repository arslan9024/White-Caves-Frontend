import React from 'react';
import { Building2, MapPin, Calendar, DollarSign, Users, Search, Eye, Plus } from 'lucide-react';
import { DEVELOPMENTS, PIPELINE, STATUS_COLORS } from './NovaCRM.data';
import type { Development } from './NovaCRM.types';

interface DevelopmentsTabPanelProps {
  search: string;
  onSearchChange: (value: string) => void;
  filtered: Development[];
}

export const DevelopmentsTabPanel: React.FC<DevelopmentsTabPanelProps> = ({
  search,
  onSearchChange,
  filtered,
}) => (
  <div className="tab-content">
    <div className="tab-toolbar">
      <div className="search-box">
        <Search size={16} />
        <input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search developments…"
        />
      </div>
      <button className="action-btn primary" style={{ fontSize: 12 }}>
        <Plus size={14} /> Track New
      </button>
    </div>
    {filtered.map(d => (
      <div
        key={d.id}
        style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 16,
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <strong style={{ fontSize: 15 }}>{d.name}</strong>
            <div style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)', marginTop: 2 }}>
              {d.developer} · <MapPin size={11} style={{ display: 'inline' }} /> {d.location}
            </div>
          </div>
          <span
            className="status-badge"
            style={{
              background: `${STATUS_COLORS[d.status]}22`,
              color: STATUS_COLORS[d.status],
            }}
          >
            {d.status.replace('_', ' ')}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 14,
            fontSize: 13,
            marginBottom: 12,
            flexWrap: 'wrap',
          }}
        >
          <span>
            <Calendar size={12} style={{ display: 'inline' }} /> Launch: {d.launchDate}
          </span>
          <span>Handover: {d.handover}</span>
          <span>
            <Users size={12} style={{ display: 'inline' }} /> {d.units} units
          </span>
          <span>
            <DollarSign size={12} style={{ display: 'inline' }} /> From {d.startPrice}
          </span>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)' }}>Sold</span>
            <span style={{ fontSize: 12, fontWeight: 700 }}>{d.soldPct}%</span>
          </div>
          <div style={{ height: 8, background: 'var(--color-e5e7eb, #e5e7eb)', borderRadius: 4 }}>
            <div
              style={{
                width: `${d.soldPct}%`,
                height: '100%',
                background: d.soldPct >= 80 ? '#E31E24' : '#22C55E',
                borderRadius: 4,
              }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const PipelineTabPanel: React.FC = () => (
  <div className="tab-content">
    <h3 style={{ marginBottom: 16 }}>Expected Launches</h3>
    {PIPELINE.map((p, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          gap: 14,
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: 'rgba(245,158,11,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Building2 size={22} color="#F59E0B" />
        </div>
        <div style={{ flex: 1 }}>
          <strong>{p.name}</strong>
          <div style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)', marginTop: 2 }}>
            {p.developer} · {p.units} units · Est. {p.est}
          </div>
        </div>
        <button className="action-btn" style={{ fontSize: 11, padding: '5px 12px' }}>
          <Eye size={12} /> Watch
        </button>
      </div>
    ))}
  </div>
);

export const TrackerTabPanel: React.FC = () => (
  <div className="tab-content">
    <h3 style={{ marginBottom: 16 }}>Sales Rate Overview</h3>
    {DEVELOPMENTS.map(d => (
      <div
        key={d.id}
        style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          padding: '12px 16px',
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <strong>{d.name}</strong>
          <span
            style={{
              fontWeight: 700,
              color:
                d.soldPct >= 80 ? 'var(--color-e31e24, #E31E24)' : 'var(--accent-green, #22C55E)',
            }}
          >
            {d.soldPct}% sold
          </span>
        </div>
        <div style={{ height: 10, background: 'var(--color-e5e7eb, #e5e7eb)', borderRadius: 5 }}>
          <div
            style={{
              width: `${d.soldPct}%`,
              height: '100%',
              background: d.soldPct >= 80 ? '#E31E24' : '#22C55E',
              borderRadius: 5,
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary, #9ca3af)', marginTop: 6 }}>
          {Math.round((d.units * d.soldPct) / 100)} / {d.units} units
        </div>
      </div>
    ))}
  </div>
);
