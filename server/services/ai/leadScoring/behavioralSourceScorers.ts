/**
 * Lead Scoring Engine — Behavioral (20%) & Source (10%) Category Scorers
 */

import { prisma } from '../../../database.js';
import type { CategoryScoreResult, ScoreFactor } from './types.js';

const STATUS_SCORES: ReadonlyMap<string, number> = new Map([
  ['new', 1],
  ['contacted', 2],
  ['qualified', 4],
  ['viewing', 5],
  ['offered', 7],
  ['negotiating', 9],
  ['won', 10],
  ['lost', 0],
  ['hot', 8],
  ['warm', 5],
  ['cold', 2],
]);

const SOURCE_SCORES: ReadonlyMap<string, number> = new Map([
  ['referral', 7], // Highest quality — personal recommendation
  ['whatsapp', 6], // Direct engagement channel
  ['phone', 5], // Proactive caller
  ['website', 4], // Browsed and submitted form
  ['marketing', 3], // Campaign-driven
  ['direct', 2], // Walk-in or unknown
  ['social', 2], // Social media
  ['portal', 4], // Property portal (Bayut, PF, Dubizzle)
]);

/**
 * BEHAVIORAL (20% weight) — What actions indicate buying intent?
 * Factors: status progression, transaction stage, commission existence
 */
export async function scoreBehavioral(leadId: string): Promise<CategoryScoreResult> {
  const factors: ScoreFactor[] = [];
  let score = 0;

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { status: true },
  });
  if (!lead) return { score: 0, factors };

  // 1. Lead status (max 10 points — further along pipeline = higher score)
  const statusPoints = STATUS_SCORES.get(lead.status) ?? 1;
  score += statusPoints;
  factors.push({
    category: 'behavioral',
    factor: 'status',
    points: statusPoints,
    maxPoints: 10,
    description: `Lead status: ${lead.status}`,
  });

  // 2. Active transactions (max 6 points)
  const transactionCount = await prisma.transaction.count({
    where: { leadId, status: { in: ['draft', 'pending', 'active'] } },
  });
  let txPoints = 0;
  if (transactionCount >= 2) txPoints = 6;
  else if (transactionCount >= 1) txPoints = 4;
  score += txPoints;
  factors.push({
    category: 'behavioral',
    factor: 'active_transactions',
    points: txPoints,
    maxPoints: 6,
    description: `${transactionCount} active transactions`,
  });

  // 3. Commission linked (max 4 points — means deal is progressing)
  const commissionCount = await prisma.commission.count({ where: { leadId } });
  const commPoints = commissionCount > 0 ? 4 : 0;
  score += commPoints;
  factors.push({
    category: 'behavioral',
    factor: 'commissions',
    points: commPoints,
    maxPoints: 4,
    description: commissionCount > 0 ? `${commissionCount} commissions linked` : 'No commissions',
  });

  return { score: Math.min(20, score), factors };
}

/**
 * SOURCE (10% weight) — How high-quality is the lead source?
 * Factors: source channel quality, lead age relative to source
 */
export function scoreSource(source: string, createdAt: Date): CategoryScoreResult {
  const factors: ScoreFactor[] = [];
  let score = 0;

  // 1. Source quality (max 7 points)
  const sourcePoints = SOURCE_SCORES.get(source) ?? 2;
  score += sourcePoints;
  factors.push({
    category: 'source',
    factor: 'channel',
    points: sourcePoints,
    maxPoints: 7,
    description: `Source: ${source}`,
  });

  // 2. Lead freshness (max 3 points — newer leads from good sources)
  const daysSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  let freshnessPoints = 0;
  if (daysSinceCreation <= 3) freshnessPoints = 3;
  else if (daysSinceCreation <= 7) freshnessPoints = 2;
  else if (daysSinceCreation <= 30) freshnessPoints = 1;
  score += freshnessPoints;
  factors.push({
    category: 'source',
    factor: 'freshness',
    points: freshnessPoints,
    maxPoints: 3,
    description: `Lead age: ${Math.round(daysSinceCreation)} days`,
  });

  return { score: Math.min(10, score), factors };
}
