/**
 * floor-05-sales-operations/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_05_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_05_DIRECTOR_DATA } from './data.ts';

export { FLOOR_05_DIRECTOR_CONFIG, FLOOR_05_DIRECTOR_DATA };

export const FLOOR_05_DIRECTOR_TIER = {
  config: FLOOR_05_DIRECTOR_CONFIG,
  data: FLOOR_05_DIRECTOR_DATA,
} as const;
