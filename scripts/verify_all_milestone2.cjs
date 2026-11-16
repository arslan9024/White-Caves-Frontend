const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Dell/Documents/antigravity/White-Caves/White-Caves-Frontend';

const targetInventory = [
  // Group A (7 files)
  { path: 'src/config/ai-command-center/master-workforce-grid.ts', group: 'Group A' },
  { path: 'src/config/rbacConfiguration.ts', group: 'Group A' },
  { path: 'src/config/departmentContentMap.ts', group: 'Group A' },
  { path: 'src/config/platformFeatures.ts', group: 'Group A' },
  { path: 'src/config/aiAssistantsRegistry.ts', group: 'Group A' },
  { path: 'src/config/assistantDocs.ts', group: 'Group A' },
  { path: 'src/config/ROLE_TAB_MAPPING.ts', group: 'Group A' },

  // Group B (3 files)
  { path: 'src/mocks/companyMasterLedger.ts', group: 'Group B' },
  { path: 'src/mocks/mockDataGenerated.ts', group: 'Group B' },
  { path: 'src/mocks/departmentRegistry.ts', group: 'Group B' },

  // Group C (17 files)
  { path: 'src/data/mock/properties_portfolio.ts', group: 'Group C' },
  { path: 'src/data/mock/personnel_directory.ts', group: 'Group C' },
  { path: 'src/data/assistants35Registry.data.ts', group: 'Group C' },
  { path: 'src/data/theodoraReports/reports/overviewSales.data.ts', group: 'Group C' },
  { path: 'src/data/services/companyServices.ts', group: 'Group C' },
  { path: 'src/data/docs/documentRegistry.ts', group: 'Group C' },
  { path: 'src/data/theodoraReports/reports/projectsAccountant.data.ts', group: 'Group C' },
  { path: 'src/data/theodoraReports/reports/receivablesPayments.data.ts', group: 'Group C' },
  { path: 'src/data/dummyLeads.ts', group: 'Group C' },
  { path: 'src/data/theodoraReports/reports/payablesExpenses.data.ts', group: 'Group C' },
  { path: 'src/data/organization/aiAssistantsRegistry.ts', group: 'Group C' },
  { path: 'src/data/theodoraReports/reports/auditAutomation.data.ts', group: 'Group C' },
  { path: 'src/data/auroraSoftwareDocsRegistry.ts', group: 'Group C' },
  { path: 'src/data/zoeKnowledgeBase.ts', group: 'Group C' },
  { path: 'src/data/zoeBusinessDocs/docs/corporateCompliance.data.ts', group: 'Group C' },
  { path: 'src/data/compliance/kycAmlPolicies.ts', group: 'Group C' },
  { path: 'src/data/organization/orgStructure.ts', group: 'Group C' },
];

const subDirectories = [
  // Group A
  'src/config/ai-command-center/workforceGrid',
  'src/config/rbac',
  'src/config/departmentContent',
  'src/config/platformFeatures',
  'src/config/aiAssistantsRegistry',
  'src/config/assistantDocs',
  'src/config/roleTabMapping',

  // Group B
  'src/mocks/companyMasterLedger',
  'src/mocks/mockDataGenerated',
  'src/mocks/departmentRegistry',

  // Group C
  'src/data/mock/properties_portfolio',
  'src/data/mock/personnel_directory',
  'src/data/assistants35Registry',
  'src/data/theodoraReports/reports/overviewSales',
  'src/data/services/companyServices',
  'src/data/docs/documentRegistry',
  'src/data/theodoraReports/reports/projectsAccountant',
  'src/data/theodoraReports/reports/receivablesPayments',
  'src/data/dummyLeads',
  'src/data/theodoraReports/reports/payablesExpenses',
  'src/data/organization/aiAssistantsRegistry',
  'src/data/theodoraReports/reports/auditAutomation',
  'src/data/auroraSoftwareDocs',
  'src/data/zoeKnowledgeBase',
  'src/data/zoeBusinessDocs/docs/corporateCompliance',
  'src/data/compliance/kycAmlPolicies',
  'src/data/organization/orgStructure',
];

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getFilesRecursively(full));
    } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      results.push(full);
    }
  }
  return results;
}

console.log('================================================================');
console.log('       MILESTONE 2 COMPREHENSIVE VERIFICATION AUDIT');
console.log('================================================================\n');

let totalFilesChecked = 0;
let totalViolations = 0;
let totalDagViolations = 0;

console.log('--- 1. AUDITING 27 TARGET FACADE FILES ---');
targetInventory.forEach((item, idx) => {
  const fullPath = path.join(rootDir, item.path);
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] MISSING: ${item.path}`);
    totalViolations++;
    return;
  }

  const lines = fs.readFileSync(fullPath, 'utf8').split('\n').length;
  totalFilesChecked++;
  const status = lines < 350 ? 'PASS' : 'FAIL';
  if (lines >= 350) totalViolations++;

  console.log(`[${status}] #${(idx + 1).toString().padStart(2)} (${item.group}) ${item.path.padEnd(65)} : ${lines} lines`);
});

console.log('\n--- 2. AUDITING EXTRACTED SUB-MODULE DIRECTORIES ---');
let allSubFiles = [];
subDirectories.forEach(dir => {
  const fullDir = path.join(rootDir, dir);
  const files = getFilesRecursively(fullDir);
  allSubFiles = allSubFiles.concat(files);
});

console.log(`Discovered ${allSubFiles.length} generated sub-module files across ${subDirectories.length} directories.`);

allSubFiles.forEach(subFile => {
  totalFilesChecked++;
  const relPath = path.relative(rootDir, subFile).replace(/\\/g, '/');
  const content = fs.readFileSync(subFile, 'utf8');
  const lines = content.split('\n').length;

  if (lines >= 350) {
    console.error(`[FAIL] SUB-MODULE >= 350 LINES: ${relPath} (${lines} lines)`);
    totalViolations++;
  }

  // Check DAG rule: submodules must NOT import from parent facade
  targetInventory.forEach(facade => {
    const baseName = path.basename(facade.path, path.extname(facade.path));
    // If submodule is under the same directory, check if it imports ../baseName or ./baseName
    if (content.includes(`from '../${baseName}'`) || content.includes(`from './${baseName}'`)) {
      console.error(`[FAIL] DAG VIOLATION: ${relPath} imports from parent facade ${baseName}`);
      totalDagViolations++;
    }
  });
});

console.log('\n================================================================');
console.log(`Total files audited (facades + submodules): ${totalFilesChecked}`);
console.log(`Target facades: ${targetInventory.length} / 27 verified`);
console.log(`Generated sub-modules: ${allSubFiles.length} verified`);
console.log(`Line count violations (>= 350 lines): ${totalViolations}`);
console.log(`DAG circular violations: ${totalDagViolations}`);
console.log('================================================================');

if (totalViolations === 0 && totalDagViolations === 0) {
  console.log('\n>>> AUDIT PASSED: 100% OF FILES ARE STRICTLY < 350 LINES, ZERO DAG VIOLATIONS <<<\n');
} else {
  console.error('\n>>> AUDIT FAILED: VIOLATIONS DETECTED <<<\n');
  process.exit(1);
}
