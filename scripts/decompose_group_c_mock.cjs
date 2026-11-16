const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Dell/Documents/antigravity/White-Caves/White-Caves-Frontend';

// 1. properties_portfolio.ts
function decomposePropertiesPortfolio() {
  const filePath = path.join(rootDir, 'src/data/mock/properties_portfolio.ts');
  const targetDir = path.join(rootDir, 'src/data/mock/properties_portfolio');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Types
  const typesLines = lines.slice(0, 19);
  fs.writeFileSync(path.join(targetDir, 'properties_portfolio.types.ts'), typesLines.join('\n') + '\n', 'utf8');

  // Find array entries
  const constIndex = lines.findIndex(l => l.includes('export const PROPERTIES_PORTFOLIO: PortfolioProperty[]'));
  const closeIndex = lines.findIndex((l, i) => i > constIndex && l.startsWith('];'));
  const arrayLines = lines.slice(constIndex + 1, closeIndex);

  const entryIndices = [];
  for (let i = 0; i < arrayLines.length; i++) {
    if (arrayLines[i].match(/^\s*\{\s*$/)) {
      entryIndices.push(i);
    }
  }
  console.log(`properties_portfolio entries found: ${entryIndices.length}`);

  // Split 100 entries into 4 parts of 25
  const parts = 4;
  const perPart = Math.ceil(entryIndices.length / parts);
  for (let p = 0; p < parts; p++) {
    const startIdx = entryIndices[p * perPart];
    const endIdx = (p + 1 < parts) ? entryIndices[(p + 1) * perPart] : arrayLines.length;
    const partNum = p + 1;
    const partContent = [
      `import type { PortfolioProperty } from './properties_portfolio.types';`,
      ``,
      `export const PROPERTIES_PART_${partNum}: PortfolioProperty[] = [`,
      ...arrayLines.slice(startIdx, endIdx),
      `];`,
      ``
    ].join('\n');
    fs.writeFileSync(path.join(targetDir, `properties_portfolio.part${partNum}.ts`), partContent, 'utf8');
  }

  // Helpers
  const helpersContent = [
    `import type { PortfolioProperty, PropertyStatus } from './properties_portfolio.types';`,
    `import { PROPERTIES_PART_1 } from './properties_portfolio.part1';`,
    `import { PROPERTIES_PART_2 } from './properties_portfolio.part2';`,
    `import { PROPERTIES_PART_3 } from './properties_portfolio.part3';`,
    `import { PROPERTIES_PART_4 } from './properties_portfolio.part4';`,
    ``,
    `export const PROPERTIES_PORTFOLIO: PortfolioProperty[] = [`,
    `  ...PROPERTIES_PART_1,`,
    `  ...PROPERTIES_PART_2,`,
    `  ...PROPERTIES_PART_3,`,
    `  ...PROPERTIES_PART_4,`,
    `];`,
    ``,
    `export const getPortfolioPropertyById = (id: string): PortfolioProperty | undefined =>`,
    `  PROPERTIES_PORTFOLIO.find(p => p.id === id);`,
    ``,
    `export const getFeaturedProperties = (): PortfolioProperty[] =>`,
    `  PROPERTIES_PORTFOLIO.filter(p => p.featured);`,
    ``,
    `export const getPropertiesByStatus = (status: PropertyStatus): PortfolioProperty[] =>`,
    `  PROPERTIES_PORTFOLIO.filter(p => p.status === status);`,
    ``,
    `export const getPropertiesByCommunity = (community: string): PortfolioProperty[] =>`,
    `  PROPERTIES_PORTFOLIO.filter(p => p.community.toLowerCase().includes(community.toLowerCase()));`,
    ``,
    `export default PROPERTIES_PORTFOLIO;`,
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'properties_portfolio.helpers.ts'), helpersContent, 'utf8');

  // Facade
  const facadeContent = [
    `export type * from './properties_portfolio/properties_portfolio.types';`,
    `export * from './properties_portfolio/properties_portfolio.helpers';`,
    `export { default } from './properties_portfolio/properties_portfolio.helpers';`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facadeContent, 'utf8');
  console.log('properties_portfolio decomposed successfully');
}

