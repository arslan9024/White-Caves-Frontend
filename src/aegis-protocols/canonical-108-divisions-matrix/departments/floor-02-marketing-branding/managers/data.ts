/**
 * floor-02-marketing-branding/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-02
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_02_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-02-1",
    slot: 1,
    title: "Paid Performance & Digital Ads Division",
    aiManager: "AI Olivia Performance",
    humanRole: "Performance Marketing Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-02-2",
    slot: 2,
    title: "Real Estate Portals & Syndication Division",
    aiManager: "AI Portal Syndicator",
    humanRole: "Portals Syndication Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-02-3",
    slot: 3,
    title: "Search Engine Dominance & SEO Division",
    aiManager: "AI SEO Dominance",
    humanRole: "Organic SEO Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-02-4",
    slot: 4,
    title: "Brand Identity & Corporate Aesthetic Division",
    aiManager: "AI Brand Guardian",
    humanRole: "Brand Identity Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-02-5",
    slot: 5,
    title: "Social Media & Video Production Division",
    aiManager: "AI Social Pulse",
    humanRole: "Social & Media Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-02-6",
    slot: 6,
    title: "3D Virtual Reality & CGI Studio Division",
    aiManager: "AI Creative Studio",
    humanRole: "CGI & Staging Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-02-7",
    slot: 7,
    title: "Lead Nurture & Email Automation Division",
    aiManager: "AI Email Nurture",
    humanRole: "Lifecycle Marketing Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-02-8",
    slot: 8,
    title: "Off-Plan Global Campaign Division",
    aiManager: "AI Event Promoter",
    humanRole: "Global Launches Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-02-9",
    slot: 9,
    title: "Attribution & Conversion Science Division",
    aiManager: "AI Performance Audit",
    humanRole: "Marketing Analytics Division Manager",
    desksCount: 12,
  },
] as const;
