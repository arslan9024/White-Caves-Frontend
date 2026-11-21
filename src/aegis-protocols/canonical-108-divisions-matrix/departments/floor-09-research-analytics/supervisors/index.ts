/**
 * floor-09-research-analytics/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_09_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_09_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_09_SUPERVISORS_CONFIG, FLOOR_09_SUPERVISORS_DATA };

export const FLOOR_09_SUPERVISORS_TIER = {
  config: FLOOR_09_SUPERVISORS_CONFIG,
  data: FLOOR_09_SUPERVISORS_DATA,
} as const;
