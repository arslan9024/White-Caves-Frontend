import type { SearchFilters } from '../../../services/savedSearchesApi';

export function formatFilters(filters: SearchFilters): string {
  const parts: string[] = [];
  if (filters.type) parts.push(filters.type);
  if (filters.bedrooms != null) parts.push(`${filters.bedrooms}BR`);
  if (filters.location) parts.push(filters.location);
  if (filters.minPrice != null || filters.maxPrice != null) {
    const min = filters.minPrice ? `${(filters.minPrice / 1000).toFixed(0)}K` : '0';
    const max = filters.maxPrice ? `${(filters.maxPrice / 1000).toFixed(0)}K` : '∞';
    parts.push(`AED ${min}–${max}`);
  }
  return parts.length > 0 ? parts.join(' · ') : 'All properties';
}
