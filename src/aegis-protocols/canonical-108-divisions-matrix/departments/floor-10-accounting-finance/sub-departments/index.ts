/**
 * floor-10-accounting-finance/sub-departments/index.ts — Sub-Departments Tier Barrel
 */
import { FLOOR_10_SUB_DEPARTMENTS_CONFIG } from './config.ts';
import { FLOOR_10_SUB_DEPARTMENTS_DATA } from './data.ts';

export { FLOOR_10_SUB_DEPARTMENTS_CONFIG, FLOOR_10_SUB_DEPARTMENTS_DATA };

export const FLOOR_10_SUB_DEPARTMENTS_TIER = {
  config: FLOOR_10_SUB_DEPARTMENTS_CONFIG,
  data: FLOOR_10_SUB_DEPARTMENTS_DATA,
} as const;
