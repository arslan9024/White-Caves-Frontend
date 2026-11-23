/**
 * bhaktiProtocol.ts — 🔱 The Canonical Bhakti 1-12-108 Repeating Fractal Protocol
 * White Caves Real Estate LLC — Global Sovereign AI & Human Org Architecture
 * Standards: AEGIS V5.1 Single-Purpose Module (< 350 lines)
 *
 * MATHEMATICAL LAW:
 * Level 0: 1 Managing Director (MD Arslan Malik + Executive AI Zoe)
 * Level 1: 12 Directors (Corporate Floors) = 1 * 12 = 12
 * Level 2: 108 Department Managers = 12 * 9 = 108
 * Level 3: 1,296 Assistant Managers = 108 * 12 = 1,296
 * Level 4: 11,664 Operational Supervisors = 1,296 * 9 = 11,664
 *
 * FIXED SENIOR STRUCTURAL CEILING:
 * 1 + 12 + 108 + 1,296 + 11,664 = 13,081 Seats
 *
 * DYNAMIC OPERATIONAL TIER (BOTTOM-TO-TOP):
 * Level 5+: Team Leaders & Individual Employees (Leasing Agents, Brokers, Specialists)
 * Dynamically added and scaled from bottom to top; reporting upward into Supervisors.
 */

export type BhaktiSeniorRole =
  'MANAGING_DIRECTOR' | 'DIRECTOR' | 'MANAGER' | 'ASSISTANT_MANAGER' | 'SUPERVISOR';

export interface BhaktiTierDefinition {
  level: number;
  role: BhaktiSeniorRole;
  title: string;
  multiplier: number;
  totalSeats: number;
  idPrefix: string;
}

export const BHAKTI_TIERS: readonly BhaktiTierDefinition[] = [
  {
    level: 0,
    role: 'MANAGING_DIRECTOR',
    title: 'Managing Director & Founder',
    multiplier: 1,
    totalSeats: 1,
    idPrefix: 'md_',
  },
  {
    level: 1,
    role: 'DIRECTOR',
    title: 'Corporate Floor Director',
    multiplier: 12,
    totalSeats: 12,
    idPrefix: 'dir_',
  },
  {
    level: 2,
    role: 'MANAGER',
    title: 'Department Manager',
    multiplier: 9,
    totalSeats: 108,
    idPrefix: 'mgr_',
  },
  {
    level: 3,
    role: 'ASSISTANT_MANAGER',
    title: 'Assistant Department Manager',
    multiplier: 12,
    totalSeats: 1296,
    idPrefix: 'am_',
  },
  {
    level: 4,
    role: 'SUPERVISOR',
    title: 'Operational Task Supervisor',
    multiplier: 9,
    totalSeats: 11664,
    idPrefix: 'sup_',
  },
] as const;

export const BHAKTI_SENIOR_SEAT_CEILING = 13081;

/**
 * Validates that an organizational branch strictly conforms to the Bhakti multiplier.
 */
export function validateBhaktiMultiplier(level: number, childCount: number): boolean {
  switch (level) {
    case 1:
      return childCount === 12; // 1 MD -> 12 Directors
    case 2:
      return childCount === 9; // 1 Director -> 9 Managers
    case 3:
      return childCount === 12; // 1 Manager -> 12 Assistant Managers
    case 4:
      return childCount === 9; // 1 Assistant Manager -> 9 Supervisors
    default:
      return true; // Dynamic levels 5+ (Team Leader, Employee) have variable scale
  }
}

/**
 * Calculates weighted performance rollup: 30% own individual performance + 70% subtree rollup.
 */
export function calculateBhaktiRollupScore(ownScore: number, subtreeAvgScore: number): number {
  const boundedOwn = Math.max(0, Math.min(100, ownScore));
  const boundedSub = Math.max(0, Math.min(100, subtreeAvgScore));
  return Math.round((boundedOwn * 0.3 + boundedSub * 0.7) * 100) / 100;
}
