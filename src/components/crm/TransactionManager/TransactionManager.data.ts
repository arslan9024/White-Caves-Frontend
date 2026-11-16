/**
 * TransactionManager — Static Registries & Data Constants
 * Standard: Mary Allen Wilkes Protocol (.data.ts)
 * Single Purpose File Law: < 350 lines
 */

export const PROPERTY_TYPES = [
  'Flat',
  'Villa',
  'Townhouse',
  'Penthouse',
  'Studio',
  'Office',
  'Hotel Rooms',
] as const;

export const ROOM_OPTIONS = [
  'Studio',
  '1 B/R',
  '2 B/R',
  '3 B/R',
  '4 B/R',
  '5 B/R',
  '6+ B/R',
] as const;

export const formatCurrency = (value?: number | string | null): string => {
  if (!value) return 'AED 0';
  return `AED ${Number(value).toLocaleString()}`;
};

export const formatDate = (date?: string | null): string => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const INITIAL_FILTERS = {
  search: '',
  area: '',
  propSubType: '',
  rooms: '',
  minValue: '',
  maxValue: '',
  isOffplan: '',
};

