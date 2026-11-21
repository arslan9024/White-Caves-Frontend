/**
 * floor-11-legal-compliance/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-11
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_11_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-11-1",
    slot: 1,
    title: "DLD & RERA Statutory Regulatory Division",
    aiManager: "AI Sofia Regulatory",
    humanRole: "RERA Regulatory Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-11-2",
    slot: 2,
    title: "Anti-Money Laundering & goAML Division",
    aiManager: "AI goAML Screening",
    humanRole: "AML Compliance Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-11-3",
    slot: 3,
    title: "Trakheesi Advertising Permit Division",
    aiManager: "AI Trakheesi Engine",
    humanRole: "Trakheesi Permits Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-11-4",
    slot: 4,
    title: "Form A Seller Mandates Integrity Division",
    aiManager: "AI Form A Contract",
    humanRole: "Seller Mandates Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-11-5",
    slot: 5,
    title: "Form B Buyer Representation Division",
    aiManager: "AI Form B Contract",
    humanRole: "Buyer Mandates Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-11-6",
    slot: 6,
    title: "Form F Unified Sale Contract Division",
    aiManager: "AI Form F Contract",
    humanRole: "MOU & Contracts Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-11-7",
    slot: 7,
    title: "Power of Attorney & Dubai Courts Notary Division",
    aiManager: "AI POA Verification",
    humanRole: "Notary & POA Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-11-8",
    slot: 8,
    title: "UAE Data Privacy Law (PDPL) Division",
    aiManager: "AI Data Privacy Law",
    humanRole: "Data Protection Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-11-9",
    slot: 9,
    title: "Rental Dispute Center & Legal Counsel Division",
    aiManager: "AI Legal Arbitration",
    humanRole: "Legal Arbitration Division Manager",
    desksCount: 12,
  },
] as const;
