/**
 * floor-06-inventory-portfolio/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-06
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_06_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-06-1",
    slot: 1,
    title: "Master Real Estate Inventory Catalog Division",
    aiManager: "AI Sentinel Master",
    humanRole: "Inventory Catalog Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-06-2",
    slot: 2,
    title: "Landlord Mandates & Custody Division",
    aiManager: "AI Landlord Liaison",
    humanRole: "Landlord Mandates Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-06-3",
    slot: 3,
    title: "Residential Leasing & Tenancy Contracts Division",
    aiManager: "AI Tenancy Custody",
    humanRole: "Residential Leasing Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-06-4",
    slot: 4,
    title: "Community Cluster Valuation Division",
    aiManager: "AI Cluster Valuation",
    humanRole: "Asset Appraisal Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-06-5",
    slot: 5,
    title: "Property Snagging & Technical Audit Division",
    aiManager: "AI Asset Inspection",
    humanRole: "Property Inspection Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-06-6",
    slot: 6,
    title: "Off-Plan Construction Milestones Division",
    aiManager: "AI OffPlan Tracker",
    humanRole: "Construction Audits Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-06-7",
    slot: 7,
    title: "Smart Lockbox & Access Token Custody Division",
    aiManager: "AI Key Management",
    humanRole: "Key & Lockbox Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-06-8",
    slot: 8,
    title: "Bulk Investor Portfolios & Packaging Division",
    aiManager: "AI Bulk Investor Packs",
    humanRole: "Portfolio Packaging Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-06-9",
    slot: 9,
    title: "Inventory Lifecycle & Archival Division",
    aiManager: "AI Inventory Archive",
    humanRole: "Listing Archival Division Manager",
    desksCount: 12,
  },
] as const;
