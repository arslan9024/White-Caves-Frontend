/**
 * Cipher Market CRM — Types Layer (Mary Allen Wilkes Architecture)
 * Single-purpose type definitions strictly < 350 lines
 */

export type CipherTab = 'cma' | 'dld' | 'trends' | 'forecast';

export interface CipherMarketCRMProps {
  moduleId?: string;
  role?: string;
  user?: unknown;
}

export interface CmaValuation {
  sqftRate: number;
  estimatedValue: number;
  lowerBound: number;
  upperBound: number;
  suggestedRent: string;
  confidenceScore: number;
}

export interface DldClusterItem {
  ref: string;
  date: string;
  unit: string;
  sqft: number;
  priceAed: number;
  rateSqft: number;
  type: string;
}

export interface CommunityTrendItem {
  name: string;
  avgPriceSqft: string;
  change12m: string;
  demand: string;
}

