/**
 * floor-06-inventory-portfolio/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_06_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_06_DIRECTOR_DATA } from './data.ts';

export { FLOOR_06_DIRECTOR_CONFIG, FLOOR_06_DIRECTOR_DATA };

export const FLOOR_06_DIRECTOR_TIER = {
  config: FLOOR_06_DIRECTOR_CONFIG,
  data: FLOOR_06_DIRECTOR_DATA,
} as const;
