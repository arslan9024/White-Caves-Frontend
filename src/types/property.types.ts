/**
 * White Caves CRM - Property & Inventory Types
 */

export enum PropertyType {
  VILLA = 'villa',
  APARTMENT = 'apartment',
  TOWNHOUSE = 'townhouse',
  PENTHOUSE = 'penthouse',
  STUDIO = 'studio',
  OFFICE = 'office',
  COMMERCIAL = 'commercial',
  LAND = 'land',
}

export enum PropertyStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  SOLD = 'sold',
  RENTED = 'rented',
  ARCHIVED = 'archived',
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  address: string;
  area: number; // sq ft
  bedrooms: number;
  bathrooms: number;
  price: {
    amount: number;
    currency: 'AED' | 'USD' | 'EUR';
  };
  monthlyRent?: {
    amount: number;
    currency: 'AED' | 'USD' | 'EUR';
  };
  amenities: string[];
  features: string[];
  images: string[]; // URLs
  videoUrl?: string;
  virtualTourUrl?: string;
  neighborhood: string;
  community: string;
  developer?: string;
  reraNumber?: string;
  dldReference?: string;
  createdAt: Date;
  updatedAt: Date;
  bookmarkedBy?: string[]; // User IDs
  viewCount: number;
}

export interface PropertySearch {
  type?: PropertyType[];
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minArea?: number;
  maxArea?: number;
  neighborhood?: string[];
  keyword?: string;
  radius?: number; // km
  lat?: number;
  lng?: number;
}

export interface PropertiesState {
  items: Property[];
  currentProperty: Property | null;
  loading: boolean;
  error: string | null;
  filters: PropertySearch;
  pagination: {
    currentPage: number;
    pageSize: number;
    total: number;
  };
}

