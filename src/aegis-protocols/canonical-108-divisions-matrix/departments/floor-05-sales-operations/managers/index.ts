/**
 * floor-05-sales-operations/managers/index.ts — Level 2 Division Managers Tier Barrel
 */
import { FLOOR_05_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_05_MANAGERS_DATA } from './data.ts';

export { FLOOR_05_MANAGERS_CONFIG, FLOOR_05_MANAGERS_DATA };

export const FLOOR_05_MANAGERS_TIER = {
  config: FLOOR_05_MANAGERS_CONFIG,
  data: FLOOR_05_MANAGERS_DATA,
} as const;
