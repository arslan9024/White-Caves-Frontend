/**
 * floor-09-research-analytics/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-09
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_09_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-09-1",
    slot: 1,
    title: "DLD Transaction Science & Ingestion Division",
    linkedDivisionCode: "DIV-09-1",
  },
  {
    subDeptCode: "SUB-09-2",
    slot: 2,
    title: "Sub-Cluster Capital Appreciation ML Division",
    linkedDivisionCode: "DIV-09-2",
  },
  {
    subDeptCode: "SUB-09-3",
    slot: 3,
    title: "Gross vs Net Rental Yield Modeling Division",
    linkedDivisionCode: "DIV-09-3",
  },
  {
    subDeptCode: "SUB-09-4",
    slot: 4,
    title: "Geospatial Heatmaps & Footprint Division",
    linkedDivisionCode: "DIV-09-4",
  },
  {
    subDeptCode: "SUB-09-5",
    slot: 5,
    title: "Market Competitor Pricing Radar Division",
    linkedDivisionCode: "DIV-09-5",
  },
  {
    subDeptCode: "SUB-09-6",
    slot: 6,
    title: "Buyer Origin & Capital Flow Analytics Division",
    linkedDivisionCode: "DIV-09-6",
  },
  {
    subDeptCode: "SUB-09-7",
    slot: 7,
    title: "GCC Macroeconomics, Rates & Currency Division",
    linkedDivisionCode: "DIV-09-7",
  },
  {
    subDeptCode: "SUB-09-8",
    slot: 8,
    title: "Dubai 2040 Urban Master Plan Intelligence Division",
    linkedDivisionCode: "DIV-09-8",
  },
  {
    subDeptCode: "SUB-09-9",
    slot: 9,
    title: "Quarterly Intelligence & White Paper Division",
    linkedDivisionCode: "DIV-09-9",
  },
] as const;
