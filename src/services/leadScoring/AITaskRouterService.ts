import {
  DEFAULT_ROUTING_PROBABILITIES,
  computeContextBonus,
  computeLearnedProbabilities,
  computeRoutingAnalytics,
  estimateProcessingTime,
  getAlternatives,
  getReasoningForRoute,
  shouldCombineAssistants,
} from './routingConfig';
import type {
  AlternativeAssistant,
  AssistantCombo,
  AssistantProbabilityMap,
  EmptyRoutingAnalyticsResult,
  OptimalAssistantResult,
  RoutingAnalyticsResult,
  RoutingContext,
  RoutingHistoryRecord,
  RoutingOutcomeResult,
  RoutingProbabilitiesMap,
  TopAssistantCombosResult,
} from './types';

/**
 * AITaskRouterService
 *
 * Intelligently selects optimal AI assistants for tasks:
 * - Predicts which assistant will succeed
 * - Routes to highest-probability combo
 * - Learns from successes/failures
 * - Provides confidence scores
 */
export class AITaskRouterService {
  routingProbabilities: RoutingProbabilitiesMap;
  routingHistory: RoutingHistoryRecord[];

  constructor() {
    this.routingProbabilities = { ...DEFAULT_ROUTING_PROBABILITIES };
    this.routingHistory = [];
  }

  /**
   * Get optimal assistant for a task
   */
  getOptimalAssistant(taskType: string, context: RoutingContext = {}): OptimalAssistantResult {
    const probabilities = this.routingProbabilities[taskType];

    if (!probabilities) {
      return {
        success: false,
        error: `Unknown task type: ${taskType}`,
        recommendation: 'ZOE',
      };
    }

    const learnedProbs = this._getLearnedProbabilities(taskType);
    const mergedProbs: AssistantProbabilityMap = { ...probabilities, ...learnedProbs };

    let bestAssistant: string | null = null;
    let bestScore = 0;

    for (const [assistant, baseScore] of Object.entries(mergedProbs)) {
      const finalScore = baseScore + computeContextBonus(assistant, context);
      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestAssistant = assistant;
      }
    }

    return {
      success: true,
      recommendedAssistant: bestAssistant,
      confidence: `${(bestScore * 100).toFixed(1)}%`,
      alternativeAssistants: this._getAlternatives(mergedProbs, bestAssistant, 2),
      estimatedSuccessRate: `${(bestScore * 100).toFixed(1)}%`,
      estimatedProcessingTime: this._estimateTime(taskType, bestAssistant),
      context,
    };
  }

  /**
   * Get top N assistant combinations for a task
   */
  getTopAssistantCombos(
    taskType: string,
    topN = 3,
    _context: RoutingContext = {}
  ): TopAssistantCombosResult {
    void _context;
    const probabilities = this.routingProbabilities[taskType];

    if (!probabilities) {
      return { error: `Unknown task type: ${taskType}`, combos: [] };
    }

    const sorted = Object.entries(probabilities)
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN);

    const combos: AssistantCombo[] = [];

    for (let i = 0; i < sorted.length; i += 1) {
      const [assistant, score] = sorted[i];
      const combo = [assistant];
      let comboScore = score;

      if (i < sorted.length - 1 && this._shouldCombine(taskType, assistant, sorted[i + 1][0])) {
        combo.push(sorted[i + 1][0]);
        comboScore = score * 0.6 + sorted[i + 1][1] * 0.4;
      }

      combos.push({
        rank: combos.length + 1,
        assistants: combo,
        estimatedSuccessRate: `${(comboScore * 100).toFixed(1)}%`,
        executionTime: this._estimateTime(taskType, combo[0]),
        parallelizable: combo.length > 1,
        reasoning: this._getReasoningForRoute(taskType, combo),
      });
    }

    return { taskType, combos };
  }

  /**
   * Record routing decision and outcome
   */
  recordRoutingOutcome(
    taskType: string,
    assistant: string,
    success: boolean,
    processingTime: number,
    context: RoutingContext = {}
  ): RoutingOutcomeResult {
    this.routingHistory.push({
      taskType,
      assistant,
      success,
      processingTime,
      context,
      timestamp: new Date(),
    });

    this._updateLearning(taskType, assistant, success);

    return {
      recorded: true,
      learningPoints: this.routingHistory.filter(r => r.taskType === taskType).length,
    };
  }

  _getLearnedProbabilities(taskType: string): AssistantProbabilityMap {
    return computeLearnedProbabilities(this.routingHistory, taskType);
  }

  _updateLearning(_taskType: string, _assistant: string, _success: boolean): boolean {
    void _taskType;
    void _assistant;
    void _success;
    // In real implementation, would store to database
    // and update routing probabilities over time
    return true;
  }

  _getAlternatives(
    probabilities: AssistantProbabilityMap,
    selected: string | null,
    count: number
  ): AlternativeAssistant[] {
    return getAlternatives(probabilities, selected, count);
  }

  _estimateTime(taskType: string, assistant: string | null): string {
    return estimateProcessingTime(taskType, assistant);
  }

  _shouldCombine(taskType: string, assistant1: string, assistant2: string): boolean {
    return shouldCombineAssistants(taskType, assistant1, assistant2);
  }

  _getReasoningForRoute(taskType: string, _assistants?: string[]): string {
    void _assistants;
    return getReasoningForRoute(taskType);
  }

  /**
   * Get routing analytics
   */
  getRoutingAnalytics(
    taskType: string | null = null
  ): RoutingAnalyticsResult | EmptyRoutingAnalyticsResult {
    return computeRoutingAnalytics(this.routingHistory, taskType);
  }
}
