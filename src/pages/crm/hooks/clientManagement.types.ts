export interface Client {
  id: string | number;
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  company?: string;
  status?: string;
  tags?: string[];
  notes?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  type: string;
  company: string;
  status: string;
  tags: string;
  notes: string;
}

export type ClientBadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// ─── Constants ──────────────────────────────────────────────────────────

export const TYPE_CONFIG: Record<
  string,
  { label: string; icon: string; badgeVariant: ClientBadgeVariant }
> = {
  buyer: { label: 'Buyer', icon: '🏠', badgeVariant: 'info' },
  seller: { label: 'Seller', icon: '💼', badgeVariant: 'primary' },
  owner: { label: 'Owner', icon: '🔑', badgeVariant: 'success' },
  investor: { label: 'Investor', icon: '📈', badgeVariant: 'warning' },
};

export const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; badgeVariant: ClientBadgeVariant }
> = {
  active: { label: 'Active', color: '#10B981', badgeVariant: 'success' },
  inactive: { label: 'Inactive', color: '#6B7280', badgeVariant: 'secondary' },
  vip: { label: 'VIP', color: '#F59E0B', badgeVariant: 'warning' },
};

export const ITEMS_PER_PAGE = 10;

export const EMPTY_FORM: ClientFormData = {
  name: '',
  email: '',
  phone: '',
  type: 'buyer',
  company: '',
  status: 'active',
  tags: '',
  notes: '',
};

// ─── Hook ───────────────────────────────────────────────────────────────
