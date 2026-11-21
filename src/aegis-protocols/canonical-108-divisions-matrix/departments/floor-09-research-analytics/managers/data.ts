/**
 * floor-09-research-analytics/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-09
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_09_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-09-1",
    slot: 1,
    title: "DLD Transaction Science & Ingestion Division",
    aiManager: "AI Elena Science",
    humanRole: "Transaction Science Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-09-2",
    slot: 2,
    title: "Sub-Cluster Capital Appreciation ML Division",
    aiManager: "AI Predictive ML",
    humanRole: "Predictive Analytics Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-09-3",
    slot: 3,
    title: "Gross vs Net Rental Yield Modeling Division",
    aiManager: "AI Rental Yield Engine",
    humanRole: "Yield Science Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-09-4",
    slot: 4,
    title: "Geospatial Heatmaps & Footprint Division",
    aiManager: "AI Heatmap Geospatial",
    humanRole: "GIS & Heatmaps Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-09-5",
    slot: 5,
    title: "Market Competitor Pricing Radar Division",
    aiManager: "AI Competitor Radar",
    humanRole: "Competitor Intelligence Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-09-6",
    slot: 6,
    title: "Buyer Origin & Capital Flow Analytics Division",
    aiManager: "AI Demographics Profiler",
    humanRole: "Capital Demographics Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-09-7",
    slot: 7,
    title: "GCC Macroeconomics, Rates & Currency Division",
    aiManager: "AI Macro Pulse GCC",
    humanRole: "Macro Economics Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-09-8",
    slot: 8,
    title: "Dubai 2040 Urban Master Plan Intelligence Division",
    aiManager: "AI Master Plan Tracker",
    humanRole: "Urban Planning Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-09-9",
    slot: 9,
    title: "Quarterly Intelligence & White Paper Division",
    aiManager: "AI White Paper Studio",
    humanRole: "Market Reports Division Manager",
    desksCount: 12,
  },
] as const;
