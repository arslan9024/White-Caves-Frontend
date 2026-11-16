export type TheodoraTab =
  | 'overview'
  | 'invoices'
  | 'payments'
  | 'expenses'
  | 'aml_monitoring'
  | 'reports'
  | 'gate'
  | 'bench'
  | 'docs'
  | 'e2e'
  | 'vitest'
  | 'rbac'
  | 'zakat'
  | 'benchmark'
  | 'insurance'
  | 'crypto'
  | 'charts'
  | 'alerts'
  | 'i18n'
  | 'rtl_invoice'
  | 'mobile'
  | string;

export interface FinanceInvoice {
  id: string;
  client: string;
  property: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | string;
  date: string;
  dueDate: string;
}

export interface FinanceExpense {
  id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'approved' | 'pending' | 'processed' | string;
}

export type Invoice = FinanceInvoice;
export type TabType = TheodoraTab;

export interface TheodoraFinanceCRMProps {
  activeTab?: TheodoraTab;
  onTabChange?: (tab: TheodoraTab) => void;
}

