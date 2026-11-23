import { Bot, Calculator, Crown, Key, Palette, Settings, Shield, TrendingUp } from 'lucide-react';
import type { ServiceCategory, ServiceTierKey } from './servicesCatalogTypes';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'luxury-property-transactions',
    name: 'Luxury Property Transactions',
    code: 'LPT',
    count: 5,
    color: '#D4AF37',
    icon: Crown,
  },
  {
    id: 'premium-leasing-services',
    name: 'Premium Leasing Services',
    code: 'PLS',
    count: 5,
    color: '#3B82F6',
    icon: Key,
  },
  {
    id: 'property-portfolio-management',
    name: 'Property & Portfolio Management',
    code: 'PPM',
    count: 5,
    color: '#8B5CF6',
    icon: Settings,
  },
  {
    id: 'investment-advisory',
    name: 'Investment Advisory',
    code: 'IA',
    count: 5,
    color: '#10B981',
    icon: TrendingUp,
  },
  {
    id: 'legal-compliance-services',
    name: 'Legal & Compliance Services',
    code: 'LCS',
    count: 5,
    color: '#EF4444',
    icon: Shield,
  },
  {
    id: 'financial-services',
    name: 'Financial Services',
    code: 'FS',
    count: 5,
    color: '#F59E0B',
    icon: Calculator,
  },
  {
    id: 'value-added-services',
    name: 'Value-Added Services',
    code: 'VAS',
    count: 5,
    color: '#EC4899',
    icon: Palette,
  },
  {
    id: 'technology-services',
    name: 'Technology Services',
    code: 'TS',
    count: 5,
    color: '#0EA5E9',
    icon: Bot,
  },
];

export const TIER_CONFIG: Record<ServiceTierKey, { label: string; color: string; bg: string }> = {
  basic: { label: 'Basic', color: '#6B7280', bg: 'rgba(107, 114, 128, 0.1)' },
  essential: { label: 'Essential', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  premium: { label: 'Premium', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
  ultra: { label: 'Ultra-Premium', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.15)' },
  corporate: { label: 'Corporate', color: '#0A1A3A', bg: 'rgba(10, 26, 58, 0.1)' },
};

export function formatServiceRevenue(value: number): string {
  if (value >= 1000000) return `AED ${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `AED ${(value / 1000).toFixed(0)}K`;
  return `AED ${value}`;
}
