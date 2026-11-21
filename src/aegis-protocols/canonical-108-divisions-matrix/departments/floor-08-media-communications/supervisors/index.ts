/**
 * floor-08-media-communications/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_08_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_08_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_08_SUPERVISORS_CONFIG, FLOOR_08_SUPERVISORS_DATA };

export const FLOOR_08_SUPERVISORS_TIER = {
  config: FLOOR_08_SUPERVISORS_CONFIG,
  data: FLOOR_08_SUPERVISORS_DATA,
} as const;
