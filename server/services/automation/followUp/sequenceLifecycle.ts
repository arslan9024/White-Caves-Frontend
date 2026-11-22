/**
 * Follow-Up Engine — Sequence Lifecycle Operations
 *
 * Manages starting, pausing, resuming, cancelling, and completing follow-up sequences.
 */

import { prisma } from '../../../database.js';
import { logger } from '../../../utils/logger.js';
import {
  getCadenceForTier,
  type CadenceTemplate,
  type CadenceStep,
} from '../cadenceTemplates.js';
import { resolveCadenceFromDynamicRules } from './dynamicCadence.js';
import type { StartSequenceResult } from './types.js';

/**
 * Start an automated follow-up sequence for a lead.
 *
 * 1. Looks up the lead's score tier
 * 2. Checks for existing active sequences (prevents duplicates)
 * 3. Creates FollowUpSequence + all FollowUpStep records
 * 4. Schedules the first step
 */
export async function startSequence(
  leadId: string,
  options?: { cadenceType?: string; createdById?: string }
): Promise<StartSequenceResult> {
  // 1. Fetch lead
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { id: true, name: true, scoreTier: true, status: true, source: true, dealType: true },
  });
  if (!lead) throw new Error(`Lead not found: ${leadId}`);

  // 2. Check for active sequences on this lead
  const existingActive = await prisma.followUpSequence.findFirst({
    where: { leadId, status: { in: ['active', 'paused'] } },
  });
  if (existingActive) {
    throw new Error(
      `Lead ${leadId} already has an active sequence (${existingActive.id}). ` +
        `Cancel or complete it before starting a new one.`
    );
  }

  // 3. Determine cadence
  const dynamicCadence = await resolveCadenceFromDynamicRules({
    id: lead.id,
    scoreTier: lead.scoreTier,
    source: lead.source,
    dealType: lead.dealType,
  });
  const cadenceType =
    options?.cadenceType || dynamicCadence?.cadenceType || lead.scoreTier || 'cold';
  const cadence: CadenceTemplate = options?.cadenceType
    ? getCadenceForTier(options.cadenceType)
    : dynamicCadence || getCadenceForTier(cadenceType);
  const now = new Date();

  // 4. Calculate step schedules (cumulative from now)
  let cumulativeDelay = 0;
  const stepData = cadence.steps.map((step: CadenceStep) => {
    cumulativeDelay += step.delayMs;
    return {
      stepNumber: step.stepNumber,
      channel: step.channel,
      status: 'pending' as const,
      scheduledAt: new Date(now.getTime() + cumulativeDelay),
      templateName: step.templateName,
    };
  });

  // 5. Create sequence + steps in a transaction
  const sequence = await prisma.followUpSequence.create({
    data: {
      cadenceType,
      status: 'active',
      currentStep: 0,
      totalSteps: cadence.totalSteps,
      startedAt: now,
      nextStepAt: stepData[0]?.scheduledAt || null,
      leadId,
      createdById: options?.createdById || null,
      steps: {
        create: stepData,
      },
    },
    include: { steps: true },
  });

  // 6. Log activity
  await prisma.activity.create({
    data: {
      type: 'lead',
      action: 'follow_up_started',
      description: `Follow-up sequence started: ${cadence.name} (${cadence.totalSteps} steps)`,
      leadId,
      userId: options?.createdById || null,
      metadata: {
        sequenceId: sequence.id,
        cadenceType,
        totalSteps: cadence.totalSteps,
        firstStepAt: stepData[0]?.scheduledAt?.toISOString(),
      },
    },
  });

  logger.info(`Follow-up sequence started for lead ${leadId}: ${cadence.name}`);

  return {
    sequenceId: sequence.id,
    cadenceType,
    totalSteps: cadence.totalSteps,
    firstStepAt: stepData[0]?.scheduledAt || now,
    leadId,
  };
}

