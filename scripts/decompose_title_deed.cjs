const fs = require('fs');
const path = require('path');

const src = fs.readFileSync('src/services/HenryTitleDeedScannerService.ts', 'utf8');
const lines = src.split('\n');

const dir = 'src/services/henryTitleDeed';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// 1. henryTitleDeed.types.ts
const typesContent = [
  "import type { ScanReview } from '../henryScanReview';",
  "",
  ...lines.slice(29, 150),
  ""
].join('\n');
fs.writeFileSync(path.join(dir, 'henryTitleDeed.types.ts'), typesContent);

// 2. henryTitleDeed.samples.ts
const samplesContent = [
  "import type { DldTitleDeedExtractedData } from './henryTitleDeed.types';",
  "",
  ...lines.slice(150, 246),
  ""
].join('\n');
fs.writeFileSync(path.join(dir, 'henryTitleDeed.samples.ts'), samplesContent);

// 3. henryTitleDeedOwnerParser.ts
const ownerParserContent = [
  "import { languageValue, normalizeDocumentText, readDocumentFields } from '../henryDocumentParsing';",
  "import { DEED_LABELS, type DeedOwner } from './henryTitleDeed.types';",
  "",
  "export function extractDeedOwners(",
  "  text: string,",
  "  diagnostics: any,",
  "  normalizedNumber: (key: string, raw: string) => number | undefined,",
  "  numericDisagreement: (key: string, rawValues: string[]) => boolean",
  "): { owners: DeedOwner[]; ambiguousOwner: boolean } {",
  "  const owners: DeedOwner[] = [];",
  ...lines.slice(439, 637),
  "  return { owners, ambiguousOwner };",
  "}",
  ""
].join('\n');
fs.writeFileSync(path.join(dir, 'henryTitleDeedOwnerParser.ts'), ownerParserContent);

// 4. henryTitleDeedParser.ts
const parserContent = [
  "import {",
  "  languageValue,",
  "  normalizeDocumentDate,",
  "  normalizeDocumentText,",
  "  parseDocumentNumber,",
  "  readDocumentFields,",
  "  refreshCoverage,",
  "} from '../henryDocumentParsing';",
  "import { validScanDate } from '../henryScanReview';",
  "import { DEED_LABELS, type DldTitleDeedExtractedData, type DeedOwner } from './henryTitleDeed.types';",
  "import { extractDeedOwners } from './henryTitleDeedOwnerParser';",
  "",
  "export function parseTitleDeedDocumentText(text: string): DldTitleDeedExtractedData {",
  ...lines.slice(351, 438),
  "    const { owners, ambiguousOwner } = extractDeedOwners(text, diagnostics, normalizedNumber, numericDisagreement);",
  ...lines.slice(637, 788),
  ""
].join('\n');
fs.writeFileSync(path.join(dir, 'henryTitleDeedParser.ts'), parserContent);

// 5. HenryTitleDeedScannerServiceCore.ts
const coreLines = [
  "import { TenancyContractPayload, ContractParty } from '../HenryPdfEngineService';",
  "import henryEmiratesIdScannerService from '../HenryEmiratesIdScannerService';",
  "import {",
  "  ScanReview,",
  "  VaultSaveOptions,",
  "  canUseScan,",
  "  saveReviewedScan,",
  "  validScanDate,",
  "} from '../henryScanReview';",
  "import type { DldTitleDeedExtractedData, DeedOwner } from './henryTitleDeed.types';",
  "import { VIRIDIS_504_SAMPLE_TITLE_DEED, BUKO_COMMODITY_MADINAT_HIND_TITLE_DEED_SAMPLE } from './henryTitleDeed.samples';",
  "import { parseTitleDeedDocumentText } from './henryTitleDeedParser';",
  "",
  ...lines.slice(246, 350),
  "  parseDocumentText(text: string): DldTitleDeedExtractedData {",
  "    return parseTitleDeedDocumentText(text);",
  "  }",
  "",
  ...lines.slice(789, 914),
  "export { HenryTitleDeedScannerService };",
  "export const henryTitleDeedScannerService = new HenryTitleDeedScannerService();",
  "export default henryTitleDeedScannerService;",
  ""
];
fs.writeFileSync(path.join(dir, 'HenryTitleDeedScannerServiceCore.ts'), coreLines.join('\n'));

// 6. Facade src/services/HenryTitleDeedScannerService.ts
const facadeContent = [
  "export type * from './henryTitleDeed/henryTitleDeed.types';",
  "export {",
  "  DEED_LABELS,",
  "} from './henryTitleDeed/henryTitleDeed.types';",
  "export {",
  "  VIRIDIS_504_SAMPLE_TITLE_DEED,",
  "  BUKO_COMMODITY_MADINAT_HIND_TITLE_DEED_SAMPLE,",
  "} from './henryTitleDeed/henryTitleDeed.samples';",
  "export {",
  "  HenryTitleDeedScannerService,",
  "  henryTitleDeedScannerService,",
  "  henryTitleDeedScannerService as default,",
  "} from './henryTitleDeed/HenryTitleDeedScannerServiceCore';",
  ""
].join('\n');
fs.writeFileSync('src/services/HenryTitleDeedScannerService.ts', facadeContent);

console.log('HenryTitleDeedScannerService decomposed successfully');
