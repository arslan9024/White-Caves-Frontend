/**
 * aiAssistantSupervisorHierarchy.formula.ts — Frontend Mirror of Canonical Bhakti 1-12-108 AI Supervisor Chains
 * White Caves Real Estate LLC — Complete Unbroken Reporting Chain (Zoe -> Director -> Manager -> AM -> Supervisor)
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

export const CANONICAL_AI_SUPERVISOR_CHAINS: Record<
  OperationalAssistantKey,
  OperationalAiSupervisorChain
> = {
  diana: {
    key: 'diana',
    deptSlot: 2,
    managerSlot: 6,
    deptCode: 'DEPT-02',
    departmentName: 'Marketing, Branding & Digital Acquisition',
    workspaceRoute: '/dashboard/diana',
    managingDirector: MD_SEAT,
    coo: ZOE_COO_SEAT,
    director: {
      id: 'olivia',
      code: 'DIR-02',
      name: 'AI Olivia',
      gender: 'Female',
      tier: 'DIRECTOR',
      roleTitle: 'Director of Marketing, Branding & Digital Growth',
      departmentCode: 'DEPT-02',
      reportingToId: 'zoe',
    },
    manager: {
      id: 'celine-email-mgr',
      code: 'MGR-02-6',
      name: 'AI Celine Lifecycle',
      gender: 'Female',
      tier: 'MANAGER',
      roleTitle: 'Division Manager — Direct Email Marketing & Owner Communications',
      departmentCode: 'DEPT-02',
      divisionCode: 'DIV-02-6',
      reportingToId: 'olivia',
    },
    assistantManager: {
      id: 'amgr-02-6-01',
      code: 'AMGR-02-6-01',
      name: 'AI Rania Campaigns',
      gender: 'Female',
      tier: 'ASSISTANT_MANAGER',
      roleTitle: 'Assistant Manager — Property Owner & Investor Email Outreach',
      departmentCode: 'DEPT-02',
      divisionCode: 'DIV-02-6',
      unitCode: 'UNIT-02-6-01',
      reportingToId: 'celine-email-mgr',
    },
    supervisor: {
      id: 'diana-email',
      code: 'SUP-02-6-01-1',
      name: 'AI Diana Supervisor',
      gender: 'Female',
      tier: 'SUPERVISOR',
      roleTitle: 'Supervisor — Property Owner Email Campaigns & Gmail Automation',
      departmentCode: 'DEPT-02',
      divisionCode: 'DIV-02-6',
      unitCode: 'UNIT-02-6-01',
      squadCode: 'SQD-02-6-01-1',
      reportingToId: 'amgr-02-6-01',
    },
  },
  daisy: {
    key: 'daisy',
    deptSlot: 5,
    managerSlot: 2,
    deptCode: 'DEPT-05',
    departmentName: 'Sales, Services & Operations',
    workspaceRoute: '/dashboard/leasing',
    managingDirector: MD_SEAT,
    coo: ZOE_COO_SEAT,
    director: {
      id: 'clara',
      code: 'DIR-05',
      name: 'AI Clara',
      gender: 'Female',
      tier: 'DIRECTOR',
      roleTitle: 'Director of Sales, Leasing & Brokerage Operations',
      departmentCode: 'DEPT-05',
      reportingToId: 'zoe',
    },
    manager: {
      id: 'layla-leasing-mgr',
      code: 'MGR-05-2',
      name: 'AI Layla Residential',
      gender: 'Female',
      tier: 'MANAGER',
      roleTitle: 'Division Manager — Residential Leasing & Tenancy Operations',
      departmentCode: 'DEPT-05',
      divisionCode: 'DIV-05-2',
      reportingToId: 'clara',
    },
    assistantManager: {
      id: 'amgr-05-2-01',
      code: 'AMGR-05-2-01',
      name: 'AI Amina Leasing',
      gender: 'Female',
      tier: 'ASSISTANT_MANAGER',
      roleTitle: 'Assistant Manager — DAMAC Hills 2 Residential Leasing & Pipelines',
      departmentCode: 'DEPT-05',
      divisionCode: 'DIV-05-2',
      unitCode: 'UNIT-05-2-01',
      reportingToId: 'layla-leasing-mgr',
    },
    supervisor: {
      id: 'daisy-leasing',
      code: 'SUP-05-2-01-1',
      name: 'AI Daisy Supervisor',
      gender: 'Female',
      tier: 'SUPERVISOR',
      roleTitle: 'Supervisor — Residential Leasing Pipeline, Viewings & Ejari Lifecycle',
      departmentCode: 'DEPT-05',
      divisionCode: 'DIV-05-2',
      unitCode: 'UNIT-05-2-01',
      squadCode: 'SQD-05-2-01-1',
      reportingToId: 'amgr-05-2-01',
    },
  },
  mary: {
    key: 'mary',
    deptSlot: 6,
    managerSlot: 1,
    deptCode: 'DEPT-06',
    departmentName: 'Inventory, Portfolio & Asset Management',
    workspaceRoute: '/dashboard/inventory',
    managingDirector: MD_SEAT,
    coo: ZOE_COO_SEAT,
    director: {
      id: 'sentinel',
      code: 'DIR-06',
      name: 'AI Sentinel',
      gender: 'Female',
      tier: 'DIRECTOR',
      roleTitle: 'Director of Inventory, Portfolio & Asset Management',
      departmentCode: 'DEPT-06',
      reportingToId: 'zoe',
    },
    manager: {
      id: 'yasmin-inventory-mgr',
      code: 'MGR-06-1',
      name: 'AI Yasmin Portfolio',
      gender: 'Female',
      tier: 'MANAGER',
      roleTitle: 'Division Manager — Residential Portfolio & Master Inventory',
      departmentCode: 'DEPT-06',
      divisionCode: 'DIV-06-1',
      reportingToId: 'sentinel',
    },
    assistantManager: {
      id: 'amgr-06-1-01',
      code: 'AMGR-06-1-01',
      name: 'AI Farah Inventory',
      gender: 'Female',
      tier: 'ASSISTANT_MANAGER',
      roleTitle: 'Assistant Manager — DAMAC Hills 2 Cluster Inventory & Verification',
      departmentCode: 'DEPT-06',
      divisionCode: 'DIV-06-1',
      unitCode: 'UNIT-06-1-01',
      reportingToId: 'yasmin-inventory-mgr',
    },
    supervisor: {
      id: 'mary-inventory',
      code: 'SUP-06-1-01-1',
      name: 'AI Mary Supervisor',
      gender: 'Female',
      tier: 'SUPERVISOR',
      roleTitle: 'Supervisor — DAMAC Hills 2 Master Inventory Vault & Tenant Unit Matching',
      departmentCode: 'DEPT-06',
      divisionCode: 'DIV-06-1',
      unitCode: 'UNIT-06-1-01',
      squadCode: 'SQD-06-1-01-1',
      reportingToId: 'amgr-06-1-01',
    },
  },
  linda: {
    key: 'linda',
    deptSlot: 8,
    managerSlot: 1,
    deptCode: 'DEPT-08',
    departmentName: 'Media, Public Relations & Communications',
    workspaceRoute: '/dashboard/linda',
    managingDirector: MD_SEAT,
    coo: ZOE_COO_SEAT,
    director: {
      id: 'maya',
      code: 'DIR-08',
      name: 'AI Maya',
      gender: 'Female',
      tier: 'DIRECTOR',
      roleTitle: 'Director of Omnichannel Communications & Media Relations',
      departmentCode: 'DEPT-08',
      reportingToId: 'zoe',
    },
    manager: {
      id: 'nadia-whatsapp-mgr',
      code: 'MGR-08-1',
      name: 'AI Nadia Omnichannel',
      gender: 'Female',
      tier: 'MANAGER',
      roleTitle: 'Division Manager — Real Estate Messaging & WhatsApp Automation',
      departmentCode: 'DEPT-08',
      divisionCode: 'DIV-08-1',
      reportingToId: 'maya',
    },
    assistantManager: {
      id: 'amgr-08-1-01',
      code: 'AMGR-08-1-01',
      name: 'AI Samira WhatsApp',
      gender: 'Female',
      tier: 'ASSISTANT_MANAGER',
      roleTitle: 'Assistant Manager — 10-SIM Multi-Device Fleet & Campaign Operations',
      departmentCode: 'DEPT-08',
      divisionCode: 'DIV-08-1',
      unitCode: 'UNIT-08-1-01',
      reportingToId: 'nadia-whatsapp-mgr',
    },
    supervisor: {
      id: 'linda',
      code: 'SUP-08-1-01-1',
      name: 'AI Linda Supervisor',
      gender: 'Female',
      tier: 'SUPERVISOR',
      roleTitle: 'Supervisor — WhatsApp Real Estate Automation & 10-SIM Fleet (+971505760056)',
      departmentCode: 'DEPT-08',
      divisionCode: 'DIV-08-1',
      unitCode: 'UNIT-08-1-01',
      squadCode: 'SQD-08-1-01-1',
      reportingToId: 'amgr-08-1-01',
    },
  },
  henry: {
    key: 'henry',
    deptSlot: 11,
    managerSlot: 1,
    deptCode: 'DEPT-11',
    departmentName: 'Legal, Compliance & Audit',
    workspaceRoute: '/dashboard/henry',
    managingDirector: MD_SEAT,
    coo: ZOE_COO_SEAT,
    director: {
      id: 'sofia',
      code: 'DIR-11',
      name: 'AI Sofia',
      gender: 'Female',
      tier: 'DIRECTOR',
      roleTitle: 'Director of Legal Affairs, RERA Compliance & Statutory Audit',
      departmentCode: 'DEPT-11',
      reportingToId: 'zoe',
    },
    manager: {
      id: 'mireille-records-mgr',
      code: 'MGR-11-1',
      name: 'AI Mireille Governance',
      gender: 'Female',
      tier: 'MANAGER',
      roleTitle: 'Division Manager — Document Governance & Statutory Records',
      departmentCode: 'DEPT-11',
      divisionCode: 'DIV-11-1',
      reportingToId: 'sofia',
    },
    assistantManager: {
      id: 'amgr-11-1-01',
      code: 'AMGR-11-1-01',
      name: 'AI Dalia Compliance',
      gender: 'Female',
      tier: 'ASSISTANT_MANAGER',
      roleTitle: 'Assistant Manager — DLD Vault Archival, Ejari & KYC Verification',
      departmentCode: 'DEPT-11',
      divisionCode: 'DIV-11-1',
      unitCode: 'UNIT-11-1-01',
      reportingToId: 'mireille-records-mgr',
    },
    supervisor: {
      id: 'henry',
      code: 'SUP-11-1-01-1',
      name: 'AI Henry Supervisor',
      gender: 'Male',
      tier: 'SUPERVISOR',
      roleTitle:
        'Supervisor — Chief Document Controller & The Record Keeper (Sole Male AI Officer)',
      departmentCode: 'DEPT-11',
      divisionCode: 'DIV-11-1',
      unitCode: 'UNIT-11-1-01',
      squadCode: 'SQD-11-1-01-1',
      reportingToId: 'amgr-11-1-01',
    },
  },
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
