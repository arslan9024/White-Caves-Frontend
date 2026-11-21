/**
 * floor-10-accounting-finance/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-10
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_10_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-10-1",
    slot: 1,
    title: "General Ledger & Statutory Audit Division",
    aiManager: "AI Theodora Controller",
    humanRole: "Financial Controller Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-10-2",
    slot: 2,
    title: "UAE Corporate Tax 9% Compliance Division",
    aiManager: "AI UAE Tax Engine",
    humanRole: "Corporate Tax Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-10-3",
    slot: 3,
    title: "UAE FTA VAT 5% Compliance Division",
    aiManager: "AI UAE VAT Compliance",
    humanRole: "VAT & Invoicing Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-10-4",
    slot: 4,
    title: "RERA Trust & Escrow Reconciliations Division",
    aiManager: "AI Escrow Account Sync",
    humanRole: "Escrow Audit Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-10-5",
    slot: 5,
    title: "Broker Commission Payroll & Split Ledger Division",
    aiManager: "AI Broker Payroll Comm",
    humanRole: "Commission Accounting Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-10-6",
    slot: 6,
    title: "Accounts Payable & Office OPEX Division",
    aiManager: "AI Accounts Payable",
    humanRole: "Accounts Payable Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-10-7",
    slot: 7,
    title: "Multi-Currency Treasury & FX Hedging Division",
    aiManager: "AI Treasury Forex",
    humanRole: "Treasury & FX Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-10-8",
    slot: 8,
    title: "Zoho Books Cloud ERP Synchronization Division",
    aiManager: "AI Zoho Books Sync",
    humanRole: "ERP Accounting Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-10-9",
    slot: 9,
    title: "External Audit Defense & Forensic Finance Division",
    aiManager: "AI Financial Auditor",
    humanRole: "Audit Defense Division Manager",
    desksCount: 12,
  },
] as const;
