import { PropertyValuation, ComparableSale } from './CrestCRM.types';

export const VALUATIONS: PropertyValuation[] = [
  {
    id: 1,
    property: 'Palm Jumeirah Villa G-12',
    area: 'Palm Jumeirah',
    beds: 5,
    sqft: 8200,
    estimate: 'AED 14.8M',
    range: 'AED 14.1M – 15.5M',
    confidence: 91,
    comparable: 4,
    requested: '1h ago',
  },
  {
    id: 2,
    property: 'Marina Gate 2BR #2204',
    area: 'Dubai Marina',
    beds: 2,
    sqft: 1320,
    estimate: 'AED 1.92M',
    range: 'AED 1.78M – 2.06M',
    confidence: 88,
    comparable: 7,
    requested: '3h ago',
  },
  {
    id: 3,
    property: 'Emirates Hills Sector E',
    area: 'Emirates Hills',
    beds: 7,
    sqft: 14500,
    estimate: 'AED 28.4M',
    range: 'AED 26M – 31M',
    confidence: 76,
    comparable: 2,
    requested: '1d ago',
  },
  {
    id: 4,
    property: 'JVC Studio Bloom #304',
    area: 'JVC',
    beds: 0,
    sqft: 480,
    estimate: 'AED 582K',
    range: 'AED 540K – 620K',
    confidence: 94,
    comparable: 12,
    requested: '2d ago',
  },
];

export const COMPS: ComparableSale[] = [
  {
    address: 'Palm Jumeirah Frond N, Villa',
    sold: 'AED 13.9M',
    sqft: 7800,
    psf: 1782,
    date: '2 weeks ago',
  },
  {
    address: 'Palm Jumeirah Frond L, Villa',
    sold: 'AED 15.2M',
    sqft: 8600,
    psf: 1767,
    date: '1 month ago',
  },
  {
    address: 'Palm Jumeirah Frond H, Villa',
    sold: 'AED 14.5M',
    sqft: 8100,
    psf: 1790,
    date: '6 weeks ago',
  },
  {
    address: 'Palm Jumeirah Frond G, Villa',
    sold: 'AED 16.1M',
    sqft: 9200,
    psf: 1750,
    date: '2 months ago',
  },
];

export const AREA_RATES: Record<string, number> = {
  'Palm Jumeirah': 4250,
  'Dubai Marina': 1950,
  'Emirates Hills': 2800,
  'Downtown Dubai': 3100,
  'Business Bay': 1600,
  JVC: 850,
};
