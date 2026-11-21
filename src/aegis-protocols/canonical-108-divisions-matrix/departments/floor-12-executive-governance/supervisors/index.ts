/**
 * floor-12-executive-governance/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_12_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_12_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_12_SUPERVISORS_CONFIG, FLOOR_12_SUPERVISORS_DATA };

export const FLOOR_12_SUPERVISORS_TIER = {
  config: FLOOR_12_SUPERVISORS_CONFIG,
  data: FLOOR_12_SUPERVISORS_DATA,
} as const;
