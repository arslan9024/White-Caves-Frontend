/**
 * floor-03-human-resources/sub-departments/index.ts — Sub-Departments Tier Barrel
 */
import { FLOOR_03_SUB_DEPARTMENTS_CONFIG } from './config.ts';
import { FLOOR_03_SUB_DEPARTMENTS_DATA } from './data.ts';

export { FLOOR_03_SUB_DEPARTMENTS_CONFIG, FLOOR_03_SUB_DEPARTMENTS_DATA };

export const FLOOR_03_SUB_DEPARTMENTS_TIER = {
  config: FLOOR_03_SUB_DEPARTMENTS_CONFIG,
  data: FLOOR_03_SUB_DEPARTMENTS_DATA,
} as const;
