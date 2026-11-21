/**
 * floor-09-research-analytics/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_09_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_09_DIRECTOR_DATA } from './data.ts';

export { FLOOR_09_DIRECTOR_CONFIG, FLOOR_09_DIRECTOR_DATA };

export const FLOOR_09_DIRECTOR_TIER = {
  config: FLOOR_09_DIRECTOR_CONFIG,
  data: FLOOR_09_DIRECTOR_DATA,
} as const;
