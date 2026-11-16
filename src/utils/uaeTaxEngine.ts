/**
 * UAE FTA Tax Calculation Engine (Point 43 / AEG-029)
 * - 5% UAE Federal VAT on commercial/brokerage services
 * - 9% UAE Corporate Tax on taxable profits exceeding AED 375,000 threshold
 */

export const UAE_VAT_RATE = 0.05;
export const UAE_CORP_TAX_RATE = 0.09;
export const UAE_CORP_TAX_THRESHOLD_AED = 375_000;

export interface UaeTaxSummary {
  grossRevenueAed: number;
  vatPayableAed: number;
  netProfitAed: number;
  taxableCorporateProfitAed: number;
  corporateTaxReserveAed: number;
}

export function calculateUaeTaxSummary(
  grossRevenueAed: number,
  deductibleExpensesAed: number
): UaeTaxSummary {
  const safeGross = Math.max(0, grossRevenueAed);
  const safeExpenses = Math.max(0, deductibleExpensesAed);
  const vatPayableAed = Number((safeGross * UAE_VAT_RATE).toFixed(2));
  const netProfitAed = Math.max(0, Number((safeGross - safeExpenses).toFixed(2)));
  const taxableCorporateProfitAed = Math.max(
    0,
    Number((netProfitAed - UAE_CORP_TAX_THRESHOLD_AED).toFixed(2))
  );
  const corporateTaxReserveAed = Number((taxableCorporateProfitAed * UAE_CORP_TAX_RATE).toFixed(2));

  return {
    grossRevenueAed: safeGross,
    vatPayableAed,
    netProfitAed,
    taxableCorporateProfitAed,
    corporateTaxReserveAed,
  };
}

