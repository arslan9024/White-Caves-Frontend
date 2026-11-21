/**
 * floor-08-media-communications/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-08
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_08_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-08-1",
    slot: 1,
    title: "Executive Press & Global Bureau Division",
    linkedDivisionCode: "DIV-08-1",
  },
  {
    subDeptCode: "SUB-08-2",
    slot: 2,
    title: "High-End Architectural Media Studio Division",
    linkedDivisionCode: "DIV-08-2",
  },
  {
    subDeptCode: "SUB-08-3",
    slot: 3,
    title: "White Caves Luxury Magazine & Publishing Division",
    linkedDivisionCode: "DIV-08-3",
  },
  {
    subDeptCode: "SUB-08-4",
    slot: 4,
    title: "Podcast & Digital Livestream Studio Division",
    linkedDivisionCode: "DIV-08-4",
  },
  {
    subDeptCode: "SUB-08-5",
    slot: 5,
    title: "Luxury Influencer & Ambassador Desk Division",
    linkedDivisionCode: "DIV-08-5",
  },
  {
    subDeptCode: "SUB-08-6",
    slot: 6,
    title: "International Property Awards & Honors Division",
    linkedDivisionCode: "DIV-08-6",
  },
  {
    subDeptCode: "SUB-08-7",
    slot: 7,
    title: "Corporate Brand Reputation & Sentiment Division",
    linkedDivisionCode: "DIV-08-7",
  },
  {
    subDeptCode: "SUB-08-8",
    slot: 8,
    title: "Launch Press Conferences & Media Events Division",
    linkedDivisionCode: "DIV-08-8",
  },
  {
    subDeptCode: "SUB-08-9",
    slot: 9,
    title: "Encrypted VIP Broadcasts & Private Channels Division",
    linkedDivisionCode: "DIV-08-9",
  },
] as const;
