/**
 * floor-04-technology-systems/managers/data.ts — Level 2 Division Managers (9 Divisions) for DEPT-04
 */
import type { CanonicalDivisionItem } from '../../../types.ts';

export const FLOOR_04_MANAGERS_DATA: readonly CanonicalDivisionItem[] = [
  {
    code: "DIV-04-1",
    slot: 1,
    title: "Core Frontend & UI Architecture Division",
    aiManager: "AI Aurora Frontend",
    humanRole: "Frontend Architecture Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-04-2",
    slot: 2,
    title: "Backend Microservices & API Gateway Division",
    aiManager: "AI Backend Gate",
    humanRole: "Backend Systems Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-04-3",
    slot: 3,
    title: "Relational Schemas & Data Cluster Division",
    aiManager: "AI Database Prisma",
    humanRole: "Database Architecture Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-04-4",
    slot: 4,
    title: "DevOps, SRE & Cloud Automation Division",
    aiManager: "AI DevOps Cloud",
    humanRole: "DevOps & Cloud Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-04-5",
    slot: 5,
    title: "Sovereign Agent Mesh & Prompt Engineering Division",
    aiManager: "AI Agent Mesh Engine",
    humanRole: "AI Orchestration Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-04-6",
    slot: 6,
    title: "Application Defense & SecOps Integrity Division",
    aiManager: "AI Security Sentinel",
    humanRole: "Cyber Security Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-04-7",
    slot: 7,
    title: "Mobile Platform & Cross-Bridge Division",
    aiManager: "AI Mobile Bridge",
    humanRole: "Mobile Engineering Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-04-8",
    slot: 8,
    title: "Vision OCR & Document Intelligence Division",
    aiManager: "AI Vision OCR Core",
    humanRole: "Document AI Division Manager",
    desksCount: 12,
  },
  {
    code: "DIV-04-9",
    slot: 9,
    title: "Disaster Recovery & Encrypted Storage Division",
    aiManager: "AI System Backup",
    humanRole: "Storage & DR Division Manager",
    desksCount: 12,
  },
] as const;
