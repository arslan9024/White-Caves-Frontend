/**
 * Follow-Up Engine — Query Helpers
 */

import { prisma } from '../../../database.js';
import type { FollowUpStats, SequenceSummary } from './types.js';

/** Get full sequence summary with steps */
export async function getSequenceSummary(sequenceId: string): Promise<SequenceSummary | null> {
  const sequence = await prisma.followUpSequence.findUnique({
    where: { id: sequenceId },
    include: { steps: { orderBy: { stepNumber: 'asc' } } },
  });
  if (!sequence) return null;

  return {
    id: sequence.id,
    cadenceType: sequence.cadenceType,
    status: sequence.status,
    currentStep: sequence.currentStep,
    totalSteps: sequence.totalSteps,
    startedAt: sequence.startedAt,
    nextStepAt: sequence.nextStepAt,
    completedAt: sequence.completedAt,
    steps: sequence.steps.map(s => ({
      stepNumber: s.stepNumber,
      channel: s.channel,
      status: s.status,
      scheduledAt: s.scheduledAt,
      executedAt: s.executedAt,
      result: s.result,
    })),
  };
}

/** Get all sequences for a specific lead */
export async function getLeadSequences(leadId: string): Promise<SequenceSummary[]> {
  const sequences = await prisma.followUpSequence.findMany({
    where: { leadId },
    include: { steps: { orderBy: { stepNumber: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  });

  return sequences.map(seq => ({
    id: seq.id,
    cadenceType: seq.cadenceType,
    status: seq.status,
    currentStep: seq.currentStep,
    totalSteps: seq.totalSteps,
    startedAt: seq.startedAt,
    nextStepAt: seq.nextStepAt,
    completedAt: seq.completedAt,
    steps: seq.steps.map(s => ({
      stepNumber: s.stepNumber,
      channel: s.channel,
      status: s.status,
      scheduledAt: s.scheduledAt,
      executedAt: s.executedAt,
      result: s.result,
    })),
  }));
}

/** Get dashboard stats for all follow-ups */
export async function getFollowUpStats(): Promise<FollowUpStats> {
  const [active, paused, completed, cancelled, sentSteps, failedSteps] = await Promise.all([
    prisma.followUpSequence.count({ where: { status: 'active' } }),
    prisma.followUpSequence.count({ where: { status: 'paused' } }),
    prisma.followUpSequence.count({ where: { status: 'completed' } }),
    prisma.followUpSequence.count({ where: { status: 'cancelled' } }),
    prisma.followUpStep.count({ where: { status: 'sent' } }),
    prisma.followUpStep.count({ where: { status: 'failed' } }),
  ]);

  return {
    active,
    paused,
    completed,
    cancelled,
    totalStepsSent: sentSteps,
    totalStepsFailed: failedSteps,
  };
}
