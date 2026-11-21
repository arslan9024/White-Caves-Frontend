/**
 * floor-02-marketing-branding/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-02
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_02_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-02-1",
    slot: 1,
    title: "Paid Performance & Digital Ads Division",
    linkedDivisionCode: "DIV-02-1",
  },
  {
    subDeptCode: "SUB-02-2",
    slot: 2,
    title: "Real Estate Portals & Syndication Division",
    linkedDivisionCode: "DIV-02-2",
  },
  {
    subDeptCode: "SUB-02-3",
    slot: 3,
    title: "Search Engine Dominance & SEO Division",
    linkedDivisionCode: "DIV-02-3",
  },
  {
    subDeptCode: "SUB-02-4",
    slot: 4,
    title: "Brand Identity & Corporate Aesthetic Division",
    linkedDivisionCode: "DIV-02-4",
  },
  {
    subDeptCode: "SUB-02-5",
    slot: 5,
    title: "Social Media & Video Production Division",
    linkedDivisionCode: "DIV-02-5",
  },
  {
    subDeptCode: "SUB-02-6",
    slot: 6,
    title: "3D Virtual Reality & CGI Studio Division",
    linkedDivisionCode: "DIV-02-6",
  },
  {
    subDeptCode: "SUB-02-7",
    slot: 7,
    title: "Lead Nurture & Email Automation Division",
    linkedDivisionCode: "DIV-02-7",
  },
  {
    subDeptCode: "SUB-02-8",
    slot: 8,
    title: "Off-Plan Global Campaign Division",
    linkedDivisionCode: "DIV-02-8",
  },
  {
    subDeptCode: "SUB-02-9",
    slot: 9,
    title: "Attribution & Conversion Science Division",
    linkedDivisionCode: "DIV-02-9",
  },
] as const;
