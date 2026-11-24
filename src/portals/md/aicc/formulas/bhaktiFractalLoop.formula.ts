/**
 * bhaktiFractalLoop.formula.ts — Frontend Mirror of the Canonical Bhakti 1-12-108 Repeating Fractal
 * White Caves Real Estate LLC — Enforces the 12 Locked Department Names & 13,081 Fixed Seat Topology
 * Standard: AEGIS Canonical Architecture & Single Purpose File Law (< 350 lines, AEG-042)
 */

export const BHAKTI_LOCKED_DEPARTMENTS_12 = [
  {
    slot: 1,
    deptCode: 'DEPT-01',
    dirCode: 'DIR-01',
    id: 'customer_experience',
    name: 'Customer Experience, Concierge & Hospitality',
  },
  {
    slot: 2,
    deptCode: 'DEPT-02',
    dirCode: 'DIR-02',
    id: 'marketing_branding',
    name: 'Marketing, Branding & Digital Acquisition',
  },
  {
    slot: 3,
    deptCode: 'DEPT-03',
    dirCode: 'DIR-03',
    id: 'human_resources',
    name: 'Human Resources, Performance & Recruiting',
  },
  {
    slot: 4,
    deptCode: 'DEPT-04',
    dirCode: 'DIR-04',
    id: 'technology_systems',
    name: 'Technology, Systems & Digital Infrastructure',
  },
  {
    slot: 5,
    deptCode: 'DEPT-05',
    dirCode: 'DIR-05',
    id: 'sales_operations',
    name: 'Sales, Services & Operations',
  },
  {
    slot: 6,
    deptCode: 'DEPT-06',
    dirCode: 'DIR-06',
    id: 'inventory_portfolio',
    name: 'Inventory, Portfolio & Asset Management',
  },
  {
    slot: 7,
    deptCode: 'DEPT-07',
    dirCode: 'DIR-07',
    id: 'partnerships_growth',
    name: 'Partnerships, Alliances & Capital Growth',
  },
  {
    slot: 8,
    deptCode: 'DEPT-08',
    dirCode: 'DIR-08',
    id: 'media_public_relations',
    name: 'Media, Public Relations & Communications',
  },
  {
    slot: 9,
    deptCode: 'DEPT-09',
    dirCode: 'DIR-09',
    id: 'research_analytics',
    name: 'Research, Analytics & Market Intelligence',
  },
  {
    slot: 10,
    deptCode: 'DEPT-10',
    dirCode: 'DIR-10',
    id: 'accounting_finance',
    name: 'Accounting, Finance & Tax',
  },
  {
    slot: 11,
    deptCode: 'DEPT-11',
    dirCode: 'DIR-11',
    id: 'legal_compliance',
    name: 'Legal, Compliance & Audit',
  },
  {
    slot: 12,
    deptCode: 'DEPT-12',
    dirCode: 'DIR-12',
    id: 'executive_governance',
    name: 'Executive, Governance & Strategy',
  },
] as const;

export type LockedDepartmentDef = (typeof BHAKTI_LOCKED_DEPARTMENTS_12)[number];

export const BHAKTI_FRACTAL_CONSTANTS = {
  MD_COUNT: 1,
  DIRECTORS_PER_MD: 12,
  MANAGERS_PER_DIRECTOR: 9,
  ASSISTANT_MANAGERS_PER_MANAGER: 12,
  SUPERVISORS_PER_ASSISTANT_MANAGER: 9,
  SUPERVISORS_PER_MANAGER: 108,
  TOTAL_DIRECTORS: 12,
  TOTAL_MANAGERS: 108,
  TOTAL_ASSISTANT_MANAGERS: 1296,
  TOTAL_SUPERVISORS: 11664,
  FIXED_STOP_BOUNDARY: 13081,
} as const;

export const FEMALE_AM_NAMES_12 = [
  'Amina',
  'Bushra',
  'Dalia',
  'Farah',
  'Huda',
  'Jana',
  'Karima',
  'Lubna',
  'Maha',
  'Noura',
  'Rania',
  'Salma',
] as const;

