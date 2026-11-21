/**
 * floor-07-partnerships-alliances/managers/index.ts — Level 2 Division Managers Tier Barrel
 */
import { FLOOR_07_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_07_MANAGERS_DATA } from './data.ts';

export { FLOOR_07_MANAGERS_CONFIG, FLOOR_07_MANAGERS_DATA };

export const FLOOR_07_MANAGERS_TIER = {
  config: FLOOR_07_MANAGERS_CONFIG,
  data: FLOOR_07_MANAGERS_DATA,
} as const;
