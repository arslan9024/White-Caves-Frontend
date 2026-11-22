export const RED = '#EF4444';
export const WHITE = '#FFFFFF';
export const SLATE = '#1E293B';
export const BORDER = 'rgba(239, 68, 68, 0.2)';
export const CARD_BG = '#F8FAFC';
export const TEXT_MUTED = '#64748B';
export const GREEN = '#10B981';

export const docTypeLabel: Record<string, string> = {
  TENANCY_CONTRACT: 'Tenancy',
  MOU_SALE: 'MOU/Sale',
  NOC: 'NOC',
  COMMISSION_STATEMENT: 'Commission',
  PDC_SCHEDULE: 'PDC',
  RERA_FORM7: 'Form 7',
  ALL: 'All Types',
};

export const docTypeColor: Record<string, string> = {
  TENANCY_CONTRACT: '#3B82F6',
  MOU_SALE: '#10B981',
  NOC: '#F59E0B',
  COMMISSION_STATEMENT: '#8B5CF6',
  PDC_SCHEDULE: '#EC4899',
  RERA_FORM7: '#EF4444',
};

export const DOC_FILTER_TYPES = [
  'ALL',
  'TENANCY_CONTRACT',
  'COMMISSION_STATEMENT',
  'PDC_SCHEDULE',
  'MOU_SALE',
  'NOC',
  'RERA_FORM7',
] as const;
