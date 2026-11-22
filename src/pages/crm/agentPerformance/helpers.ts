/**
 * Helper utilities and constants for CRM Agent Performance Dashboard
 */

import { formatCurrencyAbbreviated } from '../../../utils';

export const AVATAR_COLORS = [
  '#c9a84c',
  '#10B981',
  '#c9a84c',
  '#10B981',
  '#c9a84c',
  '#10B981',
  '#c9a84c',
  '#10B981',
];

export const getInitials = (name: string): string => {
  const parts = name
    .trim()
    .split(' ')
    .filter(p => p.length > 0);
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : name.trim().slice(0, 2).toUpperCase() || '?';
};

export const getPerformanceColor = (score: number): string => {
  if (score >= 90) return '#10B981';
  if (score >= 75) return '#c9a84c';
  if (score >= 60) return '#e4b75e';
  return '#ef4444';
};

export const formatCurrency = (amount: number): string => formatCurrencyAbbreviated(amount);
