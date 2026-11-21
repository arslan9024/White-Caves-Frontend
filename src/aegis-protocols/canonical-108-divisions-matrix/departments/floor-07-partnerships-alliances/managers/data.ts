/**
 * floor-07-partnerships-alliances/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-07
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_07_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-07-1",
    slot: 1,
    title: "Master Developer Institutional Alliances Division",
    aiManager: "AI Maktoum Alliances",
    humanRole: "Developer Alliances Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-07-2",
    slot: 2,
    title: "Family Office & Sovereign Wealth Division",
    aiManager: "AI Family Office",
    humanRole: "Family Office Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-07-3",
    slot: 3,
    title: "Mortgage Brokerage & Banking Network Division",
    aiManager: "AI Bank Mortgages",
    humanRole: "Mortgage Alliances Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-07-4",
    slot: 4,
    title: "Global Wealth Inbound Corridors Division",
    aiManager: "AI Global Corridors",
    humanRole: "Global Desks Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-07-5",
    slot: 5,
    title: "Branded Residences & Haute Couture Alliances Division",
    aiManager: "AI Luxury Brands",
    humanRole: "Branded Living Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-07-6",
    slot: 6,
    title: "Corporate Relocation & Expat Concierge Division",
    aiManager: "AI Relocation Partners",
    humanRole: "Corporate Mobility Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-07-7",
    slot: 7,
    title: "Government PRO & Golden Visa Alliances Division",
    aiManager: "AI Golden Visa Network",
    humanRole: "Golden Visa Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-07-8",
    slot: 8,
    title: "Strategic M&A & Franchise Expansion Division",
    aiManager: "AI Venture Expansion",
    humanRole: "Corporate Development Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-07-9",
    slot: 9,
    title: "Luxury Sponsorships & Gala Alliances Division",
    aiManager: "AI Sponsorship Alliance",
    humanRole: "Sponsorships Division Manager",
    desksCount: 12,
  },
] as const;
