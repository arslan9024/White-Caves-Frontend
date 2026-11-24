/**
 * Transaction Management Types, Constants & Business Rules
 */

export interface Transaction {
  id: string | number;
  type?: string;
  status?: string;
  amount?: number;
  property_id?: string | number;
  property_title?: string;
  client_name?: string;
  agent_name?: string;
  closing_date?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  commission?: number;
  rera_status?: string;
  [key: string]: unknown;
}

export interface TransactionFormData {
  type: string;
  status: string;
  amount: string;
  property_title: string;
  client_name: string;
  agent_name: string;
  closing_date: string;
  notes: string;
}

export type TransactionBadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; badgeVariant: TransactionBadgeVariant }
> = {
  draft: { label: 'Draft', color: '#6B7280', badgeVariant: 'secondary' },
  pending: { label: 'Pending', color: '#F59E0B', badgeVariant: 'warning' },
  in_progress: { label: 'In Progress', color: '#3B82F6', badgeVariant: 'info' },
  completed: { label: 'Completed', color: '#10B981', badgeVariant: 'success' },
  cancelled: { label: 'Cancelled', color: '#EF4444', badgeVariant: 'error' },
};

export const TYPE_LABELS: Record<string, string> = {
  sale: '🏠 Sale',
  rental: '🔑 Rental',
  lease: '📋 Lease',
};

export const PIPELINE_STAGES = ['draft', 'pending', 'in_progress', 'completed'];

export const ITEMS_PER_PAGE = 10;

export const EMPTY_FORM: TransactionFormData = {
  type: 'sale',
  status: 'draft',
  amount: '',
  property_title: '',
  client_name: '',
  agent_name: '',
  closing_date: '',
  notes: '',
};

export const calculateCommission = (amount: number) => {
  const totalCommission = amount * 0.02; // 2% standard Dubai fee
  return {
    total: totalCommission,
    agencySplit: totalCommission * 0.5,
    agentSplit: totalCommission * 0.5,
  };
};

export const validateStateTransition = (current: string, next: string): boolean => {
  if (current === next) return true;
  if (next === 'cancelled') return true;

  const order = ['draft', 'pending', 'in_progress', 'completed'];
  const currentIndex = order.indexOf(current);
  const nextIndex = order.indexOf(next);

  if (nextIndex > currentIndex + 1) return false;
  return true;
};

export const validateKYC = (formData: TransactionFormData): boolean => {
  return formData.client_name.trim() !== '' && formData.property_title.trim() !== '';
};
