/**
 * floor-01-customer-experience/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_01_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_01_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_01_SUPERVISORS_CONFIG, FLOOR_01_SUPERVISORS_DATA };

export const FLOOR_01_SUPERVISORS_TIER = {
  config: FLOOR_01_SUPERVISORS_CONFIG,
  data: FLOOR_01_SUPERVISORS_DATA,
} as const;
