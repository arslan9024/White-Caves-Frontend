export interface Lead {
  id: string | number;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  status?: string;
  source?: string;
  score?: number | null;
  budget?: number;
  value?: number;
  assigned_to?: string;
  agent_id?: string | number;
  notes?: string;
  created_at?: string;
  last_activity?: string;
  [key: string]: unknown;
}

export interface LeadFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  budget: string;
  notes: string;
}

export type LeadBadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
