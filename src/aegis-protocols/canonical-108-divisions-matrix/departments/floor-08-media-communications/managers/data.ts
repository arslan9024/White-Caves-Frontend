/**
 * floor-08-media-communications/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-08
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_08_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-08-1",
    slot: 1,
    title: "Executive Press & Global Bureau Division",
    aiManager: "AI Maya PR",
    humanRole: "Press & PR Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-08-2",
    slot: 2,
    title: "High-End Architectural Media Studio Division",
    aiManager: "AI Media Studio",
    humanRole: "Studio Production Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-08-3",
    slot: 3,
    title: "White Caves Luxury Magazine & Publishing Division",
    aiManager: "AI Editorial Publish",
    humanRole: "Editorial Publishing Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-08-4",
    slot: 4,
    title: "Podcast & Digital Livestream Studio Division",
    aiManager: "AI Podcaster Core",
    humanRole: "Broadcast Audio Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-08-5",
    slot: 5,
    title: "Luxury Influencer & Ambassador Desk Division",
    aiManager: "AI Influencer Desk",
    humanRole: "Influencer Relations Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-08-6",
    slot: 6,
    title: "International Property Awards & Honors Division",
    aiManager: "AI Award Submissions",
    humanRole: "Industry Accolades Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-08-7",
    slot: 7,
    title: "Corporate Brand Reputation & Sentiment Division",
    aiManager: "AI Corporate Identity",
    humanRole: "Reputation Defense Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-08-8",
    slot: 8,
    title: "Launch Press Conferences & Media Events Division",
    aiManager: "AI Event Press Office",
    humanRole: "Media Events Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-08-9",
    slot: 9,
    title: "Encrypted VIP Broadcasts & Private Channels Division",
    aiManager: "AI Digital Broadcasting",
    humanRole: "VIP Broadcasting Division Manager",
    desksCount: 12,
  },
] as const;
