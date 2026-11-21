/**
 * floor-10-accounting-finance/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_10_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_10_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_10_SUPERVISORS_CONFIG, FLOOR_10_SUPERVISORS_DATA };

export const FLOOR_10_SUPERVISORS_TIER = {
  config: FLOOR_10_SUPERVISORS_CONFIG,
  data: FLOOR_10_SUPERVISORS_DATA,
} as const;
