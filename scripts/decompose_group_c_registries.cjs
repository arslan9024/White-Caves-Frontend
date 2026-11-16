const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Dell/Documents/antigravity/White-Caves/White-Caves-Frontend';

// 1. assistants35Registry.data.ts
function decomposeAssistants35() {
  const filePath = path.join(rootDir, 'src/data/assistants35Registry.data.ts');
  const targetDir = path.join(rootDir, 'src/data/assistants35Registry');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Types: lines 1 to 55
  const idxDeptDef = lines.findIndex(l => l.includes('export interface DepartmentDef'));
  const idxCorpDepts = lines.findIndex(l => l.includes('export const CORPORATE_DEPARTMENTS_12'));
  const typesContent = lines.slice(0, idxCorpDepts).join('\n').trim();
  fs.writeFileSync(path.join(targetDir, 'assistants35.types.ts'), typesContent + '\n', 'utf8');

  // Departments: idxCorpDepts to idxMaster
  const idxMaster = lines.findIndex(l => l.includes('export const MASTER_35_AI_ASSISTANTS'));
  const deptsContent = [
    `import type { DepartmentDef } from './assistants35.types';`,
    ``,
    lines.slice(idxCorpDepts, idxMaster).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'assistants35.departments.ts'), deptsContent, 'utf8');

  // Assistants array: find all assistant objects
  const arrayLines = lines.slice(idxMaster + 1);
  const closingIdx = arrayLines.findIndex(l => l.startsWith('];'));
  const insideArray = arrayLines.slice(0, closingIdx);

  const entryIndices = [];
  for (let i = 0; i < insideArray.length; i++) {
    if (insideArray[i].match(/^\s*\{\s*$/)) {
      entryIndices.push(i);
    }
  }
  console.log(`assistants35: parsed ${entryIndices.length} assistants`);

  // Split into 3 groups:
  // Core (Depts 1-4): 12 assistants (indices 0 to 11)
  // Support (Depts 5-8): 12 assistants (indices 12 to 23)
  // Governance (Depts 9-12 + cross): 11 assistants (indices 24 to 34)
  const coreLines = insideArray.slice(entryIndices[0], entryIndices[12]);
  const supportLines = insideArray.slice(entryIndices[12], entryIndices[24]);
  const govLines = insideArray.slice(entryIndices[24]);

  fs.writeFileSync(path.join(targetDir, 'assistants35.coreAgents.ts'), [
    `import type { AssistantDef } from './assistants35.types';`,
    ``,
    `export const coreAgents: AssistantDef[] = [`,
    ...coreLines,
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'assistants35.supportAgents.ts'), [
    `import type { AssistantDef } from './assistants35.types';`,
    ``,
    `export const supportAgents: AssistantDef[] = [`,
    ...supportLines,
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'assistants35.governanceAgents.ts'), [
    `import type { AssistantDef } from './assistants35.types';`,
    ``,
    `export const governanceAgents: AssistantDef[] = [`,
    ...govLines,
    `];`,
    ``
  ].join('\n'), 'utf8');

  // Registry
  fs.writeFileSync(path.join(targetDir, 'assistants35.registry.ts'), [
    `import type { AssistantDef } from './assistants35.types';`,
    `import { coreAgents } from './assistants35.coreAgents';`,
    `import { supportAgents } from './assistants35.supportAgents';`,
    `import { governanceAgents } from './assistants35.governanceAgents';`,
    ``,
    `export const MASTER_35_AI_ASSISTANTS: AssistantDef[] = [`,
    `  ...coreAgents,`,
    `  ...supportAgents,`,
    `  ...governanceAgents,`,
    `];`,
    ``
  ].join('\n'), 'utf8');

  // Facade
  const facade = [
    `export type * from './assistants35Registry/assistants35.types';`,
    `export { CORPORATE_DEPARTMENTS_12 } from './assistants35Registry/assistants35.departments';`,
    `export { MASTER_35_AI_ASSISTANTS } from './assistants35Registry/assistants35.registry';`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('assistants35 decomposed');
}

// 2. organization/aiAssistantsRegistry.ts
function decomposeOrgAiAssistants() {
  const filePath = path.join(rootDir, 'src/data/organization/aiAssistantsRegistry.ts');
  const targetDir = path.join(rootDir, 'src/data/organization/aiAssistantsRegistry');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const idxArrayStart = lines.findIndex(l => l.includes('export const AI_ASSISTANTS_REGISTRY = ['));
  const idxArrayEnd = lines.findIndex((l, i) => i > idxArrayStart && l.startsWith('];'));
  const arrayLines = lines.slice(idxArrayStart + 1, idxArrayEnd);

  const entryIndices = [];
  for (let i = 0; i < arrayLines.length; i++) {
    if (arrayLines[i].match(/^\s*\{\s*$/)) {
      entryIndices.push(i);
    }
  }
  console.log(`org aiAssistantsRegistry: parsed ${entryIndices.length} assistants`);

  // Split 32 assistants evenly: 16 in part 1 (0 to 15), 16 in part 2 (16 to 31)
  const part1Lines = arrayLines.slice(entryIndices[0], entryIndices[16]);
  const part2Lines = arrayLines.slice(entryIndices[16]);

  fs.writeFileSync(path.join(targetDir, 'assistantsPart1.data.ts'), [
    `// @ts-nocheck`,
    `export const assistantsPart1 = [`,
    ...part1Lines,
    `];`,
    ``
  ].join('\n'), 'utf8');

  fs.writeFileSync(path.join(targetDir, 'assistantsPart2.data.ts'), [
    `// @ts-nocheck`,
    `export const assistantsPart2 = [`,
    ...part2Lines,
    `];`,
    ``
  ].join('\n'), 'utf8');

  // Helpers
  const helpersLines = lines.slice(idxArrayEnd + 1);
  const helpersContent = [
    `// @ts-nocheck`,
    `import { assistantsPart1 } from './assistantsPart1.data';`,
    `import { assistantsPart2 } from './assistantsPart2.data';`,
    ``,
    `export const AI_ASSISTANTS_REGISTRY = [`,
    `  ...assistantsPart1,`,
    `  ...assistantsPart2,`,
    `];`,
    ``,
    ...helpersLines,
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'aiAssistantsRegistry.helpers.ts'), helpersContent, 'utf8');

  // Facade
  const facade = [
    `// @ts-nocheck`,
    `export * from './aiAssistantsRegistry/aiAssistantsRegistry.helpers';`,
    `export { default } from './aiAssistantsRegistry/aiAssistantsRegistry.helpers';`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('org aiAssistantsRegistry decomposed');
}

// 3. organization/orgStructure.ts
function decomposeOrgStructure() {
  const filePath = path.join(rootDir, 'src/data/organization/orgStructure.ts');
  const targetDir = path.join(rootDir, 'src/data/organization/orgStructure');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const idxExec = lines.findIndex(l => l.includes('export const EXECUTIVES = ['));
  const idxDir = lines.findIndex(l => l.includes('export const DIRECTORS = ['));
  const idxDepts = lines.findIndex(l => l.includes('export const DEPARTMENTS_CONFIG = {'));
  const idxHelpers = lines.findIndex(l => l.includes('export const getExecutiveById ='));

  // Leadership (EXECUTIVES + DIRECTORS)
  const leadership = [
    `// @ts-nocheck`,
    lines.slice(idxExec, idxDepts).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'leadership.data.ts'), leadership, 'utf8');

  // Departments (DEPARTMENTS_CONFIG)
  const depts = [
    `// @ts-nocheck`,
    lines.slice(idxDepts, idxHelpers).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'departments.data.ts'), depts, 'utf8');

  // Helpers
  const helpers = [
    `// @ts-nocheck`,
    `import { EXECUTIVES, DIRECTORS } from './leadership.data';`,
    `import { DEPARTMENTS_CONFIG } from './departments.data';`,
    ``,
    lines.slice(idxHelpers).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'orgStructure.helpers.ts'), helpers, 'utf8');

  // Facade
  const facade = [
    `// @ts-nocheck`,
    `export { EXECUTIVES, DIRECTORS } from './orgStructure/leadership.data';`,
    `export { DEPARTMENTS_CONFIG } from './orgStructure/departments.data';`,
    `export * from './orgStructure/orgStructure.helpers';`,
    `export { default } from './orgStructure/orgStructure.helpers';`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('orgStructure decomposed');
}

