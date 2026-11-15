export interface ExpenseCatalogItem {
  expense_id: string;
  name: string;
  description: string;
  uae_vat_rate: number;
  fta_ct_deductible: boolean;
  accounting_ledger_code: string;
}

export interface ExpenseCategory {
  category_id: string;
  category_name: string;
  items: ExpenseCatalogItem[];
}
