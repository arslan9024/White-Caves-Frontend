/**
 * canonical-108-divisions-matrix/departments/index.ts
 * Barrel Export for All 12 Corporate Floor Departments
 */
import type { CanonicalDepartmentNode } from '../types.ts';
import { FLOOR_01_DEPARTMENT } from './floor-01-customer-experience/index.ts';
import { FLOOR_02_DEPARTMENT } from './floor-02-marketing-branding/index.ts';
import { FLOOR_03_DEPARTMENT } from './floor-03-human-resources/index.ts';
import { FLOOR_04_DEPARTMENT } from './floor-04-technology-systems/index.ts';
import { FLOOR_05_DEPARTMENT } from './floor-05-sales-operations/index.ts';
import { FLOOR_06_DEPARTMENT } from './floor-06-inventory-portfolio/index.ts';
import { FLOOR_07_DEPARTMENT } from './floor-07-partnerships-alliances/index.ts';
import { FLOOR_08_DEPARTMENT } from './floor-08-media-communications/index.ts';
import { FLOOR_09_DEPARTMENT } from './floor-09-research-analytics/index.ts';
import { FLOOR_10_DEPARTMENT } from './floor-10-accounting-finance/index.ts';
import { FLOOR_11_DEPARTMENT } from './floor-11-legal-compliance/index.ts';
import { FLOOR_12_DEPARTMENT } from './floor-12-executive-governance/index.ts';

export * from './floor-01-customer-experience/index.ts';
export * from './floor-02-marketing-branding/index.ts';
export * from './floor-03-human-resources/index.ts';
export * from './floor-04-technology-systems/index.ts';
export * from './floor-05-sales-operations/index.ts';
export * from './floor-06-inventory-portfolio/index.ts';
export * from './floor-07-partnerships-alliances/index.ts';
export * from './floor-08-media-communications/index.ts';
export * from './floor-09-research-analytics/index.ts';
export * from './floor-10-accounting-finance/index.ts';
export * from './floor-11-legal-compliance/index.ts';
export * from './floor-12-executive-governance/index.ts';

export const CANONICAL_12_DEPARTMENTS: CanonicalDepartmentNode[] = [
  FLOOR_01_DEPARTMENT,
  FLOOR_02_DEPARTMENT,
  FLOOR_03_DEPARTMENT,
  FLOOR_04_DEPARTMENT,
  FLOOR_05_DEPARTMENT,
  FLOOR_06_DEPARTMENT,
  FLOOR_07_DEPARTMENT,
  FLOOR_08_DEPARTMENT,
  FLOOR_09_DEPARTMENT,
  FLOOR_10_DEPARTMENT,
  FLOOR_11_DEPARTMENT,
  FLOOR_12_DEPARTMENT,
];
