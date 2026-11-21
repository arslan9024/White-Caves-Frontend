/**
 * floor-02-marketing-branding/sub-departments/index.ts — Sub-Departments Tier Barrel
 */
import { FLOOR_02_SUB_DEPARTMENTS_CONFIG } from './config.ts';
import { FLOOR_02_SUB_DEPARTMENTS_DATA } from './data.ts';

export { FLOOR_02_SUB_DEPARTMENTS_CONFIG, FLOOR_02_SUB_DEPARTMENTS_DATA };

export const FLOOR_02_SUB_DEPARTMENTS_TIER = {
  config: FLOOR_02_SUB_DEPARTMENTS_CONFIG,
  data: FLOOR_02_SUB_DEPARTMENTS_DATA,
} as const;
