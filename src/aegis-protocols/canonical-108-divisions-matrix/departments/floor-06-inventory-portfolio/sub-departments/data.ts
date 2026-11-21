/**
 * floor-06-inventory-portfolio/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-06
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_06_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-06-1",
    slot: 1,
    title: "Master Real Estate Inventory Catalog Division",
    linkedDivisionCode: "DIV-06-1",
  },
  {
    subDeptCode: "SUB-06-2",
    slot: 2,
    title: "Landlord Mandates & Custody Division",
    linkedDivisionCode: "DIV-06-2",
  },
  {
    subDeptCode: "SUB-06-3",
    slot: 3,
    title: "Residential Leasing & Tenancy Contracts Division",
    linkedDivisionCode: "DIV-06-3",
  },
  {
    subDeptCode: "SUB-06-4",
    slot: 4,
    title: "Community Cluster Valuation Division",
    linkedDivisionCode: "DIV-06-4",
  },
  {
    subDeptCode: "SUB-06-5",
    slot: 5,
    title: "Property Snagging & Technical Audit Division",
    linkedDivisionCode: "DIV-06-5",
  },
  {
    subDeptCode: "SUB-06-6",
    slot: 6,
    title: "Off-Plan Construction Milestones Division",
    linkedDivisionCode: "DIV-06-6",
  },
  {
    subDeptCode: "SUB-06-7",
    slot: 7,
    title: "Smart Lockbox & Access Token Custody Division",
    linkedDivisionCode: "DIV-06-7",
  },
  {
    subDeptCode: "SUB-06-8",
    slot: 8,
    title: "Bulk Investor Portfolios & Packaging Division",
    linkedDivisionCode: "DIV-06-8",
  },
  {
    subDeptCode: "SUB-06-9",
    slot: 9,
    title: "Inventory Lifecycle & Archival Division",
    linkedDivisionCode: "DIV-06-9",
  },
] as const;
