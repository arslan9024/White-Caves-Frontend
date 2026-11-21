/**
 * floor-07-partnerships-alliances/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_07_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_07_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_07_SUPERVISORS_CONFIG, FLOOR_07_SUPERVISORS_DATA };

export const FLOOR_07_SUPERVISORS_TIER = {
  config: FLOOR_07_SUPERVISORS_CONFIG,
  data: FLOOR_07_SUPERVISORS_DATA,
} as const;
