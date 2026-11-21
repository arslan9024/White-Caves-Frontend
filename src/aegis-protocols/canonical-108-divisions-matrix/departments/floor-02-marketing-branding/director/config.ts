/**
 * floor-02-marketing-branding/director/config.ts — Level 1 Department Director Config
 */
import type { DirectorConfig } from '../../../types.ts';

export const FLOOR_02_DIRECTOR_CONFIG: DirectorConfig = {
  tier: 'DIRECTOR',
  level: 1,
  deptCode: "DEPT-02",
  floor: "FL-02",
  branchingFactor: 9,
  seatCapacity: 1,
  slaMinutes: 15,
  mode: 'FIXED_FRACTAL',
} as const;
