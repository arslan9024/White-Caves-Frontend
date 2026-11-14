export interface MapProperty {
  id: string;
  title: string;
  location: string;
  type: string;
  purpose: 'buy' | 'rent';
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  featured: boolean;
}

export interface DubaiMapProps {
  properties: MapProperty[];
  activePropertyId?: string | null;
  onPropertyClick?: (property: MapProperty) => void;
  onViewportChange?: (bounds: { north: number; south: number; east: number; west: number }) => void;
  defaultCenter?: [number, number];
  defaultZoom?: number;
  showCommunities?: boolean;
  height?: string;
  className?: string;
}
