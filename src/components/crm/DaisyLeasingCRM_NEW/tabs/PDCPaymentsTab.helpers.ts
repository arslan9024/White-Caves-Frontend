import { PDCStatus } from '../data/leasing';

export const STATUS_FILTERS: Array<PDCStatus | 'all'> = [
  'all',
  'pending',
  'presented',
  'cleared',
  'bounced',
];

export const STATUS_COLORS: Record<PDCStatus, { bg: string; text: string }> = {
  pending: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  presented: { bg: 'rgba(59,130,246,0.15)', text: '#60A5FA' },
  cleared: { bg: 'rgba(16,185,129,0.15)', text: '#10B981' },
  bounced: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
};

export const isOverdue = (dueDate: string, status: PDCStatus): boolean => {
  if (status !== 'pending') return false;
  return new Date(dueDate) < new Date();
};

export const isDueSoon = (dueDate: string, status: PDCStatus): boolean => {
  if (status !== 'pending') return false;
  const due = new Date(dueDate);
  const now = new Date();
  if (due < now) return false;
  const diffMs = due.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
};
