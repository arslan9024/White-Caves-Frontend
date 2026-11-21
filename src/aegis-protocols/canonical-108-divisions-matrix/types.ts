/**
 * canonical-108-divisions-matrix/types.ts
 * Strict TypeScript Interfaces for the Atomic 1-12-108 Bhakti & Wilkes Matrix
 */

export interface CanonicalDivisionItem {
  readonly code: string;
  readonly slot: number;
  readonly title: string;
  readonly aiManager: string;
  readonly humanRole: string;
  readonly desksCount: number;
}

export interface ExecutiveConfig {
  readonly protocol: string;
  readonly version: string;
  readonly formula: string;
  readonly bhaktiFractal: Record<string, number | string>;
  readonly rules: Record<string, string>;
}

export interface ExecutiveData {
  readonly seatCode: 'MD-01';
  readonly authority: string;
  readonly executivePartner: string;
}

export interface DirectorConfig {
  readonly tier: 'DIRECTOR';
  readonly level: 1;
  readonly deptCode: string;
  readonly floor: string;
  readonly branchingFactor: 9;
  readonly seatCapacity: 1;
  readonly slaMinutes: 15;
  readonly mode: 'FIXED_FRACTAL';
}

export interface DirectorData {
  readonly seatCode: string;
  readonly deptCode: string;
  readonly floor: string;
  readonly departmentName: string;
  readonly directorAi: string;
  readonly humanRole: string;
  readonly reportsTo: 'MD-01';
}

export interface SubDepartmentConfig {
  readonly tier: 'SUB_DEPARTMENT';
  readonly deptCode: string;
  readonly floor: string;
  readonly tracksPerDepartment: 9;
}

export interface SubDepartmentTrack {
  readonly subDeptCode: string;
  readonly slot: number;
  readonly title: string;
  readonly linkedDivisionCode: string;
}

export interface ManagersConfig {
  readonly tier: 'MANAGER';
  readonly level: 2;
  readonly deptCode: string;
  readonly floor: string;
  readonly managersPerDepartment: 9;
  readonly branchingFactorToAssistantManagers: 12;
  readonly slaMinutes: 15;
  readonly mode: 'FIXED_FRACTAL';
}

export interface AssistantManagersConfig {
  readonly tier: 'ASSISTANT_MANAGER';
  readonly level: 3;
  readonly deptCode: string;
  readonly floor: string;
  readonly assistantManagersPerManager: 12;
  readonly departmentAssistantManagersTotal: 108;
  readonly branchingFactorToSupervisors: 9;
  readonly mode: 'FIXED_FRACTAL';
}

export interface AssistantManagerCluster {
  readonly divisionCode: string;
  readonly managerSlot: number;
  readonly assistantManagerSlots: 12;
  readonly seatRange: string;
  readonly reportsToManagerAi: string;
}

export interface SupervisorsConfig {
  readonly tier: 'SUPERVISOR';
  readonly level: 4;
  readonly deptCode: string;
  readonly floor: string;
  readonly supervisorsPerAssistantManager: 9;
  readonly supervisorsPerManager: 108;
  readonly departmentSupervisorsTotal: 972;
  readonly mode: 'FIXED_FRACTAL_STOP';
  readonly manualChildTiers: readonly ['TEAM_LEADER', 'EMPLOYEE'];
}

export interface SupervisorClusterSummary {
  readonly divisionCode: string;
  readonly managerSlot: number;
  readonly supervisorsPerAssistantManager: 9;
  readonly totalSupervisorsInDivision: 108;
  readonly seatPattern: string;
  readonly manualTeamsMode: 'MANUAL_CRUD';
}

export interface CanonicalDepartmentNode {
  readonly deptCode: string;
  readonly code?: string;
  readonly floor: string;
  readonly slug: string;
  readonly name: string;
  readonly directorAi: string;
  readonly divisions: readonly CanonicalDivisionItem[];
  readonly director: { readonly config: DirectorConfig; readonly data: DirectorData };
  readonly subDepartments: { readonly config: SubDepartmentConfig; readonly data: readonly SubDepartmentTrack[] };
  readonly managers: { readonly config: ManagersConfig; readonly data: readonly CanonicalDivisionItem[] };
  readonly assistantManagers: {
    readonly config: AssistantManagersConfig;
    readonly data: readonly AssistantManagerCluster[];
  };
  readonly supervisors: {
    readonly config: SupervisorsConfig;
    readonly data: readonly SupervisorClusterSummary[];
  };
}

export interface Canonical108DivisionsMatrix {
  protocol: string;
  version: string;
  authority: string | { name: string; role: string; email: string; reraOrn: string };
  executivePartner: string | { id: string; name: string; role: string };
  formula: string;
  bhaktiFractal?: Record<string, number | string>;
  rules?: Record<string, string>;
  executive?: { readonly config: ExecutiveConfig; readonly data: ExecutiveData };
  departments: CanonicalDepartmentNode[];
}
