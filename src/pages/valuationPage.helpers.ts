export interface ValuationRecord {
  id: string;
  propertyId: string;
  estimatedValueAed: number;
  rentAnnualAed: number;
  grossYieldPct: number;
  netYieldPct: number;
  confidence: string;
  method: string;
  ageDiscount: number;
  amenityPremium: number;
  priceRangeLow?: number;
  priceRangeHigh?: number;
  overrideReason?: string;
  bankRequestStatus?: string;
  createdAt: string;
}

export const confidenceBadge = (c: string) => {
  const map: Record<string, string> = {
    high: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-red-100 text-red-800',
  };
  return map[c] ?? 'bg-gray-100 text-gray-800';
};

export const methodLabel = (m: string) => {
  const map: Record<string, string> = {
    avm: 'AVM',
    manual_override: 'Manual Override',
    bank: 'Bank Valuation',
  };
  return map[m] ?? m;
};

export const fmt = (n: number) =>
  new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(n);
