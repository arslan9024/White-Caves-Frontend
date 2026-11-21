/**
 * floor-03-human-resources/managers/index.ts — Level 2 Division Managers Tier Barrel
 */
import { FLOOR_03_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_03_MANAGERS_DATA } from './data.ts';

export { FLOOR_03_MANAGERS_CONFIG, FLOOR_03_MANAGERS_DATA };

export const FLOOR_03_MANAGERS_TIER = {
  config: FLOOR_03_MANAGERS_CONFIG,
  data: FLOOR_03_MANAGERS_DATA,
} as const;
