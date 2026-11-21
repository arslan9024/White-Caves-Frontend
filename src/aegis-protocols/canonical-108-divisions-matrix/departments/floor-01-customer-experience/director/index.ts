/**
 * floor-01-customer-experience/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_01_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_01_DIRECTOR_DATA } from './data.ts';

export { FLOOR_01_DIRECTOR_CONFIG, FLOOR_01_DIRECTOR_DATA };

export const FLOOR_01_DIRECTOR_TIER = {
  config: FLOOR_01_DIRECTOR_CONFIG,
  data: FLOOR_01_DIRECTOR_DATA,
} as const;
