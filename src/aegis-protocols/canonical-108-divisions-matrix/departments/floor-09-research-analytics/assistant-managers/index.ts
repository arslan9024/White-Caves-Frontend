/**
 * floor-09-research-analytics/assistant-managers/index.ts — Level 3 Assistant Managers Tier Barrel
 */
import { FLOOR_09_ASSISTANT_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_09_ASSISTANT_MANAGERS_DATA } from './data.ts';

export { FLOOR_09_ASSISTANT_MANAGERS_CONFIG, FLOOR_09_ASSISTANT_MANAGERS_DATA };

export const FLOOR_09_ASSISTANT_MANAGERS_TIER = {
  config: FLOOR_09_ASSISTANT_MANAGERS_CONFIG,
  data: FLOOR_09_ASSISTANT_MANAGERS_DATA,
} as const;
