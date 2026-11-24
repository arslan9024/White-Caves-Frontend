import React, { useState } from 'react';
import type { SavedSearch, SearchFilters } from '../../../services/savedSearchesApi';
import { btnPrimary, btnSecondary, inputStyle } from './SavedSearches.styles';

export interface SearchFormProps {
  initial?: SavedSearch | null;
  onSave: (name: string, filters: SearchFilters, alertEnabled: boolean) => void;
  onCancel: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ initial, onSave, onCancel }) => {
  const [name, setName] = useState(initial?.name ?? '');
  const [type, setType] = useState<string>((initial?.filters?.type as string) ?? '');
  const [location, setLocation] = useState<string>((initial?.filters?.location as string) ?? '');
  const [minPrice, setMinPrice] = useState<string>(
    initial?.filters?.minPrice != null ? String(initial.filters.minPrice) : ''
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    initial?.filters?.maxPrice != null ? String(initial.filters.maxPrice) : ''
  );
  const [bedrooms, setBedrooms] = useState<string>(
    initial?.filters?.bedrooms != null ? String(initial.filters.bedrooms) : ''
  );
  const [alertEnabled, setAlertEnabled] = useState(initial?.alertEnabled ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: SearchFilters = {};
    if (type) filters.type = type;
    if (location) filters.location = location;
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);
    if (bedrooms) filters.bedrooms = Number(bedrooms);
    onSave(name.trim(), filters, alertEnabled);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 300, // var(--z-modal)
      }}
      onClick={onCancel}
    >
      <form
        onSubmit={handleSubmit}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--color-surface, #fff)',
          borderRadius: '16px',
          padding: '2rem',
          width: '100%',
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <h2 style={{ margin: 0 }}>{initial ? '✏️ Edit Search' : '🔍 New Saved Search'}</h2>

        <label>
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Search Name *</span>
          <input
            style={inputStyle}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. 3BR Apartments in JBR"
            required
          />
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <label>
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Property Type</span>
            <select style={inputStyle} value={type} onChange={e => setType(e.target.value)}>
              <option value="">Any</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="townhouse">Townhouse</option>
              <option value="penthouse">Penthouse</option>
              <option value="studio">Studio</option>
              <option value="land">Land</option>
            </select>
          </label>

          <label>
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Location</span>
            <input
              style={inputStyle}
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. JBR, Downtown"
            />
          </label>

          <label>
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Min Price (AED)</span>
            <input
              style={inputStyle}
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              placeholder="0"
              min={0}
            />
          </label>

          <label>
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Max Price (AED)</span>
            <input
              style={inputStyle}
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              placeholder="∞"
              min={0}
            />
          </label>

          <label>
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Bedrooms</span>
            <select style={inputStyle} value={bedrooms} onChange={e => setBedrooms(e.target.value)}>
              <option value="">Any</option>
              <option value="0">Studio</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
          </label>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={alertEnabled}
            onChange={e => setAlertEnabled(e.target.checked)}
          />
          <span style={{ fontSize: '0.9rem' }}>🔔 Notify me when new matches appear</span>
        </label>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '0.5rem',
          }}
        >
          <button type="button" onClick={onCancel} style={btnSecondary}>
            Cancel
          </button>
          <button type="submit" style={btnPrimary} disabled={!name.trim()}>
            {initial ? 'Save Changes' : 'Create Search'}
          </button>
        </div>
      </form>
    </div>
  );
};
