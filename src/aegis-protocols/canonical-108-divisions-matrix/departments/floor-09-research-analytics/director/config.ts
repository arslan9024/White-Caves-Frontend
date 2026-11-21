/**
 * floor-09-research-analytics/director/config.ts — Level 1 Department Director Config
 */
import type { DirectorConfig } from '../../../types.ts';

export const FLOOR_09_DIRECTOR_CONFIG: DirectorConfig = {
  tier: 'DIRECTOR',
  level: 1,
  deptCode: "DEPT-09",
  floor: "FL-09",
  branchingFactor: 9,
  seatCapacity: 1,
  slaMinutes: 15,
  mode: 'FIXED_FRACTAL',
} as const;
