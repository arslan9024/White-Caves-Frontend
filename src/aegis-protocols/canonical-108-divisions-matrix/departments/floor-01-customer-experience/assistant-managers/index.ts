/**
 * floor-01-customer-experience/assistant-managers/index.ts — Level 3 Assistant Managers Tier Barrel
 */
import { FLOOR_01_ASSISTANT_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_01_ASSISTANT_MANAGERS_DATA } from './data.ts';

export { FLOOR_01_ASSISTANT_MANAGERS_CONFIG, FLOOR_01_ASSISTANT_MANAGERS_DATA };

export const FLOOR_01_ASSISTANT_MANAGERS_TIER = {
  config: FLOOR_01_ASSISTANT_MANAGERS_CONFIG,
  data: FLOOR_01_ASSISTANT_MANAGERS_DATA,
} as const;
