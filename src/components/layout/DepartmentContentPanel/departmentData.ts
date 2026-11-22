/**
 * Department Content Data — Static configuration for all departments
 * Extracted from DepartmentContentPanel.tsx for maintainability
 *
 * Each department defines: name, icon, color, gradient, description,
 * key metrics, and a service catalogue with stats & quick actions.
 */

import { CORE_DEPARTMENTS } from './departmentData/coreDepartments';
import { GOVERNANCE_DEPARTMENTS } from './departmentData/governanceDepartments';
import { GROWTH_DEPARTMENTS } from './departmentData/growthDepartments';
import { LEASING_DEPARTMENT } from './departmentData/leasingDepartment';
import type { DepartmentContent } from './departmentData/types';

export type {
  ActionItem,
  DepartmentContent,
  MetricItem,
  ServiceContent,
  ServiceStat,
} from './departmentData/types';

export const DEPARTMENT_CONTENT: Record<string, DepartmentContent> = {
  ...CORE_DEPARTMENTS,
  ...GROWTH_DEPARTMENTS,
  ...GOVERNANCE_DEPARTMENTS,
  leasing: LEASING_DEPARTMENT,
};
