/**
 * floor-06-inventory-portfolio/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_06_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_06_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_06_SUPERVISORS_CONFIG, FLOOR_06_SUPERVISORS_DATA };

export const FLOOR_06_SUPERVISORS_TIER = {
  config: FLOOR_06_SUPERVISORS_CONFIG,
  data: FLOOR_06_SUPERVISORS_DATA,
} as const;
