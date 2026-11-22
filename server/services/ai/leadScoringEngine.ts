/**
 * Lead Scoring Engine — Phase 2A
 *
 * Multi-factor scoring algorithm with 4 weighted categories:
 *   Engagement (40%) + Demographic (30%) + Behavioral (20%) + Source (10%)
 *
 * Score range: 0–100
 * Tiers: hot (80+), warm (60-79), cold (30-59), inactive (<30)
 *
 * Usage:
 *   import { scoreLead, batchRescoreLeads } from './leadScoringEngine.js';
 *   const result = await scoreLead(leadId);
 *   const batch  = await batchRescoreLeads();
 */

import { getTier } from './leadScoring/types.js';
import { scoreLead, overrideScore, batchRescoreLeads } from './leadScoring/scoringCore.js';
import {
  getScoreHistory,
  getScoreTrending,
  applyWhatsAppSignal,
} from './leadScoring/historyAndSignals.js';

export type {
  ScoreTier,
  ScoreBreakdown,
  ScoreFactor,
  ScoreResult,
  BatchScoreResult,
  ScoreHistoryEntry,
  ScoreTrendingEntry,
  WhatsAppSignals,
} from './leadScoring/types.js';

export {
  getTier,
  scoreLead,
  overrideScore,
  batchRescoreLeads,
  getScoreHistory,
  getScoreTrending,
  applyWhatsAppSignal,
};

export default {
  scoreLead,
  overrideScore,
  batchRescoreLeads,
  getTier,
  getScoreHistory,
  getScoreTrending,
  applyWhatsAppSignal,
};
