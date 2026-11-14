export type OpportunityStatus =
  'initial_detection' | 'waiting_for_photos' | 'partially_verified' | 'fully_verified' | string;

export interface PropertyOpportunity {
  id: string;
  propertyType: string;
  location: string;
  bedrooms: number;
  price: number;
  currency: string;
  availability: 'for_rent' | 'for_sale' | string;
  ownerName: string;
  ownerPhone: string;
  confidence: number;
  status: OpportunityStatus;
  extractedAt: string;
  completeness: number;
}

export interface StatusMessage {
  type: 'error' | 'success';
  text: string;
}

export type SortByOption = 'confidence' | 'completeness' | 'recent' | 'price';
