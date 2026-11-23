import type { SnagItem, HandoverChecklistState } from './types';

export const INITIAL_SNAGS: SnagItem[] = [
  {
    id: 'SNG-101',
    room: 'Master Bathroom',
    item: 'Marble countertop sealant hairline crack',
    priority: 'MEDIUM',
    contractor: 'Emaar Facilities',
    status: 'PENDING_FIX',
  },
  {
    id: 'SNG-102',
    room: 'Kitchen',
    item: 'Dishwasher electrical socket loose fit',
    priority: 'HIGH',
    contractor: 'Al Futtaim MEP',
    status: 'IN_PROGRESS',
  },
  {
    id: 'SNG-103',
    room: 'Living Area',
    item: 'Floor-to-ceiling glass sliding door friction',
    priority: 'LOW',
    contractor: 'Schüco Tech',
    status: 'RECTIFIED',
  },
];

export const INITIAL_CHECKLIST: HandoverChecklistState = {
  dewaTransferred: true,
  empowerChilledWaterRegistered: true,
  accessCardsHandedOver: true,
  parkingRemoteVerified: true,
  snaggingReportSigned: true,
  ejariCertificateDelivered: true,
};

export const VESTA_TAB_CONFIG = [
  { id: 'snagging' as const, label: '3.23.1 Digital Snagging Inspector' },
  { id: 'checklist' as const, label: '3.23.2 Move-In Handover Checklist' },
  { id: 'certificate' as const, label: '3.23.3 Key Handover Certificate' },
  { id: 'contractor' as const, label: '3.23.4 Contractor Rectification SLA' },
];
