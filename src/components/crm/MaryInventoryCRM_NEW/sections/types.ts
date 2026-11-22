export interface WorkspaceArea {
  id: string;
  name: string;
  isDefault: boolean;
}

export interface RawOwnerContact {
  value: string;
}

export interface RawOwnerItem {
  id: string;
  name?: string;
  contacts?: RawOwnerContact[];
  properties?: string[];
}

export interface RawPropertyItem {
  pNumber?: string;
  plotNumber?: string;
  plotNo?: string;
  layout?: string;
  cluster?: string;
  view?: string;
  rooms?: number | string;
  status?: string;
  askingPrice?: number;
  owners?: string[];
}

export interface OwnerRecord {
  landlordName: string;
  primaryPhone: string;
  secondaryEmail: string;
  verificationStatus: string;
  titleDeedRef: string;
  mandate: string;
  ownerCount?: number;
  phoneCount?: number;
}

export interface InventoryProperty {
  id: string;
  pNumber: string;
  plotNumber: string;
  type: string;
  sector: string;
  layout: string;
  view: string;
  config: string;
  objective: string;
  furnishing: string;
  occupancy: string;
  status: string;
  askingPrice: string;
  rentAED: string;
  ejariNumber: string;
  leaseExpiry: string;
  noticeServed: string;
  paymentTerms: string;
  lockbox: string;
  ownerId: string;
  hasMultiOwners: boolean;
  hasMultiPhones: boolean;
}

export interface ClusterEntry {
  name: string;
  count: number;
}

export interface AnalyticsKPIs {
  totalProps: number;
  totalOwners: number;
  multiOwnersCount: number;
  multiPhoneCount: number;
}

export interface NewPropertyFormState {
  id: string;
  pNumber: string;
  plotNumber: string;
  type: string;
  sector: string;
  config: string;
  objective: string;
  furnishing: string;
  occupancy: string;
  askingPrice: string;
  rentAED: string;
  ejariNumber: string;
  leaseExpiry: string;
  noticeServed: string;
  paymentTerms: string;
  lockbox: string;
  landlordName: string;
  primaryPhone: string;
  secondaryEmail: string;
  verificationStatus: string;
  titleDeedRef: string;
  mandate: string;
}

export const WORKSPACE_AREAS: WorkspaceArea[] = [
  { id: 'damac-hills-2', name: '🌴 DAMAC Hills 2 (Core Launch Zone)', isDefault: true },
  { id: 'downtown-dubai', name: '🏙️ Downtown Dubai', isDefault: false },
  { id: 'dubai-marina', name: '⛵ Dubai Marina & JBR', isDefault: false },
  { id: 'business-bay', name: '🏢 Business Bay', isDefault: false },
  { id: 'dubai-hills-estate', name: '⛳ Dubai Hills Estate', isDefault: false },
  { id: 'palm-jumeirah', name: '🏝️ Palm Jumeirah', isDefault: false },
  { id: 'jvc', name: '🏘️ Jumeirah Village Circle (JVC)', isDefault: false },
];

export const INITIAL_NEW_PROPERTY_FORM: NewPropertyFormState = {
  id: '',
  pNumber: '',
  plotNumber: '',
  type: 'Villa',
  sector: 'ALBIZIA',
  config: '3BR + Maid',
  objective: 'Available for Sale',
  furnishing: 'Furnished',
  occupancy: 'Vacant',
  askingPrice: 'AED 1,500,000',
  rentAED: 'N/A',
  ejariNumber: 'N/A',
  leaseExpiry: 'N/A',
  noticeServed: 'No',
  paymentTerms: '2 PDCs',
  lockbox: 'LB-880',
  landlordName: 'New Landlord Name',
  primaryPhone: '+971-50-000-0000',
  secondaryEmail: 'landlord@whitecaves.ae',
  verificationStatus: 'Verified via DLD REST App',
  titleDeedRef: 'DLD Title Deed #2024-NEW-001',
  mandate: 'Exclusive White Caves Listing',
};
