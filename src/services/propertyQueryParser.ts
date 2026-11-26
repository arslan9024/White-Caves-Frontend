/**
 * propertyQueryParser.ts — Pure NLP query parsing, price formatting, and lead match scoring
 * Extracted from PropertyQueryService.ts for AEGIS AEG-042 (< 350 lines compliance).
 */

export interface PropertyQueryFilters {
  minRooms?: number;
  maxRooms?: number;
  propertyType?: string;
  area?: string;
  furnishingLevel?: string;
  purpose?: string;
  minPrice?: number;
  maxPrice?: number;
  maxArea?: number;
  tags?: string[];
  viewType?: string;
  marketAvailability?: string;
  limit?: number;
  [key: string]: string | number | string[] | undefined;
}

export interface PropertyRecord {
  _id?: string;
  pNumber?: string;
  area?: string;
  propertyType?: string;
  rooms?: number;
  askingPrice?: number;
  currency?: string;
  actualArea?: number;
  furnishingLevel?: string;
  marketAvailability?: string;
  images?: string[];
  tags?: string[];
  viewType?: string;
  occupancyStatus?: string;
}

export interface LeadPreferenceProfile {
  minBedrooms?: number;
  maxBedrooms?: number;
  minBudget?: number;
  maxBudget?: number;
  preferredAreas?: string[];
  preferredPropertyType?: string;
  purpose?: string;
  preferredFurnishing?: string;
}

const PROPERTY_TYPE_KEYWORDS: Record<string, string[]> = {
  villa: ['villa', 'standalone', 'detached'],
  townhouse: ['townhouse', 'town house', 'terrace'],
  apartment: ['apartment', 'apt', 'flat', 'condo'],
  penthouse: ['penthouse', 'pent house'],
  duplex: ['duplex'],
  plot: ['plot', 'land', 'vacant land'],
};

const KNOWN_DUBAI_AREAS = [
  'arabian ranches',
  'palm jumeirah',
  'downtown dubai',
  'marina',
  'jbr',
  'jlt',
  'difc',
  'creek harbour',
  'emirates living',
  'damac hills',
  'jumeirah golf estates',
  'the oasis',
];

const AMENITY_KEYWORDS = [
  'pool',
  'garden',
  'gym',
  'parking',
  'balcony',
  'laundry',
  'ac',
  'kitchen',
];

export function parsePrice(priceStr: string): number {
  const str = priceStr.toLowerCase().trim();
  const num = parseFloat(str);
  if (str.includes('m')) return num * 1000000;
  if (str.includes('k')) return num * 1000;
  return num;
}

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `AED ${(price / 1000000).toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `AED ${(price / 1000).toFixed(0)}K`;
  }
  return `AED ${price}`;
}

export function parseNaturalLanguageQuery(queryText: string): PropertyQueryFilters {
  const query = queryText.toLowerCase();
  const filters: PropertyQueryFilters = {};

  const roomMatch = query.match(/(\d)[\s-]?br(?:edroom)?|studio/i);
  if (roomMatch) {
    if (roomMatch[0].toLowerCase().includes('studio')) {
      filters.minRooms = 0;
      filters.maxRooms = 1;
    } else {
      const rooms = parseInt(roomMatch[1], 10);
      filters.minRooms = rooms;
      filters.maxRooms = rooms;
    }
  }

  for (const [type, keywords] of Object.entries(PROPERTY_TYPE_KEYWORDS)) {
    if (keywords.some(kw => query.includes(kw))) {
      filters.propertyType = type;
      break;
    }
  }

  for (const area of KNOWN_DUBAI_AREAS) {
    if (query.includes(area)) {
      filters.area = area;
      break;
    }
  }

  if (query.includes('furnished') || query.includes('fully furnished')) {
    filters.furnishingLevel = 'furnished';
  } else if (query.includes('semi-furnished') || query.includes('semi furnished')) {
    filters.furnishingLevel = 'semi_furnished';
  } else if (query.includes('unfurnished')) {
    filters.furnishingLevel = 'unfurnished';
  }

  if (query.includes(' for rent') || query.includes(' for lease') || query.includes('rental')) {
    filters.purpose = 'rent';
  } else if (query.includes(' for sale') || query.includes(' for buy')) {
    filters.purpose = 'sale';
  }

  const priceMatch = query.match(
    /(?:under|below|max)\s+(?:aed\s+)?(\d+(?:\.\d+)?)\s*[mk](?:illions?)?|(\d+(?:\.\d+)?)\s*[km]\s+(?:to|until)\s+(?:aed\s+)?(\d+(?:\.\d+)?)\s*[mk]/i
  );

  if (priceMatch) {
    let maxPrice = 0;
    if (priceMatch[1]) {
      maxPrice = parsePrice(
        priceMatch[1] + (priceMatch[0].toLowerCase().includes('m') ? 'M' : 'K')
      );
    } else if (priceMatch[3]) {
      maxPrice = parsePrice(
        priceMatch[3] + (priceMatch[0].toLowerCase().includes('m') ? 'M' : 'K')
      );
    }
    if (maxPrice > 0) filters.maxPrice = maxPrice;
  }

  const areaMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:sq\.?ft|sqft|sq\.?m|sqm)/i);
  if (areaMatch) {
    filters.maxArea = parseInt(areaMatch[1], 10);
  }

  filters.tags = AMENITY_KEYWORDS.filter(amenity => query.includes(amenity));

  if (query.includes('sea view') || query.includes('ocean view')) {
    filters.viewType = 'sea';
  } else if (query.includes('golf view')) {
    filters.viewType = 'golf';
  } else if (query.includes('marina view')) {
    filters.viewType = 'marina';
  }

  if (query.includes('available')) {
    filters.marketAvailability = 'available_for_both';
  }

  return filters;
}

export function generatePropertyDescription(property: PropertyRecord): string {
  const parts: string[] = [];

  parts.push(`${property.rooms}BR ${property.propertyType}`);
  if (property.area) parts.push(`in ${property.area}`);
  if (property.actualArea) parts.push(`(${property.actualArea} sqft)`);
  if (property.askingPrice) parts.push(`• ${formatPrice(property.askingPrice)}`);
  if (property.viewType) parts.push(`with ${property.viewType} view`);
  if (property.furnishingLevel) parts.push(`${property.furnishingLevel.replace('_', ' ')}`);
  if (property.occupancyStatus === 'vacant') parts.push('| Vacant - Ready');

  return parts.join(' ');
}

export function calculateMatchScore(
  lead: LeadPreferenceProfile,
  properties: PropertyRecord[]
): number {
  if (properties.length === 0) return 0;

  let totalScore = 0;
  properties.forEach(prop => {
    let score = 0;
    const rooms = prop.rooms ?? 0;
    const price = prop.askingPrice ?? 0;

    if (lead.minBedrooms && rooms >= lead.minBedrooms) score += 25;
    if (lead.maxBedrooms && rooms <= lead.maxBedrooms) score += 25;
    if (lead.maxBudget && price <= lead.maxBudget) score += 25;
    if (lead.minBudget && price >= lead.minBudget) score += 25;
    if (prop.area && lead.preferredAreas?.includes(prop.area)) score += 15;
    if (lead.preferredPropertyType === prop.propertyType) score += 10;

    totalScore += score;
  });

  return Math.round(totalScore / properties.length);
}
