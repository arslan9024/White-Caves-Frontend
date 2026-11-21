/**
 * floor-10-accounting-finance/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_10_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_10_DIRECTOR_DATA } from './data.ts';

export { FLOOR_10_DIRECTOR_CONFIG, FLOOR_10_DIRECTOR_DATA };

export const FLOOR_10_DIRECTOR_TIER = {
  config: FLOOR_10_DIRECTOR_CONFIG,
  data: FLOOR_10_DIRECTOR_DATA,
} as const;
