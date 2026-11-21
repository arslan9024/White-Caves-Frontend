export type LeasingLeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'VIEWING_SCHEDULED'
  | 'VIEWING_COMPLETED'
  | 'OFFER_MADE'
  | 'CONTRACT_DRAFTED'
  | 'CLOSED_WON'
  | 'CLOSED_LOST';

export interface LeasingPipelineLead {
  id: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail?: string;
  propertyId: string;
  propertyTitle?: string;
  community?: string;
  subCommunity?: string;
  annualRentAed?: number;
  chequesCount?: number;
  assignedAgentId?: string;
  source: 'WEB_INQUIRY' | 'WHATSAPP_LINDA' | 'MOBILE_FIELD' | 'PORTAL' | string;
  status: LeasingLeadStatus;
  notes?: string;
  createdAt?: string;
}

export interface LeasingViewingRecord {
  id: string;
  leadId: string;
  propertyId: string;
  propertyTitle?: string;
  community?: string;
  subCommunity?: string;
  tenantName?: string;
  tenantPhone?: string;
  scheduledAt: string;
  status: 'REQUESTED' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'NO_SHOW';
  feedback?: string;
}

export interface ClosedTenancyContract {
  id: string;
  contractNumber: string;
  ejariNumber: string;
  propertyId: string;
  propertyTitle: string;
  community: string;
  tenantName: string;
  annualRentAed: number;
  chequesCount: number;
  startDate: string;
  endDate: string;
  status: string;
  chequesSchedule: Array<{
    installment: number;
    chequeNumber: string;
    amountAed: number;
    dueDate: string;
    status: string;
  }>;
  documents: string[];
}

export const LEASING_PIPELINE_STAGES: Array<{
  status: LeasingLeadStatus;
  label: string;
  accent: string;
}> = [
  { status: 'NEW', label: 'New Inquiries', accent: '#EF4444' },
  { status: 'CONTACTED', label: 'Contacted', accent: '#3B82F6' },
  { status: 'VIEWING_SCHEDULED', label: 'Viewing Scheduled', accent: '#F59E0B' },
  { status: 'VIEWING_COMPLETED', label: 'Viewing Completed', accent: '#8B5CF6' },
  { status: 'OFFER_MADE', label: 'Offer Made', accent: '#EC4899' },
  { status: 'CONTRACT_DRAFTED', label: 'Contract Drafted', accent: '#14B8A6' },
  { status: 'CLOSED_WON', label: 'Closed Won (Leased)', accent: '#10B981' },
];
