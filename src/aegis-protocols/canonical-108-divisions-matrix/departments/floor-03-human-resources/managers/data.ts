/**
 * floor-03-human-resources/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-03
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_03_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-03-1",
    slot: 1,
    title: "Executive Headhunting & Talent Sourcing Division",
    aiManager: "AI Selena Talent",
    humanRole: "Headhunting Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-03-2",
    slot: 2,
    title: "RERA Licensing & Broker Accreditation Division",
    aiManager: "AI Broker Licensing",
    humanRole: "Licensing Compliance Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-03-3",
    slot: 3,
    title: "Agent Quotas & Merit XP Scoring Division",
    aiManager: "AI Performance KPI",
    humanRole: "Sales Performance Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-03-4",
    slot: 4,
    title: "UAE Visa, PRO & Relocation Division",
    aiManager: "AI Visa Relocation",
    humanRole: "PRO & Immigration Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-03-5",
    slot: 5,
    title: "MoHRE Labour & WPS Payroll Division",
    aiManager: "AI MoHRE Payroll",
    humanRole: "WPS Payroll Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-03-6",
    slot: 6,
    title: "White Caves Broker Academy Division",
    aiManager: "AI Broker Academy",
    humanRole: "Training Academy Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-03-7",
    slot: 7,
    title: "Workforce Scheduling & Leaves Division",
    aiManager: "AI Attendance Leaves",
    humanRole: "Workforce Planning Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-03-8",
    slot: 8,
    title: "Emiratisation & Nafis Program Division",
    aiManager: "AI Emiratisation Desk",
    humanRole: "Emiratisation Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-03-9",
    slot: 9,
    title: "Corporate Ethics & Conduct Arbitration Division",
    aiManager: "AI Culture Ethics",
    humanRole: "Ethics & Conduct Division Manager",
    desksCount: 12,
  },
] as const;
