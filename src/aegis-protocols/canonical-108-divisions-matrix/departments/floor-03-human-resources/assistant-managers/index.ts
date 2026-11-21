/**
 * floor-03-human-resources/assistant-managers/index.ts — Level 3 Assistant Managers Tier Barrel
 */
import { FLOOR_03_ASSISTANT_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_03_ASSISTANT_MANAGERS_DATA } from './data.ts';

export { FLOOR_03_ASSISTANT_MANAGERS_CONFIG, FLOOR_03_ASSISTANT_MANAGERS_DATA };

export const FLOOR_03_ASSISTANT_MANAGERS_TIER = {
  config: FLOOR_03_ASSISTANT_MANAGERS_CONFIG,
  data: FLOOR_03_ASSISTANT_MANAGERS_DATA,
} as const;
