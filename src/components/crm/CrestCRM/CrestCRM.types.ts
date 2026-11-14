export type CrestTab = 'valuations' | 'comparables' | 'calculator' | 'docs' | 'lifecycle';

export interface PropertyValuation {
  id: number;
  property: string;
  area: string;
  beds: number;
  sqft: number;
  estimate: string;
  range: string;
  confidence: number;
  comparable: number;
  requested: string;
}

export interface ComparableSale {
  address: string;
  sold: string;
  sqft: number;
  psf: number;
  date: string;
}
