/**
 * PropertyQueryService
 * Handles intelligent property queries from Linda/Nina.
 * Bridges natural language queries to structured database searches (< 350 lines, AEG-042).
 */

import { getApiUrl } from '../config/constants';
import {
  parseNaturalLanguageQuery,
  parsePrice,
  formatPrice,
  generatePropertyDescription,
  calculateMatchScore,
  type PropertyQueryFilters,
  type PropertyRecord,
  type LeadPreferenceProfile,
} from './propertyQueryParser';

export type { PropertyQueryFilters, PropertyRecord, LeadPreferenceProfile };

interface PropertyQueryApiResponse {
  success?: boolean;
  data?: PropertyRecord[];
  [key: string]: unknown;
}

class PropertyQueryService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = getApiUrl('');
  }

  parseNaturalLanguageQuery(queryText: string): PropertyQueryFilters {
    return parseNaturalLanguageQuery(queryText);
  }

  parsePrice(priceStr: string): number {
    return parsePrice(priceStr);
  }

  formatPrice(price: number): string {
    return formatPrice(price);
  }

  generatePropertyDescription(property: PropertyRecord): string {
    return generatePropertyDescription(property);
  }

  calculateMatchScore(lead: LeadPreferenceProfile, properties: PropertyRecord[]): number {
    return calculateMatchScore(lead, properties);
  }

  async queryProperties(filters: PropertyQueryFilters = {}): Promise<PropertyQueryApiResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(','));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    const response = await fetch(`${this.baseUrl}/inventory/query?${queryParams}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Query failed: ${response.statusText}`);
    }

    return (await response.json()) as PropertyQueryApiResponse;
  }

  async searchPropertiesNaturalLanguage(queryText: string, limit = 5) {
    try {
      const filters = this.parseNaturalLanguageQuery(queryText);
      filters.limit = limit;

      const result = await this.queryProperties(filters);
      const rows = result.data ?? [];

      if (result.success && rows.length > 0) {
        return {
          success: true,
          count: rows.length,
          properties: rows.map(p => ({
            id: p._id,
            pNumber: p.pNumber,
            area: p.area,
            type: p.propertyType,
            rooms: p.rooms,
            price: p.askingPrice,
            currency: p.currency,
            size: p.actualArea,
            furnishing: p.furnishingLevel,
            availability: p.marketAvailability,
            images: p.images,
            features: p.tags,
            description: this.generatePropertyDescription(p),
          })),
          query_filters: filters,
        };
      }

      return {
        success: true,
        count: 0,
        properties: [],
        query_filters: filters,
        message: 'No properties found matching your criteria',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown property query error',
        count: 0,
        properties: [],
      };
    }
  }

  async getPropertyDetails(propertyId: string) {
    const response = await fetch(`${this.baseUrl}/inventory/${propertyId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch property: ${response.statusText}`);
    }

    const data: unknown = await response.json();
    return { success: true, property: data };
  }

  async getInventoryStatistics(): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/inventory/statistics`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch statistics: ${response.statusText}`);
    }

    return await response.json();
  }

  async suggestPropertiesForLead(leadProfile: LeadPreferenceProfile) {
    const filters: PropertyQueryFilters = {
      minRooms: leadProfile.minBedrooms,
      maxRooms: leadProfile.maxBedrooms,
      minPrice: leadProfile.minBudget,
      maxPrice: leadProfile.maxBudget,
      area: leadProfile.preferredAreas?.[0],
      propertyType: leadProfile.preferredPropertyType,
      purpose: leadProfile.purpose,
      furnishingLevel: leadProfile.preferredFurnishing,
      limit: 5,
    };

    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) delete filters[key];
    });

    const result = await this.queryProperties(filters);
    const suggestions = result.data || [];

    return {
      success: true,
      suggestions,
      matchScore: this.calculateMatchScore(leadProfile, suggestions),
    };
  }
}

export default PropertyQueryService;
