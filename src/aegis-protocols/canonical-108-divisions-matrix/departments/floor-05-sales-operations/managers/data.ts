/**
 * floor-05-sales-operations/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-05
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_05_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-05-1",
    slot: 1,
    title: "Developer Off-Plan Launch Sales Division",
    aiManager: "AI OffPlan Allocation",
    humanRole: "Off-Plan Sales Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-05-2",
    slot: 2,
    title: "Luxury Secondary Resales & Villas Division",
    aiManager: "AI Clara Secondary",
    humanRole: "Resale Brokerage Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-05-3",
    slot: 3,
    title: "Commercial Real Estate & Investment Division",
    aiManager: "AI Commercial Broker",
    humanRole: "Commercial Sales Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-05-4",
    slot: 4,
    title: "Investor Matching & Buyer Profiling Division",
    aiManager: "AI Buyer Matcher",
    humanRole: "Investor Advisory Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-05-5",
    slot: 5,
    title: "Private Viewings & Open House Logistics Division",
    aiManager: "AI Viewing Scheduler",
    humanRole: "Viewings Dispatch Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-05-6",
    slot: 6,
    title: "Luxury Transaction Closing & Settlement Division",
    aiManager: "AI Deal Closer",
    humanRole: "Deal Settlement Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-05-7",
    slot: 7,
    title: "Pipeline Velocity & Stage-Gate Monitoring Division",
    aiManager: "AI Pipeline Velocity",
    humanRole: "Sales Operations Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-05-8",
    slot: 8,
    title: "Broker Commission Splits & Settlement Division",
    aiManager: "AI Commission Splitter",
    humanRole: "Commission Ledger Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-05-9",
    slot: 9,
    title: "Lead Distribution & Round-Robin Routing Division",
    aiManager: "AI Lead Distributor",
    humanRole: "Lead Routing Division Manager",
    desksCount: 12,
  },
] as const;
