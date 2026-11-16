import type { EnterpriseReport } from '../types';
import { projectsTimesheetsReports } from './projectsAccountant/projectsTimesheets.data';
import { accountantLedgerReports } from './projectsAccountant/accountantLedger.data';
import { accountantStatementsReports } from './projectsAccountant/accountantStatements.data';

export const projectsAccountantReports: EnterpriseReport[] = [
  ...projectsTimesheetsReports,
  ...accountantLedgerReports,
  ...accountantStatementsReports,
];

