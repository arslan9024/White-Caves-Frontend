/**
 * White Caves Journey Engine Service
 * 
 * Manages journey sessions, validation state machine, blocker resolution,
 * readiness score computation, and lifecycle audit timeline emission.
import { JourneyStorageService } from './journeyStorageService';
import { JourneySessionEvaluator } from './journeySessionEvaluator';
 */

import {
  JourneyDefinition,
  JourneySession,
  JourneyState,
  StepStatus,
  BlockerIssue,
  TimelineEvent,
  JourneyResultOutcome
} from '../../types/journey';

const STORAGE_KEY = 'white_caves_active_journey_sessions';
const HISTORY_KEY = 'white_caves_journey_lifecycle_history';

export class JourneyEngineService {
  /**
   * Initializes a new Journey Session from a definition and optional initial context
   */
  public static createSession(
    definition: JourneyDefinition,
    initialData: Record<string, any> = {},
    entityContext: JourneySession['entityContext'] = {}
  ): JourneySession {
    const mergedData = { ...(definition.defaultData || {}), ...initialData };
    
    // Initialize step statuses: first step is IN_PROGRESS, others LOCKED/AVAILABLE
    const stepStatuses: Record<string, StepStatus> = {};
    definition.steps.forEach((step, idx) => {
      if (idx === 0) {
        stepStatuses[step.id] = 'IN_PROGRESS';
      } else {
        stepStatuses[step.id] = 'LOCKED';
      }
    });

    const initialTimeline: TimelineEvent[] = [
      {
        id: `event-${Date.now()}-0`,
        timestamp: new Date().toISOString(),
        stepId: definition.steps[0]?.id || 'start',
        stepTitle: definition.steps[0]?.title || 'Start',
        title: `Journey Started: ${definition.title}`,
        description: `Agent initiated mission for ${definition.family || 'workflow'}.`,
        actor: 'Current Agent',
        type: 'info'
      }
    ];

    const session: JourneySession = {
      sessionId: `session_${definition.id}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      journeyId: definition.id,
      state: 'IN_PROGRESS',
      currentStepIndex: 0,
      data: mergedData,
      stepStatuses,
      blockers: [],
      readinessScore: 0,
      timeline: initialTimeline,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      entityContext
    };

    // Run initial validation & score computation
    const validatedSession = this.evaluateSession(session, definition);
    this.saveSession(validatedSession);
    return validatedSession;
  }

  /**
   * Evaluates validation rules for all accessible steps, identifies blockers,
   * updates step statuses, and computes overall readiness percentage.
   */
  public static evaluateSession(
    definition: JourneyDefinition,
    session: JourneySession
  ): JourneyEvaluationResult {
    return JourneySessionEvaluator.evaluateSession(definition, session);
  }
  public static updateSessionData(
    session: JourneySession,
    definition: JourneyDefinition,
    patch: Record<string, any>
  ): JourneySession {
    const updated: JourneySession = {
      ...session,
      data: { ...session.data, ...patch },
      updatedAt: new Date().toISOString()
    };
    const evaluated = this.evaluateSession(updated, definition);
    this.saveSession(evaluated);
    return evaluated;
  }

  /**
   * Moves to the next step if current step is valid
   */
  public static nextStep(
    session: JourneySession,
    definition: JourneyDefinition
  ): { session: JourneySession; blocked: boolean } {
    const currentStep = definition.steps[session.currentStepIndex];
    if (!currentStep) return { session, blocked: false };

    // Check if current step has blocking errors
    const currentStepBlockers = session.blockers.filter(
      b => b.stepId === currentStep.id && b.severity === 'error'
    );

    if (currentStepBlockers.length > 0) {
      const updated = {
        ...session,
        state: 'BLOCKED' as JourneyState,
        stepStatuses: {
          ...session.stepStatuses,
          [currentStep.id]: 'BLOCKED' as StepStatus
        }
      };
      this.saveSession(updated);
      return { session: updated, blocked: true };
    }

    // Step is valid, mark completed and record timeline milestone
    const nextIndex = Math.min(definition.steps.length - 1, session.currentStepIndex + 1);
    const nextStep = definition.steps[nextIndex];

    const timelineEvent: TimelineEvent = {
      id: `event-${Date.now()}-${nextIndex}`,
      timestamp: new Date().toISOString(),
      stepId: currentStep.id,
      stepTitle: currentStep.title,
      title: `Step Completed: ${currentStep.title}`,
      description: currentStep.milestoneTag 
        ? `Milestone Reached: ${currentStep.milestoneTag}`
        : `Successfully verified and finalized ${currentStep.title}.`,
      actor: 'Current Agent',
      type: currentStep.milestoneTag ? 'milestone' : 'success'
    };

    const newStatuses = {
      ...session.stepStatuses,
      [currentStep.id]: 'COMPLETED' as StepStatus,
      [nextStep.id]: (nextStep.type === 'result' ? 'COMPLETED' : 'IN_PROGRESS') as StepStatus
    };

    const updated: JourneySession = {
      ...session,
      currentStepIndex: nextIndex,
      stepStatuses: newStatuses,
      timeline: [...session.timeline, timelineEvent],
      updatedAt: new Date().toISOString()
    };

    const evaluated = this.evaluateSession(updated, definition);
    this.saveSession(evaluated);
    return { session: evaluated, blocked: false };
  }

  /**
   * Moves back to previous step
   */
  public static prevStep(
    session: JourneySession,
    definition: JourneyDefinition
  ): JourneySession {
    if (session.currentStepIndex <= 0) return session;
    const prevIndex = session.currentStepIndex - 1;
    const prevStep = definition.steps[prevIndex];

    const updated: JourneySession = {
      ...session,
      currentStepIndex: prevIndex,
      stepStatuses: {
        ...session.stepStatuses,
        [prevStep.id]: 'IN_PROGRESS'
      },
      updatedAt: new Date().toISOString()
    };

    const evaluated = this.evaluateSession(updated, definition);
    this.saveSession(evaluated);
    return evaluated;
  }

  /**
   * Jumps directly to a specific step (e.g. from "Why am I blocked?" banner)
   */
  public static jumpToStep(
    session: JourneySession,
    definition: JourneyDefinition,
    stepId: string
  ): JourneySession {
    const targetIndex = definition.steps.findIndex(s => s.id === stepId);
    if (targetIndex < 0) return session;

    const updated: JourneySession = {
      ...session,
      currentStepIndex: targetIndex,
      stepStatuses: {
        ...session.stepStatuses,
        [stepId]: 'IN_PROGRESS'
      },
      updatedAt: new Date().toISOString()
    };

    const evaluated = this.evaluateSession(updated, definition);
    this.saveSession(evaluated);
    return evaluated;
  }

  /**
   * Completes a journey and records outcome in lifecycle history
   */
  public static completeJourney(
    session: JourneySession,
    result: JourneyResultOutcome
  ): JourneySession {
    const completedSession: JourneySession = {
      ...session,
      state: 'COMPLETED',
      result,
      readinessScore: 100,
      timeline: [
        ...session.timeline,
        {
          id: `event-complete-${Date.now()}`,
          timestamp: new Date().toISOString(),
          stepId: 'result',
          stepTitle: 'Journey Completed',
          title: result.title,
          description: `Outcome finalized with reference: ${result.referenceNumber || 'N/A'}.`,
          actor: 'White Caves Journey Engine',
          type: 'milestone'
        }
      ],
      updatedAt: new Date().toISOString()
    };

    this.saveSession(completedSession);
    this.appendToLifecycleHistory(completedSession);
    return completedSession;
  }

  // -------------------------------------------------------------
  // Storage & Persistence Layer
  // -------------------------------------------------------------
  // Storage & Persistence Layer (Delegated to JourneyStorageService)
  // -------------------------------------------------------------

  public static saveSession(session: JourneySession): void {
    JourneyStorageService.saveSession(session);
  }

  public static getStoredSessions(): Record<string, JourneySession> {
    return JourneyStorageService.getStoredSessions();
  }

  public static getActiveSessionForJourney(journeyId: string): JourneySession | null {
    return JourneyStorageService.getActiveSessionForJourney(journeyId);
  }

  public static deleteSession(sessionId: string): void {
    JourneyStorageService.deleteSession(sessionId);
  }

  public static appendToLifecycleHistory(session: JourneySession): void {
    JourneyStorageService.appendToLifecycleHistory(session);
  }

  public static getLifecycleHistory(entityId?: string): JourneySession[] {
    return JourneyStorageService.getLifecycleHistory(entityId);
  }
}
