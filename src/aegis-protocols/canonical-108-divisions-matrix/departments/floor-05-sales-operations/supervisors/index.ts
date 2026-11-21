/**
 * floor-05-sales-operations/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_05_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_05_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_05_SUPERVISORS_CONFIG, FLOOR_05_SUPERVISORS_DATA };

export const FLOOR_05_SUPERVISORS_TIER = {
  config: FLOOR_05_SUPERVISORS_CONFIG,
  data: FLOOR_05_SUPERVISORS_DATA,
} as const;
