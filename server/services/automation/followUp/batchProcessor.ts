/**
 * Follow-Up Engine — Scheduled Batch Processor
 *
 * Processes due follow-up steps across active sequences on scheduler intervals.
 */

import { prisma } from '../../../database.js';
import { logger } from '../../../utils/logger.js';
import { cancelSequence, completeSequence, pauseSequence } from './sequenceLifecycle.js';
import { executeStep } from './stepExecutor.js';
import type { ProcessBatchResult } from './types.js';

/**
 * Process all follow-up steps that are due.
 * Called by the scheduler on interval (e.g., every 5 min).
 *
 * 1. Find active sequences where nextStepAt <= now
 * 2. For each, execute the current step
 * 3. Advance the sequence or complete it
 */
export async function processScheduledSteps(): Promise<ProcessBatchResult> {
  const now = new Date();
  const result: ProcessBatchResult = {
    processed: 0,
    sent: 0,
    failed: 0,
    skipped: 0,
    errors: [],
  };

  // Find all sequences that have a step due
  const dueSequences = await prisma.followUpSequence.findMany({
    where: {
      status: 'active',
      nextStepAt: { lte: now },
    },
    include: {
      steps: { orderBy: { stepNumber: 'asc' } },
      lead: { select: { id: true, name: true, phone: true, email: true, status: true } },
    },
    take: 50, // process max 50 per batch
  });

  for (const sequence of dueSequences) {
    result.processed++;

    try {
      // Find the next pending step
      const nextStep = sequence.steps.find(s => s.status === 'pending');
      if (!nextStep) {
        // No more steps → complete the sequence
        await completeSequence(sequence.id);
        continue;
      }

      // Check if lead is still active (not won/lost)
      if (sequence.lead.status === 'won' || sequence.lead.status === 'lost') {
        await cancelSequence(sequence.id, 'Lead status changed to ' + sequence.lead.status);
        result.skipped++;
        continue;
      }

      // Check for manual agent contact in last 24h (W24-010)
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const manualActivity = await prisma.activity.findFirst({
        where: {
          leadId: sequence.lead.id,
          createdAt: { gte: cutoff },
          type: 'lead',
          action: { in: ['call', 'email', 'visit', 'manual_whatsapp', 'note_added'] },
          userId: { not: null },
        },
      });

      if (manualActivity) {
        await pauseSequence(sequence.id);
        await prisma.activity.create({
          data: {
            type: 'lead',
            action: 'follow_up_autopause',
            description: `Follow-up sequence auto-paused due to manual agent contact (Activity: ${manualActivity.action}) within 24h`,
            leadId: sequence.lead.id,
          },
        });
        result.skipped++;
        continue;
      }

      // Execute the step
      const stepResult = await executeStep(nextStep.id, sequence.lead);
      if (stepResult.status === 'sent') {
        result.sent++;
      } else if (stepResult.status === 'failed') {
        result.failed++;
      } else {
        result.skipped++;
      }

      // Advance sequence
      const remainingSteps = sequence.steps.filter(
        s => s.status === 'pending' && s.stepNumber > nextStep.stepNumber
      );

      if (remainingSteps.length === 0) {
        await completeSequence(sequence.id);
      } else {
        await prisma.followUpSequence.update({
          where: { id: sequence.id },
          data: {
            currentStep: nextStep.stepNumber,
            nextStepAt: remainingSteps[0]?.scheduledAt || null,
          },
        });
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      result.errors.push(`Sequence ${sequence.id}: ${msg}`);
      logger.error(`Follow-up step error for sequence ${sequence.id}:`, error);
    }
  }

  if (result.processed > 0) {
    logger.info(
      `Follow-up batch processed: ${result.processed} sequences, ` +
        `${result.sent} sent, ${result.failed} failed, ${result.skipped} skipped`
    );
  }

  return result;
}
