/**
 * floor-03-human-resources/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_03_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_03_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_03_SUPERVISORS_CONFIG, FLOOR_03_SUPERVISORS_DATA };

export const FLOOR_03_SUPERVISORS_TIER = {
  config: FLOOR_03_SUPERVISORS_CONFIG,
  data: FLOOR_03_SUPERVISORS_DATA,
} as const;
