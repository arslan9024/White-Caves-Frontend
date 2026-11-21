/**
 * floor-06-inventory-portfolio/sub-departments/index.ts — Sub-Departments Tier Barrel
 */
import { FLOOR_06_SUB_DEPARTMENTS_CONFIG } from './config.ts';
import { FLOOR_06_SUB_DEPARTMENTS_DATA } from './data.ts';

export { FLOOR_06_SUB_DEPARTMENTS_CONFIG, FLOOR_06_SUB_DEPARTMENTS_DATA };

export const FLOOR_06_SUB_DEPARTMENTS_TIER = {
  config: FLOOR_06_SUB_DEPARTMENTS_CONFIG,
  data: FLOOR_06_SUB_DEPARTMENTS_DATA,
} as const;
