/**
 * Follow-Up Engine — Automated sequence orchestrator
 *
 * Manages the lifecycle of follow-up sequences:
 *   1. Start a sequence for a lead based on their score tier
 *   2. Execute steps at scheduled times (WhatsApp, email, call)
 *   3. Track delivery status and outcomes
 *   4. Pause / resume / cancel sequences
 *   5. Auto-advance on step completion
 *
 * Integration points:
 *   - Lead Scoring Engine → determines cadence tier
 *   - WhatsApp Meta API → sends WhatsApp messages
 *   - Activity model → logs all follow-up actions
 *   - Scheduler → triggers processScheduledSteps() on interval
 */

export type {
  StartSequenceResult,
  StepExecutionResult,
  SequenceSummary,
  ProcessBatchResult,
} from './followUp/types.js';

export {
  startSequence,
  pauseSequence,
  resumeSequence,
  cancelSequence,
} from './followUp/sequenceLifecycle.js';

export { processScheduledSteps } from './followUp/batchProcessor.js';
export { executeStep } from './followUp/stepExecutor.js';
export {
  getSequenceSummary,
  getLeadSequences,
  getFollowUpStats,
} from './followUp/queries.js';
