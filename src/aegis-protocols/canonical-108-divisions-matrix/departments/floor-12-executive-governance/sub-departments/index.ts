/**
 * floor-12-executive-governance/sub-departments/index.ts — Sub-Departments Tier Barrel
 */
import { FLOOR_12_SUB_DEPARTMENTS_CONFIG } from './config.ts';
import { FLOOR_12_SUB_DEPARTMENTS_DATA } from './data.ts';

export { FLOOR_12_SUB_DEPARTMENTS_CONFIG, FLOOR_12_SUB_DEPARTMENTS_DATA };

export const FLOOR_12_SUB_DEPARTMENTS_TIER = {
  config: FLOOR_12_SUB_DEPARTMENTS_CONFIG,
  data: FLOOR_12_SUB_DEPARTMENTS_DATA,
} as const;
