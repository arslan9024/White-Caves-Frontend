/**
 * aiAssistantSupervisorHierarchy.formula.ts — Frontend Mirror of Canonical Bhakti 1-12-108 AI Supervisor Chains
 * White Caves Real Estate LLC — Unbroken Upward Hierarchy (MD -> Zoe -> Director -> Manager -> AM -> Supervisor)
 * for All 5 Live Operational AI Assistants: Diana, Daisy, Mary, Linda, and Henry (Sole Male AI Officer).
 * Standard: AEGIS Canonical Architecture & Single Purpose File Law (< 350 lines, AEG-042).
 */

export type OperationalAssistantKey = 'diana' | 'daisy' | 'mary' | 'linda' | 'henry';

export interface CanonicalHierarchySeat {
  id: string;
  code: string;
  name: string;
  gender: 'Female' | 'Male';
  tier: 'MD' | 'COO' | 'DIRECTOR' | 'MANAGER' | 'ASSISTANT_MANAGER' | 'SUPERVISOR';
  roleTitle: string;
  departmentCode?: string;
  divisionCode?: string;
  unitCode?: string;
  squadCode?: string;
  reportingToId?: string;
}

export interface OperationalAiSupervisorChain {
  key: OperationalAssistantKey;
  deptSlot: number;
  managerSlot: number;
  deptCode: string;
  departmentName: string;
  workspaceRoute: string;
  managingDirector: CanonicalHierarchySeat;
  coo: CanonicalHierarchySeat;
  director: CanonicalHierarchySeat;
  manager: CanonicalHierarchySeat;
  assistantManager: CanonicalHierarchySeat;
  supervisor: CanonicalHierarchySeat;
}

const MD_SEAT: CanonicalHierarchySeat = {
  id: 'md-arslan-malik',
  code: 'MD-01',
  name: 'Arslan Malik',
  gender: 'Male',
  tier: 'MD',
  roleTitle: 'Founder & Managing Director',
};

const ZOE_COO_SEAT: CanonicalHierarchySeat = {
  id: 'zoe',
  code: 'WC-COO-01',
  name: 'AI Zoe',
  gender: 'Female',
  tier: 'COO',
  roleTitle: 'Chief Operating Officer & AICC-Sanctum Commander',
  reportingToId: 'md-arslan-malik',
};

interface ChainSpec {
  key: OperationalAssistantKey;
  deptSlot: number;
  managerSlot: number;
  departmentName: string;
  workspaceRoute: string;
  dir: [string, string, string];
  mgr: [string, string, string];
  am: [string, string, string];
  sup: [string, string, string, 'Female' | 'Male'];
}

function buildChain(s: ChainSpec): OperationalAiSupervisorChain {
  const dd = String(s.deptSlot).padStart(2, '0');
  const deptCode = `DEPT-${dd}`;
  const divisionCode = `DIV-${dd}-${s.managerSlot}`;
  const unitCode = `UNIT-${dd}-${s.managerSlot}-01`;
  const squadCode = `SQD-${dd}-${s.managerSlot}-01-1`;
  const mgrCode = `MGR-${dd}-${s.managerSlot}`;
  const amCode = `AMGR-${dd}-${s.managerSlot}-01`;
  const supCode = `SUP-${dd}-${s.managerSlot}-01-1`;

  return {
    key: s.key,
    deptSlot: s.deptSlot,
    managerSlot: s.managerSlot,
    deptCode,
    departmentName: s.departmentName,
    workspaceRoute: s.workspaceRoute,
    managingDirector: MD_SEAT,
    coo: ZOE_COO_SEAT,
    director: {
      id: s.dir[0],
      code: `DIR-${dd}`,
      name: s.dir[1],
      gender: 'Female',
      tier: 'DIRECTOR',
      roleTitle: s.dir[2],
      departmentCode: deptCode,
      reportingToId: 'zoe',
    },
    manager: {
      id: s.mgr[0],
      code: mgrCode,
      name: s.mgr[1],
      gender: 'Female',
      tier: 'MANAGER',
      roleTitle: s.mgr[2],
      departmentCode: deptCode,
      divisionCode,
      reportingToId: s.dir[0],
    },
    assistantManager: {
      id: s.am[0],
      code: amCode,
      name: s.am[1],
      gender: 'Female',
      tier: 'ASSISTANT_MANAGER',
      roleTitle: s.am[2],
      departmentCode: deptCode,
      divisionCode,
      unitCode,
      reportingToId: s.mgr[0],
    },
    supervisor: {
      id: s.sup[0],
      code: supCode,
      name: s.sup[1],
      gender: s.sup[3],
      tier: 'SUPERVISOR',
      roleTitle: s.sup[2],
      departmentCode: deptCode,
      divisionCode,
      unitCode,
      squadCode,
      reportingToId: s.am[0],
    },
  };
}

