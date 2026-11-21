/**
 * floor-04-technology-systems/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_04_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_04_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_04_SUPERVISORS_CONFIG, FLOOR_04_SUPERVISORS_DATA };

export const FLOOR_04_SUPERVISORS_TIER = {
  config: FLOOR_04_SUPERVISORS_CONFIG,
  data: FLOOR_04_SUPERVISORS_DATA,
} as const;
