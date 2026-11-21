/**
 * floor-01-customer-experience/sub-departments/index.ts — Sub-Departments Tier Barrel
 */
import { FLOOR_01_SUB_DEPARTMENTS_CONFIG } from './config.ts';
import { FLOOR_01_SUB_DEPARTMENTS_DATA } from './data.ts';

export { FLOOR_01_SUB_DEPARTMENTS_CONFIG, FLOOR_01_SUB_DEPARTMENTS_DATA };

export const FLOOR_01_SUB_DEPARTMENTS_TIER = {
  config: FLOOR_01_SUB_DEPARTMENTS_CONFIG,
  data: FLOOR_01_SUB_DEPARTMENTS_DATA,
} as const;
