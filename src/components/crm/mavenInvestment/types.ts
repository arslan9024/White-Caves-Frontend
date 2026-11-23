export interface MavenInvestmentCRMProps {
  moduleId?: string;
  role?: string;
  user?: unknown;
}

export type MavenTabType = 'dcf' | 'yield' | 'rebalancer' | 'appreciation';

export interface DcfInputState {
  initialInvestment: number;
  holdingYears: number;
  annualRentalGrowth: number;
  initialRent: number;
  exitCapRate: number;
}

export interface DcfCalculationResult {
  totalCashFlow: number;
  exitPrice: number;
  totalReturn: number;
  irr: string;
}

export interface YieldAnalysisResult {
  propValue: number;
  longTermRent: number;
  longTermNet: number;
  shortTermGross: number;
  shortTermNet: number;
  longTermYield: string;
  shortTermYield: string;
}
