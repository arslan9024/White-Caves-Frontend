/**
 * Follow-Up Engine — Shared Types
 */

export interface StartSequenceResult {
  sequenceId: string;
  cadenceType: string;
  totalSteps: number;
  firstStepAt: Date;
  leadId: string;
}

export interface StepExecutionResult {
  stepId: string;
  channel: string;
  status: 'sent' | 'failed' | 'skipped';
  message?: string;
  error?: string;
}

export interface SequenceSummary {
  id: string;
  cadenceType: string;
  status: string;
  currentStep: number;
  totalSteps: number;
  startedAt: Date;
  nextStepAt: Date | null;
  completedAt: Date | null;
  steps: Array<{
    stepNumber: number;
    channel: string;
    status: string;
    scheduledAt: Date | null;
    executedAt: Date | null;
    result: string | null;
  }>;
}

export interface ProcessBatchResult {
  processed: number;
  sent: number;
  failed: number;
  skipped: number;
  errors: string[];
}

export interface FollowUpLeadTarget {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
}

export interface FollowUpStats {
  active: number;
  paused: number;
  completed: number;
  cancelled: number;
  totalStepsSent: number;
  totalStepsFailed: number;
}

export type DynamicCadenceStep = {
  channel?: string;
  templateName?: string;
  description?: string;
  delayMs?: number;
};

export type CadenceRuleRecord = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  priority: number;
  leadTiers: string[];
  leadSources: string[];
  dealTypes: string[];
  channelSequence: unknown;
  createdAt: Date;
};
