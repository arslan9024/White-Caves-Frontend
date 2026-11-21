/**
 * floor-12-executive-governance/director/index.ts — Level 1 Director Tier Barrel
 */
import { FLOOR_12_DIRECTOR_CONFIG } from './config.ts';
import { FLOOR_12_DIRECTOR_DATA } from './data.ts';

export { FLOOR_12_DIRECTOR_CONFIG, FLOOR_12_DIRECTOR_DATA };

export const FLOOR_12_DIRECTOR_TIER = {
  config: FLOOR_12_DIRECTOR_CONFIG,
  data: FLOOR_12_DIRECTOR_DATA,
} as const;
