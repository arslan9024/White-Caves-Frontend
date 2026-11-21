/**
 * floor-01-customer-experience/managers/index.ts — Level 2 Division Managers Tier Barrel
 */
import { FLOOR_01_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_01_MANAGERS_DATA } from './data.ts';

export { FLOOR_01_MANAGERS_CONFIG, FLOOR_01_MANAGERS_DATA };

export const FLOOR_01_MANAGERS_TIER = {
  config: FLOOR_01_MANAGERS_CONFIG,
  data: FLOOR_01_MANAGERS_DATA,
} as const;
