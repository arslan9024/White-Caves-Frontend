/**
 * floor-11-legal-compliance/managers/index.ts — Level 2 Division Managers Tier Barrel
 */
import { FLOOR_11_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_11_MANAGERS_DATA } from './data.ts';

export { FLOOR_11_MANAGERS_CONFIG, FLOOR_11_MANAGERS_DATA };

export const FLOOR_11_MANAGERS_TIER = {
  config: FLOOR_11_MANAGERS_CONFIG,
  data: FLOOR_11_MANAGERS_DATA,
} as const;
