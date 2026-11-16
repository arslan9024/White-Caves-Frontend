export interface ExtractedData {
  ownerName?: string;
  propertyType?: string;
  location?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  price?: number | string;
  features?: string[];
  confidenceScore?: number;
}

export interface Opportunity {
  propertyType?: string;
  location?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  price?: number | string;
  furnishing?: string;
  features?: string[];
  ownerPhone?: string;
  ownerName?: string;
  confidence?: number;
}

export interface QuickAddFormData {
  propertyType: string;
  location: string;
  bedrooms: number | string;
  bathrooms: number | string;
  price: number | string;
  furnishing: string;
  ownerRelationshipType: string;
  features: string[];
  description: string;
  publishImmediately: boolean;
  contactEmail: string;
  contactPhone: string;
  opportunityId?: string;
}

export interface QuickAddPropertyFormProps {
  // Supports both modern and legacy test contract
  opportunity?: Opportunity;
  extractedData?: ExtractedData;
  opportunityId?: string;
  onClose?: () => void;
  onSave?: (data: QuickAddFormData) => void;
  onSuccess?: (data: QuickAddFormData) => void | Promise<void>;
  onCancel?: () => void;
}

