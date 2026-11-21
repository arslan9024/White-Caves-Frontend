/**
 * floor-12-executive-governance/director/config.ts — Level 1 Department Director Config
 */
import type { DirectorConfig } from '../../../types.ts';

export const FLOOR_12_DIRECTOR_CONFIG: DirectorConfig = {
  tier: 'DIRECTOR',
  level: 1,
  deptCode: "DEPT-12",
  floor: "FL-12",
  branchingFactor: 9,
  seatCapacity: 1,
  slaMinutes: 15,
  mode: 'FIXED_FRACTAL',
} as const;