// 4. zoeKnowledgeBase.ts
function decomposeZoeKnowledgeBase() {
  const filePath = path.join(rootDir, 'src/data/zoeKnowledgeBase.ts');
  const targetDir = path.join(rootDir, 'src/data/zoeKnowledgeBase');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const idxInfo = lines.findIndex(l => l.includes('export const COMPANY_INFO = {'));
  const idxDepts = lines.findIndex(l => l.includes('export const DEPARTMENTS = {'));
  const idxServices = lines.findIndex(l => l.includes('export const SERVICES = ['));
  const idxHelpers = lines.findIndex(l => l.includes('export const getServicesByDepartment ='));

  // Company and Departments
  const compDepts = [
    `// @ts-nocheck`,
    lines.slice(idxInfo, idxServices).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'companyAndDepartments.data.ts'), compDepts, 'utf8');

  // Services and Flows
  const servicesAndFlows = [
    `// @ts-nocheck`,
    lines.slice(idxServices, idxHelpers).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'services.data.ts'), servicesAndFlows, 'utf8');

  // Helpers
  const helpers = [
    `// @ts-nocheck`,
    `import { COMPANY_INFO, DEPARTMENTS } from './companyAndDepartments.data';`,
    `import { SERVICES, SERVICE_FLOWS } from './services.data';`,
    ``,
    lines.slice(idxHelpers).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'zoeKnowledgeBase.helpers.ts'), helpers, 'utf8');

  // Facade
  const facade = [
    `// @ts-nocheck`,
    `export { COMPANY_INFO, DEPARTMENTS } from './zoeKnowledgeBase/companyAndDepartments.data';`,
    `export { SERVICES, SERVICE_FLOWS } from './zoeKnowledgeBase/services.data';`,
    `export * from './zoeKnowledgeBase/zoeKnowledgeBase.helpers';`,
    `export { default } from './zoeKnowledgeBase/zoeKnowledgeBase.helpers';`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facade, 'utf8');
  console.log('zoeKnowledgeBase decomposed');
}

decomposeAssistants35();
decomposeOrgAiAssistants();
decomposeOrgStructure();
decomposeZoeKnowledgeBase();
