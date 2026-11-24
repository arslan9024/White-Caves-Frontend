// Full leasing data with PDC, renewals, pipeline stages

export type LeaseStatus = 'active' | 'expiring_soon' | 'renewal_pending' | 'expired' | 'terminated';
export type MaintenancePriority = 'critical' | 'high' | 'medium' | 'low';
export type MaintenanceStatus = 'pending' | 'in_progress' | 'scheduled' | 'completed' | 'cancelled';
export type PDCStatus = 'pending' | 'presented' | 'cleared' | 'bounced';
export type InquiryStatus =
  | 'new'
  | 'viewing_scheduled'
  | 'offer_made'
  | 'documents_pending'
  | 'approved'
  | 'rejected';
export type LeasingStage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const LEASING_STAGE_LABELS: Record<LeasingStage, string> = {
  1: 'Lead Acquisition',
  2: 'Tenant Matching',
  3: 'Property Viewing',
  4: 'Offer Made',
  5: 'Offer Decision',
  6: 'Deposit Paid',
  7: 'Contract Signed',
  8: 'Key Handover',
  9: 'Rent Collection',
  10: 'P&L Close',
};

export interface ActiveLease {
  id: number;
  unit: string;
  building: string;
  tenant: string;
  tenantPhone: string;
  tenantEmail: string;
  rent: number;
  annualRent: number;
  startDate: string;
  endDate: string;
  status: LeaseStatus;
  daysRemaining: number;
  ejariNumber: string | null;
  ejariStatus: 'registered' | 'pending' | 'expired' | null;
  pdcCount: number;
  pdcCleared: number;
  pdcBounced: number;
  agentCommissionPct: number;
  keyHandedOver: boolean;
  renewalNotice: boolean;
}

export interface PDCCheque {
  id: number;
  leaseId: number;
  chequeNumber: string;
  bankName: string;
  amount: number;
  dueDate: string;
  status: PDCStatus;
  tenantName: string;
  unit: string;
  presentedDate: string | null;
  clearedDate: string | null;
  notes: string | null;
}

export interface MaintenanceRequest {
  id: number;
  unit: string;
  building: string;
  tenant: string;
  issue: string;
  category: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  created: string;
  scheduledDate: string | null;
  completedDate: string | null;
  estimatedCost: number | null;
  actualCost: number | null;
  assignedTo: string | null;
}

export interface RentalInquiry {
  id: number;
  name: string;
  nationality: string;
  phone: string;
  email: string;
  property: string;
  bedrooms: string;
  budget: string;
  moveInDate: string;
  status: InquiryStatus;
  leasingStage: LeasingStage;
  date: string;
  notes: string;
  source: string;
}

export interface RenewalRecord {
  id: number;
  leaseId: number;
  unit: string;
  property?: string;
  tenant: string;
  tenantName?: string;
  landlordName?: string;
  currentRent: number;
  proposedRent: number;
  renewalDate: string;
  noticeSent: boolean;
  tenantResponse: 'pending' | 'accepted' | 'negotiating' | 'rejected';
  daysUntilExpiry: number;
}

export { PDC_CHEQUES, RENEWAL_RECORDS } from './leasingExtended';

