/**
 * floor-10-accounting-finance/assistant-managers/index.ts — Level 3 Assistant Managers Tier Barrel
 */
import { FLOOR_10_ASSISTANT_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_10_ASSISTANT_MANAGERS_DATA } from './data.ts';

export { FLOOR_10_ASSISTANT_MANAGERS_CONFIG, FLOOR_10_ASSISTANT_MANAGERS_DATA };

export const FLOOR_10_ASSISTANT_MANAGERS_TIER = {
  config: FLOOR_10_ASSISTANT_MANAGERS_CONFIG,
  data: FLOOR_10_ASSISTANT_MANAGERS_DATA,
} as const;
