/**
 * floor-02-marketing-branding/assistant-managers/index.ts — Level 3 Assistant Managers Tier Barrel
 */
import { FLOOR_02_ASSISTANT_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_02_ASSISTANT_MANAGERS_DATA } from './data.ts';

export { FLOOR_02_ASSISTANT_MANAGERS_CONFIG, FLOOR_02_ASSISTANT_MANAGERS_DATA };

export const FLOOR_02_ASSISTANT_MANAGERS_TIER = {
  config: FLOOR_02_ASSISTANT_MANAGERS_CONFIG,
  data: FLOOR_02_ASSISTANT_MANAGERS_DATA,
} as const;