// 2. personnel_directory.ts
function decomposePersonnelDirectory() {
  const filePath = path.join(rootDir, 'src/data/mock/personnel_directory.ts');
  const targetDir = path.join(rootDir, 'src/data/mock/personnel_directory');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Types
  const typesLines = lines.slice(0, 16);
  fs.writeFileSync(path.join(targetDir, 'personnel_directory.types.ts'), typesLines.join('\n') + '\n', 'utf8');

  // Array entries
  const constIndex = lines.findIndex(l => l.includes('export const PERSONNEL_DIRECTORY: PersonnelEntry[]'));
  const closeIndex = lines.findIndex((l, i) => i > constIndex && l.startsWith('];'));
  const arrayLines = lines.slice(constIndex + 1, closeIndex);

  const entryIndices = [];
  for (let i = 0; i < arrayLines.length; i++) {
    if (arrayLines[i].match(/^\s*\{\s*$/)) {
      entryIndices.push(i);
    }
  }
  console.log(`personnel_directory entries found: ${entryIndices.length}`);

  // Split into 3 parts of 40 entries
  // Part 1: Managers & supervisors 1-28 (indices 0 to 39)
  // Part 2: Supervisors 29-68 (indices 40 to 79)
  // Part 3: Supervisors 69-108 (indices 80 to 119)
  const partConfigs = [
    { name: 'personnel_directory.managers.ts', varName: 'PERSONNEL_MANAGERS', start: 0, end: 40 },
    { name: 'personnel_directory.supervisors1.ts', varName: 'PERSONNEL_SUPERVISORS_1', start: 40, end: 80 },
    { name: 'personnel_directory.supervisors2.ts', varName: 'PERSONNEL_SUPERVISORS_2', start: 80, end: entryIndices.length }
  ];

  partConfigs.forEach(cfg => {
    const sLine = entryIndices[cfg.start];
    const eLine = (cfg.end < entryIndices.length) ? entryIndices[cfg.end] : arrayLines.length;
    const pContent = [
      `import type { PersonnelEntry } from './personnel_directory.types';`,
      ``,
      `export const ${cfg.varName}: PersonnelEntry[] = [`,
      ...arrayLines.slice(sLine, eLine),
      `];`,
      ``
    ].join('\n');
    fs.writeFileSync(path.join(targetDir, cfg.name), pContent, 'utf8');
  });

  // Helpers
  const helpersContent = [
    `import type { PersonnelEntry, PersonnelRole } from './personnel_directory.types';`,
    `import { PERSONNEL_MANAGERS } from './personnel_directory.managers';`,
    `import { PERSONNEL_SUPERVISORS_1 } from './personnel_directory.supervisors1';`,
    `import { PERSONNEL_SUPERVISORS_2 } from './personnel_directory.supervisors2';`,
    ``,
    `export const PERSONNEL_DIRECTORY: PersonnelEntry[] = [`,
    `  ...PERSONNEL_MANAGERS,`,
    `  ...PERSONNEL_SUPERVISORS_1,`,
    `  ...PERSONNEL_SUPERVISORS_2,`,
    `];`,
    ``,
    `export const getPersonnelById = (id: string): PersonnelEntry | undefined =>`,
    `  PERSONNEL_DIRECTORY.find(p => p.id === id);`,
    ``,
    `export const getPersonnelByDepartment = (dept: string): PersonnelEntry[] =>`,
    `  PERSONNEL_DIRECTORY.filter(p => p.department === dept);`,
    ``,
    `export const getPersonnelByRole = (role: PersonnelRole): PersonnelEntry[] =>`,
    `  PERSONNEL_DIRECTORY.filter(p => p.role === role);`,
    ``,
    `export const getManagers = (): PersonnelEntry[] =>`,
    `  PERSONNEL_DIRECTORY.filter(p => p.role === 'Manager');`,
    ``,
    `export default PERSONNEL_DIRECTORY;`,
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'personnel_directory.helpers.ts'), helpersContent, 'utf8');

  // Facade
  const facadeContent = [
    `export type * from './personnel_directory/personnel_directory.types';`,
    `export * from './personnel_directory/personnel_directory.helpers';`,
    `export { default } from './personnel_directory/personnel_directory.helpers';`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facadeContent, 'utf8');
  console.log('personnel_directory decomposed successfully');
}

// 3. dummyLeads.ts
function decomposeDummyLeads() {
  const filePath = path.join(rootDir, 'src/data/dummyLeads.ts');
  const targetDir = path.join(rootDir, 'src/data/dummyLeads');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const idxAgents = lines.findIndex(l => l.includes('export const DUMMY_AGENTS'));
  const idxHotLeads = lines.findIndex(l => l.includes('export const DUMMY_HOT_LEADS'));
  const idxClients = lines.findIndex(l => l.includes('export const DUMMY_CLIENTS'));
  const idxActivities = lines.findIndex(l => l.includes('export const DUMMY_ACTIVITIES'));
  const idxOverview = lines.findIndex(l => l.includes('export const DUMMY_OVERVIEW_DATA'));
  const idxAllLeads = lines.findIndex(l => l.includes('export const DUMMY_ALL_LEADS'));
  const idxSummary = lines.findIndex(l => l.includes('export const DUMMY_DATA_SUMMARY'));

  // Submodule 1: dummyAgentsAndActivities.data.ts
  const file1 = [
    lines.slice(idxAgents - 1, idxHotLeads - 1).join('\n').trim(),
    ``,
    lines.slice(idxActivities - 1, idxOverview - 1).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'dummyAgentsAndActivities.data.ts'), file1, 'utf8');

  // Submodule 2: dummyLeadsData.data.ts
  const file2 = [
    lines.slice(idxHotLeads - 1, idxClients - 1).join('\n').trim(),
    ``,
    lines.slice(idxAllLeads - 1, idxSummary - 1).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'dummyLeadsData.data.ts'), file2, 'utf8');

  // Submodule 3: dummyClientsAndOverview.data.ts
  const file3 = [
    lines.slice(idxClients - 1, idxActivities - 1).join('\n').trim(),
    ``,
    lines.slice(idxOverview - 1, idxAllLeads - 1).join('\n').trim(),
    ``,
    lines.slice(idxSummary - 1).join('\n').trim(),
    ``
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'dummyClientsAndOverview.data.ts'), file3, 'utf8');

  // Facade
  const facadeContent = [
    `export { DUMMY_AGENTS, DUMMY_ACTIVITIES } from './dummyLeads/dummyAgentsAndActivities.data';`,
    `export { DUMMY_HOT_LEADS, DUMMY_ALL_LEADS } from './dummyLeads/dummyLeadsData.data';`,
    `export { DUMMY_CLIENTS, DUMMY_OVERVIEW_DATA, DUMMY_DATA_SUMMARY } from './dummyLeads/dummyClientsAndOverview.data';`,
    ``
  ].join('\n');
  fs.writeFileSync(filePath, facadeContent, 'utf8');
  console.log('dummyLeads decomposed successfully');
}

decomposePropertiesPortfolio();
decomposePersonnelDirectory();
decomposeDummyLeads();
