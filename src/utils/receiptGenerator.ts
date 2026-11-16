/**
 * AEGIS V5.0 Sequential Receipt Generator (AEG-029)
 */

export function formatSequentialReceiptNumber(
  sequence: number,
  year = new Date().getFullYear()
): string {
  const safeSeq = Number.isFinite(sequence) && sequence > 0 ? Math.floor(sequence) : 1;
  return `WC-RCP-${year}-${String(safeSeq).padStart(6, '0')}`;
}

