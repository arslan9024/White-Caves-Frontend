import { PropertyMatch, AlgorithmStep } from './PrismCRM.types';

export const MATCHES: PropertyMatch[] = [
  {
    id: 1,
    lead: 'Ahmad Al Rashidi',
    property: 'Palm Jumeirah Villa G-12',
    matchScore: 97,
    price: 'AED 8.5M',
    beds: 5,
    baths: 6,
    area: 'Palm Jumeirah',
    reasons: ['Budget match', 'Location preference', 'Family size'],
    status: 'Sent',
  },
  {
    id: 2,
    lead: 'Priya Nair',
    property: 'Marina Gate Tower 2 – 2BR',
    matchScore: 91,
    price: 'AED 1.75M',
    beds: 2,
    baths: 2,
    area: 'Dubai Marina',
    reasons: ['Budget match', 'Sea view preference', 'High ROI'],
    status: 'Pending',
  },
  {
    id: 3,
    lead: 'James Whitmore',
    property: 'Emirates Hills Sector E',
    matchScore: 88,
    price: 'AED 18M',
    beds: 7,
    baths: 8,
    area: 'Emirates Hills',
    reasons: ['Privacy', 'Golf view', 'Staff quarters'],
    status: 'Viewed',
  },
  {
    id: 4,
    lead: 'Fatima Al Suwaidi',
    property: 'Downtown Blvd Heights – 3BR',
    matchScore: 82,
    price: 'AED 2.1M',
    beds: 3,
    baths: 3,
    area: 'Downtown',
    reasons: ['Central location', 'Budget within range'],
    status: 'Pending',
  },
  {
    id: 5,
    lead: 'Chen Wei',
    property: 'JVC Bloom Towers Studio',
    matchScore: 74,
    price: 'AED 875K',
    beds: 0,
    baths: 1,
    area: 'JVC',
    reasons: ['Entry price point', 'Investment yield'],
    status: 'Pending',
  },
];

export const AREAS = [
  'All',
  'Palm Jumeirah',
  'Dubai Marina',
  'Emirates Hills',
  'Downtown',
  'JVC',
  'Business Bay',
];

export const ALGORITHM_STEPS: AlgorithmStep[] = [
  {
    step: '1',
    title: 'Lead Profile Extraction',
    desc: 'Parse budget, preferred area, property type, timeline, family size from CRM.',
  },
  {
    step: '2',
    title: 'Inventory Vector Build',
    desc: 'Encode each available listing as a feature vector (price, beds, area, amenities, view).',
  },
  {
    step: '3',
    title: 'Cosine Similarity Scoring',
    desc: 'Compute similarity between lead profile and each property vector (0–100).',
  },
  {
    step: '4',
    title: 'Business Rule Overlay',
    desc: 'Apply filters: within ±15% of budget, must match property type, exclude off-market if not VIP.',
  },
  {
    step: '5',
    title: 'Ranked Shortlist',
    desc: 'Return top 5 matches sorted by score, auto-send to Clara for follow-up workflow.',
  },
];
