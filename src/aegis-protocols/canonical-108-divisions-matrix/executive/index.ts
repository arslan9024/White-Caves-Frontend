/**
 * canonical-108-divisions-matrix/executive/index.ts
 * Barrel Export for Level 0 Executive Tier
 */
import { EXECUTIVE_CONFIG } from './config.ts';
import { EXECUTIVE_DATA } from './data.ts';

export { EXECUTIVE_CONFIG, EXECUTIVE_DATA };

export const EXECUTIVE_TIER = {
  config: EXECUTIVE_CONFIG,
  data: EXECUTIVE_DATA,
} as const;
