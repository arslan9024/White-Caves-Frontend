/**
 * AEGIS V5.0 Dynamic Commission Split Guard (AEG-038: 60%–70% broker split)
 */

export interface CommissionSplitResult {
  grossCommission: number;
  brokerShare: number;
  houseShare: number;
  splitPercent: number;
}

export function calculateCommissionSplit(
  grossCommission: number,
  splitPercent = 65
): CommissionSplitResult {
  const safeGross = Number.isFinite(grossCommission) && grossCommission > 0 ? grossCommission : 0;
  const clampedSplit = Math.min(70, Math.max(60, splitPercent));
  const brokerShare = Number(((safeGross * clampedSplit) / 100).toFixed(2));
  const houseShare = Number((safeGross - brokerShare).toFixed(2));
  return {
    grossCommission: safeGross,
    brokerShare,
    houseShare,
    splitPercent: clampedSplit,
  };
}

