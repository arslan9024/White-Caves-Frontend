import { AcquisitionFormData } from './MaryAcquisitionTypes';

export const PROPERTY_TYPES = [
  'apartment',
  'villa',
  'penthouse',
  'townhouse',
  'commercial',
  'land',
  'studio',
  'duplex',
] as const;

export const CURRENCIES = ['AED', 'USD', 'EUR', 'GBP'] as const;

export const initialForm: AcquisitionFormData = {
  title: '',
  type: 'apartment',
  unitNumber: '',
  floorPlan: '',
  area: '',
  location: '',
  bedrooms: '1',
  bathrooms: '1',
  sqft: '',
  rentalPrice: '',
  commissionPercent: '5',
  currency: 'AED',
  availabilityDate: '',
  landlordName: '',
  landlordPhone: '',
  landlordEmail: '',
  hasTitleDeed: false,
  hasLandlordPassport: false,
  hasEjari: false,
  notes: '',
};
