// ─── Types ───────────────────────────────────────────────────────────────────

export interface AcquisitionFormData {
  // Property details
  title: string;
  type: string;
  unitNumber: string;
  floorPlan: string;
  area: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;

  // Pricing
  rentalPrice: string;
  commissionPercent: string;
  currency: string;
  availabilityDate: string;

  // Landlord contact
  landlordName: string;
  landlordPhone: string;
  landlordEmail: string;

  // Documents
  hasTitleDeed: boolean;
  hasLandlordPassport: boolean;
  hasEjari: boolean;

  // Notes
  notes: string;
}

export interface AcquisitionPayload {
  title: string;
  type: string;
  unitNumber?: string;
  floorPlan?: string;
  area?: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  price: number;
  rentalPrice?: number;
  commissionPercent: number;
  currency: string;
  availabilityDate?: string;
  agentName?: string;
  inventoryStage: string;
  titleDeedMissing: boolean;
  landlordPassportMissing: boolean;
  ejariMissing: boolean;
  description?: string;
}
