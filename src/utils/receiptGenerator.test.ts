import { describe, it, expect } from 'vitest';
import { formatSequentialReceiptNumber } from './receiptGenerator';

describe('receiptGenerator (AEG-029)', () => {
  it('formats sequential UAE receipt numbers with 6-digit zero padding', () => {
    expect(formatSequentialReceiptNumber(1, 2026)).toBe('WC-RCP-2026-000001');
    expect(formatSequentialReceiptNumber(42, 2026)).toBe('WC-RCP-2026-000042');
    expect(formatSequentialReceiptNumber(0, 2026)).toBe('WC-RCP-2026-000001');
  });
});
