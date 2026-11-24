import React, { useState, useCallback, useMemo } from 'react';
import type { SearchResult, SearchFilters } from '../../../types/phase6.types';
import {
  Container,
  SearchBarContainer,
  SearchInput,
  SearchIcon,
  ClearButton,
  FilterContainer,
  FilterChip,
  ResultsContainer,
  ResultItem,
  ResultTitle,
  ResultPreview,
  ResultMeta,
  Badge,
  EmptyState,
  LoadingState,
  StatisticsContainer,
  StatisticItem,
} from './SearchComponent.styles';

export interface SearchComponentProps {
  onSearch: (query: string, filters: SearchFilters) => Promise<SearchResult[]>;
  onSelectResult?: (result: SearchResult) => void;
  placeholder?: string;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  onSelectResult,
  placeholder = 'Search conversations, contacts, files...',
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
  });

  const resultStats = useMemo(() => {
    return {
      total: results.length,
      messages: results.filter(r => r.type === 'message').length,
      contacts: results.filter(r => r.type === 'contact').length,
      files: results.filter(r => r.type === 'file').length,
    };
  }, [results]);

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setHasSearched(true);

      try {
        const searchResults = await onSearch(searchQuery, filters);
        setResults(searchResults);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [onSearch, filters]
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    const timeout = setTimeout(() => {
      void handleSearch(newQuery);
    }, 300);

    return () => clearTimeout(timeout);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
  };

  const handleFilterChange = (filterType: SearchFilters['type']) => {
    const newType = filters.type === filterType ? 'all' : filterType;
    const newFilters: SearchFilters = { ...filters, type: newType };
    setFilters(newFilters);
    void handleSearch(query);
  };

  const handleResultClick = (result: SearchResult) => {
    onSelectResult?.(result);
  };

  return (
    <Container>
      <SearchBarContainer>
        <SearchIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </SearchIcon>
        <SearchInput
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder={placeholder}
        />
        {query && (
          <ClearButton onClick={handleClear}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </ClearButton>
        )}
      </SearchBarContainer>

      <FilterContainer>
        <FilterChip
          isActive={filters.type === 'all'}
          onClick={() => handleFilterChange('all')}
        >
          All
        </FilterChip>
        <FilterChip
          isActive={filters.type === 'message'}
          onClick={() => handleFilterChange('message')}
        >
          Messages
        </FilterChip>
        <FilterChip
          isActive={filters.type === 'contact'}
          onClick={() => handleFilterChange('contact')}
        >
          Contacts
        </FilterChip>
        <FilterChip
          isActive={filters.type === 'file'}
          onClick={() => handleFilterChange('file')}
        >
          Files
        </FilterChip>
      </FilterContainer>

      {hasSearched && results.length > 0 && (
        <StatisticsContainer>
          <StatisticItem>
            <div className="stat-number">{resultStats.total}</div>
            <div className="stat-label">Total Results</div>
          </StatisticItem>
          {resultStats.messages > 0 && (
            <StatisticItem>
              <div className="stat-number">{resultStats.messages}</div>
              <div className="stat-label">Messages</div>
            </StatisticItem>
          )}
          {resultStats.contacts > 0 && (
            <StatisticItem>
              <div className="stat-number">{resultStats.contacts}</div>
              <div className="stat-label">Contacts</div>
            </StatisticItem>
          )}
          {resultStats.files > 0 && (
            <StatisticItem>
              <div className="stat-number">{resultStats.files}</div>
              <div className="stat-label">Files</div>
            </StatisticItem>
          )}
        </StatisticsContainer>
      )}

      {isLoading && (
        <LoadingState>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span>Searching...</span>
        </LoadingState>
      )}

      {!isLoading && hasSearched && results.length === 0 && (
        <EmptyState>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <p>No results found for "{query}"</p>
        </EmptyState>
      )}

      {!isLoading && hasSearched && results.length > 0 && (
        <ResultsContainer>
          {results.map((result, index) => (
            <ResultItem
              key={result.id}
              isHovered={hoveredIndex === index}
              onClick={() => handleResultClick(result)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  gap: '8px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <ResultTitle>{result.title}</ResultTitle>
                  <ResultPreview>{result.preview}</ResultPreview>
                </div>
                <Badge type={result.type}>{result.type}</Badge>
              </div>
              <ResultMeta>
                <span>{new Date(result.timestamp).toLocaleDateString()}</span>
              </ResultMeta>
            </ResultItem>
          ))}
        </ResultsContainer>
      )}
    </Container>
  );
};

export default SearchComponent;
