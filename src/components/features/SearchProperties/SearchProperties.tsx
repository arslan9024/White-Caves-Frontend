/**
 * SearchProperties.tsx — Property Search Feature Component
 * Decomposed under AEGIS V5.1 AEG-042 (< 350 lines) with lucide-react icons.
 */

import React, { useState } from 'react';
import { Search, Building2, Loader2 } from 'lucide-react';
import { authFetch } from '../../../utils/authFetch';
import {
  Container,
  EmptyState,
  FilterCheckbox,
  FilterGrid,
  FilterSection,
  Header,
  ResultCard,
  ResultsHeader,
  ResultsList,
  ResultsSection,
  SearchButton,
  SearchForm,
  SearchInput,
} from './SearchProperties.styles';

export interface SearchFilters {
  status: string[];
  priceRange: string;
  bedrooms: string;
}

export interface PropertyResult {
  id: string;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: string;
}

export const SearchProperties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    status: [],
    priceRange: 'all',
    bedrooms: 'all',
  });
  const [results, setResults] = useState<PropertyResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set('search', searchTerm.trim());
      if (filters.status.length === 1) params.set('status', filters.status[0]);
      if (filters.bedrooms !== 'all' && filters.bedrooms !== '4+') {
        params.set('minBeds', filters.bedrooms);
      } else if (filters.bedrooms === '4+') {
        params.set('minBeds', '4');
      }
      params.set('pageSize', '20');

      const resp = await authFetch(`/api/properties?${params.toString()}`);
      const data = (await resp.json()) as { data: Record<string, unknown>[] };
      const mapped: PropertyResult[] = (data.data || []).map(prop => ({
        id: String(prop.id ?? ''),
        name: String(prop.title || 'Unnamed Property'),
        location: String(prop.location || prop.area || 'Dubai, UAE'),
        price: prop.price ? `AED ${Number(prop.price).toLocaleString()}` : 'Price on Request',
        bedrooms: Number(prop.bedrooms ?? 0),
        bathrooms: Number(prop.bathrooms ?? 0),
        area: prop.sqft ? `${String(prop.sqft)} sqft` : String(prop.area || 'N/A'),
        status:
          prop.status === 'available'
            ? 'Available'
            : prop.status === 'sold'
              ? 'Sold'
              : prop.status === 'rented'
                ? 'Rented'
                : 'Pending',
      }));
      setResults(mapped);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType: keyof SearchFilters, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  return (
    <Container>
      <Header>
        <h1>
          <Search size={24} color="#EF4444" />
          Property Search
        </h1>
        <p>Find the perfect property in Dubai</p>
      </Header>

      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="Search by property name or location..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>

      <FilterSection>
        <h3>Status</h3>
        <FilterGrid>
          {(['available', 'pending'] as const).map(statusOption => (
            <FilterCheckbox key={statusOption}>
              <input
                type="checkbox"
                checked={filters.status.includes(statusOption)}
                onChange={e =>
                  handleFilterChange(
                    'status',
                    e.target.checked
                      ? [...filters.status, statusOption]
                      : filters.status.filter(s => s !== statusOption)
                  )
                }
              />
              {statusOption === 'available' ? 'Available' : 'Pending'}
            </FilterCheckbox>
          ))}
        </FilterGrid>
      </FilterSection>

      <ResultsSection>
        {loading ? (
          <EmptyState>
            <div className="icon">
              <Loader2 size={36} className="animate-spin" />
            </div>
            <h3>Searching…</h3>
            <p>Loading properties from the database</p>
          </EmptyState>
        ) : hasSearched && results.length === 0 ? (
          <EmptyState>
            <div className="icon">
              <Building2 size={36} />
            </div>
            <h3>No Properties Found</h3>
            <p>Try adjusting your search criteria</p>
          </EmptyState>
        ) : results.length > 0 ? (
          <>
            <ResultsHeader>
              Found {results.length} {results.length === 1 ? 'property' : 'properties'}
            </ResultsHeader>
            <ResultsList>
              {results.map(property => (
                <ResultCard key={property.id}>
                  <div className="property-name">{property.name}</div>
                  <div className="property-location">{property.location}</div>
                  <div className="property-details">
                    <div className="detail">
                      <span className="label">Price</span>
                      <span className="value">{property.price}</span>
                    </div>
                    <div className="detail">
                      <span className="label">Beds</span>
                      <span className="value">{property.bedrooms}</span>
                    </div>
                    <div className="detail">
                      <span className="label">Area</span>
                      <span className="value">{property.area}</span>
                    </div>
                  </div>
                </ResultCard>
              ))}
            </ResultsList>
          </>
        ) : (
          <EmptyState>
            <div className="icon">
              <Search size={36} />
            </div>
            <h3>Search for Properties</h3>
            <p>Enter a property name or location to begin your search</p>
          </EmptyState>
        )}
      </ResultsSection>
    </Container>
  );
};

export default SearchProperties;
