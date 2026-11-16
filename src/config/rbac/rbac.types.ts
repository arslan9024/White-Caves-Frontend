export enum AccessLevel {
  LEVEL_1_READ = 1,
  LEVEL_2_RESTRICTED = 2,
  LEVEL_3_POWER = 3,
  LEVEL_4_DEPARTMENT_HEAD = 4,
  LEVEL_5_MASTER = 5,
}

export type Tier = 'Executive' | 'Senior' | 'Mid' | 'Junior' | 'Intern' | 'AI';

export interface JobRole {
  roleId: string;
  departmentId: string;
  title: string;
  tier: Tier;
  defaultAccessLevel: AccessLevel;
}

