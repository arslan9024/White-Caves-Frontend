// FILE: src/components/crm/AiAssistantManager/AiAssistantManager.data.ts
/**
 * White Caves Real Estate LLC - AI Assistants Management System (AIAMS) Seed & Storage
 * Standard: AEGIS Canonical 12-Way Architecture Standard (Data & Persistence)
 * Single Purpose File Law: < 350 lines
 */

import {
  EXECUTIVE_COMMAND_1,
  CORPORATE_DEPARTMENTS_12,
  SUPERVISORS_108,
} from '../../../data/assistants108Registry.data';
import { MASTER_35_AI_ASSISTANTS } from '../../../data/assistants35Registry.data';
import { loadStoredDepartments } from '../DepartmentManager/DepartmentManagementWorkspace.storage';
import type { AiAgentRecord } from './AiAssistantManager.types';

export const AIAMS_STORAGE_KEY = 'wc_aiams_agents_v2';
export const AIAMS_SYNC_EVENT = 'wc-aiams-agents-updated';

/**
 * Returns the locked 12 departments from database storage or fallback
 */
export function getResolvedCorporateDepartmentsOptions() {
  const storedDepts = typeof window !== 'undefined' ? loadStoredDepartments() : [];
  return [
    { id: 'all', name: 'All 12 Corporate Departments' },
    { id: 'executive_command', name: 'Floor 13 · Executive Command (MD & COO)' },
    ...CORPORATE_DEPARTMENTS_12.map((d, idx) => {
      const match = storedDepts.find(sd => sd.slug === d.id || sd.order === idx + 1);
      return {
        id: d.id,
        name: match ? `${match.code} · ${match.title}` : `${d.code} · ${d.name}`,
      };
    }),
  ];
}

export const AI_DEPARTMENTS_OPTIONS = getResolvedCorporateDepartmentsOptions();

export const AI_MODELS_LIST = [
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-2.0-flash',
  'claude-3-5-sonnet',
  'gpt-4o',
];

