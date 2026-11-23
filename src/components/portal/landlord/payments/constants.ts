import type { ApiLease, ApiPdc } from './types';

export const FALLBACK_LEASES: ApiLease[] = [
  {
    id: 'pay-001',
    propertyId: 'prop-1',
    tenantId: 'tenant-1',
    monthlyRent: 8000,
    depositAmount: 16000,
    startDate: '2025-01-01T00:00:00.000Z',
    endDate: '2025-12-31T00:00:00.000Z',
    status: 'paid',
    nextPaymentDue: null,
    tenant: { id: 'tenant-1', name: 'Ahmed Al-Rashid', email: 'ahmed.rashid@email.ae' },
    property: { id: 'prop-1', title: 'Marina View 2BR Apartment', location: 'Dubai Marina' },
  },
  {
    id: 'pay-002',
    propertyId: 'prop-2',
    tenantId: 'tenant-2',
    monthlyRent: 6500,
    depositAmount: 13000,
    startDate: '2025-02-01T00:00:00.000Z',
    endDate: '2026-01-31T00:00:00.000Z',
    status: 'pending',
    nextPaymentDue: '2099-07-01T00:00:00.000Z',
    tenant: { id: 'tenant-2', name: 'Sarah Johnson', email: 'sarah.j@email.ae' },
    property: { id: 'prop-2', title: 'Downtown Studio', location: 'Downtown Dubai' },
  },
  {
    id: 'pay-003',
    propertyId: 'prop-3',
    tenantId: 'tenant-3',
    monthlyRent: 12000,
    depositAmount: 24000,
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-12-31T00:00:00.000Z',
    status: 'overdue',
    nextPaymentDue: '2020-01-01T00:00:00.000Z',
    tenant: { id: 'tenant-3', name: 'Fatima Al-Mansoori', email: 'fatima.m@email.ae' },
    property: { id: 'prop-3', title: 'JBR 3BR Villa', location: 'JBR' },
  },
  {
    id: 'pay-004',
    propertyId: 'prop-1',
    tenantId: 'tenant-4',
    monthlyRent: 6000,
    depositAmount: 12000,
    startDate: '2025-03-01T00:00:00.000Z',
    endDate: '2026-02-28T00:00:00.000Z',
    status: 'pending',
    nextPaymentDue: '2099-08-01T00:00:00.000Z',
    tenant: { id: 'tenant-4', name: 'Mohammed Hassan', email: 'm.hassan@email.ae' },
    property: { id: 'prop-1', title: 'Marina View 2BR Apartment', location: 'Dubai Marina' },
  },
];

export const FALLBACK_PDC_BY_LEASE_ID: Record<string, ApiPdc[]> = {
  'pay-001': [
    {
      id: 'pdc-001',
      chequeNumber: '1001',
      amount: 8000,
      dueDate: '2026-02-01T00:00:00.000Z',
      status: 'cleared',
    },
  ],
  'pay-002': [
    {
      id: 'pdc-002',
      chequeNumber: '2001',
      amount: 6500,
      dueDate: '2099-07-01T00:00:00.000Z',
      status: 'pending',
    },
  ],
  'pay-003': [
    {
      id: 'pdc-003',
      chequeNumber: '3001',
      amount: 12000,
      dueDate: '2020-01-01T00:00:00.000Z',
      status: 'overdue',
    },
  ],
  'pay-004': [
    {
      id: 'pdc-004',
      chequeNumber: '4001',
      amount: 6000,
      dueDate: '2099-08-01T00:00:00.000Z',
      status: 'pending',
    },
  ],
};
