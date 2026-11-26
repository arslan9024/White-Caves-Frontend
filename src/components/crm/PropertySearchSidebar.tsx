import React, { FC } from 'react';
import { mockProperties, Property } from '../../mocks/dubaiRealEstateMocks';

/** Property record enriched with display-only fields added locally */
export type EnrichedProperty = Property & { propType: string; imageUrl: string };

export const RED = '#EF4444';
export const WHITE = '#FFFFFF';
export const SLATE = '#1E293B';
export const BORDER = 'rgba(239, 68, 68, 0.2)';
export const CARD_BG = '#F8FAFC';
export const TEXT_MUTED = '#64748B';
export const GREEN = '#10B981';
export const ORANGE = '#F59E0B';

export type SortKey = 'priceAED' | 'sqft' | 'beds' | 'title';
export type SortDir = 'asc' | 'desc';
export type ViewMode = 'grid' | 'table';

export interface Filters {
  query: string;
  communities: string[];
  developers: string[];
  status: string;
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  minSqft: number;
  currency: 'AED' | 'USD' | 'EUR' | 'GBP';
}

export const ALL_COMMUNITIES = [
  'DAMAC Hills 2',
  'Downtown Dubai',
  'Dubai Marina',
  'Palm Jumeirah',
  'Business Bay',
];
export const ALL_DEVELOPERS = ['DAMAC', 'Emaar', 'Nakheel', 'Meraas', 'Sobha'];

export const statusBadge: Record<string, { bg: string; color: string }> = {
  Available: { bg: '#DEF7EC', color: GREEN },
  Leased: { bg: '#FEF2F2', color: RED },
  UnderMaintenance: { bg: '#FFFBEB', color: ORANGE },
};

const PROPERTY_IMAGES = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=260&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=260&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=260&fit=crop',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=260&fit=crop',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=260&fit=crop',
];

const PROP_TYPES = ['Villa', 'Apartment', 'Townhouse', 'Penthouse', 'Studio'];

export const enrichedProperties: EnrichedProperty[] = mockProperties.map((p, i) => ({
  ...p,
  propType: PROP_TYPES[i % PROP_TYPES.length],
  imageUrl: PROPERTY_IMAGES[i % PROPERTY_IMAGES.length],
}));

export const currencyKey: Record<string, keyof Property> = {
  AED: 'priceAED',
  USD: 'priceUSD',
  EUR: 'priceEUR',
  GBP: 'priceGBP',
};

export const currencySymbol: Record<string, string> = {
  AED: 'AED',
  USD: 'USD',
  EUR: '€',
  GBP: '£',
};

interface PropertySearchSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  toggleFilter: (key: 'communities' | 'developers', val: string) => void;
  clearAll: () => void;
}

export const PropertySearchSidebar: FC<PropertySearchSidebarProps> = ({
  filters,
  setFilters,
  setPage,
  toggleFilter,
  clearAll,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <input
        type="text"
        placeholder="🔍 Search properties..."
        value={filters.query}
        onChange={e => {
          setFilters(f => ({ ...f, query: e.target.value }));
          setPage(1);
        }}
        style={{
          width: '100%',
          padding: '9px 12px',
          border: `1px solid ${BORDER}`,
          borderRadius: '8px',
          fontSize: '0.875rem',
          boxSizing: 'border-box',
        }}
      />
    </div>

    <div
      style={{
        background: CARD_BG,
        padding: '14px',
        borderRadius: '10px',
        border: `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: '0.8rem',
          color: SLATE,
          marginBottom: '10px',
          textTransform: 'uppercase',
        }}
      >
        Status
      </div>
      {['ALL', 'Available', 'Leased', 'UnderMaintenance'].map(s => (
        <label
          key={s}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '7px',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          <input
            type="radio"
            name="status"
            checked={filters.status === s}
            onChange={() => {
              setFilters(f => ({ ...f, status: s }));
              setPage(1);
            }}
            style={{ accentColor: RED }}
          />
          <span
            style={{ color: s === 'ALL' ? SLATE : statusBadge[s]?.color || SLATE, fontWeight: 600 }}
          >
            {s === 'ALL' ? 'All Statuses' : s}
          </span>
        </label>
      ))}
    </div>

    <div
      style={{
        background: CARD_BG,
        padding: '14px',
        borderRadius: '10px',
        border: `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: '0.8rem',
          color: SLATE,
          marginBottom: '10px',
          textTransform: 'uppercase',
        }}
      >
        Community
      </div>
      {ALL_COMMUNITIES.map(c => (
        <label
          key={c}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '7px',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          <input
            type="checkbox"
            checked={filters.communities.includes(c)}
            onChange={() => toggleFilter('communities', c)}
            style={{ accentColor: RED }}
          />
          {c}
        </label>
      ))}
    </div>

    <div
      style={{
        background: CARD_BG,
        padding: '14px',
        borderRadius: '10px',
        border: `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: '0.8rem',
          color: SLATE,
          marginBottom: '10px',
          textTransform: 'uppercase',
        }}
      >
        Developer
      </div>
      {ALL_DEVELOPERS.map(d => (
        <label
          key={d}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '7px',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          <input
            type="checkbox"
            checked={filters.developers.includes(d)}
            onChange={() => toggleFilter('developers', d)}
            style={{ accentColor: RED }}
          />
          {d}
        </label>
      ))}
    </div>

    <div
      style={{
        background: CARD_BG,
        padding: '14px',
        borderRadius: '10px',
        border: `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: '0.8rem',
          color: SLATE,
          marginBottom: '10px',
          textTransform: 'uppercase',
        }}
      >
        Min Bedrooms
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {[0, 1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            onClick={() => {
              setFilters(f => ({ ...f, minBeds: n }));
              setPage(1);
            }}
            style={{
              padding: '5px 10px',
              borderRadius: '6px',
              border: `1px solid ${BORDER}`,
              background: filters.minBeds === n ? RED : WHITE,
              color: filters.minBeds === n ? WHITE : SLATE,
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            {n === 0 ? 'Any' : `${n}+`}
          </button>
        ))}
      </div>
    </div>

    <div
      style={{
        background: CARD_BG,
        padding: '14px',
        borderRadius: '10px',
        border: `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: '0.8rem',
          color: SLATE,
          marginBottom: '10px',
          textTransform: 'uppercase',
        }}
      >
        Price (AED)
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="number"
          placeholder="Min"
          value={filters.minPrice || ''}
          onChange={e => {
            setFilters(f => ({ ...f, minPrice: Number(e.target.value) || 0 }));
            setPage(1);
          }}
          style={{
            width: '100%',
            padding: '6px 8px',
            border: `1px solid ${BORDER}`,
            borderRadius: '6px',
            fontSize: '0.8rem',
          }}
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.maxPrice === 20000000 ? '' : filters.maxPrice}
          onChange={e => {
            setFilters(f => ({ ...f, maxPrice: Number(e.target.value) || 20000000 }));
            setPage(1);
          }}
          style={{
            width: '100%',
            padding: '6px 8px',
            border: `1px solid ${BORDER}`,
            borderRadius: '6px',
            fontSize: '0.8rem',
          }}
        />
      </div>
    </div>

    <button
      onClick={clearAll}
      style={{
        padding: '10px',
        background: '#E2E8F0',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: '0.85rem',
        color: SLATE,
      }}
    >
      ✕ Clear All Filters
    </button>
  </div>
);
