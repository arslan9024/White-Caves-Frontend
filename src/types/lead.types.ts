/**
 * White Caves CRM - Lead & CRM Pipeline Types
 */

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  VIEWING = 'viewing',
  OFFERED = 'offered',
  WON = 'won',
  LOST = 'lost',
}

export enum LeadSource {
  WHATSAPP = 'whatsapp',
  WEBSITE = 'website',
  PHONE = 'phone',
  REFERRAL = 'referral',
  MARKETING = 'marketing',
  DIRECT = 'direct',
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  status: LeadStatus;
  score: number; // 0-100, 90+ = hot
  source: LeadSource;
  assignedAgent?: string;
  budget?: {
    min: number;
    max: number;
    currency: 'AED' | 'USD' | 'EUR';
  };
  propertyType?: string;
  location?: string;
  timeline?: 'urgent' | '1-3-months' | '3-6-months' | 'future';
  notes?: string;
  lastActivity?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  leadId: string;
  type: 'call' | 'email' | 'sms' | 'whatsapp' | 'visit' | 'note';
  description: string;
  outcome?: string;
  duration?: number; // minutes
  timestamp: Date;
  agentId: string;
}

export interface LeadPipelineData {
  newLeads: number;
  contacted: number;
  qualified: number;
  viewing: number;
  offered: number;
  conversionRate: number; // %
  avgTimeToConversion: number; // days
}

export interface LeadsState {
  items: Lead[];
  currentLead: Lead | null;
  loading: boolean;
  error: string | null;
  filters: {
    status?: LeadStatus;
    source?: LeadSource;
    minScore?: number;
  };
  pagination: {
    currentPage: number;
    pageSize: number;
    total: number;
  };
}

