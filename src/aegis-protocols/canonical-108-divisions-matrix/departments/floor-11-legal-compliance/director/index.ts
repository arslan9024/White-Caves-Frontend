/**
 * floor-11-legal-compliance/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_11_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_11_DIRECTOR_DATA } from './data.ts';

export { FLOOR_11_DIRECTOR_CONFIG, FLOOR_11_DIRECTOR_DATA };

export const FLOOR_11_DIRECTOR_TIER = {
  config: FLOOR_11_DIRECTOR_CONFIG,
  data: FLOOR_11_DIRECTOR_DATA,
} as const;
