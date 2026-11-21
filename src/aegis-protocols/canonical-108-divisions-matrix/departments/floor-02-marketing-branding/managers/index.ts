/**
 * floor-02-marketing-branding/managers/index.ts — Level 2 Division Managers Tier Barrel
 */
import { FLOOR_02_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_02_MANAGERS_DATA } from './data.ts';

export { FLOOR_02_MANAGERS_CONFIG, FLOOR_02_MANAGERS_DATA };

export const FLOOR_02_MANAGERS_TIER = {
  config: FLOOR_02_MANAGERS_CONFIG,
  data: FLOOR_02_MANAGERS_DATA,
} as const;
