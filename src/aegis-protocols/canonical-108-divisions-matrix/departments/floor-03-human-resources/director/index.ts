/**
 * floor-03-human-resources/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_03_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_03_DIRECTOR_DATA } from './data.ts';

export { FLOOR_03_DIRECTOR_CONFIG, FLOOR_03_DIRECTOR_DATA };

export const FLOOR_03_DIRECTOR_TIER = {
  config: FLOOR_03_DIRECTOR_CONFIG,
  data: FLOOR_03_DIRECTOR_DATA,
} as const;
