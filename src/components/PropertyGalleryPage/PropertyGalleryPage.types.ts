export interface PropertyDocument {
  name?: string;
  url: string;
}

export interface PropertyDetails {
  _id?: string;
  id?: string;
  title: string;
  price?: number | string;
  area?: string;
  location?: string;
  description?: string;
  beds?: number | string;
  bedrooms?: number | string;
  baths?: number | string;
  bathrooms?: number | string;
  sqft?: number;
  area_sqft?: number;
  image?: string;
  images?: string[];
  gallery?: string[];
  amenities?: string[];
  documents?: PropertyDocument[];
}

export interface StatusMessage {
  type: 'error' | 'success';
  text: string;
}

export type GalleryTabType = 'gallery' | 'details' | 'documents';

