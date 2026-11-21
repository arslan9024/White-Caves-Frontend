/**
 * floor-05-sales-operations/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-05
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_05_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-05-1",
    slot: 1,
    title: "Developer Off-Plan Launch Sales Division",
    linkedDivisionCode: "DIV-05-1",
  },
  {
    subDeptCode: "SUB-05-2",
    slot: 2,
    title: "Luxury Secondary Resales & Villas Division",
    linkedDivisionCode: "DIV-05-2",
  },
  {
    subDeptCode: "SUB-05-3",
    slot: 3,
    title: "Commercial Real Estate & Investment Division",
    linkedDivisionCode: "DIV-05-3",
  },
  {
    subDeptCode: "SUB-05-4",
    slot: 4,
    title: "Investor Matching & Buyer Profiling Division",
    linkedDivisionCode: "DIV-05-4",
  },
  {
    subDeptCode: "SUB-05-5",
    slot: 5,
    title: "Private Viewings & Open House Logistics Division",
    linkedDivisionCode: "DIV-05-5",
  },
  {
    subDeptCode: "SUB-05-6",
    slot: 6,
    title: "Luxury Transaction Closing & Settlement Division",
    linkedDivisionCode: "DIV-05-6",
  },
  {
    subDeptCode: "SUB-05-7",
    slot: 7,
    title: "Pipeline Velocity & Stage-Gate Monitoring Division",
    linkedDivisionCode: "DIV-05-7",
  },
  {
    subDeptCode: "SUB-05-8",
    slot: 8,
    title: "Broker Commission Splits & Settlement Division",
    linkedDivisionCode: "DIV-05-8",
  },
  {
    subDeptCode: "SUB-05-9",
    slot: 9,
    title: "Lead Distribution & Round-Robin Routing Division",
    linkedDivisionCode: "DIV-05-9",
  },
] as const;
