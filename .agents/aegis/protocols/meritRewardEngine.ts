/**
 * AEGIS Merit Ledger & Statutory Gate XP Engine (Point 90 / AEG-037–039)
 */

export type StatutoryGate =
  'DLD_DEED_VERIFIED' | 'EJARI_REGISTERED' | 'KYC_AML_CLEARED' | 'ZERO_ERROR_RELEASE';

export const STATUTORY_GATE_XP = 500;

export interface MeritAward {
  staffId: string;
  gate: StatutoryGate;
  xpAwarded: number;
  awardedAtIso: string;
}

export function awardStatutoryGateXp(
  staffId: string,
  gate: StatutoryGate,
  now = new Date()
): MeritAward {
  if (!staffId.trim()) {
    throw new Error('staffId is required for merit ledger award');
  }
  return {
    staffId: staffId.trim(),
    gate,
    xpAwarded: STATUTORY_GATE_XP,
    awardedAtIso: now.toISOString(),
  };
}
