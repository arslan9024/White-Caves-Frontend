export type PrismTab = 'matches' | 'algorithm' | 'inventory' | 'docs' | 'lifecycle';

export interface PropertyMatch {
  id: number;
  lead: string;
  property: string;
  matchScore: number;
  price: string;
  beds: number;
  baths: number;
  area: string;
  reasons: string[];
  status: string;
}

export interface AlgorithmStep {
  step: string;
  title: string;
  desc: string;
}

