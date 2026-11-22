import { SOURCE_QUALITY_SCORES, URGENCY_KEYWORDS } from './scoringConfig';
import type { LeadInput, ScoreComponent, ScoreFactor } from './types';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Score: Profile Fit (20 points)
 * Does their budget and property preferences match available inventory?
 */
export function scoreProfileFit(lead: LeadInput): ScoreComponent {
  let points = 0;
  const factors: ScoreFactor[] = [];

  if (lead.budget && lead.budget.min && lead.budget.max) {
    const isReasonable = lead.budget.min >= 500000 && lead.budget.max <= 100000000;
    if (isReasonable) {
      points += 8;
      factors.push({ factor: 'Defined budget range (AED)', points: 8 });
    } else {
      points += 3;
      factors.push({ factor: 'Budget defined but unusual range', points: 3 });
    }
  } else if (lead.budget && lead.budget.min) {
    points += 5;
    factors.push({ factor: 'Minimum budget only', points: 5 });
  }

  if (lead.propertyType && Array.isArray(lead.propertyType) && lead.propertyType.length > 0) {
    if (lead.propertyType.length <= 3) {
      points += 7;
      factors.push({
        factor: `Specific property types (${lead.propertyType.length} selected)`,
        points: 7,
      });
    } else {
      points += 3;
      factors.push({ factor: 'Too many property types selected', points: 3 });
    }
  }

  if (
    lead.preferredLocations &&
    Array.isArray(lead.preferredLocations) &&
    lead.preferredLocations.length > 0
  ) {
    if (lead.preferredLocations.length <= 3) {
      points += 5;
      factors.push({
        factor: `Specific locations (${lead.preferredLocations.length})`,
        points: 5,
      });
    }
  }

  return { points: Math.min(20, points), factors, maxPoints: 20 };
}

/**
 * Score: Engagement Level (20 points)
 * How frequently and through what channel did they contact us?
 */
export function scoreEngagementLevel(lead: LeadInput): ScoreComponent {
  let points = 0;
  const factors: ScoreFactor[] = [];

  // 1. Source quality
  const sourceScore = (lead.source && SOURCE_QUALITY_SCORES[lead.source]) || 1;
  points += sourceScore;
  factors.push({ factor: `Source: ${lead.source}`, points: sourceScore });

  // 2. Response speed to first contact
  if (lead.interactions && lead.interactions.length > 0) {
    const firstInteraction = lead.interactions[0];
    const timeSinceFirst = Date.now() - new Date(firstInteraction.timestamp).getTime();
    const daysSince = timeSinceFirst / MS_PER_DAY;

    if (daysSince < 1) {
      points += 5;
      factors.push({ factor: 'Responded same day', points: 5 });
    } else if (daysSince < 3) {
      points += 3;
      factors.push({ factor: 'Responded within 3 days', points: 3 });
    } else if (daysSince < 7) {
      points += 1;
      factors.push({ factor: 'Responded within 7 days', points: 1 });
    }
  }

  // 3. Interaction frequency
  if (lead.interactions && lead.interactions.length > 0) {
    const last7Days = lead.interactions.filter(interaction => {
      const daysSince = (Date.now() - new Date(interaction.timestamp).getTime()) / MS_PER_DAY;
      return daysSince < 7;
    });

    if (last7Days.length >= 3) {
      points += 5;
      factors.push({ factor: 'High engagement (3+ interactions/7 days)', points: 5 });
    } else if (last7Days.length === 2) {
      points += 3;
      factors.push({ factor: '2 interactions in last 7 days', points: 3 });
    } else if (last7Days.length === 1) {
      points += 1;
      factors.push({ factor: '1 interaction in last 7 days', points: 1 });
    }
  }

  // 4. Portal activity (saved searches, property views)
  if (lead.savedSearches) {
    points += Math.min(5, Math.ceil(lead.savedSearches.length));
    factors.push({
      factor: `Saved searches (${lead.savedSearches.length})`,
      points: Math.min(5, lead.savedSearches.length),
    });
  }

  return { points: Math.min(20, points), factors, maxPoints: 20 };
}

