import React, { useState, useMemo } from 'react';
import { Search, Building, BedDouble, Bath, MapPin, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES } from '../../mocks/mockDataGenerated/mockProperties';

export interface FastPropertySearchHeroProps {
  onSelectProperty?: (propertyId: string) => void;
  onOpenAuthModal?: (mode: 'signin' | 'signup') => void;
}

export type PropertyCategory = 'ALL' | 'Villas' | 'Penthouses' | 'Off-Plan';

export const FastPropertySearchHero: React.FC<FastPropertySearchHeroProps> = ({
  onSelectProperty,
  onOpenAuthModal,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<PropertyCategory>('ALL');
  const [communityFilter, setCommunityFilter] = useState('ALL');
  const [bedFilter, setBedFilter] = useState<number | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const communities = useMemo(() => {
    const list = Array.from(new Set(MOCK_PROPERTIES.map(p => p.community)));
    return list.slice(0, 10);
  }, []);

  const filteredProperties = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_PROPERTIES.filter(p => {
      const titleLower = p.title.toLowerCase();
      const typeLower = (p.type || '').toLowerCase();

      // Category matching
      let matchesCategory = true;
      if (category === 'Villas') {
        matchesCategory =
          typeLower.includes('villa') ||
          titleLower.includes('villa') ||
          titleLower.includes('mansion');
      } else if (category === 'Penthouses') {
        matchesCategory =
          typeLower.includes('penthouse') ||
          titleLower.includes('penthouse') ||
          titleLower.includes('duplex');
      } else if (category === 'Off-Plan') {
        matchesCategory =
          typeLower.includes('off-plan') ||
          titleLower.includes('off-plan') ||
          p.status === 'UnderConstruction' ||
          p.community.toLowerCase().includes('hills') ||
          p.community.toLowerCase().includes('damac');
      }

      const matchesQ =
        !q ||
        titleLower.includes(q) ||
        p.community.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.reraPermitNumber.toLowerCase().includes(q);

      const matchesComm = communityFilter === 'ALL' || p.community === communityFilter;
      const matchesBed = bedFilter === 'ALL' || p.beds === bedFilter;
      const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;

      return matchesCategory && matchesQ && matchesComm && matchesBed && matchesStatus;
    }).slice(0, 6);
  }, [query, category, communityFilter, bedFilter, statusFilter]);

  const handlePropertyClick = (propId: string) => {
    if (onSelectProperty) {
      onSelectProperty(propId);
    } else {
      navigate(`/dashboard/pms/properties/${propId}`);
    }
  };

  return (
    <div className="wc-fast-search-container" data-testid="wc-fast-search-container">
      {/* Fast Property Category Filter Bar */}
      <div className="wc-property-category-bar" data-testid="wc-property-category-bar">
        {(['ALL', 'Villas', 'Penthouses', 'Off-Plan'] as const).map(cat => (
          <button
            key={cat}
            type="button"
            className={`wc-cat-filter-btn ${category === cat ? 'wc-cat-filter-btn--active' : ''}`}
            onClick={() => setCategory(cat)}
            data-testid={`wc-cat-filter-${cat.toLowerCase()}`}
          >
            {cat === 'ALL'
              ? '✨ All Luxury'
              : cat === 'Villas'
                ? '🏡 Villas'
                : cat === 'Penthouses'
                  ? '🏙️ Penthouses'
                  : '🏗️ Off-Plan'}
          </button>
        ))}
      </div>

      <div className="wc-fast-search-bar">
        <div className="wc-search-input-group">
          <Search size={18} className="wc-search-icon" />
          <input
            type="text"
            placeholder="Search by community (Downtown, Marina...), developer, or RERA permit..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="wc-search-input"
            data-testid="wc-fast-search-input"
          />
          {query && (
            <button
              type="button"
              className="wc-clear-search-btn"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="wc-search-filters">
          <select
            value={communityFilter}
            onChange={e => setCommunityFilter(e.target.value)}
            className="wc-search-select"
            data-testid="wc-filter-community"
          >
            <option value="ALL">All Communities</option>
            {communities.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={bedFilter}
            onChange={e => setBedFilter(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="wc-search-select"
            data-testid="wc-filter-beds"
          >
            <option value="ALL">All Bedrooms</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
            <option value="4">4+ Beds</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="wc-search-select"
            data-testid="wc-filter-status"
          >
            <option value="ALL">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Leased">Leased</option>
            <option value="UnderMaintenance">Under Maintenance</option>
          </select>
        </div>
      </div>

      {/* Live Fast Search Results Grid */}
      <div className="wc-fast-results-grid" data-testid="wc-fast-results-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(prop => (
            <div
              key={prop.id}
              className="wc-luxury-property-card"
              onClick={() => handlePropertyClick(prop.id)}
              data-testid={`wc-property-card-${prop.id}`}
            >
              <div className="wc-prop-card-header">
                <span className="wc-prop-developer">{prop.developer}</span>
                <span
                  className={`wc-prop-status-tag ${
                    prop.status === 'Available' ? 'wc-status-available' : 'wc-status-other'
                  }`}
                >
                  {prop.status}
                </span>
              </div>
              <h4 className="wc-prop-title">{prop.title}</h4>
              <div className="wc-prop-location">
                <MapPin size={13} />
                <span>{prop.community}</span>
              </div>
              <div className="wc-prop-specs">
                <span>
                  <BedDouble size={13} /> {prop.beds} Beds
                </span>
                <span>
                  <Bath size={13} /> {prop.baths} Baths
                </span>
                <span>
                  <Building size={13} /> {prop.sqft.toLocaleString()} Sq Ft
                </span>
              </div>
              <div className="wc-prop-footer">
                <div className="wc-prop-price">AED {prop.priceAED.toLocaleString()}</div>
                <button
                  type="button"
                  className="wc-prop-inquire-btn"
                  onClick={e => {
                    e.stopPropagation();
                    if (onOpenAuthModal) {
                      onOpenAuthModal('signin');
                    } else {
                      navigate('/signin');
                    }
                  }}
                >
                  <span>Inquire</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="wc-no-results" data-testid="wc-fast-no-results">
            <p>No luxury properties match your query.</p>
          </div>
        )}
      </div>
    </div>
  );
};
