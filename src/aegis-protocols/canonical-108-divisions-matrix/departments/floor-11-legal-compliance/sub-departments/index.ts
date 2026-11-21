/**
 * floor-11-legal-compliance/sub-departments/index.ts — Sub-Departments Tier Barrel
 */
import { FLOOR_11_SUB_DEPARTMENTS_CONFIG } from './config.ts';
import { FLOOR_11_SUB_DEPARTMENTS_DATA } from './data.ts';

export { FLOOR_11_SUB_DEPARTMENTS_CONFIG, FLOOR_11_SUB_DEPARTMENTS_DATA };

export const FLOOR_11_SUB_DEPARTMENTS_TIER = {
  config: FLOOR_11_SUB_DEPARTMENTS_CONFIG,
  data: FLOOR_11_SUB_DEPARTMENTS_DATA,
} as const;
