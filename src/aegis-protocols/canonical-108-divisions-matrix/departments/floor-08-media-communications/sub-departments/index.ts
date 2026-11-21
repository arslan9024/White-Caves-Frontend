/**
 * floor-08-media-communications/sub-departments/index.ts — Sub-Departments Tier Barrel
 */
import { FLOOR_08_SUB_DEPARTMENTS_CONFIG } from './config.ts';
import { FLOOR_08_SUB_DEPARTMENTS_DATA } from './data.ts';

export { FLOOR_08_SUB_DEPARTMENTS_CONFIG, FLOOR_08_SUB_DEPARTMENTS_DATA };

export const FLOOR_08_SUB_DEPARTMENTS_TIER = {
  config: FLOOR_08_SUB_DEPARTMENTS_CONFIG,
  data: FLOOR_08_SUB_DEPARTMENTS_DATA,
} as const;
