import type { PortfolioProperty, PropertyStatus } from './properties_portfolio.types';
import { PROPERTIES_PART_1 } from './properties_portfolio.part1';
import { PROPERTIES_PART_2 } from './properties_portfolio.part2';
import { PROPERTIES_PART_3 } from './properties_portfolio.part3';
import { PROPERTIES_PART_4 } from './properties_portfolio.part4';

export const PROPERTIES_PORTFOLIO: PortfolioProperty[] = [
  ...PROPERTIES_PART_1,
  ...PROPERTIES_PART_2,
  ...PROPERTIES_PART_3,
  ...PROPERTIES_PART_4,
];

export const getPortfolioPropertyById = (id: string): PortfolioProperty | undefined =>
  PROPERTIES_PORTFOLIO.find(p => p.id === id);

export const getFeaturedProperties = (): PortfolioProperty[] =>
  PROPERTIES_PORTFOLIO.filter(p => p.featured);

export const getPropertiesByStatus = (status: PropertyStatus): PortfolioProperty[] =>
  PROPERTIES_PORTFOLIO.filter(p => p.status === status);

export const getPropertiesByCommunity = (community: string): PortfolioProperty[] =>
  PROPERTIES_PORTFOLIO.filter(p => p.community.toLowerCase().includes(community.toLowerCase()));

export default PROPERTIES_PORTFOLIO;

