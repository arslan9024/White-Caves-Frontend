/**
 * Properties Portfolio — Strongly-Typed Mock Catalogue
 * Auto-generated from properties_portfolio.json
 */

export type PropertyStatus = 'Active' | 'Sold' | 'Reserved' | 'Pending' | string;

export interface PortfolioProperty {
  id: string;
  title: string;
  priceAED: number;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  community: string;
  status: PropertyStatus;
  featured: boolean;
}


