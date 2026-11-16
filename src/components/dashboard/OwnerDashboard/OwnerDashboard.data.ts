/**
 * Owner Dashboard — Data Layer (Mary Allen Wilkes Architecture)
 * Portfolio property listings and initial metrics
 */

import type { OwnerMetrics, OwnerPropertyItem } from './OwnerDashboard.types';

export const OWNER_METRICS: OwnerMetrics = {
  totalProperties: 12,
  occupiedUnits: 10,
  occupancyRate: '83%',
  totalMonthlyRent: 'AED 285,000',
  totalExpenses: 'AED 48,500',
  netIncome: 'AED 236,500',
  yearlyROI: '12.5%',
};

export const OWNER_PROPERTIES: OwnerPropertyItem[] = [
  {
    id: 1,
    name: 'Damac Hills 2 - Villa 2456',
    type: 'Villa',
    location: 'Dubai Hills Estate',
    units: 1,
    occupied: 1,
    monthlyRent: 'AED 85,000',
    annualRent: 'AED 1,020,000',
    tenant: 'Ahmed Hassan',
    leaseExpiry: '2025-06-15',
    status: 'occupied',
    image: '🏠',
  },
  {
    id: 2,
    name: 'Damac Hills 2 - Apartment 5678',
    type: 'Apartment',
    location: 'Dubai Hills Estate',
    units: 2,
    occupied: 2,
    monthlyRent: 'AED 95,000',
    annualRent: 'AED 1,140,000',
    tenant: 'Fatima Al-Mansouri, Sarah Williams',
    leaseExpiry: '2024-12-31',
    status: 'occupied',
    image: '🏢',
  },
  {
    id: 3,
    name: 'Downtown Dubai - Studio Apt',
    type: 'Studio',
    location: 'Downtown Dubai',
    units: 1,
    occupied: 0,
    monthlyRent: 'AED 45,000',
    annualRent: 'AED 540,000',
    tenant: 'Vacant',
    leaseExpiry: '—',
    status: 'vacant',
    image: '🏙️',
  },
];

