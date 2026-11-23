import type { LucideIcon } from 'lucide-react';

export interface PropertyData {
  id?: string;
  title: string;
  location: string;
  price: number;
  priceType?: 'yearly' | string;
  pricePerSqft?: number;
  beds?: number;
  baths?: number;
  sqft?: number;
  yearBuilt?: string | number;
  type: string;
  purpose?: 'buy' | 'rent' | string;
  featured?: boolean;
  description?: string;
  images?: string[];
  image?: string;
  amenities?: string[];
}

export interface PropertyDetailModalProps {
  property: PropertyData | null;
  onClose: () => void;
  onContact?: (property: PropertyData) => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export interface TimeSlot {
  readonly value: string;
  readonly label: string;
}

export type ViewingStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface TabItem {
  id: string;
  label: string;
}

export type AmenityIconMap = Record<string, LucideIcon>;
