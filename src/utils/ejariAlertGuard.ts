/**
 * AEGIS V5.0 Ejari 90/60/30-Day Renewal Alert Guard (AEG-027)
 */

export type EjariAlertTier = 'expired' | '30d' | '60d' | '90d' | 'ok';

export function getEjariAlertTier(daysRemaining: number): EjariAlertTier {
  if (!Number.isFinite(daysRemaining) || daysRemaining <= 0) return 'expired';
  if (daysRemaining <= 30) return '30d';
  if (daysRemaining <= 60) return '60d';
  if (daysRemaining <= 90) return '90d';
  return 'ok';
}

