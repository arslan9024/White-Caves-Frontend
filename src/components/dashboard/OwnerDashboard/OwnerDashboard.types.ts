/**
 * Owner Dashboard — Types Layer (Mary Allen Wilkes Architecture)
 * Strict typing for property units, occupancy metrics, and lease records
 */

export interface OwnerMetrics {
  totalProperties: number;
  occupiedUnits: number;
  occupancyRate: string;
  totalMonthlyRent: string;
  totalExpenses: string;
  netIncome: string;
  yearlyROI: string;
}

export interface OwnerPropertyItem {
  id: number;
  name: string;
  type: string;
  location: string;
  units: number;
  occupied: number;
  monthlyRent: string;
  annualRent: string;
  tenant: string;
  leaseExpiry: string;
  status: 'occupied' | 'vacant' | 'maintenance';
  image: string;
}

export interface OwnerDashboardProps {
  user?: unknown;
}

