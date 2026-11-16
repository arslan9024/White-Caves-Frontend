export interface SovereignAuthority {
  name: string;
  title: string;
  email: string;
  licenseDet: string;
  reraOrn: string;
}

export interface ExecutiveAiPartner {
  id: string;
  name: string;
  gender: string;
  title: string;
}

export interface WorkforceCounts {
  executiveLead: number;
  departmentManagers: number;
  supervisorsPerDepartment: number;
  totalSupervisors: number;
  totalActiveAiStaff: number;
}

export interface DepartmentManager {
  id: string;
  name: string;
  title: string;
  avatar: string;
  responsibilities: string[];
}

export interface DepartmentSupervisor {
  id: string;
  name: string;
  title: string;
  slot: number;
  tasks: string[];
  gender?: string;
}

export interface DepartmentGridNode {
  deptId: string;
  deptCode: string;
  deptName: string;
  color: string;
  manager: DepartmentManager;
  supervisors: DepartmentSupervisor[];
  divisions?: any[];
}

export interface MasterWorkforceGrid {
  protocol: string;
  version: string;
  sovereignAuthority: SovereignAuthority;
  executiveAiPartner: ExecutiveAiPartner;
  counts: WorkforceCounts;
  departments: DepartmentGridNode[];
}

