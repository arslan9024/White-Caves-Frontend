/**
 * Company Master Ledger — Strongly-Typed Mock Data Facade
 */
import { LedgerEntry } from './companyMasterLedger/companyMasterLedger.types';
import { LEDGER_PART_01 } from './companyMasterLedger/ledgerPart01';
import { LEDGER_PART_02 } from './companyMasterLedger/ledgerPart02';
import { LEDGER_PART_03 } from './companyMasterLedger/ledgerPart03';
import { LEDGER_PART_04 } from './companyMasterLedger/ledgerPart04';
import { LEDGER_PART_05 } from './companyMasterLedger/ledgerPart05';
import { LEDGER_PART_06 } from './companyMasterLedger/ledgerPart06';
import { LEDGER_PART_07 } from './companyMasterLedger/ledgerPart07';
import { LEDGER_PART_08 } from './companyMasterLedger/ledgerPart08';
import { LEDGER_PART_09 } from './companyMasterLedger/ledgerPart09';
import { LEDGER_PART_10 } from './companyMasterLedger/ledgerPart10';
import { LEDGER_PART_11 } from './companyMasterLedger/ledgerPart11';

export type * from './companyMasterLedger/companyMasterLedger.types';

export const COMPANY_MASTER_LEDGER: LedgerEntry[] = [
  ...LEDGER_PART_01,
  ...LEDGER_PART_02,
  ...LEDGER_PART_03,
  ...LEDGER_PART_04,
  ...LEDGER_PART_05,
  ...LEDGER_PART_06,
  ...LEDGER_PART_07,
  ...LEDGER_PART_08,
  ...LEDGER_PART_09,
  ...LEDGER_PART_10,
  ...LEDGER_PART_11,
];

// --- Helpers ---
export const getLedgerEntryById = (id: string): LedgerEntry | undefined =>
  COMPANY_MASTER_LEDGER.find(e => e.id === id);

export const getLedgerByDepartment = (deptCode: string): LedgerEntry[] =>
  COMPANY_MASTER_LEDGER.filter(e => e.departmentCode === deptCode);

export const getTopPerformers = (limit = 10): LedgerEntry[] =>
  [...COMPANY_MASTER_LEDGER].sort((a, b) => b.merit_xp_count - a.merit_xp_count).slice(0, limit);

export default COMPANY_MASTER_LEDGER;

