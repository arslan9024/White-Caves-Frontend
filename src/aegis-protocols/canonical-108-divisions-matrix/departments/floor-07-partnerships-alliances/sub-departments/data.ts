/**
 * floor-07-partnerships-alliances/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-07
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_07_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-07-1",
    slot: 1,
    title: "Master Developer Institutional Alliances Division",
    linkedDivisionCode: "DIV-07-1",
  },
  {
    subDeptCode: "SUB-07-2",
    slot: 2,
    title: "Family Office & Sovereign Wealth Division",
    linkedDivisionCode: "DIV-07-2",
  },
  {
    subDeptCode: "SUB-07-3",
    slot: 3,
    title: "Mortgage Brokerage & Banking Network Division",
    linkedDivisionCode: "DIV-07-3",
  },
  {
    subDeptCode: "SUB-07-4",
    slot: 4,
    title: "Global Wealth Inbound Corridors Division",
    linkedDivisionCode: "DIV-07-4",
  },
  {
    subDeptCode: "SUB-07-5",
    slot: 5,
    title: "Branded Residences & Haute Couture Alliances Division",
    linkedDivisionCode: "DIV-07-5",
  },
  {
    subDeptCode: "SUB-07-6",
    slot: 6,
    title: "Corporate Relocation & Expat Concierge Division",
    linkedDivisionCode: "DIV-07-6",
  },
  {
    subDeptCode: "SUB-07-7",
    slot: 7,
    title: "Government PRO & Golden Visa Alliances Division",
    linkedDivisionCode: "DIV-07-7",
  },
  {
    subDeptCode: "SUB-07-8",
    slot: 8,
    title: "Strategic M&A & Franchise Expansion Division",
    linkedDivisionCode: "DIV-07-8",
  },
  {
    subDeptCode: "SUB-07-9",
    slot: 9,
    title: "Luxury Sponsorships & Gala Alliances Division",
    linkedDivisionCode: "DIV-07-9",
  },
] as const;
