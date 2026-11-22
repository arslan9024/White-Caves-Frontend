import type { BadgeVariant } from '../../../../components/ui';
import type { Property } from '../types';

export type PropertyFormState = Omit<Property, 'id' | 'code'>;

export type ModalMode = 'none' | 'add' | 'edit' | 'delete';

export const ITEMS_PER_PAGE = 10;

export const EMPTY_FORM: PropertyFormState = {
  title: '',
  type: 'Apartment',
  location: '',
  price: 0,
  status: 'available',
  agent: null,
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    code: 'WC-PAL-001',
    title: 'Luxury Villa Palm Jumeirah',
    type: 'Villa',
    location: 'Palm Jumeirah',
    price: 15000000,
    status: 'available',
    agent: 'Ahmed Ali',
    bedrooms: 5,
    bathrooms: 6,
    area: 8500,
  },
  {
    id: 2,
    code: 'WC-DWN-002',
    title: 'Penthouse Downtown Dubai',
    type: 'Apartment',
    location: 'Downtown Dubai',
    price: 8500000,
    status: 'reserved',
    agent: 'Sara Khan',
    bedrooms: 4,
    bathrooms: 5,
    area: 4200,
  },
  {
    id: 3,
    code: 'WC-MAR-003',
    title: 'Marina View Apartment',
    type: 'Apartment',
    location: 'Dubai Marina',
    price: 3200000,
    status: 'available',
    agent: 'Mohammed Hassan',
    bedrooms: 2,
    bathrooms: 3,
    area: 1800,
  },
  {
    id: 4,
    code: 'WC-JVC-004',
    title: 'Family Townhouse JVC',
    type: 'Townhouse',
    location: 'JVC',
    price: 2100000,
    status: 'under_contract',
    agent: 'Fatima Ahmed',
    bedrooms: 3,
    bathrooms: 4,
    area: 2500,
  },
  {
    id: 5,
    code: 'WC-BUS-005',
    title: 'Business Bay Office',
    type: 'Commercial',
    location: 'Business Bay',
    price: 5500000,
    status: 'available',
    agent: null,
    bedrooms: 0,
    bathrooms: 2,
    area: 3200,
  },
  {
    id: 6,
    code: 'WC-EMH-006',
    title: 'Emirates Hills Villa',
    type: 'Villa',
    location: 'Emirates Hills',
    price: 28000000,
    status: 'sold',
    agent: 'Ahmed Ali',
    bedrooms: 7,
    bathrooms: 8,
    area: 12000,
  },
];

export const getStatusBadgeConfig = (status: string): { variant: BadgeVariant; text: string } => {
  switch (status) {
    case 'available':
      return { variant: 'success', text: 'Available' };
    case 'reserved':
      return { variant: 'warning', text: 'Reserved' };
    case 'under_contract':
      return { variant: 'info', text: 'Under Contract' };
    case 'sold':
      return { variant: 'error', text: 'Sold' };
    case 'off_market':
      return { variant: 'secondary', text: 'Off Market' };
    default:
      return { variant: 'secondary', text: status };
  }
};
