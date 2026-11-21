/**
 * floor-01-customer-experience/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-01
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_01_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-01-1",
    slot: 1,
    title: "VIP Welcome & Frontline Concierge Division",
    linkedDivisionCode: "DIV-01-1",
  },
  {
    subDeptCode: "SUB-01-2",
    slot: 2,
    title: "Luxury Mobility & Chauffeur Fleet Division",
    linkedDivisionCode: "DIV-01-2",
  },
  {
    subDeptCode: "SUB-01-3",
    slot: 3,
    title: "Global Multilingual Reception Division",
    linkedDivisionCode: "DIV-01-3",
  },
  {
    subDeptCode: "SUB-01-4",
    slot: 4,
    title: "Client Onboarding & VIP Intake Division",
    linkedDivisionCode: "DIV-01-4",
  },
  {
    subDeptCode: "SUB-01-5",
    slot: 5,
    title: "Client NPS & Experience Audit Division",
    linkedDivisionCode: "DIV-01-5",
  },
  {
    subDeptCode: "SUB-01-6",
    slot: 6,
    title: "HNW Client Loyalty & Privileges Division",
    linkedDivisionCode: "DIV-01-6",
  },
  {
    subDeptCode: "SUB-01-7",
    slot: 7,
    title: "Private Showcase & Gala Hosting Division",
    linkedDivisionCode: "DIV-01-7",
  },
  {
    subDeptCode: "SUB-01-8",
    slot: 8,
    title: "Escalation & 24/7 Rapid Response Division",
    linkedDivisionCode: "DIV-01-8",
  },
  {
    subDeptCode: "SUB-01-9",
    slot: 9,
    title: "Sovereign Family Office Advisory Division",
    linkedDivisionCode: "DIV-01-9",
  },
] as const;
