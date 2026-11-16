/**
 * Cipher Market CRM — Data Layer (Mary Allen Wilkes Architecture)
 * Default DLD transaction clusters, communities trends, and CMA calculation helpers
 */

import type { DldClusterItem, CommunityTrendItem, CmaValuation } from './CipherMarketCRM.types';

export const INITIAL_DLD_CLUSTER: DldClusterItem[] = [
  {
    ref: 'DLD-TX-88210',
    date: '2026-08-20',
    unit: 'Signature Villa Frond N',
    sqft: 7200,
    priceAed: 32000000,
    rateSqft: 4444,
    type: 'Secondary Sale',
  },
  {
    ref: 'DLD-TX-88204',
    date: '2026-08-19',
    unit: 'Garden Homes Frond C',
    sqft: 5000,
    priceAed: 18500000,
    rateSqft: 3700,
    type: 'Secondary Sale',
  },
  {
    ref: 'DLD-TX-88192',
    date: '2026-08-18',
    unit: 'The Royal Residences',
    sqft: 3400,
    priceAed: 14200000,
    rateSqft: 4176,
    type: 'Off-Plan Oqood',
  },
  {
    ref: 'DLD-TX-88180',
    date: '2026-08-15',
    unit: 'Palm Views East Apt',
    sqft: 1100,
    priceAed: 2400000,
    rateSqft: 2181,
    type: 'Secondary Sale',
  },
];

export const COMMUNITIES_TREND: CommunityTrendItem[] = [
  { name: 'Palm Jumeirah', avgPriceSqft: 'AED 3,450', change12m: '+18.4%', demand: 'ULTRA_HIGH' },
  { name: 'Downtown Dubai', avgPriceSqft: 'AED 2,600', change12m: '+12.1%', demand: 'HIGH' },
  {
    name: 'Dubai Hills Estate',
    avgPriceSqft: 'AED 1,950',
    change12m: '+15.2%',
    demand: 'VERY_HIGH',
  },
  { name: 'Business Bay', avgPriceSqft: 'AED 1,820', change12m: '+9.8%', demand: 'HIGH' },
];

export function computeCmaValuation(community: string, builtUpArea: number): CmaValuation {
  const avgSqftRate =
    community === 'Palm Jumeirah' ? 3450 : community === 'Downtown Dubai' ? 2600 : 1850;
  const estimatedValue = builtUpArea * avgSqftRate;
  const lowerBound = estimatedValue * 0.95;
  const upperBound = estimatedValue * 1.05;
  const suggestedRent = (estimatedValue * 0.065).toFixed(0);

  return {
    sqftRate: avgSqftRate,
    estimatedValue,
    lowerBound,
    upperBound,
    suggestedRent,
    confidenceScore: 94,
  };
}

