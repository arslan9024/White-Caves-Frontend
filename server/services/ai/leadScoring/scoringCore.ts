/**
 * Lead Scoring Engine — Core Orchestration (scoreLead, overrideScore, batchRescoreLeads)
 */

import type { Prisma } from '@prisma/client';
import { prisma } from '../../../database.js';
import logger from '../../../utils/logger.js';
import { scoreEngagement, scoreDemographic } from './engagementDemographicScorers.js';
import { scoreBehavioral, scoreSource } from './behavioralSourceScorers.js';
import {
  getTier,
  TIER_RANK,
  type BatchScoreResult,
  type ScoreBreakdown,
  type ScoreFactor,
  type ScoreResult,
} from './types.js';

/**
 * Score a single lead — runs all 4 category scorers and persists result.
 * Returns full breakdown with previous vs new score comparison.
 */
export async function scoreLead(leadId: string): Promise<ScoreResult> {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { id: true, score: true, scoreTier: true, source: true, createdAt: true },
  });

  if (!lead) {
    throw new Error(`Lead not found: ${leadId}`);
  }

  // Run all 4 category scorers in parallel
  const [engagement, demographic, behavioral] = await Promise.all([
    scoreEngagement(leadId),
    scoreDemographic(leadId),
    scoreBehavioral(leadId),
  ]);
  const source = scoreSource(lead.source, lead.createdAt);

  const totalScore = engagement.score + demographic.score + behavioral.score + source.score;
  const tier = getTier(totalScore);
  const now = new Date();

  const breakdown: ScoreBreakdown = {
    engagement: engagement.score,
    demographic: demographic.score,
    behavioral: behavioral.score,
    source: source.score,
    total: totalScore,
    tier,
    factors: [
      ...engagement.factors,
      ...demographic.factors,
      ...behavioral.factors,
      ...source.factors,
    ],
    lastScoredAt: now.toISOString(),
  };

  // Persist to DB
  await prisma.lead.update({
    where: { id: leadId },
    data: {
      score: totalScore,
      scoreTier: tier,
      scoreBreakdown: breakdown as unknown as Prisma.InputJsonValue,
      lastScoredAt: now,
    },
  });

  const previousTier = lead.scoreTier || 'cold';
  const changed = lead.score !== totalScore;

  // Record score history for trending (Phase 4A)
  await prisma.leadScoreHistory
    .create({
      data: {
        leadId,
        score: totalScore,
        tier,
        previousScore: lead.score,
        previousTier,
        breakdown: {
          engagement: engagement.score,
          demographic: demographic.score,
          behavioral: behavioral.score,
          source: source.score,
        },
        trigger: 'middleware',
      },
    })
    .catch((err: unknown) => {
      logger.warn('Failed to record score history', { leadId, error: err });
    });

  // Log significant score changes as activities
  if (changed && Math.abs(totalScore - lead.score) >= 10) {
    await prisma.activity
      .create({
        data: {
          type: 'lead',
          action: 'score_changed',
          description: `Lead score ${lead.score} → ${totalScore} (${previousTier} → ${tier})`,
          leadId,
          metadata: {
            previousScore: lead.score,
            newScore: totalScore,
            previousTier,
            newTier: tier,
          },
        },
      })
      .catch((err: unknown) => {
        logger.warn('Failed to log score change activity', { leadId, error: err });
      });
  }

  return {
    leadId,
    previousScore: lead.score,
    newScore: totalScore,
    previousTier,
    newTier: tier,
    breakdown,
    changed,
  };
}

/**
 * Manual score override — sets score + logs justification.
 * Agents can adjust scoring when they have contextual knowledge.
 */
