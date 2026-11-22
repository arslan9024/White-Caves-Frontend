export interface PriceIndexRow {
  area: string;
  zone: string;
  avgPricePerSqft: number;
  avgAnnualRent: number;
  grossYield: number;
  transactionVol: number;
  daysOnMarket: number;
  source: string;
  dataDate: string | null;
}

export interface IndicatorData {
  avgDaysOnMarket: number;
  absorptionRate: number;
  newListings: number;
  activeListings: number;
  areasIncluded?: number;
  source: string;
  note?: string;
}

export interface ReraRow {
  area: string;
  propertyType: string;
  bedrooms: string;
  avgRentAed: number;
  allowedIncreaseBelow10Pct: string;
  allowedIncrease10to20Pct: string;
  allowedIncrease20to30Pct: string;
  allowedIncrease30to40Pct: string;
  allowedIncreaseAbove40Pct: string;
}

export interface CompetitorPricingRow {
  area: string;
  portal: 'bayut' | 'propertyfinder';
  avgPricePerSqft: number;
  deltaVsWhiteCavesPct: number;
  updatedAt: string;
  source: string;
}

export type Tab = 'price-index' | 'indicators' | 'rera-index' | 'heatmap' | 'competitor-pricing';

export type SortByField = 'avgPricePerSqft' | 'grossYield';

export interface MarketIntelligenceContent {
  title: string;
  subtitle: string;
  tabs: {
    priceIndex: string;
    indicators: string;
    reraIndex: string;
    heatmap: string;
    competitorPricing: string;
  };
  errors: {
    priceIndex: string;
    indicators: string;
    rera: string;
    networkPrice: string;
    networkIndicators: string;
    networkRera: string;
    competitorPricing: string;
    networkCompetitorPricing: string;
  };
  filters: {
    allZones: string;
    premium: string;
    prime: string;
    mid: string;
    affordable: string;
    sortYield: string;
    sortPrice: string;
    areas: string;
    allPortals: string;
    portal: string;
    areaPlaceholder: string;
  };
  table: {
    area: string;
    zone: string;
    priceSqft: string;
    annualRent: string;
    grossYield: string;
    transactions: string;
    type: string;
    beds: string;
    avgRent: string;
    maxIncrease: string;
    competitorPortal: string;
    deltaVsWhiteCaves: string;
    updatedAt: string;
  };
  loading: string;
  indicators: {
    avgDaysOnMarket: string;
    days: string;
    absorptionRate: string;
    absorptionNote: string;
    newListings: string;
    activeListings: string;
    source: string;
    areasIncluded: string;
  };
  rera: {
    notice: string;
    bands: string[];
  };
}
