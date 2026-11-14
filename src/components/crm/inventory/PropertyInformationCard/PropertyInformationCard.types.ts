export interface PropertyData {
  type?: string;
  area?: string;
  beds?: number;
  baths?: number;
  price?: string | number;
  furnishing?: string;
  features?: string[];
  description?: string;
}

export interface PropertyInformationCardProps {
  property?: PropertyData | null;
  onUpdate?: (updatedData: PropertyData) => Promise<void> | void;
}

export type PropertyFormErrors = Record<string, string>;
