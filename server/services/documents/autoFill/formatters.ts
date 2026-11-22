/**
 * Formatting helpers for Document Auto-Fill
 */

export function formatDate(date: Date | null | undefined): string {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function formatCurrency(amount: number | null | undefined, currency = 'AED'): string {
  if (!amount) return '';
  return `${currency} ${amount.toLocaleString('en-AE', { minimumFractionDigits: 2 })}`;
}

export function safe(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  return String(value);
}
