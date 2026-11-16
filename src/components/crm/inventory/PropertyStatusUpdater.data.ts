export interface PropertyStatusOption {
  value: string;
  label: string;
  color: string;
}

export interface PropertyStatusFormData {
  furnishing: string;
  occupancyStatus: string;
  marketAvailability: string;
  constructionStage: string;
  legalStatus: string;
}

export const FURNISHING_OPTIONS: PropertyStatusOption[] = [
  { value: 'unfurnished', label: 'Unfurnished', color: '#8b5cf6' },
  { value: 'furnished', label: 'Furnished', color: '#ec4899' },
  { value: 'semi-furnished', label: 'Semi-Furnished', color: '#f59e0b' },
];

export const OCCUPANCY_OPTIONS: PropertyStatusOption[] = [
  { value: 'vacant', label: 'Vacant', color: '#10b981' },
  { value: 'occupied', label: 'Occupied by Owner', color: '#EF4444' },
  { value: 'rented', label: 'Rented', color: '#06b6d4' },
  { value: 'mixed', label: 'Mixed (Owner + Rental)', color: '#8b5cf6' },
];

export const MARKET_OPTIONS: PropertyStatusOption[] = [
  { value: 'available', label: 'Available', color: '#10b981' },
  { value: 'for-rent', label: 'For Rent', color: '#EF4444' },
  { value: 'for-sale', label: 'For Sale', color: '#dc2626' },
  { value: 'hold', label: 'On Hold', color: '#f59e0b' },
  { value: 'not-available', label: 'Not Available', color: '#6b7280' },
];

export const CONSTRUCTION_OPTIONS: PropertyStatusOption[] = [
  { value: 'under_construction', label: 'Under Construction', color: '#f59e0b' },
  { value: 'handed_over', label: 'Handed Over', color: '#10b981' },
  { value: 'renovation', label: 'Renovation', color: '#06b6d4' },
  { value: 'maintenance', label: 'Maintenance', color: '#8b5cf6' },
];

export const LEGAL_OPTIONS: PropertyStatusOption[] = [
  { value: 'registered', label: 'Registered', color: '#10b981' },
  { value: 'pending', label: 'Registration Pending', color: '#f59e0b' },
  { value: 'disputed', label: 'Under Dispute', color: '#dc2626' },
  { value: 'freehold', label: 'Freehold', color: '#EF4444' },
  { value: 'leasehold', label: 'Leasehold', color: '#8b5cf6' },
];

export const getOptionLabel = (value: string, options: PropertyStatusOption[]): string => {
  return options.find(opt => opt.value === value)?.label || value;
};

export const getOptionColor = (value: string, options: PropertyStatusOption[]): string => {
  return options.find(opt => opt.value === value)?.color || '#6b7280';
};

