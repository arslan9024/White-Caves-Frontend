export interface Property {
  id: string | number;
  title: string;
  type: string;
  status: string;
  location: string;
  area?: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  description?: string;
  amenities?: string[];
  images?: string[];
  agent_id?: string;
  agent_name?: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PropertyFormData {
  title: string;
  type: string;
  status: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  description: string;
  agent_name: string;
  featured: boolean;
}

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export const STATUS_MAP: Record<string, { label: string; variant: BadgeVariant; color: string }> = {
  available: { label: 'Available', variant: 'success', color: '#10B981' },
  reserved: { label: 'Reserved', variant: 'warning', color: '#F59E0B' },
  sold: { label: 'Sold', variant: 'error', color: '#EF4444' },
  rented: { label: 'Rented', variant: 'info', color: '#3B82F6' },
  off_market: { label: 'Off Market', variant: 'secondary', color: '#6B7280' },
};

export const TYPE_MAP: Record<string, { label: string; icon: string }> = {
  villa: { label: 'Villa', icon: '🏡' },
  apartment: { label: 'Apartment', icon: '🏢' },
  penthouse: { label: 'Penthouse', icon: '🏙️' },
  commercial: { label: 'Commercial', icon: '🏗️' },
  land: { label: 'Land', icon: '🌍' },
  townhouse: { label: 'Townhouse', icon: '🏘️' },
};

export const ITEMS_PER_PAGE = 9;

export const EMPTY_FORM: PropertyFormData = {
  title: '',
  type: 'apartment',
  status: 'available',
  location: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  sqft: '',
  description: '',
  agent_name: '',
  featured: false,
};

