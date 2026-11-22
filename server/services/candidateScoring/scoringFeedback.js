import { SCORE_THRESHOLDS, SCREENING_STATUS } from '../../constants/ScoreLevels.js';

/**
 * Compute weighted overall score from the 5 factor scores
 */
export function computeWeightedOverallScore(factorScores, weights) {
  return Math.round(
    factorScores.skills * weights.skills +
      factorScores.experience * weights.experience +
      factorScores.education * weights.education +
      factorScores.cultural_fit * weights.cultural_fit +
      factorScores.location_match * weights.location_match
  );
}

/**
 * Determine screening status based on overall score
 */
export function determineScreeningStatus(score) {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return SCREENING_STATUS.STRONG_MATCH;
  if (score >= SCORE_THRESHOLDS.STRONG) return SCREENING_STATUS.MODERATE_MATCH;
  if (score >= SCORE_THRESHOLDS.FAIR) return SCREENING_STATUS.WEAK_MATCH;
  return SCREENING_STATUS.REJECTED;
}

/**
 * Generate human-readable feedback based on factor scores
 */
export function generateFeedback(scores) {
  const feedback = [];

  if (scores.skills >= 85) {
    feedback.push('Excellent skills match with job requirements');
  } else if (scores.skills >= 70) {
    feedback.push('Good skills match; candidate has most required skills');
  } else if (scores.skills >= 50) {
    feedback.push('Moderate skills match; candidate may need training in some areas');
  } else {
    feedback.push('Weak skills match; significant skill gaps identified');
  }

  if (scores.experience >= 85) {
    feedback.push('Strong experience level for this role');
  } else if (scores.experience >= 60) {
    feedback.push('Adequate experience; suitable for the position');
  } else {
    feedback.push('Limited experience; may require mentoring');
  }

  if (scores.education >= 90) {
    feedback.push('Excellent educational background');
  } else if (scores.education >= 75) {
    feedback.push('Solid educational credentials');
  } else if (scores.education >= 50) {
    feedback.push('Basic educational requirements met');
  } else {
    feedback.push('Limited formal education on record');
  }

  if (scores.location_match >= 90) {
    feedback.push('Perfect location alignment or remote flexibility');
  } else if (scores.location_match >= 70) {
    feedback.push('Good geographic fit');
  } else if (scores.location_match >= 50) {
    feedback.push('Location considerations may apply');
  }

  return feedback.join('. ');
}
