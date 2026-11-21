/**
 * floor-10-accounting-finance/director/config.ts — Level 1 Department Director Config
 */
import type { DirectorConfig } from '../../../types.ts';

export const FLOOR_10_DIRECTOR_CONFIG: DirectorConfig = {
  tier: 'DIRECTOR',
  level: 1,
  deptCode: "DEPT-10",
  floor: "FL-10",
  branchingFactor: 9,
  seatCapacity: 1,
  slaMinutes: 15,
  mode: 'FIXED_FRACTAL',
} as const;
