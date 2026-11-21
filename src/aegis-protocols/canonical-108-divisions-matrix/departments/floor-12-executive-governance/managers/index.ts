/**
 * floor-12-executive-governance/managers/index.ts — Level 2 Division Managers Tier Barrel
 */
import { FLOOR_12_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_12_MANAGERS_DATA } from './data.ts';

export { FLOOR_12_MANAGERS_CONFIG, FLOOR_12_MANAGERS_DATA };

export const FLOOR_12_MANAGERS_TIER = {
  config: FLOOR_12_MANAGERS_CONFIG,
  data: FLOOR_12_MANAGERS_DATA,
} as const;
