/**
 * Constants and configuration for the 5-factor Candidate Scoring model.
 */

// Default weights for the 5-factor model (can be customized per job)
export const DEFAULT_WEIGHTS = {
  skills: 0.35, // 35% - Most important for technical roles
  experience: 0.25, // 25%
  education: 0.15, // 15%
  cultural_fit: 0.15, // 15%
  location_match: 0.1, // 10%
};

// Skill proficiency levels (used in experience calculations)
export const SKILL_CATEGORIES = {
  expert: { min_years: 5, weight: 1.0 },
  senior: { min_years: 3, weight: 0.85 },
  mid: { min_years: 1, weight: 0.7 },
  junior: { min_years: 0, weight: 0.5 },
};

// Degree hierarchy scores
export const DEGREE_VALUES = {
  phd: 100,
  master: 90,
  bachelor: 80,
  associate: 60,
  diploma: 50,
  certificate: 40,
};

export const TECH_FIELD_KEYWORDS = ['computer', 'software', 'information', 'engineering'];

export const TECH_ROLE_KEYWORDS = ['developer', 'engineer', 'programmer'];

export const POSITIVE_CULTURAL_INDICATORS = [
  'leadership',
  'team',
  'collaboration',
  'innovation',
  'problem-solving',
  'initiative',
  'mentor',
  'volunteer',
  'community',
  'agile',
  'startup',
  'fast-paced',
  'growth',
  'learning',
  'creative',
  'dynamic',
];

export const CULTURAL_RED_FLAGS = ['fired', 'terminated', 'lawsuit', 'scandal'];
