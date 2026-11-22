import type { RecommendedAction, ScoringCriteriaMap, ScoringWeights } from './types';

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  profileFit: 20, // Does their budget/needs match available properties?
  engagementLevel: 20, // How frequently do they interact?
  urgency: 15, // Timeline pressure ("this week", "must close by X")
  seriousness: 20, // Pre-approved financing, previous buyer, business registered
  propertySpecificity: 15, // Named specific properties vs generic search
  financialCapacity: 10, // Verified net worth, income, purchasing power
};

export const DEFAULT_SCORING_CRITERIA: ScoringCriteriaMap = {
  profileFit: {
    weight: 20,
    factors: [
      { criterion: 'Budget vs Market Availability', maxPoints: 8 },
      { criterion: 'Property Type Preference Match', maxPoints: 7 },
      { criterion: 'Location Fit', maxPoints: 5 },
    ],
  },
  engagementLevel: {
    weight: 20,
    factors: [
      { criterion: 'Inquiry Source Quality', maxPoints: 5 }, // Direct contact > referral > portal > walk-in
      { criterion: 'Response Time to Contact', maxPoints: 5 }, // Fast responder = serious buyer
      { criterion: 'Interaction Frequency', maxPoints: 5 }, // Multiple contacts within 7 days
      { criterion: 'Portal Activity', maxPoints: 5 }, // Saved searches, property views
    ],
  },
  urgency: {
    weight: 15,
    factors: [
      { criterion: 'Decision Timeline Mentioned', maxPoints: 8 }, // "This week", "month", "quarter"
      { criterion: 'Timeline Specificity', maxPoints: 7 }, // Exact date vs vague timeframe
    ],
  },
  seriousness: {
    weight: 20,
    factors: [
      { criterion: 'Pre-Approved Financing', maxPoints: 8 }, // Bank pre-approval letter
      { criterion: 'Previous Transaction History', maxPoints: 6 }, // Repeat buyer/investor
      { criterion: 'Business Registration', maxPoints: 3 }, // Company buying (corporate client)
      { criterion: 'Verified Identity', maxPoints: 3 }, // Passport, RERA, UAE Pass verified
    ],
  },
  propertySpecificity: {
    weight: 15,
    factors: [
      { criterion: 'Named Property Interest', maxPoints: 10 }, // "I want the villa on X street"
      { criterion: 'Specific Building/Community', maxPoints: 5 }, // "DAMAC Hills 2" vs "Dubai area"
    ],
  },
  financialCapacity: {
    weight: 10,
    factors: [
      { criterion: 'Income Verification', maxPoints: 5 },
      { criterion: 'Down Payment Available', maxPoints: 5 },
    ],
  },
};

export const DEFAULT_TIME_DECAY_FACTOR = 0.95; // 5% decay per day (older = lower value)

export const SOURCE_QUALITY_SCORES: Record<string, number> = {
  DIRECT_CONTACT: 5, // Direct phone/email = very serious
  AGENT_REFERRAL: 4, // Referred by agent
  OWNER_REFERRAL: 4, // Referred by owner
  WEBSITE: 3, // Came through website
  PORTAL: 2, // Third-party portal (Property Finder, Bayut, Dubizzle)
  SOCIAL_MEDIA: 1, // Social media
  WALK_IN: 2, // Walk-in
  OTHER: 1,
};

export const URGENCY_KEYWORDS: readonly string[] = [
  'asap',
  'urgent',
  'immediately',
  'this week',
  'this month',
  'closing date',
  'deadline',
  'must sell',
  'must buy',
  'quick',
];

export const CONVERSION_RATES: Record<number, number> = {
  90: 0.45, // Score 90+ = 45% conversion
  80: 0.35, // Score 80-89 = 35% conversion
  70: 0.25, // Score 70-79 = 25% conversion
  50: 0.12, // Score 50-69 = 12% conversion
  30: 0.05, // Score 30-49 = 5% conversion
  0: 0.02, // Score <30 = 2% conversion
};

export const INTERACTION_BOOSTS: Record<string, number> = {
  CALL: 3, // Phone calls boost score more than email
  WHATSAPP: 2,
  EMAIL: 1,
  MEETING: 5, // In-person meeting = big boost
  VIEWING: 7, // Actually viewed property = major boost
  OFFER_SUBMITTED: 10, // Submitted offer = critical signal
};

export function getScoreGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 80) return 'A-';
  if (score >= 75) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 65) return 'B-';
  if (score >= 60) return 'C+';
  if (score >= 50) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

export function getScoreRange(score: number): string {
  if (score >= 85) return 'EXCELLENT';
  if (score >= 70) return 'GOOD';
  if (score >= 50) return 'MODERATE';
  if (score >= 30) return 'POOR';
  return 'VERY_POOR';
}

export function estimateConversionProbability(score: number): string {
  // Based on industry benchmarks for real estate
  // Raw conversion = 8%, high-score conversion = 40%+
  const sortedThresholds = Object.entries(CONVERSION_RATES).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  );

  for (const [threshold, rate] of sortedThresholds) {
    if (score >= parseInt(threshold, 10)) {
      return `${(rate * 100).toFixed(1)}%`;
    }
  }
  return '2%';
}

export function getRecommendedAction(score: number): RecommendedAction {
  if (score >= 85) {
    return {
      action: 'IMMEDIATE_FOLLOW_UP',
      description: 'HOT LEAD - Assign senior agent, prioritize for viewings',
      priority: 'CRITICAL',
      assignmentRecommendation: 'Best available agent',
      followUpTimeline: 'Within 2 hours',
    };
  }
  if (score >= 70) {
    return {
      action: 'PRIORITY_FOLLOW_UP',
      description: 'Strong lead - Schedule viewing within 24 hours',
      priority: 'HIGH',
      assignmentRecommendation: 'Experienced agent',
      followUpTimeline: 'Within 24 hours',
    };
  }
  if (score >= 50) {
    return {
      action: 'STANDARD_FOLLOW_UP',
      description: 'Moderate lead - Normal sales process',
      priority: 'MEDIUM',
      assignmentRecommendation: 'Regular agent',
      followUpTimeline: 'Within 3 days',
    };
  }
  if (score >= 30) {
    return {
      action: 'LOW_PRIORITY_FOLLOW_UP',
      description: "Weak lead - Follow up but don't invest heavily",
      priority: 'LOW',
      assignmentRecommendation: 'Junior agent or automated follow-up',
      followUpTimeline: 'Within 7 days',
    };
  }
  return {
    action: 'NURTURE_ONLY',
    description: 'Very weak - Add to nurture list, email campaigns only',
    priority: 'VERY_LOW',
    assignmentRecommendation: 'Automated nurture/no assignment',
    followUpTimeline: 'Marketing only',
  };
}
