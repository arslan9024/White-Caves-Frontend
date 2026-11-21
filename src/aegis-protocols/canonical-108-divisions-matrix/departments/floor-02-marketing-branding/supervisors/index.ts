/**
 * floor-02-marketing-branding/supervisors/index.ts — Level 4 Supervisors Tier Barrel
 */
import { FLOOR_02_SUPERVISORS_CONFIG } from './config.ts';
import { FLOOR_02_SUPERVISORS_DATA } from './data.ts';

export { FLOOR_02_SUPERVISORS_CONFIG, FLOOR_02_SUPERVISORS_DATA };

export const FLOOR_02_SUPERVISORS_TIER = {
  config: FLOOR_02_SUPERVISORS_CONFIG,
  data: FLOOR_02_SUPERVISORS_DATA,
} as const;
