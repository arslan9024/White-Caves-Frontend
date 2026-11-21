/**
 * floor-04-technology-systems/managers/index.ts — Level 2 Division Managers Tier Barrel
 */
import { FLOOR_04_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_04_MANAGERS_DATA } from './data.ts';

export { FLOOR_04_MANAGERS_CONFIG, FLOOR_04_MANAGERS_DATA };

export const FLOOR_04_MANAGERS_TIER = {
  config: FLOOR_04_MANAGERS_CONFIG,
  data: FLOOR_04_MANAGERS_DATA,
} as const;