export async function overrideScore(
  leadId: string,
  newScore: number,
  reason: string,
  userId?: string
): Promise<ScoreResult> {
  const clamped = Math.max(0, Math.min(100, Math.round(newScore)));
  const tier = getTier(clamped);

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { id: true, score: true, scoreTier: true, scoreBreakdown: true },
  });
  if (!lead) throw new Error(`Lead not found: ${leadId}`);

  const now = new Date();
  const previousBreakdown = (lead.scoreBreakdown as Record<string, unknown>) || {};

  const breakdown: ScoreBreakdown = {
    engagement: (previousBreakdown.engagement as number) || 0,
    demographic: (previousBreakdown.demographic as number) || 0,
    behavioral: (previousBreakdown.behavioral as number) || 0,
    source: (previousBreakdown.source as number) || 0,
    total: clamped,
    tier,
    factors: (previousBreakdown.factors as ScoreFactor[]) || [],
    lastScoredAt: now.toISOString(),
  };

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      score: clamped,
      scoreTier: tier,
      scoreBreakdown: {
        ...breakdown,
        override: { score: clamped, reason, userId, at: now.toISOString() },
      } as unknown as Prisma.InputJsonValue,
      lastScoredAt: now,
    },
  });

  // Log override as activity
  await prisma.activity
    .create({
      data: {
        type: 'lead',
        action: 'score_override',
        description: `Score manually set to ${clamped} (${tier}): ${reason}`,
        leadId,
        userId: userId || null,
        metadata: { previousScore: lead.score, newScore: clamped, reason },
      },
    })
    .catch((err: unknown) => {
      logger.warn('Failed to log score override activity', { leadId, error: err });
    });

  return {
    leadId,
    previousScore: lead.score,
    newScore: clamped,
    previousTier: lead.scoreTier || 'cold',
    newTier: tier,
    breakdown,
    changed: lead.score !== clamped,
  };
}

/**
 * Batch re-score all active leads (excludes won/lost).
 * Called by cron job every 6 hours.
 */
export async function batchRescoreLeads(): Promise<BatchScoreResult> {
  const startTime = Date.now();
  let scored = 0;
  let errors = 0;
  let upgraded = 0;
  let downgraded = 0;
  let unchanged = 0;

  // Fetch all active leads (not won/lost)
  const leads = await prisma.lead.findMany({
    where: { status: { notIn: ['won', 'lost'] } },
    select: { id: true, scoreTier: true },
    orderBy: { createdAt: 'desc' },
  });

  const total = leads.length;
  logger.info(`[LeadScoring] Batch re-score started — ${total} active leads`);

  // Process in batches of 20 to avoid overwhelming the DB
  const BATCH_SIZE = 20;
  for (let i = 0; i < leads.length; i += BATCH_SIZE) {
    const batch = leads.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(
      batch.map((lead: (typeof leads)[number]) => scoreLead(lead.id))
    );

    for (const [j, result] of results.entries()) {
      const batchLead = batch.at(j);
      if (!batchLead) continue;

      if (result.status === 'fulfilled') {
        scored++;
        const previousRank = TIER_RANK.get(batchLead.scoreTier || 'cold') ?? 1;
        const newRank = TIER_RANK.get(result.value.newTier) ?? 1;
        if (newRank > previousRank) upgraded++;
        else if (newRank < previousRank) downgraded++;
        else unchanged++;
      } else {
        errors++;
        const reasonMessage =
          result.reason instanceof Error
            ? result.reason.message
            : typeof result.reason === 'object' &&
                result.reason !== null &&
                'message' in result.reason
              ? String((result.reason as { message?: unknown }).message)
              : 'Unknown error';
        logger.warn('[LeadScoring] Failed to score lead', {
          leadId: batchLead.id,
          error: reasonMessage,
        });
      }
    }
  }

  const duration = Date.now() - startTime;
  logger.info(
    `[LeadScoring] Batch complete — ${scored}/${total} scored, ${upgraded} upgraded, ${downgraded} downgraded, ${errors} errors (${duration}ms)`
  );

  return { total, scored, errors, upgraded, downgraded, unchanged, duration };
}