/**
 * Score: Urgency (15 points)
 * Do they mention a specific timeline?
 */
export function scoreUrgency(lead: LeadInput): ScoreComponent {
  let points = 0;
  const factors: ScoreFactor[] = [];

  if (lead.timeline) {
    if (lead.timeline === 'IMMEDIATE' || lead.timeline === 'THIS_WEEK') {
      points += 15;
      factors.push({ factor: 'Timeline: Immediate/This week', points: 15 });
    } else if (lead.timeline === 'THIS_MONTH') {
      points += 10;
      factors.push({ factor: 'Timeline: This month', points: 10 });
    } else if (lead.timeline === 'NEXT_QUARTER') {
      points += 5;
      factors.push({ factor: 'Timeline: Next quarter', points: 5 });
    } else if (lead.timeline === 'FLEXIBLE') {
      points += 2;
      factors.push({ factor: 'Timeline: Flexible', points: 2 });
    }
  }

  if (lead.notes && typeof lead.notes === 'string') {
    const lowerNotes = lead.notes.toLowerCase();
    const hasUrgency = URGENCY_KEYWORDS.some(kw => lowerNotes.includes(kw));
    if (hasUrgency && points === 0) {
      points += 5;
      factors.push({ factor: 'Urgency keywords found in notes', points: 5 });
    }
  }

  return { points: Math.min(15, points), factors, maxPoints: 15 };
}

/**
 * Score: Seriousness (20 points)
 * Is this person actually going to buy or just browsing?
 */
export function scoreSeriousness(lead: LeadInput): ScoreComponent {
  let points = 0;
  const factors: ScoreFactor[] = [];

  if (lead.financingApproved) {
    points += 8;
    factors.push({ factor: 'Pre-approved financing', points: 8 });
  } else if (lead.financingInProgress) {
    points += 5;
    factors.push({ factor: 'Financing in progress', points: 5 });
  }

  if (lead.previousTransactions && lead.previousTransactions > 0) {
    const historyScore = Math.min(6, lead.previousTransactions * 2);
    points += historyScore;
    factors.push({
      factor: `Previous transactions: ${lead.previousTransactions}`,
      points: historyScore,
    });
  }

  if (lead.isCorporate || lead.companyName) {
    points += 3;
    factors.push({ factor: 'Corporate/Business buyer', points: 3 });
  }

  if (lead.idVerified || lead.uaePassVerified) {
    points += 3;
    factors.push({ factor: 'Identity verified', points: 3 });
  }

  return { points: Math.min(20, points), factors, maxPoints: 20 };
}

/**
 * Score: Property Specificity (15 points)
 * Do they want a specific property or just browsing?
 */
export function scorePropertySpecificity(lead: LeadInput): ScoreComponent {
  let points = 0;
  const factors: ScoreFactor[] = [];

  if (lead.interestedPropertyIds && lead.interestedPropertyIds.length > 0) {
    if (lead.interestedPropertyIds.length === 1) {
      points += 10;
      factors.push({ factor: 'Interested in specific property', points: 10 });
    } else if (lead.interestedPropertyIds.length <= 5) {
      points += 7;
      factors.push({
        factor: `Multiple specific properties (${lead.interestedPropertyIds.length})`,
        points: 7,
      });
    }
  } else if (lead.communityPreference) {
    points += 5;
    factors.push({ factor: `Specific community: ${lead.communityPreference}`, points: 5 });
  }

  return { points: Math.min(15, points), factors, maxPoints: 15 };
}

/**
 * Score: Financial Capacity (10 points)
 * Can they actually afford what they're looking at?
 */
export function scoreFinancialCapacity(lead: LeadInput): ScoreComponent {
  let points = 0;
  const factors: ScoreFactor[] = [];

  if (lead.downPaymentReady || lead.downPaymentAmount) {
    points += 5;
    factors.push({ factor: 'Down payment ready/specified', points: 5 });
  }

  if (lead.incomeVerified || lead.jobTitle || lead.employer) {
    points += 5;
    factors.push({ factor: 'Employment/income information provided', points: 5 });
  }

  return { points: Math.min(10, points), factors, maxPoints: 10 };
}
