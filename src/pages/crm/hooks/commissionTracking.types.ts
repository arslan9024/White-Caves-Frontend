export interface Commission {
  id: string | number;
  agent_name?: string;
  agent_id?: string | number;
  amount?: number;
  percentage?: number;
  type?: string;
  status?: string;
  property_id?: string | number;
  property_title?: string;
  transaction_id?: string | number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface CommissionFormData {
  agent_name: string;
  amount: string;
  percentage: string;
  type: string;
  status: string;
  property_title: string;
  notes: string;
}

export type CommissionBadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; badgeVariant: CommissionBadgeVariant }
> = {
  pending: { label: 'Pending', color: '#F59E0B', badgeVariant: 'warning' },
  approved: { label: 'Approved', color: '#3B82F6', badgeVariant: 'info' },
  paid: { label: 'Paid', color: '#10B981', badgeVariant: 'success' },
  cancelled: { label: 'Cancelled', color: '#6B7280', badgeVariant: 'secondary' },
};

export const TYPE_LABELS: Record<string, string> = {
  sale: '🏠 Sale',
  rental: '🔑 Rental',
  referral: '🤝 Referral',
};

export const ITEMS_PER_PAGE = 10;

export const EMPTY_FORM: CommissionFormData = {
  agent_name: '',
  amount: '',
  percentage: '',
  type: 'sale',
  status: 'pending',
  property_title: '',
  notes: '',
};
