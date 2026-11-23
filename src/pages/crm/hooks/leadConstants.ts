import type { LeadBadgeVariant, LeadFormData } from './leadTypes';

export const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; badgeVariant: LeadBadgeVariant }
> = {
  new: { label: 'New', color: '#10B981', badgeVariant: 'success' },
  contacted: { label: 'Contacted', color: '#8B5CF6', badgeVariant: 'primary' },
  qualified: { label: 'Qualified', color: '#EC4899', badgeVariant: 'primary' },
  viewing: { label: 'Viewing', color: '#3B82F6', badgeVariant: 'info' },
  offered: { label: 'Offered', color: '#F59E0B', badgeVariant: 'warning' },
  negotiating: { label: 'Negotiating', color: '#F97316', badgeVariant: 'warning' },
  won: { label: 'Won', color: '#10B981', badgeVariant: 'success' },
  lost: { label: 'Lost', color: '#6B7280', badgeVariant: 'secondary' },
};

export const SOURCE_LABELS: Record<string, string> = {
  direct: '👤 Direct',
  website: '🌐 Website',
  referral: '🤝 Referral',
  social: '📱 Social',
  portal: '🏢 Portal',
  cold_call: '📞 Cold Call',
  event: '🎤 Event',
  other: '🧩 Other',
};

export const ITEMS_PER_PAGE = 10;

// Null-prototype Map for badge-variant lookup — avoids prototype-pollution risk
// from dynamic key access on plain objects (security/detect-object-injection).
export const STATUS_BADGE_VARIANTS = new Map<string, LeadBadgeVariant>(
  Object.entries(STATUS_CONFIG).map(([k, v]) => [k, v.badgeVariant])
);

export const EMPTY_FORM: LeadFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  status: 'new',
  source: 'direct',
  budget: '',
  notes: '',
};
