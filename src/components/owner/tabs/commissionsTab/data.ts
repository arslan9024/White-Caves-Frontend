import type { Commission, CommissionSummary } from './types';

export const formatAED = (amount: number): string =>
  new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-AE', { day: '2-digit', month: 'short', year: 'numeric' });

export const MOCK_COMMISSIONS: Commission[] = [
  {
    _id: '1',
    propertyTitle: 'Luxury Villa - Palm Jumeirah',
    agentName: 'Ahmed Ali',
    clientName: 'Mohammed Al Rashid',
    transactionValue: 8500000,
    commissionRate: 2,
    commissionAmount: 170000,
    status: 'approved',
    propertyType: 'Villa',
    createdAt: '2026-03-15T10:00:00Z',
  },
  {
    _id: '2',
    propertyTitle: 'Studio Apartment - Downtown Dubai',
    agentName: 'Sara Khan',
    clientName: 'Emily Johnson',
    transactionValue: 1200000,
    commissionRate: 2.5,
    commissionAmount: 30000,
    status: 'paid',
    propertyType: 'Apartment',
    createdAt: '2026-03-10T09:30:00Z',
    paidAt: '2026-03-20T12:00:00Z',
  },
  {
    _id: '3',
    propertyTitle: 'Penthouse - Dubai Marina',
    agentName: 'Fatima Ahmed',
    clientName: 'David Chen',
    transactionValue: 15000000,
    commissionRate: 1.5,
    commissionAmount: 225000,
    status: 'pending',
    propertyType: 'Penthouse',
    createdAt: '2026-04-01T14:00:00Z',
  },
];

export const MOCK_SUMMARY: CommissionSummary = {
  totalCommissions: 3,
  totalAmount: 425000,
  pendingAmount: 225000,
  paidAmount: 30000,
  approvedAmount: 170000,
  averageCommissionRate: 2.0,
  topAgent: { name: 'Fatima Ahmed', totalCommission: 225000 },
};
