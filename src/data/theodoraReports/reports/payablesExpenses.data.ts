import type { EnterpriseReport } from '../types';
import { payablesReports } from './payablesExpenses/payables.data';
import { expensesReports } from './payablesExpenses/expenses.data';
import { taxesBankingReports } from './payablesExpenses/taxesBanking.data';

export const payablesExpensesReports: EnterpriseReport[] = [
  ...payablesReports,
  ...expensesReports,
  ...taxesBankingReports,
];

