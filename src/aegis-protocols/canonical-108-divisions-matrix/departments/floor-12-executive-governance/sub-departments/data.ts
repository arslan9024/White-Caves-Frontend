/**
 * floor-12-executive-governance/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-12
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_12_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-12-1",
    slot: 1,
    title: "Board Secretariat & Corporate Governance Division",
    linkedDivisionCode: "DIV-12-1",
  },
  {
    subDeptCode: "SUB-12-2",
    slot: 2,
    title: "Long-Range Enterprise OKRs & Strategy Division",
    linkedDivisionCode: "DIV-12-2",
  },
  {
    subDeptCode: "SUB-12-3",
    slot: 3,
    title: "Enterprise Risk & Catastrophe Shield Division",
    linkedDivisionCode: "DIV-12-3",
  },
  {
    subDeptCode: "SUB-12-4",
    slot: 4,
    title: "Executive AI Zoe Operations Desk Division",
    linkedDivisionCode: "DIV-12-4",
  },
  {
    subDeptCode: "SUB-12-5",
    slot: 5,
    title: "Company Merit Leaderboard & XP Master Division",
    linkedDivisionCode: "DIV-12-5",
  },
  {
    subDeptCode: "SUB-12-6",
    slot: 6,
    title: "Cross-Department Statutory Policy Audit Division",
    linkedDivisionCode: "DIV-12-6",
  },
  {
    subDeptCode: "SUB-12-7",
    slot: 7,
    title: "Capital Re-Investment & Sovereign Reserves Division",
    linkedDivisionCode: "DIV-12-7",
  },
  {
    subDeptCode: "SUB-12-8",
    slot: 8,
    title: "Organizational Topology & Slot Protocol Division",
    linkedDivisionCode: "DIV-12-8",
  },
  {
    subDeptCode: "SUB-12-9",
    slot: 9,
    title: "Founder & Managing Director Sovereign Seal Division",
    linkedDivisionCode: "DIV-12-9",
  },
] as const;
