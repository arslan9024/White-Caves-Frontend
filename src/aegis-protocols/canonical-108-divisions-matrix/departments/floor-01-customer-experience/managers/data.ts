/**
 * floor-01-customer-experience/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-01
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_01_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-01-1",
    slot: 1,
    title: "VIP Welcome & Frontline Concierge Division",
    aiManager: "AI Corinne Frontline",
    humanRole: "VIP Concierge Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-01-2",
    slot: 2,
    title: "Luxury Mobility & Chauffeur Fleet Division",
    aiManager: "AI Chauffeur Logistics",
    humanRole: "Fleet & Mobility Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-01-3",
    slot: 3,
    title: "Global Multilingual Reception Division",
    aiManager: "AI Multilingual Desk",
    humanRole: "International Desk Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-01-4",
    slot: 4,
    title: "Client Onboarding & VIP Intake Division",
    aiManager: "AI ClientCare Lead",
    humanRole: "Client Onboarding Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-01-5",
    slot: 5,
    title: "Client NPS & Experience Audit Division",
    aiManager: "AI Feedback Sentinel",
    humanRole: "Client Experience Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-01-6",
    slot: 6,
    title: "HNW Client Loyalty & Privileges Division",
    aiManager: "AI Retention Care",
    humanRole: "VIP Loyalty Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-01-7",
    slot: 7,
    title: "Private Showcase & Gala Hosting Division",
    aiManager: "AI Event Hostess",
    humanRole: "Events & Showcases Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-01-8",
    slot: 8,
    title: "Escalation & 24/7 Rapid Response Division",
    aiManager: "AI Emergency Relief",
    humanRole: "Emergency Concierge Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-01-9",
    slot: 9,
    title: "Sovereign Family Office Advisory Division",
    aiManager: "AI Sovereign Advisory",
    humanRole: "Family Office Concierge Division Manager",
    desksCount: 12,
  },
] as const;
