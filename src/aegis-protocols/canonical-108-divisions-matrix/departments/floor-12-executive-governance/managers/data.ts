/**
 * floor-12-executive-governance/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-12
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_12_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-12-1",
    slot: 1,
    title: "Board Secretariat & Corporate Governance Division",
    aiManager: "AI Zayed Secretariat",
    humanRole: "Corporate Governance Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-12-2",
    slot: 2,
    title: "Long-Range Enterprise OKRs & Strategy Division",
    aiManager: "AI Strategic Roadmap",
    humanRole: "Enterprise Strategy Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-12-3",
    slot: 3,
    title: "Enterprise Risk & Catastrophe Shield Division",
    aiManager: "AI Risk Management",
    humanRole: "Risk Shield Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-12-4",
    slot: 4,
    title: "Executive AI Zoe Operations Desk Division",
    aiManager: "AI Zoe Liaison Desk",
    humanRole: "Executive Operations Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-12-5",
    slot: 5,
    title: "Company Merit Leaderboard & XP Master Division",
    aiManager: "AI Merit XP Master",
    humanRole: "Merit Gamification Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-12-6",
    slot: 6,
    title: "Cross-Department Statutory Policy Audit Division",
    aiManager: "AI Compliance Oversight",
    humanRole: "Policy Audits Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-12-7",
    slot: 7,
    title: "Capital Re-Investment & Sovereign Reserves Division",
    aiManager: "AI Capital Allocation",
    humanRole: "Sovereign Treasury Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-12-8",
    slot: 8,
    title: "Organizational Topology & Slot Protocol Division",
    aiManager: "AI Corporate Restructure",
    humanRole: "Org Topology Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-12-9",
    slot: 9,
    title: "Founder & Managing Director Sovereign Seal Division",
    aiManager: "AI Sovereign SignOff",
    humanRole: "Executive Seal Division Manager",
    desksCount: 12,
  },
] as const;
