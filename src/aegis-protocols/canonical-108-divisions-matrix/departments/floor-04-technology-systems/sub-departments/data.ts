/**
 * floor-04-technology-systems/sub-departments/data.ts — 9 Sub-Department Tracks for DEPT-04
 */
import type { SubDepartmentTrack } from '../../../types.ts';

export const FLOOR_04_SUB_DEPARTMENTS_DATA: readonly SubDepartmentTrack[] = [
  {
    subDeptCode: "SUB-04-1",
    slot: 1,
    title: "Core Frontend & UI Architecture Division",
    linkedDivisionCode: "DIV-04-1",
  },
  {
    subDeptCode: "SUB-04-2",
    slot: 2,
    title: "Backend Microservices & API Gateway Division",
    linkedDivisionCode: "DIV-04-2",
  },
  {
    subDeptCode: "SUB-04-3",
    slot: 3,
    title: "Relational Schemas & Data Cluster Division",
    linkedDivisionCode: "DIV-04-3",
  },
  {
    subDeptCode: "SUB-04-4",
    slot: 4,
    title: "DevOps, SRE & Cloud Automation Division",
    linkedDivisionCode: "DIV-04-4",
  },
  {
    subDeptCode: "SUB-04-5",
    slot: 5,
    title: "Sovereign Agent Mesh & Prompt Engineering Division",
    linkedDivisionCode: "DIV-04-5",
  },
  {
    subDeptCode: "SUB-04-6",
    slot: 6,
    title: "Application Defense & SecOps Integrity Division",
    linkedDivisionCode: "DIV-04-6",
  },
  {
    subDeptCode: "SUB-04-7",
    slot: 7,
    title: "Mobile Platform & Cross-Bridge Division",
    linkedDivisionCode: "DIV-04-7",
  },
  {
    subDeptCode: "SUB-04-8",
    slot: 8,
    title: "Vision OCR & Document Intelligence Division",
    linkedDivisionCode: "DIV-04-8",
  },
  {
    subDeptCode: "SUB-04-9",
    slot: 9,
    title: "Disaster Recovery & Encrypted Storage Division",
    linkedDivisionCode: "DIV-04-9",
  },
] as const;