export const ACTIVE_LEASES: ActiveLease[] = [
  {
    id: 1,
    unit: 'Apt 1205',
    building: 'Marina Views Tower A',
    tenant: 'Ahmed Al Rashid',
    tenantPhone: '+971 50 123 4567',
    tenantEmail: 'ahmed@example.ae',
    rent: 10000,
    annualRent: 120000,
    startDate: '2025-01-15',
    endDate: '2026-01-14',
    status: 'active',
    daysRemaining: 245,
    ejariNumber: 'EJARI-2025-001234',
    ejariStatus: 'registered',
    pdcCount: 12,
    pdcCleared: 8,
    pdcBounced: 0,
    agentCommissionPct: 5,
    keyHandedOver: true,
    renewalNotice: false,
  },
  {
    id: 2,
    unit: 'Villa 48',
    building: 'The Springs Phase 3',
    tenant: 'Sarah Johnson',
    tenantPhone: '+971 52 234 5678',
    tenantEmail: 'sarah@example.com',
    rent: 15000,
    annualRent: 180000,
    startDate: '2024-06-01',
    endDate: '2026-05-31',
    status: 'expiring_soon',
    daysRemaining: 30,
    ejariNumber: 'EJARI-2024-005678',
    ejariStatus: 'registered',
    pdcCount: 4,
    pdcCleared: 3,
    pdcBounced: 0,
    agentCommissionPct: 5,
    keyHandedOver: true,
    renewalNotice: true,
  },
  {
    id: 3,
    unit: 'TH-12',
    building: 'JVC Townhouses',
    tenant: 'Mohammed Khan',
    tenantPhone: '+971 55 345 6789',
    tenantEmail: 'mkhan@example.com',
    rent: 8000,
    annualRent: 96000,
    startDate: '2025-03-01',
    endDate: '2026-02-28',
    status: 'active',
    daysRemaining: 310,
    ejariNumber: 'EJARI-2025-009876',
    ejariStatus: 'registered',
    pdcCount: 12,
    pdcCleared: 5,
    pdcBounced: 0,
    agentCommissionPct: 5,
    keyHandedOver: true,
    renewalNotice: false,
  },
  {
    id: 4,
    unit: 'PH-501',
    building: 'Downtown Burj Views',
    tenant: 'Maria Santos',
    tenantPhone: '+971 50 456 7890',
    tenantEmail: 'maria@example.com',
    rent: 29167,
    annualRent: 350000,
    startDate: '2025-02-15',
    endDate: '2026-02-14',
    status: 'active',
    daysRemaining: 280,
    ejariNumber: 'EJARI-2025-012345',
    ejariStatus: 'registered',
    pdcCount: 12,
    pdcCleared: 6,
    pdcBounced: 0,
    agentCommissionPct: 4,
    keyHandedOver: true,
    renewalNotice: false,
  },
  {
    id: 5,
    unit: 'Studio 302',
    building: 'Discovery Gardens Block E',
    tenant: 'James Wilson',
    tenantPhone: '+971 56 567 8901',
    tenantEmail: 'james@example.co.uk',
    rent: 3750,
    annualRent: 45000,
    startDate: '2024-08-01',
    endDate: '2026-07-31',
    status: 'renewal_pending',
    daysRemaining: 15,
    ejariNumber: null,
    ejariStatus: 'pending',
    pdcCount: 4,
    pdcCleared: 3,
    pdcBounced: 1,
    agentCommissionPct: 5,
    keyHandedOver: true,
    renewalNotice: true,
  },
  {
    id: 6,
    unit: 'Apt 804',
    building: 'DIFC Index Tower',
    tenant: 'Priya Sharma',
    tenantPhone: '+971 54 678 9012',
    tenantEmail: 'priya@example.in',
    rent: 20833,
    annualRent: 250000,
    startDate: '2025-04-01',
    endDate: '2026-03-31',
    status: 'active',
    daysRemaining: 340,
    ejariNumber: 'EJARI-2025-034567',
    ejariStatus: 'registered',
    pdcCount: 12,
    pdcCleared: 4,
    pdcBounced: 0,
    agentCommissionPct: 5,
    keyHandedOver: true,
    renewalNotice: false,
  },
  {
    id: 7,
    unit: '2BR-1104',
    building: 'Palm Jumeirah Shoreline',
    tenant: 'Carlos Mendez',
    tenantPhone: '+971 50 789 0123',
    tenantEmail: 'carlos@example.mx',
    rent: 18333,
    annualRent: 220000,
    startDate: '2024-12-01',
    endDate: '2025-11-30',
    status: 'expiring_soon',
    daysRemaining: 45,
    ejariNumber: 'EJARI-2024-089012',
    ejariStatus: 'registered',
    pdcCount: 4,
    pdcCleared: 3,
    pdcBounced: 0,
    agentCommissionPct: 5,
    keyHandedOver: true,
    renewalNotice: true,
  },
];

export { MAINTENANCE_REQUESTS, RENTAL_INQUIRIES } from './leasingMaintenanceAndInquiries';
