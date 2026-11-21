export interface AgentCard {
  id: string;
  code: string;
  name: string;
  gender: 'Female' | 'Male';
  roleTitle: string;
  tier: 'COO' | 'DIRECTOR' | 'MANAGER' | 'STANDBY';
  departmentCode?: string;
  slot?: number;
  reportingTo?: string;
  allowedTools: string[];
  capabilities: string[];
  slaResponseMinutes: number;
  status: 'ACTIVE' | 'STANDBY' | 'BUSY';
  kpis: {
    tasksCompleted: number;
    accuracyPercent: number;
    latencyMs: number;
  };
}

export interface DepartmentNode {
  deptCode: string;
  name: string;
  color: string;
  director: AgentCard;
  managers: AgentCard[];
}
