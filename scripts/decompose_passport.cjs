const fs = require('fs');
const path = require('path');

const src = fs.readFileSync('src/services/HenryPassportScannerService.ts', 'utf8');
const lines = src.split('\n');

const dir = 'src/services/henryPassport';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// 1. henryPassport.types.ts (lines 11-12, 16-55)
const typesContent = [
  "import type { ScanReview } from '../henryScanReview';",
  "",
  ...lines.slice(16, 56),
  ""
].join('\n');
fs.writeFileSync(path.join(dir, 'henryPassport.types.ts'), typesContent);

// 2. henryPassport.samples.ts (lines 56-91)
const samplesContent = [
  "import type { InternationalPassportExtractedData } from './henryPassport.types';",
  "",
  ...lines.slice(56, 92),
  ""
].join('\n');
fs.writeFileSync(path.join(dir, 'henryPassport.samples.ts'), samplesContent);

// 3. mrzTd3Parser.ts (lines 140-205)
const mrzContent = [
  "import type { InternationalPassportExtractedData } from './henryPassport.types';",
  "",
  "export function formatCnicNumber(rawNumber: string): string {",
  ...lines.slice(143, 150),
  "",
  "export function parseTD3Mrz(line1: string, line2: string): Partial<InternationalPassportExtractedData> {",
  ...lines.slice(153, 206),
  ""
].join('\n');
fs.writeFileSync(path.join(dir, 'mrzTd3Parser.ts'), mrzContent);

// 4. HenryPassportScannerServiceCore.ts (class without mrz parser / samples / types)
const coreLines = [
  "import { ContractParty, ViewingFormPayload } from '../HenryPdfEngineService';",
  "import { ScanReview, canUseScan, saveReviewedScan, scanExpiry, validScanDate, VaultSaveOptions } from '../henryScanReview';",
  "import henryEmiratesIdScannerService from '../HenryEmiratesIdScannerService';",
  "import { readDocumentFields, normalizeDocumentDate, normalizeDocumentText, refreshCoverage, flagDocumentConflicts } from '../henryDocumentParsing';",
  "import logger from '../../utils/logger';",
  "import type { InternationalPassportExtractedData } from './henryPassport.types';",
  "import { ARSLAN_MALIK_SAMPLE_PASSPORT } from './henryPassport.samples';",
  "import { formatCnicNumber, parseTD3Mrz } from './mrzTd3Parser';",
  "",
  ...lines.slice(92, 140),
  "  formatCnicNumber(rawNumber: string): string {",
  "    return formatCnicNumber(rawNumber);",
  "  }",
  "",
  "  parseTD3Mrz(line1: string, line2: string): Partial<InternationalPassportExtractedData> {",
  "    return parseTD3Mrz(line1, line2);",
  "  }",
  "",
  ...lines.slice(206, 381),
  "export { HenryPassportScannerService };",
  "export const henryPassportScannerService = new HenryPassportScannerService();",
  "export default henryPassportScannerService;",
  ""
];
fs.writeFileSync(path.join(dir, 'HenryPassportScannerServiceCore.ts'), coreLines.join('\n'));

// 5. Facade src/services/HenryPassportScannerService.ts
const facadeContent = [
  "export type * from './henryPassport/henryPassport.types';",
  "export { ARSLAN_MALIK_SAMPLE_PASSPORT } from './henryPassport/henryPassport.samples';",
  "export {",
  "  HenryPassportScannerService,",
  "  henryPassportScannerService,",
  "  henryPassportScannerService as default,",
  "} from './henryPassport/HenryPassportScannerServiceCore';",
  ""
].join('\n');
fs.writeFileSync('src/services/HenryPassportScannerService.ts', facadeContent);

console.log('HenryPassportScannerService decomposed successfully');
