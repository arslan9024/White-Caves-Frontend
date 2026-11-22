export interface Invoice {
  id: string | number;
  amount: number;
  status: string;
}

export interface Expense {
  id: string | number;
  amount: number;
  status: string;
}

export interface ReportsTabProps {
  invoices?: Invoice[];
  expenses?: Expense[];
}

export const REPORT_DATE_RANGES = ['today', 'mtd', 'qtd', 'ytd', 'all'] as const;

export const INITIAL_FAVORITES: Record<string, boolean> = {
  '3.14.R01': true,
  '3.14.R03': true,
  '3.14.R06': true,
  '3.14.R17': true,
  '3.14.R34': true,
  '3.14.R40': true,
};

export const INITIAL_SCHEDULES: Record<string, boolean> = {
  '3.14.R01': true,
  '3.14.R02': true,
  '3.14.R08': true,
  '3.14.R11': true,
  '3.14.R17': true,
  '3.14.R40': true,
  '3.14.R42': true,
};
