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
