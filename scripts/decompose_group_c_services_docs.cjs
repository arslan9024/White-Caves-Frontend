const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = 'c:/Users/Dell/Documents/antigravity/White-Caves/White-Caves-Frontend';

function getGitContent(relPath) {
  return execSync(`git show HEAD:${relPath}`, { cwd: rootDir, encoding: 'utf8' });
}

// 1. companyServices.ts
function decomposeCompanyServices() {
  const filePath = path.join(rootDir, 'src/data/services/companyServices.ts');
  const targetDir = path.join(rootDir, 'src/data/services/companyServices');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const idxSales = lines.findIndex(l => l.match(/^\s*sales:\s*\[/));
  const idxLeasing = lines.findIndex(l => l.match(/^\s*leasing:\s*\[/));
  const idxOps = lines.findIndex(l => l.match(/^\s*operations:\s*\[/));
  const idxFinance = lines.findIndex(l => l.match(/^\s*finance:\s*\[/));
  const idxCompliance = lines.findIndex(l => l.match(/^\s*compliance:\s*\[/));
  const idxMarketing = lines.findIndex(l => l.match(/^\s*marketing:\s*\[/));
  const idxHelpers = lines.findIndex(l => l.includes('export const getAllServices ='));

  // Sales services
  fs.writeFileSync(path.join(targetDir, 'salesServices.data.ts'), [
    `// @ts-nocheck`,
    `export const salesServices = [`,
    lines.slice(idxSales + 1, idxLeasing - 1).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  // Leasing services
  fs.writeFileSync(path.join(targetDir, 'leasingServices.data.ts'), [
    `// @ts-nocheck`,
    `export const leasingServices = [`,
    lines.slice(idxLeasing + 1, idxOps - 1).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  // Operations and Finance
  fs.writeFileSync(path.join(targetDir, 'operationsAndFinanceServices.data.ts'), [
    `// @ts-nocheck`,
    `export const operationsServices = [`,
    lines.slice(idxOps + 1, idxFinance - 1).join('\n'),
    `];`,
    ``,
    `export const financeServices = [`,
    lines.slice(idxFinance + 1, idxCompliance - 1).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  // Compliance and Marketing
  fs.writeFileSync(path.join(targetDir, 'complianceAndMarketingServices.data.ts'), [
    `// @ts-nocheck`,
    `export const complianceServices = [`,
    lines.slice(idxCompliance + 1, idxMarketing - 1).join('\n'),
    `];`,
    ``,
    `export const marketingServices = [`,
    lines.slice(idxMarketing + 1, idxHelpers - 2).join('\n'),
    `];`,
    ``
  ].join('\n'), 'utf8');

  // Helpers
  const helpersContent = [
    `// @ts-nocheck`,
    `import { salesServices } from './salesServices.data';`,
    `import { leasingServices } from './leasingServices.data';`,
    `import { operationsServices, financeServices } from './operationsAndFinanceServices.data';`,
    `import { complianceServices, marketingServices } from './complianceAndMarketingServices.data';`,
    ``,
    `export const COMPANY_SERVICES = {`,
    `  sales: salesServices,`,
    `  leasing: leasingServices,`,
    `  operations: operationsServices,`,
    `  finance: financeServices,`,
    `  compliance: complianceServices,`,
    `  marketing: marketingServices,`,
    `};`,
    ``,
    lines.slice(idxHelpers).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'companyServices.helpers.ts'), helpersContent, 'utf8');

  // Facade
  const facade = [
    `// @ts-nocheck`,
    `export * from './companyServices/companyServices.helpers';`,
    `export { default } from './companyServices/companyServices.helpers';`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('companyServices decomposed');
}

// 2. documentRegistry.ts
function decomposeDocumentRegistry() {
  const filePath = path.join(rootDir, 'src/data/docs/documentRegistry.ts');
  const targetDir = path.join(rootDir, 'src/data/docs/documentRegistry');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const idxTypes = lines.findIndex(l => l.includes('export const DOCUMENT_TYPES = {'));
  const idxSources = lines.findIndex(l => l.includes('export const DOCUMENT_SOURCES = {'));
  const idxRegistry = lines.findIndex(l => l.includes('export const DOCUMENT_REGISTRY = {'));

  // Types
  fs.writeFileSync(path.join(targetDir, 'documentRegistry.types.ts'), [
    `// @ts-nocheck`,
    lines.slice(idxTypes, idxRegistry).join('\n').trim(),
    ``
  ].join('\n'), 'utf8');

  // Keys inside DOCUMENT_REGISTRY
  const idxSad = lines.findIndex(l => l.includes('aurora_sad: {'));
  const idxApi = lines.findIndex(l => l.includes('aurora_api: {'));
  const idxDb = lines.findIndex(l => l.includes('aurora_database: {'));
  const idxRera = lines.findIndex(l => l.includes('company_rera_compliance: {'));
  const idxHelpers = lines.findIndex(l => l.includes('export const getDocumentById ='));

  // Aurora Tech Docs (srs, sad, api)
  fs.writeFileSync(path.join(targetDir, 'auroraTechDocs.data.ts'), [
    `// @ts-nocheck`,
    `import { DOCUMENT_TYPES, DOCUMENT_SOURCES } from './documentRegistry.types';`,
    ``,
    `export const auroraTechDocs = {`,
    lines.slice(idxRegistry + 1, idxDb).join('\n'),
    `};`,
    ``
  ].join('\n'), 'utf8');

  // Aurora Platform Docs (database, ai_catalog, roadmap, feature_registry, release_history)
  fs.writeFileSync(path.join(targetDir, 'auroraPlatformDocs.data.ts'), [
    `// @ts-nocheck`,
    `import { DOCUMENT_TYPES, DOCUMENT_SOURCES } from './documentRegistry.types';`,
    ``,
    `export const auroraPlatformDocs = {`,
    lines.slice(idxDb, idxRera).join('\n'),
    `};`,
    ``
  ].join('\n'), 'utf8');

  // Company Docs (company_rera_compliance, company_ejari_guide, company_service_catalog)
  fs.writeFileSync(path.join(targetDir, 'companyDocs.data.ts'), [
    `// @ts-nocheck`,
    `import { DOCUMENT_TYPES, DOCUMENT_SOURCES } from './documentRegistry.types';`,
    ``,
    `export const companyDocs = {`,
    lines.slice(idxRera, idxHelpers - 1).join('\n'),
    `};`,
    ``
  ].join('\n'), 'utf8');

  // Helpers
  const helpersContent = [
    `// @ts-nocheck`,
    `import { DOCUMENT_TYPES, DOCUMENT_SOURCES } from './documentRegistry.types';`,
    `import { auroraTechDocs } from './auroraTechDocs.data';`,
    `import { auroraPlatformDocs } from './auroraPlatformDocs.data';`,
    `import { companyDocs } from './companyDocs.data';`,
    ``,
    `export const DOCUMENT_REGISTRY = {`,
    `  ...auroraTechDocs,`,
    `  ...auroraPlatformDocs,`,
    `  ...companyDocs,`,
    `};`,
    ``,
    lines.slice(idxHelpers).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'documentRegistry.helpers.ts'), helpersContent, 'utf8');

  // Facade
  const facade = [
    `// @ts-nocheck`,
    `export { DOCUMENT_TYPES, DOCUMENT_SOURCES } from './documentRegistry/documentRegistry.types';`,
    `export * from './documentRegistry/documentRegistry.helpers';`,
    `export { default } from './documentRegistry/documentRegistry.helpers';`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('documentRegistry decomposed');
}

// 3. auroraSoftwareDocsRegistry.ts
function decomposeAuroraSoftwareDocs() {
  const filePath = path.join(rootDir, 'src/data/auroraSoftwareDocsRegistry.ts');
  const targetDir = path.join(rootDir, 'src/data/auroraSoftwareDocs');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const idxDocs = lines.findIndex(l => l.includes('export const AURORA_SOFTWARE_DOCS: SoftwareDocItem[] = ['));
  const typesContent = lines.slice(0, idxDocs).join('\n').trim();
  fs.writeFileSync(path.join(targetDir, 'auroraSoftwareDocs.types.ts'), typesContent + '\n', 'utf8');

  const arrayLines = lines.slice(idxDocs + 1);
  const closingIdx = arrayLines.findIndex(l => l.startsWith('];'));
  const insideArray = arrayLines.slice(0, closingIdx);

  const entryIndices = [];
  for (let i = 0; i < insideArray.length; i++) {
    if (insideArray[i].match(/^\s*\{\s*$/)) {
      entryIndices.push(i);
    }
  }
  console.log(`auroraSoftwareDocs: parsed ${entryIndices.length} docs`);

  // Core: 3 docs (0, 1, 2)
  // Platform: 7 docs (3 to 9)
  const coreLines = insideArray.slice(entryIndices[0], entryIndices[3]);
  const platformLines = insideArray.slice(entryIndices[3]);

  fs.writeFileSync(path.join(targetDir, 'auroraSoftwareDocs.core.ts'), [
    `import type { SoftwareDocItem } from './auroraSoftwareDocs.types';`,
    ``,
    `export const AURORA_SOFTWARE_DOCS_CORE: SoftwareDocItem[] = [`,
    ...coreLines,
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'auroraSoftwareDocs.platform.ts'), [
    `import type { SoftwareDocItem } from './auroraSoftwareDocs.types';`,
    ``,
    `export const AURORA_SOFTWARE_DOCS_PLATFORM: SoftwareDocItem[] = [`,
    ...platformLines,
    `];`,
    ``
  ].join('\n'), 'utf8');

  // Facade
  const facade = [
    `export type * from './auroraSoftwareDocs/auroraSoftwareDocs.types';`,
    `export { AURORA_SOFTWARE_CATEGORIES } from './auroraSoftwareDocs/auroraSoftwareDocs.types';`,
    `import { AURORA_SOFTWARE_DOCS_CORE } from './auroraSoftwareDocs/auroraSoftwareDocs.core';`,
    `import { AURORA_SOFTWARE_DOCS_PLATFORM } from './auroraSoftwareDocs/auroraSoftwareDocs.platform';`,
    ``,
    `export const AURORA_SOFTWARE_DOCS = [`,
    `  ...AURORA_SOFTWARE_DOCS_CORE,`,
    `  ...AURORA_SOFTWARE_DOCS_PLATFORM,`,
    `];`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('auroraSoftwareDocs decomposed');
}

// 4. zoeBusinessDocs/docs/corporateCompliance.data.ts
function decomposeCorporateCompliance() {
  const filePath = path.join(rootDir, 'src/data/zoeBusinessDocs/docs/corporateCompliance.data.ts');
  const targetDir = path.join(rootDir, 'src/data/zoeBusinessDocs/docs/corporateCompliance');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const { execSync } = require('child_process');
  const content = execSync('git show HEAD:src/data/zoeBusinessDocs/docs/corporateCompliance.data.ts', { encoding: 'utf8' });
  const lines = content.split('\n');

  // Find doc-zoe-00, doc-zoe-02 and array end
  const idxDoc0 = lines.findIndex(l => l.includes("id: 'doc-zoe-00'"));
  const idxDoc2 = lines.findIndex(l => l.includes("id: 'doc-zoe-02'"));
  const idxEnd = lines.findIndex((l, i) => i > idxDoc2 && l.startsWith('];'));

  // Find start brace for doc0 and doc2
  let start0 = idxDoc0;
  while (start0 > 0 && !lines[start0].match(/^\s*\{\s*$/)) start0--;

  let start2 = idxDoc2;
  while (start2 > 0 && !lines[start2].match(/^\s*\{\s*$/)) start2--;

  const part1 = lines.slice(start0, start2);
  const part2 = lines.slice(start2, idxEnd);

  fs.writeFileSync(path.join(targetDir, 'telemetryAndGovernance.data.ts'), [
    `import type { BusinessDocItem } from '../../types';`,
    ``,
    `export const telemetryAndGovernanceDocs: BusinessDocItem[] = [`,
    ...part1,
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'reraAndOperations.data.ts'), [
    `import type { BusinessDocItem } from '../../types';`,
    ``,
    `export const reraAndOperationsDocs: BusinessDocItem[] = [`,
    ...part2,
    `];`,
    ``
  ].join('\n'), 'utf8');

  // Facade
  const facade = [
    `import type { BusinessDocItem } from '../types';`,
    `import { telemetryAndGovernanceDocs } from './corporateCompliance/telemetryAndGovernance.data';`,
    `import { reraAndOperationsDocs } from './corporateCompliance/reraAndOperations.data';`,
    ``,
    `export const corporateComplianceDocs: BusinessDocItem[] = [`,
    `  ...telemetryAndGovernanceDocs,`,
    `  ...reraAndOperationsDocs,`,
    `];`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('corporateCompliance decomposed');
}

// 5. compliance/kycAmlPolicies.ts
function decomposeKycAmlPolicies() {
  const filePath = path.join(rootDir, 'src/data/compliance/kycAmlPolicies.ts');
  const targetDir = path.join(rootDir, 'src/data/compliance/kycAmlPolicies');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const idxPep = lines.findIndex(l => l.includes('pepCategories: {'));
  const idxHelpers = lines.findIndex(l => l.includes('export const getTransactionValueCategory ='));

  // Rules: lines 2 to idxPep
  const rulesContent = [
    `// @ts-nocheck`,
    `export const kycRules = {`,
    lines.slice(2, idxPep).join('\n'),
    `};`,
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'kycAmlPolicies.rules.ts'), rulesContent, 'utf8');

  // Operations: idxPep to idxHelpers - 1
  const opsContent = [
    `// @ts-nocheck`,
    `export const kycOperations = {`,
    lines.slice(idxPep, idxHelpers - 1).join('\n'),
    `};`,
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'kycAmlPolicies.operations.ts'), opsContent, 'utf8');

  // Helpers
  const helpersContent = [
    `// @ts-nocheck`,
    `import { kycRules } from './kycAmlPolicies.rules';`,
    `import { kycOperations } from './kycAmlPolicies.operations';`,
    ``,
    `export const KYC_AML_POLICIES = {`,
    `  ...kycRules,`,
    `  ...kycOperations,`,
    `};`,
    ``,
    lines.slice(idxHelpers).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'kycAmlPolicies.helpers.ts'), helpersContent, 'utf8');

  // Facade
  const facade = [
    `// @ts-nocheck`,
    `export * from './kycAmlPolicies/kycAmlPolicies.helpers';`,
    `export { default } from './kycAmlPolicies/kycAmlPolicies.helpers';`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('kycAmlPolicies decomposed');
}

decomposeCompanyServices();
decomposeDocumentRegistry();
decomposeAuroraSoftwareDocs();
decomposeCorporateCompliance();
decomposeKycAmlPolicies();
