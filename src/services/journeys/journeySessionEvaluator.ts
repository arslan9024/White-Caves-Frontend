import { JourneyDefinition, JourneySession, JourneyEvaluationResult, JourneyBlocker, JourneyStepState } from '../../types/journeys';

export class JourneySessionEvaluator {
  public static evaluateSession(
    session: JourneySession,
    definition: JourneyDefinition
  ): JourneySession {
    const blockers: BlockerIssue[] = [];
    let completedStepsCount = 0;
    let totalEvaluatedWeight = 0;
    let acquiredWeight = 0;

    const newStatuses = { ...session.stepStatuses };

    definition.steps.forEach((step, idx) => {
      // Exclude result or purely automated steps from blocker penalty weight
      const isInformational = step.type === 'processing' || step.type === 'result';
      const stepWeight = isInformational ? 0 : 10;
      totalEvaluatedWeight += stepWeight;

      let stepHasErrors = false;

      // 1. Run step validator if present
      if (step.validate) {
        const stepBlockers = step.validate(session.data);
        if (stepBlockers && stepBlockers.length > 0) {
          blockers.push(...stepBlockers);
          stepHasErrors = true;
        }
      }

      // 2. Check required fields
      if (step.requiredFields && step.requiredFields.length > 0) {
        step.requiredFields.forEach(field => {
          const val = session.data[field];
          const isMissing = val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0);
          if (isMissing) {
            stepHasErrors = true;
            // Only add to blockers if not already captured by step validator
            if (!blockers.some(b => b.stepId === step.id && b.field === field)) {
              blockers.push({
                id: `blocker-${step.id}-${field}`,
                stepId: step.id,
                field,
                title: `Missing ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
                description: `Field "${field}" is required in ${step.title}.`,
                actionLabel: `Add ${field.replace(/([A-Z])/g, ' $1')}`,
                severity: 'error'
              });
            }
          }
        });
      }

      // Determine step status
      if (idx < session.currentStepIndex) {
        if (stepHasErrors) {
          newStatuses[step.id] = 'BLOCKED';
          acquiredWeight += stepWeight * 0.5; // Partial credit
        } else {
          newStatuses[step.id] = 'COMPLETED';
          completedStepsCount++;
          acquiredWeight += stepWeight;
        }
      } else if (idx === session.currentStepIndex) {
        newStatuses[step.id] = stepHasErrors ? 'BLOCKED' : 'IN_PROGRESS';
        if (!stepHasErrors && !isInformational) {
          acquiredWeight += stepWeight * 0.8;
        }
      } else {
        // Future steps
        if (idx === session.currentStepIndex + 1 && !stepHasErrors) {
          newStatuses[step.id] = 'AVAILABLE';
        } else {
          newStatuses[step.id] = 'LOCKED';
        }
      }
    });

    const readinessScore = totalEvaluatedWeight > 0 
      ? Math.min(100, Math.round((acquiredWeight / totalEvaluatedWeight) * 100))
      : 100;

    // Session State evaluation
    let state: JourneyState = session.state;
    if (session.state !== 'COMPLETED' && session.state !== 'PROCESSING' && session.state !== 'CANCELLED') {
      if (blockers.some(b => b.severity === 'error' && b.stepId === definition.steps[session.currentStepIndex]?.id)) {
        state = 'BLOCKED';
      } else if (readinessScore >= 90 && session.currentStepIndex === definition.steps.length - 2) {
        state = 'READY';
      } else {
        state = 'IN_PROGRESS';
      }
    }

    return {
      ...session,
      stepStatuses: newStatuses,
      blockers,
      readinessScore,
      state,
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Updates session data and triggers re-evaluation
   */
}
