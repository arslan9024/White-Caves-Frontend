/**
 * Lead Scoring Engine — Types & Tier Helpers
 */

export type ScoreTier = 'hot' | 'warm' | 'cold' | 'inactive';

export interface ScoreFactor {
  category: 'engagement' | 'demographic' | 'behavioral' | 'source';
  factor: string;
  points: number;
  maxPoints: number;
  description: string;
}

export interface ScoreBreakdown {
  engagement: number; // 0-40 (40% weight)
  demographic: number; // 0-30 (30% weight)
  behavioral: number; // 0-20 (20% weight)
  source: number; // 0-10 (10% weight)
  total: number; // 0-100
  tier: ScoreTier;
  factors: ScoreFactor[];
  lastScoredAt: string;
}

export interface ScoreResult {
  leadId: string;
  previousScore: number;
  newScore: number;
  previousTier: string;
  newTier: string;
  breakdown: ScoreBreakdown;
  changed: boolean;
}

export interface BatchScoreResult {
  total: number;
  scored: number;
  errors: number;
  upgraded: number; // Tier went up (cold → warm, warm → hot)
  downgraded: number; // Tier went down
  unchanged: number;
  duration: number; // ms
}

export interface CategoryScoreResult {
  score: number;
  factors: ScoreFactor[];
}

export interface ScoreHistoryEntry {
  score: number;
  tier: string;
  previousScore: number;
  previousTier: string;
  trigger: string;
  breakdown: unknown;
  createdAt: Date;
}

export interface ScoreTrendingEntry {
  leadId: string;
  currentScore: number;
  oldestScore: number;
  delta: number;
  direction: 'warming' | 'cooling' | 'stable';
  dataPoints: number;
}

export interface WhatsAppSignals {
  intentScore?: number; // 0-25 from messageProcessor
  sentimentScore?: number; // -10 to +15
  engagementScore?: number; // 0-20 based on message count
  responseTimeScore?: number; // 0-10
  conversationScore?: number; // 0-100 overall from messageProcessor
}

export function getTier(score: number): ScoreTier {
  if (score >= 80) return 'hot';
  if (score >= 60) return 'warm';
  if (score >= 30) return 'cold';
  return 'inactive';
}

export const TIER_RANK: ReadonlyMap<string, number> = new Map([
  ['inactive', 0],
  ['cold', 1],
  ['warm', 2],
  ['hot', 3],
]);
