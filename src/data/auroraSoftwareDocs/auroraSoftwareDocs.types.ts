/**
 * auroraSoftwareDocsRegistry.ts
 * Master Hyper-Linked HTML Software Engineering & Architecture Documentation Registry for Aurora AI (Item Code: 3.11)
 * 
 * System Specifications:
 * - Architecture: Feature-First Co-Located 4-Way Folder Segregation (View, Logic, Style, Data)
 * - Methodology: Rational Unified Process (RUP) & Inception-Elaboration-Construction-Transition
 * - Security & Access: RBAC 1-12-108 Tier Matrix & Founder Level 5 Sovereign Bypass
 * - Core Assistants: 3.19 Henry AI (Document Studio), 3.14 Theodora AI (67 Reports), 3.10 Zoe AI (Executive Docs)
 */

export interface DocSubItem {
  id: string;
  title: string;
  description: string;
}

export interface SoftwareDocItem {
  id: string;
  code: string;
  title: string;
  category: 'srs' | 'sdd' | 'architecture' | 'api' | 'rbac' | 'dedup' | 'testing' | 'devops' | 'pwa' | 'waves';
  phase: string;
  primaryAssistant: string;
  lastUpdated: string;
  summary: string;
  tags: string[];
  subItems: DocSubItem[];
  htmlContent: string;
}

export const AURORA_SOFTWARE_CATEGORIES = [
  { id: 'all', label: 'All Software Docs', count: 10 },
  { id: 'srs', label: '📋 SRS Requirements', count: 1 },
  { id: 'sdd', label: '📐 SDD System Design', count: 1 },
  { id: 'architecture', label: '🏛️ 4-Way Folder Standard', count: 1 },
  { id: 'api', label: '🔌 REST API Contracts', count: 1 },
  { id: 'rbac', label: '🛡️ RBAC 1-12-108 Matrix', count: 1 },
  { id: 'dedup', label: '⚡ Deduplication Engine', count: 1 },
  { id: 'testing', label: '🧪 SQA & Vitest Matrices', count: 1 },
  { id: 'devops', label: '🚀 DevOps & CI/CD Runbooks', count: 1 },
  { id: 'pwa', label: '📱 PWA Offline & Service Worker', count: 1 },
  { id: 'waves', label: '🌊 Waves 12–16 Engineering', count: 1 },
] as const;

