export type SageTab = 'applications' | 'calculator' | 'banks' | 'docs' | 'lifecycle';

export interface MortgageApplication {
  id: number;
  client: string;
  bank: string;
  amount: string;
  rate: string;
  ltv: string;
  status: 'approved' | 'processing' | 'under_review' | 'rejected' | string;
  term: number;
}

export interface BankInfo {
  name: string;
  expats: boolean;
  maxLTV: string;
  minRate: string;
  processingDays: number;
  minSalary: string;
  sharia?: boolean;
}

export interface CalculatorState {
  calcPrice: number;
  calcDown: number;
  calcRate: number;
  calcYears: number;
}
