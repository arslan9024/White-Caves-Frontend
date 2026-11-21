/**
 * floor-07-partnerships-alliances/sub-departments/index.ts — Sub-Departments Tier Barrel
 */
import { FLOOR_07_SUB_DEPARTMENTS_CONFIG } from './config.ts';
import { FLOOR_07_SUB_DEPARTMENTS_DATA } from './data.ts';

export { FLOOR_07_SUB_DEPARTMENTS_CONFIG, FLOOR_07_SUB_DEPARTMENTS_DATA };

export const FLOOR_07_SUB_DEPARTMENTS_TIER = {
  config: FLOOR_07_SUB_DEPARTMENTS_CONFIG,
  data: FLOOR_07_SUB_DEPARTMENTS_DATA,
} as const;
