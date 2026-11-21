/**
 * floor-07-partnerships-alliances/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_07_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_07_DIRECTOR_DATA } from './data.ts';

export { FLOOR_07_DIRECTOR_CONFIG, FLOOR_07_DIRECTOR_DATA };

export const FLOOR_07_DIRECTOR_TIER = {
  config: FLOOR_07_DIRECTOR_CONFIG,
  data: FLOOR_07_DIRECTOR_DATA,
} as const;
