import type { Phase, Step } from './types';
import { ROADMAP_STEPS_PART_1 } from './roadmapStepsPart1';
import { ROADMAP_STEPS_PART_2 } from './roadmapStepsPart2';
import { ROADMAP_STEPS_PART_3 } from './roadmapStepsPart3';

export const PHASES: Phase[] = [
  { id: 1, title: 'Dubai Finalization & Spanish Translations', emoji: '🇦🇪' },
  { id: 2, title: 'UNC Admission & Digital RENURE Tracking', emoji: '🎓' },
  { id: 3, title: 'Argentine Embassy Abu Dhabi Consular Protocol', emoji: '🏛️' },
  { id: 4, title: 'Arrival in Córdoba & Residence Tracking', emoji: '🏠' },
  { id: 5, title: 'Córdoba Federal Court Naturalization & Passport', emoji: '🇦🇷' },
];

export const PHASE_COLORS: Record<number, string> = {
  1: '#3B82F6', // blue
  2: '#8B5CF6', // violet
  3: '#F59E0B', // amber
  4: '#10B981', // emerald
  5: '#C9A84C', // gold (White Caves brand accent)
};

export const HERO_BADGES: string[] = [
  '✅ MOFA PK + DXB Attestations Complete',
  '🇵🇰 Pakistani Passport Holder',
  '🇦🇪 Dubai Resident (2020–Present)',
  "🎓 UNC Córdoba Master's Goal",
];

export const INITIAL_STEPS: Step[] = [
  ...ROADMAP_STEPS_PART_1,
  ...ROADMAP_STEPS_PART_2,
  ...ROADMAP_STEPS_PART_3,
];
