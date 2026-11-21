/**
 * floor-09-research-analytics/managers/index.ts — Level 2 Division Managers Tier Barrel
 */
import { FLOOR_09_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_09_MANAGERS_DATA } from './data.ts';

export { FLOOR_09_MANAGERS_CONFIG, FLOOR_09_MANAGERS_DATA };

export const FLOOR_09_MANAGERS_TIER = {
  config: FLOOR_09_MANAGERS_CONFIG,
  data: FLOOR_09_MANAGERS_DATA,
} as const;