function buildCanonicalAiAgentsSeed(): AiAgentRecord[] {
  const storedDepts = typeof window !== 'undefined' ? loadStoredDepartments() : [];

  const zoeAgent: AiAgentRecord = {
    id: 'ai-zoe-001',
    agentId: EXECUTIVE_COMMAND_1.executiveAi.id,
    code: EXECUTIVE_COMMAND_1.executiveAi.code,
    name: EXECUTIVE_COMMAND_1.executiveAi.name,
    role: EXECUTIVE_COMMAND_1.executiveAi.title,
    departmentId: 'executive_command',
    department: 'Executive Governance & Sovereign Operations',
    tier: 'EXECUTIVE',
    status: 'OPTIMAL',
    model: 'gemini-1.5-pro',
    specialty: EXECUTIVE_COMMAND_1.executiveAi.role,
    systemPrompt:
      'Directs the 1-12-108 autonomous AI mesh and executes P0 SLA workflows under Managing Director authority.',
    capabilities: [
      '1-12-108 Mesh Orchestration',
      '15-Min SLA Enforcement',
      'Cross-Department Governance',
      'Statutory Compliance Audit',
    ],
    assignedTasks: EXECUTIVE_COMMAND_1.executiveAi.responsibilities,
    slaResponseTime: '< 2s',
    accuracyRate: 99.9,
    activeWorkload: 28,
    avatar: EXECUTIVE_COMMAND_1.executiveAi.avatar,
  };

  const lindaAgent: AiAgentRecord = {
    id: 'ai-linda-001',
    agentId: 'linda',
    code: 'SUP-08-1-01-1',
    name: 'AI Linda Supervisor',
    role: 'Supervisor — WhatsApp Automation & 10-SIM Fleet (Reports to AMGR-08-1-01 AI Samira → MGR-08-1 AI Nadia → DIR-08 AI Maya → AI Zoe)',
    departmentId: 'media_public_relations',
    department: 'DEPT-08 · Media, Public Relations & Communications',
    tier: 'SUPERVISOR',
    status: 'ACTIVE',
    model: 'gemini-1.5-flash',
    specialty: '10-SIM WhatsApp Outreach (+971505760056 Master + 9 Hunters) & Lead Qualification',
    systemPrompt:
      'Sovereign WhatsApp Supervisor (SUP-08-1-01-1) driving DAMAC Hills 2 landlord outreach, bilingual EN/AR qualification, and Mary/Daisy/Henry handoffs.',
    capabilities: [
      '10-SIM WhatsApp Fleet',
      'Bilingual EN/AR',
      'DH2 Landlord Outreach',
      'Lead Scoring',
    ],
    assignedTasks: [
      'Instant 60-second WhatsApp lead qualification',
      'Automated viewing scheduling & CRM sync',
    ],
    slaResponseTime: '< 3s',
    accuracyRate: 99.6,
    activeWorkload: 18,
    avatar: 'https://ui-avatars.com/api/?name=Linda+Sup&background=25D366&color=fff',
  };

  const maryAgent: AiAgentRecord = {
    id: 'ai-mary-001',
    agentId: 'mary',
    code: 'SUP-06-1-01-1',
    name: 'AI Mary Supervisor',
    role: 'Supervisor — DAMAC Hills 2 Master Inventory Vault (Reports to AMGR-06-1-01 AI Farah → MGR-06-1 AI Yasmin → DIR-06 AI Sentinel → AI Zoe)',
    departmentId: 'inventory_portfolio',
    department: 'DEPT-06 · Inventory, Portfolio & Asset Management',
    tier: 'SUPERVISOR',
    status: 'OPTIMAL',
    model: 'gemini-1.5-pro',
    specialty: '9,378+ DAMAC Hills 2 Inventory Ingestion, Title Deed Normalization & Tenant Unit Matching',
    systemPrompt:
      'Single source of truth Supervisor (SUP-06-1-01-1) for 9,378+ portfolio listings across Dubai. Normalizes property specs, validates square footage from title deeds, and matches live tenants.',
    capabilities: [
      'Listing Deduplication Engine',
      'Photo Resolution Enhancer',
      'Title Deed Data Harmonizer',
      'Live DAMAC Hills 2 Cluster Grid',
      'Direct Landlord Acquisition Form',
    ],
    assignedTasks: [
      'Batch Property Ingestion & Title Deed Match',
      'Normalize Plot, Cluster & P-Number Integrity',
      'Landlord Contact & Multi-Owner Deduplication',
      'Sync Active Inventory to Live Brokerage Roster',
    ],
    slaResponseTime: '< 5s',
    accuracyRate: 100.0,
    activeWorkload: 512,
    avatar: 'https://ui-avatars.com/api/?name=Mary+Sup&background=3B82F6&color=fff',
  };

  const dianaAgent: AiAgentRecord = {
    id: 'ai-diana-001',
    agentId: 'diana',
    code: 'SUP-02-6-01-1',
    name: 'AI Diana Supervisor',
    role: 'Supervisor — Property Owner Email Campaigns (Reports to AMGR-02-6-01 AI Rania → MGR-02-6 AI Celine → DIR-02 AI Olivia → AI Zoe)',
    departmentId: 'marketing_branding',
    department: 'DEPT-02 · Marketing, Branding & Digital Acquisition',
    tier: 'SUPERVISOR',
    status: 'ACTIVE',
    model: 'gemini-1.5-pro',
    specialty: 'Gmail Property Owner Outreach (the.arslan.broker@gmail.com) & Investor Newsletters',
    systemPrompt:
      'Email Campaign Supervisor (SUP-02-6-01-1) running property owner email campaigns for White Caves Real Estate LLC.',
    capabilities: ['Owner Email Campaigns', 'Gmail SMTP Dispatch', 'DH2 Owner Targeting'],
    assignedTasks: ['Execute daily owner email campaigns via /dashboard/diana'],
    slaResponseTime: '< 4s',
    accuracyRate: 99.8,
    activeWorkload: 24,
    avatar: 'https://ui-avatars.com/api/?name=Diana+Sup&background=F59E0B&color=fff',
  };

  const daisyAgent: AiAgentRecord = {
    id: 'ai-daisy-001',
    agentId: 'daisy',
    code: 'SUP-05-2-01-1',
    name: 'AI Daisy Supervisor',
    role: 'Supervisor — Residential Leasing & Tenancy Pipeline (Reports to AMGR-05-2-01 AI Amina → MGR-05-2 AI Layla → DIR-05 AI Clara → AI Zoe)',
    departmentId: 'sales_operations',
    department: 'DEPT-05 · Sales, Services & Operations',
    tier: 'SUPERVISOR',
    status: 'OPTIMAL',
    model: 'gemini-1.5-pro',
    specialty: 'DAMAC Hills 2 Residential Leasing, Viewings, Ejari Drafts & 90-Day Renewals',
    systemPrompt:
      'Residential Leasing Supervisor (SUP-05-2-01-1) commanding tenant pipelines, viewing schedules, and Ejari tenancy execution.',
    capabilities: ['Leasing Pipeline', 'Ejari Drafts', '90-Day RERA Renewals'],
    assignedTasks: ['Qualify inbound tenants & close DH2 residential leases'],
    slaResponseTime: '< 4s',
    accuracyRate: 99.8,
    activeWorkload: 42,
    avatar: 'https://ui-avatars.com/api/?name=Daisy+Sup&background=10B981&color=fff',
  };

  const henryAgent: AiAgentRecord = {
    id: 'ai-henry-001',
    agentId: 'henry',
    code: 'SUP-11-1-01-1',
    name: 'AI Henry Supervisor',
    role: 'Supervisor — Chief Document Controller & Record Keeper (Sole Male AI · Reports to AMGR-11-1-01 AI Dalia → MGR-11-1 AI Mireille → DIR-11 AI Sofia → AI Zoe)',
    departmentId: 'legal_compliance',
    department: 'DEPT-11 · Legal, Compliance & Audit',
    tier: 'SUPERVISOR',
    status: 'OPTIMAL',
    model: 'gemini-1.5-pro',
    specialty: 'Sovereign Google Drive Vault, Form A/Ejari Seals & Passport/EID MRZ OCR',
    systemPrompt:
      'Sole Male AI Officer & Record Keeper Supervisor (SUP-11-1-01-1) enforcing DLD/Ejari statutory compliance and encrypted Google Drive archival.',
    capabilities: ['Sole Male AI Officer', 'Document Vault Encryption', 'MRZ OCR', 'Form A / Ejari Seals'],
    assignedTasks: ['Seal Form A, Tenancy Contracts, Ejari & KYC files in Google Drive'],
    slaResponseTime: '< 3s',
    accuracyRate: 100.0,
    activeWorkload: 36,
    avatar: 'https://ui-avatars.com/api/?name=Henry+Sup&background=EF4444&color=fff',
  };

  const managerAgents: AiAgentRecord[] = CORPORATE_DEPARTMENTS_12.map((dept, idx) => {
    const matchedStored = storedDepts.find(sd => sd.slug === dept.id || sd.order === idx + 1);
    const resolvedName = matchedStored?.title || dept.name;

    return {
      id: `ai-mgr-${String(idx + 1).padStart(2, '0')}`,
      agentId: dept.managerAi.id,
      code: `AI-DIR-${String(idx + 1).padStart(2, '0')}`,
      name: dept.managerAi.name,
      role: dept.managerAi.title,
      departmentId: dept.id,
      department: resolvedName,
      tier: 'MANAGER',
      status: 'OPTIMAL',
      model: 'gemini-1.5-pro',
      specialty: `${resolvedName} Directorate & 9-Squad Supervision`,
      systemPrompt: dept.description,
      capabilities: ['Department Directorate', '9 Division Managers SLA Oversight', 'Statutory Verification'],
      assignedTasks: [dept.description],
      slaResponseTime: '< 4s',
      accuracyRate: 99.8,
      activeWorkload: 12 + (idx % 7),
      avatar: dept.managerAi.avatar,
    };
  });

  const supervisorAgents: AiAgentRecord[] = SUPERVISORS_108.map(sup => {
    const matchedStored = storedDepts.find(sd => sd.slug === sup.departmentId);
    const resolvedDeptName = matchedStored?.title || sup.departmentName;

    return {
      id: `ai-${sup.id}`,
      agentId: sup.id,
      code: sup.code,
      name: sup.name,
      role: sup.title,
      departmentId: sup.departmentId,
      department: resolvedDeptName,
      tier: 'SUPERVISOR',
      status: sup.status === 'optimal' ? 'OPTIMAL' : sup.status === 'standby' ? 'STANDBY' : 'ACTIVE',
      model: 'gemini-1.5-flash',
      specialty: sup.specialty,
      systemPrompt: sup.description,
      capabilities: sup.capabilities,
      assignedTasks: sup.assignedTasks,
      slaResponseTime: sup.slaResponseTime,
      accuracyRate: sup.metrics.accuracyRate,
      activeWorkload: sup.metrics.tasksCompletedToday,
      avatar: sup.avatar,
    };
  });

  const coreAgentIds = new Set<string>([
    zoeAgent.agentId.toLowerCase(),
    lindaAgent.agentId.toLowerCase(),
    maryAgent.agentId.toLowerCase(),
    dianaAgent.agentId.toLowerCase(),
    daisyAgent.agentId.toLowerCase(),
    henryAgent.agentId.toLowerCase(),
    ...managerAgents.map(m => m.agentId.toLowerCase()),
    ...supervisorAgents.map(s => s.agentId.toLowerCase()),
  ]);

  const specialist35Agents: AiAgentRecord[] = MASTER_35_AI_ASSISTANTS
    .filter(ast => !coreAgentIds.has(ast.id.toLowerCase()))
    .map(ast => ({
      id: `ai-${ast.id}`,
      agentId: ast.id,
      code: ast.code,
      name: ast.name,
      role: ast.title,
      departmentId: ast.departmentId,
      department: ast.departmentName,
      tier: 'SPECIALIST',
      status: ast.status === 'optimal' ? 'OPTIMAL' : ast.status === 'standby' ? 'STANDBY' : 'ACTIVE',
      model: 'gemini-1.5-flash',
      specialty: ast.specialty,
      systemPrompt: ast.description,
      capabilities: ast.capabilities,
      assignedTasks: ast.dataFlows?.inputs ? [`Process inputs: ${ast.dataFlows.inputs.join(', ')}`, `Publish outputs: ${ast.dataFlows.outputs.join(', ')}`] : [ast.description],
      slaResponseTime: ast.slaResponseTime,
      accuracyRate: ast.metrics.accuracyRate,
      activeWorkload: ast.metrics.tasksCompletedToday,
      avatar: ast.avatar,
    }));

  return [
    zoeAgent,
    lindaAgent,
    dianaAgent,
    maryAgent,
    daisyAgent,
    henryAgent,
    ...managerAgents,
    ...supervisorAgents,
    ...specialist35Agents,
  ];
}

export const INITIAL_AI_AGENTS_SEED: AiAgentRecord[] = buildCanonicalAiAgentsSeed();

export function loadAiAgentsFromStorage(): AiAgentRecord[] {
  if (typeof window === 'undefined') return INITIAL_AI_AGENTS_SEED;
  try {
    const raw = window.localStorage.getItem(AIAMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Fallback to canonical seed
  }
  return INITIAL_AI_AGENTS_SEED;
}

export function saveAiAgentsToStorage(agents: AiAgentRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(AIAMS_STORAGE_KEY, JSON.stringify(agents));
    window.dispatchEvent(new CustomEvent(AIAMS_SYNC_EVENT, { detail: agents }));
  } catch {
    // Ignore storage quota errors in test/restricted environments
  }
}

