/**
 * Owner Information Card — Types Layer (Mary Allen Wilkes Architecture)
 * Single-purpose type definitions strictly < 350 lines
 */

export interface OwnerData {
  id?: string;
  name?: string;
  nationality?: string;
  country?: string;
  emails?: string[];
  phones?: string[];
  notes?: string;
  isVerified?: boolean;
}

export interface OwnerFormData {
  name: string;
  nationality: string;
  country: string;
  emails: string[];
  phones: string[];
  notes: string;
}

export interface OwnerInformationCardProps {
  owner?: OwnerData | null;
  onUpdate?: (formData: OwnerFormData) => Promise<void> | void;
}

export const COUNTRIES = [
  'UAE',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'India',
  'Pakistan',
  'Philippines',
  'Other',
];
