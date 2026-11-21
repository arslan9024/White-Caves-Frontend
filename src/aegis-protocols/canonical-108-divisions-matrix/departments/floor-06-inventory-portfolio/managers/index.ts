/**
 * floor-06-inventory-portfolio/managers/index.ts — Level 2 Division Managers Tier Barrel
 */
import { FLOOR_06_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_06_MANAGERS_DATA } from './data.ts';

export { FLOOR_06_MANAGERS_CONFIG, FLOOR_06_MANAGERS_DATA };

export const FLOOR_06_MANAGERS_TIER = {
  config: FLOOR_06_MANAGERS_CONFIG,
  data: FLOOR_06_MANAGERS_DATA,
} as const;
