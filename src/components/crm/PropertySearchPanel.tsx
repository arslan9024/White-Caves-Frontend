import React, { FC, useState, useMemo, useCallback } from 'react';
import type { Property } from '../../mocks/dubaiRealEstateMocks';
import {
  type EnrichedProperty,
  type SortKey,
  type SortDir,
  type ViewMode,
  type Filters,
  RED,
  WHITE,
  SLATE,
  BORDER,
  CARD_BG,
  TEXT_MUTED,
  statusBadge,
  enrichedProperties,
  currencyKey,
  currencySymbol,
  PropertySearchSidebar,
} from './PropertySearchSidebar';
import { PropertySearchResultsGrid } from './PropertySearchResultsGrid';
import { PropertySearchDetailPanel } from './PropertySearchDetailPanel';

export const PropertySearchPanel: FC = () => {
  const [filters, setFilters] = useState<Filters>({
    query: '',
    communities: [],
    developers: [],
    status: 'ALL',
    minPrice: 0,
    maxPrice: 20000000,
    minBeds: 0,
    minSqft: 0,
    currency: 'AED',
  });
  const [sortKey, setSortKey] = useState<SortKey>('priceAED');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isVerifyingDLD, setIsVerifyingDLD] = useState(false);
  const [dldVerifiedResult, setDldVerifiedResult] = useState<null | {
    permitValid: boolean;
    ownerVerified: boolean;
    titleDeedNo: string;
  }>(null);
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; color: string }>>([]);

  const showToast = useCallback((message: string, color = RED) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);
  const PAGE_SIZE = viewMode === 'grid' ? 12 : 20;

  const filtered = useMemo(() => {
    return enrichedProperties
      .filter(p => {
        const q = filters.query.toLowerCase();
        const matchQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.community.toLowerCase().includes(q) ||
          p.developer.toLowerCase().includes(q);
        const matchCom =
          filters.communities.length === 0 || filters.communities.includes(p.community);
        const matchDev =
          filters.developers.length === 0 || filters.developers.includes(p.developer);
        const matchStatus = filters.status === 'ALL' || p.status === filters.status;
        const matchPrice = p.priceAED >= filters.minPrice && p.priceAED <= filters.maxPrice;
        const matchBeds = p.beds >= filters.minBeds;
        const matchSqft = p.sqft >= filters.minSqft;
        return (
          matchQuery &&
          matchCom &&
          matchDev &&
          matchStatus &&
          matchPrice &&
          matchBeds &&
          matchSqft
        );
      })
      .sort((a, b) => {
        const aVal = sortKey === 'title' ? a.title : Number(a[sortKey as keyof Property]);
        const bVal = sortKey === 'title' ? b.title : Number(b[sortKey as keyof Property]);
        if (typeof aVal === 'string')
          return sortDir === 'asc'
            ? aVal.localeCompare(bVal as string)
            : (bVal as string).localeCompare(aVal);
        return sortDir === 'asc' ? aVal - (bVal as number) : (bVal as number) - aVal;
      });
  }, [filters, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleFilter = (key: 'communities' | 'developers', val: string) => {
    setFilters(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val],
    }));
    setPage(1);
  };

  const clearAll = () => {
    setFilters({
      query: '',
      communities: [],
      developers: [],
      status: 'ALL',
      minPrice: 0,
      maxPrice: 20000000,
      minBeds: 0,
      minSqft: 0,
      currency: 'AED',
    });
    setPage(1);
  };

  const priceDisplay = (p: Property) => {
    const val = p[currencyKey[filters.currency] as keyof Property] as number;
    return `${currencySymbol[filters.currency]} ${val.toLocaleString()}`;
  };

  return (
    <div style={{ padding: '24px', background: WHITE, minHeight: '80vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: SLATE }}>
            🏠 Advanced Property Search
          </h2>
          <p style={{ margin: '6px 0 0 0', color: TEXT_MUTED, fontSize: '0.875rem' }}>
            {filtered.length} of {enrichedProperties.length} properties · Multi-filter ·
            Multi-currency
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              background: CARD_BG,
              borderRadius: '8px',
              border: `1px solid ${BORDER}`,
              overflow: 'hidden',
            }}
          >
            {(['AED', 'USD', 'EUR', 'GBP'] as const).map(cur => (
              <button
                key={cur}
                onClick={() => setFilters(f => ({ ...f, currency: cur }))}
                style={{
                  padding: '6px 10px',
                  background: filters.currency === cur ? SLATE : 'transparent',
                  color: filters.currency === cur ? WHITE : SLATE,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {cur}
              </button>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              background: CARD_BG,
              borderRadius: '8px',
              border: `1px solid ${BORDER}`,
              overflow: 'hidden',
            }}
          >
            {(['grid', 'table'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => {
                  setViewMode(mode);
                  setPage(1);
                }}
                style={{
                  padding: '6px 12px',
                  background: viewMode === mode ? RED : 'transparent',
                  color: viewMode === mode ? WHITE : SLATE,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {mode === 'grid' ? '⊞ Grid' : '☰ Table'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px' }}>
        <PropertySearchSidebar
          filters={filters}
          setFilters={setFilters}
          setPage={setPage}
          toggleFilter={toggleFilter}
          clearAll={clearAll}
        />

        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: TEXT_MUTED }}>
              Showing{' '}
              <strong>
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
              </strong>{' '}
              of <strong>{filtered.length}</strong>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: TEXT_MUTED }}>Sort by:</span>
              <select
                value={sortKey}
                onChange={e => setSortKey(e.target.value as SortKey)}
                style={{
                  padding: '5px 8px',
                  border: `1px solid ${BORDER}`,
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                }}
              >
                <option value="priceAED">Price</option>
                <option value="sqft">Area (sqft)</option>
                <option value="beds">Bedrooms</option>
                <option value="title">Name</option>
              </select>
              <button
                onClick={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))}
                style={{
                  padding: '5px 10px',
                  border: `1px solid ${BORDER}`,
                  borderRadius: '6px',
                  background: WHITE,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                }}
              >
                {sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
              </button>
            </div>
          </div>
          <PropertySearchResultsGrid
            viewMode={viewMode}
            paged={paged}
            selectedProperty={selectedProperty}
            setSelectedProperty={setSelectedProperty}
            currency={filters.currency}
            priceDisplay={priceDisplay}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />

          {selectedProperty && (
            <PropertySearchDetailPanel
              selectedProperty={selectedProperty}
              setSelectedProperty={setSelectedProperty}
              isVerifyingDLD={isVerifyingDLD}
              setIsVerifyingDLD={setIsVerifyingDLD}
              dldVerifiedResult={dldVerifiedResult}
              setDldVerifiedResult={setDldVerifiedResult}
              showToast={showToast}
            />
          )}
        </div>
      </div>
      {toasts.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            pointerEvents: 'none',
          }}
        >
          {toasts.map(t => (
            <div
              key={t.id}
              style={{
                background: t.color,
                color: WHITE,
                padding: '12px 18px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.85rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                maxWidth: '360px',
              }}
            >
              {t.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertySearchPanel;