export const CANONICAL_AI_SUPERVISOR_CHAINS: Record<
  OperationalAssistantKey,
  OperationalAiSupervisorChain
> = {
  diana: buildChain({
    key: 'diana',
    deptSlot: 2,
    managerSlot: 6,
    departmentName: 'Marketing, Branding & Digital Acquisition',
    workspaceRoute: '/dashboard/diana',
    dir: ['olivia', 'AI Olivia', 'Director of Marketing, Branding & Digital Growth'],
    mgr: [
      'celine-email-mgr',
      'AI Celine Lifecycle',
      'Division Manager — Direct Email Marketing & Owner Communications',
    ],
    am: [
      'amgr-02-6-01',
      'AI Rania Campaigns',
      'Assistant Manager — Property Owner & Investor Email Outreach',
    ],
    sup: [
      'diana-email',
      'AI Diana Supervisor',
      'Supervisor — Property Owner Email Campaigns & Gmail Automation',
      'Female',
    ],
  }),
  daisy: buildChain({
    key: 'daisy',
    deptSlot: 5,
    managerSlot: 2,
    departmentName: 'Sales, Services & Operations',
    workspaceRoute: '/dashboard/leasing',
    dir: ['clara', 'AI Clara', 'Director of Sales, Leasing & Brokerage Operations'],
    mgr: [
      'layla-leasing-mgr',
      'AI Layla Residential',
      'Division Manager — Residential Leasing & Tenancy Operations',
    ],
    am: [
      'amgr-05-2-01',
      'AI Amina Leasing',
      'Assistant Manager — DAMAC Hills 2 Residential Leasing & Pipelines',
    ],
    sup: [
      'daisy-leasing',
      'AI Daisy Supervisor',
      'Supervisor — Residential Leasing Pipeline, Viewings & Ejari Lifecycle',
      'Female',
    ],
  }),
  mary: buildChain({
    key: 'mary',
    deptSlot: 6,
    managerSlot: 1,
    departmentName: 'Inventory, Portfolio & Asset Management',
    workspaceRoute: '/dashboard/inventory',
    dir: ['sentinel', 'AI Sentinel', 'Director of Inventory, Portfolio & Asset Management'],
    mgr: [
      'yasmin-inventory-mgr',
      'AI Yasmin Portfolio',
      'Division Manager — Residential Portfolio & Master Inventory',
    ],
    am: [
      'amgr-06-1-01',
      'AI Farah Inventory',
      'Assistant Manager — DAMAC Hills 2 Cluster Inventory & Verification',
    ],
    sup: [
      'mary-inventory',
      'AI Mary Supervisor',
      'Supervisor — DAMAC Hills 2 Master Inventory Vault & Tenant Unit Matching',
      'Female',
    ],
  }),
  linda: buildChain({
    key: 'linda',
    deptSlot: 8,
    managerSlot: 1,
    departmentName: 'Media, Public Relations & Communications',
    workspaceRoute: '/dashboard/linda',
    dir: ['maya', 'AI Maya', 'Director of Omnichannel Communications & Media Relations'],
    mgr: [
      'nadia-whatsapp-mgr',
      'AI Nadia Omnichannel',
      'Division Manager — Real Estate Messaging & WhatsApp Automation',
    ],
    am: [
      'amgr-08-1-01',
      'AI Samira WhatsApp',
      'Assistant Manager — 10-SIM Multi-Device Fleet & Campaign Operations',
    ],
    sup: [
      'linda',
      'AI Linda Supervisor',
      'Supervisor — WhatsApp Real Estate Automation & 10-SIM Fleet (+971505760056)',
      'Female',
    ],
  }),
  henry: buildChain({
    key: 'henry',
    deptSlot: 11,
    managerSlot: 1,
    departmentName: 'Legal, Compliance & Audit',
    workspaceRoute: '/dashboard/henry',
    dir: ['sofia', 'AI Sofia', 'Director of Legal Affairs, RERA Compliance & Statutory Audit'],
    mgr: [
      'mireille-records-mgr',
      'AI Mireille Governance',
      'Division Manager — Document Governance & Statutory Records',
    ],
    am: [
      'amgr-11-1-01',
      'AI Dalia Compliance',
      'Assistant Manager — DLD Vault Archival, Ejari & KYC Verification',
    ],
    sup: [
      'henry',
      'AI Henry Supervisor',
      'Supervisor — Chief Document Controller & The Record Keeper (Sole Male AI Officer)',
      'Male',
    ],
  }),
};

export const CANONICAL_AI_SUPERVISOR_LIST: OperationalAiSupervisorChain[] = Object.values(
  CANONICAL_AI_SUPERVISOR_CHAINS
);

export function getNamedSeatOverrideForManager(
  deptSlot: number,
  managerSlot: number
): OperationalAiSupervisorChain | undefined {
  return CANONICAL_AI_SUPERVISOR_LIST.find(
    c => c.deptSlot === deptSlot && c.managerSlot === managerSlot
  );
}
