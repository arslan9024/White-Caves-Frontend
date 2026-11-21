/**
 * floor-11-legal-compliance/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_11_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_11_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_11_SUPERVISORS_CONFIG, FLOOR_11_SUPERVISORS_DATA };

export const FLOOR_11_SUPERVISORS_TIER = {
  config: FLOOR_11_SUPERVISORS_CONFIG,
  data: FLOOR_11_SUPERVISORS_DATA,
} as const;
