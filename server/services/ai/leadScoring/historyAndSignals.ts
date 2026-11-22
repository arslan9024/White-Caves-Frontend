/**
 * Lead Scoring Engine — Score History, Trending & WhatsApp Signal Bridge (Phase 4A)
 */

import type { Prisma } from '@prisma/client';
import { prisma } from '../../../database.js';
import logger from '../../../utils/logger.js';
import { scoreLead } from './scoringCore.js';
import {
  getTier,
  type ScoreHistoryEntry,
  type ScoreResult,
  type ScoreTrendingEntry,
  type WhatsAppSignals,
} from './types.js';

/**
 * Get score history for a lead — used for trending charts.
 */
export async function getScoreHistory(
  leadId: string,
  options: { limit?: number; days?: number } = {}
): Promise<ScoreHistoryEntry[]> {
  const { limit = 50, days = 90 } = options;

  const since = new Date();
  since.setDate(since.getDate() - days);

  return prisma.leadScoreHistory.findMany({
    where: {
      leadId,
      createdAt: { gte: since },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      score: true,
      tier: true,
      previousScore: true,
      previousTier: true,
      trigger: true,
      breakdown: true,
      createdAt: true,
    },
  });
}

/**
 * Get trending data for all leads — warming/cooling detection.
 * Returns leads with significant score changes over a period.
 */
export async function getScoreTrending(
  options: { days?: number; minChange?: number } = {}
): Promise<ScoreTrendingEntry[]> {
  const { days = 7, minChange = 10 } = options;

  const since = new Date();
  since.setDate(since.getDate() - days);

  // Get all leads with score history in the period
  const leads = await prisma.lead.findMany({
    where: { status: { notIn: ['won', 'lost'] }, score: { gt: 0 } },
    select: { id: true, score: true },
  });

  const trends: ScoreTrendingEntry[] = [];

  for (const lead of leads) {
    const history = await prisma.leadScoreHistory.findMany({
      where: { leadId: lead.id, createdAt: { gte: since } },
      orderBy: { createdAt: 'asc' },
      select: { score: true },
    });

    const oldestEntry = history.at(0);
    if (history.length < 2 || !oldestEntry) continue;

    const oldestScore = oldestEntry.score;
    const currentScore = lead.score;
    const delta = currentScore - oldestScore;

    if (Math.abs(delta) < minChange) continue;

    trends.push({
      leadId: lead.id,
      currentScore,
      oldestScore,
      delta,
      direction:
        delta > 0 ? ('warming' as const) : delta < 0 ? ('cooling' as const) : ('stable' as const),
      dataPoints: history.length,
    });
  }

  // Sort by absolute delta (biggest changes first)
  trends.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  return trends;
}

/**
 * Apply WhatsApp conversation scoring signals to a CRM lead.
 * Bridges the Nadia/Nina NLP scoring system into the main lead scoring engine.
 *
 * @param leadId - CRM Lead ID
 * @param whatsappSignals - Scoring signals from WhatsApp conversation analysis
 */
export async function applyWhatsAppSignal(
  leadId: string,
  whatsappSignals: WhatsAppSignals
): Promise<ScoreResult> {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: {
      id: true,
      score: true,
      scoreTier: true,
      source: true,
      createdAt: true,
      scoreBreakdown: true,
    },
  });

  if (!lead) throw new Error(`Lead not found: ${leadId}`);

  // Calculate WhatsApp bonus (max 15 points on top of existing score)
  let whatsappBonus = 0;

  if (whatsappSignals.intentScore) {
    // High-intent signals: make_offer (+25), schedule_tour (+20)
    whatsappBonus += Math.min((whatsappSignals.intentScore / 25) * 5, 5); // max 5 pts
  }

  if (whatsappSignals.sentimentScore && whatsappSignals.sentimentScore > 0) {
    whatsappBonus += Math.min((whatsappSignals.sentimentScore / 15) * 3, 3); // max 3 pts
  }

  if (whatsappSignals.engagementScore) {
    whatsappBonus += Math.min((whatsappSignals.engagementScore / 20) * 4, 4); // max 4 pts
  }

  if (whatsappSignals.responseTimeScore) {
    whatsappBonus += Math.min((whatsappSignals.responseTimeScore / 10) * 3, 3); // max 3 pts
  }

  whatsappBonus = Math.round(Math.min(whatsappBonus, 15));

  // First run the standard scoring
  const result = await scoreLead(leadId);

  // Then apply WhatsApp bonus on top
  if (whatsappBonus > 0) {
    const boostedScore = Math.min(100, result.newScore + whatsappBonus);
    const boostedTier = getTier(boostedScore);

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        score: boostedScore,
        scoreTier: boostedTier,
        scoreBreakdown: {
          ...result.breakdown,
          whatsappBonus,
          whatsappSignals,
        } as unknown as Prisma.InputJsonValue,
      },
    });

    // Record the WhatsApp-boosted score in history
    await prisma.leadScoreHistory
      .create({
        data: {
          leadId,
          score: boostedScore,
          tier: boostedTier,
          previousScore: result.newScore,
          previousTier: result.newTier,
          breakdown: {
            ...result.breakdown,
            whatsappBonus,
          } as unknown as Prisma.InputJsonValue,
          trigger: 'whatsapp',
        },
      })
      .catch((err: unknown) => {
        logger.warn('Failed to record WhatsApp score history', { leadId, error: err });
      });

    logger.info(
      `[LeadScoring] WhatsApp signal applied: ${result.newScore} + ${whatsappBonus} = ${boostedScore} ` +
        `(${result.newTier} → ${boostedTier}) for ${leadId}`
    );

    return {
      ...result,
      newScore: boostedScore,
      newTier: boostedTier,
      breakdown: {
        ...result.breakdown,
        total: boostedScore,
        tier: boostedTier,
      },
    };
  }

  return result;
}
