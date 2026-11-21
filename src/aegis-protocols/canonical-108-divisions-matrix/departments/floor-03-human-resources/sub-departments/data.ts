/**
 * floor-03-human-resources/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-03
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_03_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-03-1",
    slot: 1,
    title: "Executive Headhunting & Talent Sourcing Division",
    linkedDivisionCode: "DIV-03-1",
  },
  {
    subDeptCode: "SUB-03-2",
    slot: 2,
    title: "RERA Licensing & Broker Accreditation Division",
    linkedDivisionCode: "DIV-03-2",
  },
  {
    subDeptCode: "SUB-03-3",
    slot: 3,
    title: "Agent Quotas & Merit XP Scoring Division",
    linkedDivisionCode: "DIV-03-3",
  },
  {
    subDeptCode: "SUB-03-4",
    slot: 4,
    title: "UAE Visa, PRO & Relocation Division",
    linkedDivisionCode: "DIV-03-4",
  },
  {
    subDeptCode: "SUB-03-5",
    slot: 5,
    title: "MoHRE Labour & WPS Payroll Division",
    linkedDivisionCode: "DIV-03-5",
  },
  {
    subDeptCode: "SUB-03-6",
    slot: 6,
    title: "White Caves Broker Academy Division",
    linkedDivisionCode: "DIV-03-6",
  },
  {
    subDeptCode: "SUB-03-7",
    slot: 7,
    title: "Workforce Scheduling & Leaves Division",
    linkedDivisionCode: "DIV-03-7",
  },
  {
    subDeptCode: "SUB-03-8",
    slot: 8,
    title: "Emiratisation & Nafis Program Division",
    linkedDivisionCode: "DIV-03-8",
  },
  {
    subDeptCode: "SUB-03-9",
    slot: 9,
    title: "Corporate Ethics & Conduct Arbitration Division",
    linkedDivisionCode: "DIV-03-9",
  },
] as const;
