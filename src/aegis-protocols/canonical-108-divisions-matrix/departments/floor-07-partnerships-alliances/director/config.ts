/**
 * floor-07-partnerships-alliances/director/config.ts — Level 1 Department Director Config
 */
import type { DirectorConfig } from '../../../types.ts';

export const FLOOR_07_DIRECTOR_CONFIG: DirectorConfig = {
  tier: 'DIRECTOR',
  level: 1,
  deptCode: "DEPT-07",
  floor: "FL-07",
  branchingFactor: 9,
  seatCapacity: 1,
  slaMinutes: 15,
  mode: 'FIXED_FRACTAL',
} as const;
