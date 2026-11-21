/**
 * floor-08-media-communications/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_08_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_08_DIRECTOR_DATA } from './data.ts';

export { FLOOR_08_DIRECTOR_CONFIG, FLOOR_08_DIRECTOR_DATA };

export const FLOOR_08_DIRECTOR_TIER = {
  config: FLOOR_08_DIRECTOR_CONFIG,
  data: FLOOR_08_DIRECTOR_DATA,
} as const;
