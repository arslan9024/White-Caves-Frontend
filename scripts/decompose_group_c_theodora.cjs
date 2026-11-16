const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Dell/Documents/antigravity/White-Caves/White-Caves-Frontend';

function parseReports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Find all report object boundaries
  const reports = [];
  let inReport = false;
  let braceDepth = 0;
  let currentReportLines = [];
  let currentReportId = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line starts a report object inside the array
    if (!inReport && line.match(/^\s*\{\s*$/)) {
      inReport = true;
      braceDepth = 1;
      currentReportLines = [line];
      currentReportId = '';
      continue;
    }

    if (inReport) {
      currentReportLines.push(line);
      const idMatch = line.match(/^\s*id:\s*['"]([^'"]+)['"]/);
      if (idMatch) {
        currentReportId = idMatch[1];
      }

      // Track braces
      for (const char of line) {
        if (char === '{') braceDepth++;
        else if (char === '}') braceDepth--;
      }

      if (braceDepth === 0) {
        // Report object ended
        reports.push({
          id: currentReportId,
          code: currentReportLines.join('\n')
        });
        inReport = false;
        currentReportLines = [];
      }
    }
  }

  return reports;
}

// 1. overviewSales.data.ts (16 reports: 5 overview, 6 sales, 5 inventory)
function decomposeOverviewSales() {
  const filePath = path.join(rootDir, 'src/data/theodoraReports/reports/overviewSales.data.ts');
  const targetDir = path.join(rootDir, 'src/data/theodoraReports/reports/overviewSales');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const reports = parseReports(filePath);
  console.log(`overviewSales: parsed ${reports.length} reports`);

  const overview = reports.slice(0, 5);
  const sales = reports.slice(5, 11);
  const inventory = reports.slice(11, 16);

  fs.writeFileSync(path.join(targetDir, 'businessOverview.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const businessOverviewReports: EnterpriseReport[] = [`,
    overview.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'sales.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const salesReports: EnterpriseReport[] = [`,
    sales.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'inventoryValuation.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const inventoryValuationReports: EnterpriseReport[] = [`,
    inventory.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  // Facade
  const facade = [
    `import type { EnterpriseReport } from '../types';`,
    `import { businessOverviewReports } from './overviewSales/businessOverview.data';`,
    `import { salesReports } from './overviewSales/sales.data';`,
    `import { inventoryValuationReports } from './overviewSales/inventoryValuation.data';`,
    ``,
    `export const overviewSalesReports: EnterpriseReport[] = [`,
    `  ...businessOverviewReports,`,
    `  ...salesReports,`,
    `  ...inventoryValuationReports,`,
    `];`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('overviewSales decomposed');
}

// 2. projectsAccountant.data.ts (13 reports: 7 projects, 3 accountant ledger, 3 accountant statements)
function decomposeProjectsAccountant() {
  const filePath = path.join(rootDir, 'src/data/theodoraReports/reports/projectsAccountant.data.ts');
  const targetDir = path.join(rootDir, 'src/data/theodoraReports/reports/projectsAccountant');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const reports = parseReports(filePath);
  console.log(`projectsAccountant: parsed ${reports.length} reports`);

  const projects = reports.slice(0, 7);
  const accountant1 = reports.slice(7, 10);
  const accountant2 = reports.slice(10, 13);

  fs.writeFileSync(path.join(targetDir, 'projectsTimesheets.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const projectsTimesheetsReports: EnterpriseReport[] = [`,
    projects.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'accountantLedger.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const accountantLedgerReports: EnterpriseReport[] = [`,
    accountant1.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'accountantStatements.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const accountantStatementsReports: EnterpriseReport[] = [`,
    accountant2.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  const facade = [
    `import type { EnterpriseReport } from '../types';`,
    `import { projectsTimesheetsReports } from './projectsAccountant/projectsTimesheets.data';`,
    `import { accountantLedgerReports } from './projectsAccountant/accountantLedger.data';`,
    `import { accountantStatementsReports } from './projectsAccountant/accountantStatements.data';`,
    ``,
    `export const projectsAccountantReports: EnterpriseReport[] = [`,
    `  ...projectsTimesheetsReports,`,
    `  ...accountantLedgerReports,`,
    `  ...accountantStatementsReports,`,
    `];`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('projectsAccountant decomposed');
}

// 3. receivablesPayments.data.ts (14 reports: 5 aging, 4 details, 5 payments)
function decomposeReceivablesPayments() {
  const filePath = path.join(rootDir, 'src/data/theodoraReports/reports/receivablesPayments.data.ts');
  const targetDir = path.join(rootDir, 'src/data/theodoraReports/reports/receivablesPayments');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const reports = parseReports(filePath);
  console.log(`receivablesPayments: parsed ${reports.length} reports`);

  const aging = reports.slice(0, 5);
  const details = reports.slice(5, 9);
  const payments = reports.slice(9, 14);

  fs.writeFileSync(path.join(targetDir, 'receivablesAging.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const receivablesAgingReports: EnterpriseReport[] = [`,
    aging.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'receivablesDetails.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const receivablesDetailsReports: EnterpriseReport[] = [`,
    details.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'paymentsReceived.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const paymentsReceivedReports: EnterpriseReport[] = [`,
    payments.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  const facade = [
    `import type { EnterpriseReport } from '../types';`,
    `import { receivablesAgingReports } from './receivablesPayments/receivablesAging.data';`,
    `import { receivablesDetailsReports } from './receivablesPayments/receivablesDetails.data';`,
    `import { paymentsReceivedReports } from './receivablesPayments/paymentsReceived.data';`,
    ``,
    `export const receivablesPaymentsReports: EnterpriseReport[] = [`,
    `  ...receivablesAgingReports,`,
    `  ...receivablesDetailsReports,`,
    `  ...paymentsReceivedReports,`,
    `];`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('receivablesPayments decomposed');
}

// 4. payablesExpenses.data.ts (12 reports: 3 payables, 6 expenses, 3 taxes/banking)
function decomposePayablesExpenses() {
  const filePath = path.join(rootDir, 'src/data/theodoraReports/reports/payablesExpenses.data.ts');
  const targetDir = path.join(rootDir, 'src/data/theodoraReports/reports/payablesExpenses');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const reports = parseReports(filePath);
  console.log(`payablesExpenses: parsed ${reports.length} reports`);

  const payables = reports.slice(0, 3);
  const expenses = reports.slice(3, 9);
  const taxesBanking = reports.slice(9, 12);

  fs.writeFileSync(path.join(targetDir, 'payables.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const payablesReports: EnterpriseReport[] = [`,
    payables.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'expenses.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const expensesReports: EnterpriseReport[] = [`,
    expenses.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'taxesBanking.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const taxesBankingReports: EnterpriseReport[] = [`,
    taxesBanking.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  const facade = [
    `import type { EnterpriseReport } from '../types';`,
    `import { payablesReports } from './payablesExpenses/payables.data';`,
    `import { expensesReports } from './payablesExpenses/expenses.data';`,
    `import { taxesBankingReports } from './payablesExpenses/taxesBanking.data';`,
    ``,
    `export const payablesExpensesReports: EnterpriseReport[] = [`,
    `  ...payablesReports,`,
    `  ...expensesReports,`,
    `  ...taxesBankingReports,`,
    `];`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('payablesExpenses decomposed');
}

// 5. auditAutomation.data.ts (12 reports: 2 currency, 7 activity audit, 3 automation workflows)
function decomposeAuditAutomation() {
  const filePath = path.join(rootDir, 'src/data/theodoraReports/reports/auditAutomation.data.ts');
  const targetDir = path.join(rootDir, 'src/data/theodoraReports/reports/auditAutomation');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const reports = parseReports(filePath);
  console.log(`auditAutomation: parsed ${reports.length} reports`);

  const currency = reports.slice(0, 2);
  const activity = reports.slice(2, 9);
  const automation = reports.slice(9, 12);

  fs.writeFileSync(path.join(targetDir, 'currencyAudit.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const currencyAuditReports: EnterpriseReport[] = [`,
    currency.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'activityAudit.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const activityAuditReports: EnterpriseReport[] = [`,
    activity.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'automationWorkflows.data.ts'), [
    `import type { EnterpriseReport } from '../../types';`,
    ``,
    `export const automationWorkflowsReports: EnterpriseReport[] = [`,
    automation.map(r => r.code).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  const facade = [
    `import type { EnterpriseReport } from '../types';`,
    `import { currencyAuditReports } from './auditAutomation/currencyAudit.data';`,
    `import { activityAuditReports } from './auditAutomation/activityAudit.data';`,
    `import { automationWorkflowsReports } from './auditAutomation/automationWorkflows.data';`,
    ``,
    `export const auditAutomationReports: EnterpriseReport[] = [`,
    `  ...currencyAuditReports,`,
    `  ...activityAuditReports,`,
    `  ...automationWorkflowsReports,`,
    `];`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('auditAutomation decomposed');
}

decomposeOverviewSales();
decomposeProjectsAccountant();
decomposeReceivablesPayments();
decomposePayablesExpenses();
decomposeAuditAutomation();