/** Pause an active sequence */
export async function pauseSequence(sequenceId: string): Promise<void> {
  const sequence = await prisma.followUpSequence.findUnique({ where: { id: sequenceId } });
  if (!sequence) throw new Error(`Sequence not found: ${sequenceId}`);
  if (sequence.status !== 'active') throw new Error(`Cannot pause ${sequence.status} sequence`);

  await prisma.followUpSequence.update({
    where: { id: sequenceId },
    data: { status: 'paused', pausedAt: new Date() },
  });

  await prisma.activity.create({
    data: {
      type: 'lead',
      action: 'follow_up_paused',
      description: `Follow-up sequence paused at step ${sequence.currentStep}`,
      leadId: sequence.leadId,
      metadata: { sequenceId },
    },
  });

  logger.info(`Follow-up sequence ${sequenceId} paused`);
}

/** Resume a paused sequence */
export async function resumeSequence(sequenceId: string): Promise<void> {
  const sequence = await prisma.followUpSequence.findUnique({
    where: { id: sequenceId },
    include: { steps: { where: { status: 'pending' }, orderBy: { stepNumber: 'asc' }, take: 1 } },
  });
  if (!sequence) throw new Error(`Sequence not found: ${sequenceId}`);
  if (sequence.status !== 'paused') throw new Error(`Cannot resume ${sequence.status} sequence`);

  const nextPending = sequence.steps[0];
  const now = new Date();

  // Reschedule the next pending step from now (preserving original delays)
  if (nextPending) {
    const cadence = getCadenceForTier(sequence.cadenceType);
    const stepDef = cadence.steps.find(s => s.stepNumber === nextPending.stepNumber);
    const newScheduledAt = new Date(now.getTime() + (stepDef?.delayMs || 3600000));

    await prisma.followUpStep.update({
      where: { id: nextPending.id },
      data: { scheduledAt: newScheduledAt },
    });

    await prisma.followUpSequence.update({
      where: { id: sequenceId },
      data: { status: 'active', pausedAt: null, nextStepAt: newScheduledAt },
    });
  } else {
    await completeSequence(sequenceId);
  }

  await prisma.activity.create({
    data: {
      type: 'lead',
      action: 'follow_up_resumed',
      description: `Follow-up sequence resumed`,
      leadId: sequence.leadId,
      metadata: { sequenceId },
    },
  });

  logger.info(`Follow-up sequence ${sequenceId} resumed`);
}

/** Cancel a sequence */
export async function cancelSequence(sequenceId: string, reason?: string): Promise<void> {
  const sequence = await prisma.followUpSequence.findUnique({ where: { id: sequenceId } });
  if (!sequence) throw new Error(`Sequence not found: ${sequenceId}`);
  if (sequence.status === 'completed' || sequence.status === 'cancelled') {
    throw new Error(`Sequence already ${sequence.status}`);
  }

  await prisma.followUpSequence.update({
    where: { id: sequenceId },
    data: { status: 'cancelled', completedAt: new Date() },
  });

  // Cancel all pending steps
  await prisma.followUpStep.updateMany({
    where: { sequenceId, status: 'pending' },
    data: { status: 'skipped' },
  });

  await prisma.activity.create({
    data: {
      type: 'lead',
      action: 'follow_up_cancelled',
      description: `Follow-up sequence cancelled${reason ? `: ${reason}` : ''}`,
      leadId: sequence.leadId,
      metadata: { sequenceId, reason },
    },
  });

  logger.info(`Follow-up sequence ${sequenceId} cancelled: ${reason || 'no reason'}`);
}

/** Complete a sequence (all steps done) */
export async function completeSequence(sequenceId: string): Promise<void> {
  const sequence = await prisma.followUpSequence.findUnique({ where: { id: sequenceId } });
  if (!sequence) return;

  await prisma.followUpSequence.update({
    where: { id: sequenceId },
    data: {
      status: 'completed',
      completedAt: new Date(),
      nextStepAt: null,
      currentStep: sequence.totalSteps,
    },
  });

  await prisma.activity.create({
    data: {
      type: 'lead',
      action: 'follow_up_completed',
      description: `Follow-up sequence completed (${sequence.totalSteps} steps)`,
      leadId: sequence.leadId,
      metadata: { sequenceId, cadenceType: sequence.cadenceType },
    },
  });

  logger.info(`Follow-up sequence ${sequenceId} completed`);
}
