/**
 * floor-02-marketing-branding/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_02_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_02_DIRECTOR_DATA } from './data.ts';

export { FLOOR_02_DIRECTOR_CONFIG, FLOOR_02_DIRECTOR_DATA };

export const FLOOR_02_DIRECTOR_TIER = {
  config: FLOOR_02_DIRECTOR_CONFIG,
  data: FLOOR_02_DIRECTOR_DATA,
} as const;
