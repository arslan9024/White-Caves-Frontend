/**
 * floor-10-accounting-finance/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-10
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_10_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-10-1",
    slot: 1,
    title: "General Ledger & Statutory Audit Division",
    linkedDivisionCode: "DIV-10-1",
  },
  {
    subDeptCode: "SUB-10-2",
    slot: 2,
    title: "UAE Corporate Tax 9% Compliance Division",
    linkedDivisionCode: "DIV-10-2",
  },
  {
    subDeptCode: "SUB-10-3",
    slot: 3,
    title: "UAE FTA VAT 5% Compliance Division",
    linkedDivisionCode: "DIV-10-3",
  },
  {
    subDeptCode: "SUB-10-4",
    slot: 4,
    title: "RERA Trust & Escrow Reconciliations Division",
    linkedDivisionCode: "DIV-10-4",
  },
  {
    subDeptCode: "SUB-10-5",
    slot: 5,
    title: "Broker Commission Payroll & Split Ledger Division",
    linkedDivisionCode: "DIV-10-5",
  },
  {
    subDeptCode: "SUB-10-6",
    slot: 6,
    title: "Accounts Payable & Office OPEX Division",
    linkedDivisionCode: "DIV-10-6",
  },
  {
    subDeptCode: "SUB-10-7",
    slot: 7,
    title: "Multi-Currency Treasury & FX Hedging Division",
    linkedDivisionCode: "DIV-10-7",
  },
  {
    subDeptCode: "SUB-10-8",
    slot: 8,
    title: "Zoho Books Cloud ERP Synchronization Division",
    linkedDivisionCode: "DIV-10-8",
  },
  {
    subDeptCode: "SUB-10-9",
    slot: 9,
    title: "External Audit Defense & Forensic Finance Division",
    linkedDivisionCode: "DIV-10-9",
  },
] as const;
