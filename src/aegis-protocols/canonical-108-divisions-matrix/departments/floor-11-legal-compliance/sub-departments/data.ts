/**
 * floor-11-legal-compliance/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-11
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_11_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-11-1",
    slot: 1,
    title: "DLD & RERA Statutory Regulatory Division",
    linkedDivisionCode: "DIV-11-1",
  },
  {
    subDeptCode: "SUB-11-2",
    slot: 2,
    title: "Anti-Money Laundering & goAML Division",
    linkedDivisionCode: "DIV-11-2",
  },
  {
    subDeptCode: "SUB-11-3",
    slot: 3,
    title: "Trakheesi Advertising Permit Division",
    linkedDivisionCode: "DIV-11-3",
  },
  {
    subDeptCode: "SUB-11-4",
    slot: 4,
    title: "Form A Seller Mandates Integrity Division",
    linkedDivisionCode: "DIV-11-4",
  },
  {
    subDeptCode: "SUB-11-5",
    slot: 5,
    title: "Form B Buyer Representation Division",
    linkedDivisionCode: "DIV-11-5",
  },
  {
    subDeptCode: "SUB-11-6",
    slot: 6,
    title: "Form F Unified Sale Contract Division",
    linkedDivisionCode: "DIV-11-6",
  },
  {
    subDeptCode: "SUB-11-7",
    slot: 7,
    title: "Power of Attorney & Dubai Courts Notary Division",
    linkedDivisionCode: "DIV-11-7",
  },
  {
    subDeptCode: "SUB-11-8",
    slot: 8,
    title: "UAE Data Privacy Law (PDPL) Division",
    linkedDivisionCode: "DIV-11-8",
  },
  {
    subDeptCode: "SUB-11-9",
    slot: 9,
    title: "Rental Dispute Center & Legal Counsel Division",
    linkedDivisionCode: "DIV-11-9",
  },
] as const;
