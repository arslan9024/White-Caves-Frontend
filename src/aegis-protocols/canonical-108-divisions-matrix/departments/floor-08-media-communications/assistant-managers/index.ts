/**
 * floor-08-media-communications/assistant-managers/index.ts — Level 3 Assistant Managers Tier Barrel
 */
import { FLOOR_08_ASSISTANT_MANAGERS_CONFIG } from './config.ts';
import { FLOOR_08_ASSISTANT_MANAGERS_DATA } from './data.ts';

export { FLOOR_08_ASSISTANT_MANAGERS_CONFIG, FLOOR_08_ASSISTANT_MANAGERS_DATA };

export const FLOOR_08_ASSISTANT_MANAGERS_TIER = {
  config: FLOOR_08_ASSISTANT_MANAGERS_CONFIG,
  data: FLOOR_08_ASSISTANT_MANAGERS_DATA,
} as const;