export const FEMALE_SUP_NAMES_9 = [
  'Noor',
  'Hana',
  'Reem',
  'Sara',
  'Mona',
  'Dina',
  'Yara',
  'Lama',
  'Zeina',
] as const;

export interface GeneratedSupervisorSeat {
  id: string;
  squadCode: string;
  unitCode: string;
  divisionCode: string;
  slot: number;
  name: string;
  gender: 'Female';
  reportsToId: string;
  deptCode: string;
  managerCode: string;
}

export interface GeneratedAssistantManagerSeat {
  id: string;
  unitCode: string;
  divisionCode: string;
  slot: number;
  name: string;
  gender: 'Female';
  reportsToId: string;
  deptCode: string;
  supervisors: GeneratedSupervisorSeat[];
}

export const BHAKTI_ENTITY_COLLECTION_TIERS = [
  { level: 0, collection: 'Headquarters', codePrefix: 'HQ', leaderRole: 'Managing Director / COO' },
  { level: 1, collection: 'Department', codePrefix: 'DEPT', leaderRole: 'Director' },
  { level: 2, collection: 'Division', codePrefix: 'DIV', leaderRole: 'Division Manager' },
  { level: 3, collection: 'Unit', codePrefix: 'UNIT', leaderRole: 'Assistant Manager' },
  { level: 4, collection: 'Squad', codePrefix: 'SQD', leaderRole: 'Supervisor' },
  { level: 5, collection: 'Team', codePrefix: 'TEAM', leaderRole: 'Team Leader (Manual CRUD)' },
] as const;

/**
 * Generates the exact Bhakti 12-Assistant-Manager -> 108-Supervisor fractal subtree
 * for any given Department (1..12) and Division Manager (1..9), preserving existing manager IDs.
 */
export function generateManagerFractalSubtree(
  deptSlot: number,
  managerSlot: number,
  divisionLabel?: string
): GeneratedAssistantManagerSeat[] {
  const dd = String(deptSlot).padStart(2, '0');
  const deptCode = `DEPT-${dd}`;
  const divisionCode = `DIV-${dd}-${managerSlot}`;
  const managerCode = `MGR-${dd}-${managerSlot}`;

  return FEMALE_AM_NAMES_12.map((amFirstName, amIdx) => {
    const amSlot = amIdx + 1;
    const aa = String(amSlot).padStart(2, '0');
    const amId = `AMGR-${dd}-${managerSlot}-${aa}`;
    const unitCode = `UNIT-${dd}-${managerSlot}-${aa}`;

    const supervisors: GeneratedSupervisorSeat[] = FEMALE_SUP_NAMES_9.map(
      (supFirstName, supIdx) => {
        const supSlot = supIdx + 1;
        return {
          id: `SUP-${dd}-${managerSlot}-${aa}-${supSlot}`,
          squadCode: `SQD-${dd}-${managerSlot}-${aa}-${supSlot}`,
          unitCode,
          divisionCode,
          slot: supSlot,
          name: `AI ${supFirstName} Sup-${dd}.${managerSlot}.${amSlot}.${supSlot}`,
          gender: 'Female',
          reportsToId: amId,
          deptCode,
          managerCode,
        };
      }
    );

    return {
      id: amId,
      unitCode,
      divisionCode,
      slot: amSlot,
      name: divisionLabel
        ? `AI ${amFirstName} (${divisionLabel})`
        : `AI ${amFirstName} AM-${dd}.${managerSlot}.${aa}`,
      gender: 'Female',
      reportsToId: managerCode,
      deptCode,
      supervisors,
    };
  });
}

export function assertLockedDepartmentName(deptCode: string, candidateName: string): boolean {
  const locked = BHAKTI_LOCKED_DEPARTMENTS_12.find(d => d.deptCode === deptCode);
  return Boolean(locked && locked.name === candidateName);
}

export function getLockedDepartmentByCode(deptCode: string): LockedDepartmentDef | undefined {
  return BHAKTI_LOCKED_DEPARTMENTS_12.find(d => d.deptCode === deptCode);
}
