/**
 * floor-04-technology-systems/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_04_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_04_DIRECTOR_DATA } from './data.ts';

export { FLOOR_04_DIRECTOR_CONFIG, FLOOR_04_DIRECTOR_DATA };

export const FLOOR_04_DIRECTOR_TIER = {
  config: FLOOR_04_DIRECTOR_CONFIG,
  data: FLOOR_04_DIRECTOR_DATA,
} as const;
