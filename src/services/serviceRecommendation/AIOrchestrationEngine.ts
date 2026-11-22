import {
  ASSISTANT_REGISTRY,
  NEXT_STEP_MAP,
  SIMULATED_ASSISTANT_OUTPUTS,
  TASK_ROUTER_MATRIX,
} from './orchestrationMatrix';

interface ExecutionStep {
  stepNumber: number;
  assistant: string;
  task: string;
  input: Record<string, any>;
  critical: boolean;
  passOutputAs: string | null;
  inputKey?: string;
}

export class AIOrchestrationEngine {
  assistantRegistry: Record<string, any>;
  taskRouterMatrix: Record<string, any>;
  orchestrationHistory: Array<Record<string, any>>;
  routingLearning: Record<string, Array<{ route: string; success: boolean; time: number }>>;

  constructor() {
    this.assistantRegistry = ASSISTANT_REGISTRY;
    this.taskRouterMatrix = TASK_ROUTER_MATRIX;
    this.orchestrationHistory = [];
    this.routingLearning = {};
  }

  async orchestrateTask(taskDescription: string, context: Record<string, any> = {}) {
    const orchestrationId = `ORCH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();

    try {
      const taskCategory = this._categorizeTask(taskDescription);
      const route = this.taskRouterMatrix[taskCategory];

      if (!route) {
        return { success: false, error: `Unknown task type: ${taskCategory}` };
      }

      const executionPlan = this._createExecutionPlan(taskCategory, route, context);
      const results = route.parallel
        ? await this._executeParallel(executionPlan, orchestrationId)
        : await this._executeSequential(executionPlan, orchestrationId);

      const aggregatedResult = this._aggregateResults(results, taskCategory);
      const elapsedTime = Date.now() - startTime;
      this._recordOrchestration(
        orchestrationId,
        taskCategory,
        route,
        aggregatedResult,
        elapsedTime
      );

      return {
        success: true,
        orchestrationId,
        taskCategory,
        results: aggregatedResult,
        elapsedTime,
        assistantsUsed: Object.keys(results),
        recommendedNextStep: this._getNextStep(taskCategory),
      };
    } catch (error) {
      return {
        success: false,
        orchestrationId,
        error: error instanceof Error ? error.message : String(error),
        elapsedTime: Date.now() - startTime,
      };
    }
  }

  async _executeParallel(executionPlan: ExecutionStep[], orchestrationId: string) {
    const promises = executionPlan.map(step =>
      this._executeAssistant(step.assistant, step.task, step.input, orchestrationId)
    );
    const results = await Promise.allSettled(promises);
    const successResults: Record<string, any> = {};

    results.forEach((result, index) => {
      const assistant = executionPlan[index].assistant;
      successResults[assistant] =
        result.status === 'fulfilled' ? result.value : { error: result.reason };
    });

    return successResults;
  }

  async _executeSequential(executionPlan: ExecutionStep[], orchestrationId: string) {
    const successResults: Record<string, any> = {};

    for (const step of executionPlan) {
      try {
        const result = await this._executeAssistant(
          step.assistant,
          step.task,
          step.input,
          orchestrationId
        );
        successResults[step.assistant] = result;

        if (step.passOutputAs && successResults[step.assistant]?.output) {
          const nextStep = executionPlan.find(s => s.inputKey === step.passOutputAs);
          if (nextStep) {
            nextStep.input[step.passOutputAs] = successResults[step.assistant].output;
          }
        }
      } catch (error) {
        successResults[step.assistant] = {
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    return successResults;
  }

  async _executeAssistant(
    assistantId: string,
    taskType: string,
    input: Record<string, any>,
    _orchestrationId?: string
  ) {
    return new Promise(resolve => {
      const processingTime = Math.random() * 2000 + 500;
      setTimeout(() => {
        const output = this._simulateAssistantOutput(assistantId, taskType, input);
        resolve({
          assistantId,
          taskType,
          processingTime,
          output,
          success: true,
          timestamp: new Date(),
        });
      }, processingTime);
    });
  }

  _simulateAssistantOutput(assistantId: string, taskType: string, input: Record<string, any>) {
    const key = `${assistantId}_${taskType}`;
    return (
      (SIMULATED_ASSISTANT_OUTPUTS as Record<string, any>)[key] || { success: true, data: input }
    );
  }

  _categorizeTask(description: string): string {
    const lowerDesc = description.toLowerCase();
    if (
      lowerDesc.includes('find') &&
      (lowerDesc.includes('property') || lowerDesc.includes('villa'))
    ) {
      return 'FIND_PROPERTY';
    }
    if (lowerDesc.includes('schedule') || lowerDesc.includes('viewing')) return 'SCHEDULE_VIEWING';
    if (
      lowerDesc.includes('finance') ||
      lowerDesc.includes('payment') ||
      lowerDesc.includes('calculate')
    ) {
      return 'CALCULATE_FINANCE';
    }
    if (lowerDesc.includes('search') && lowerDesc.includes('property')) return 'PROPERTY_SEARCH';
    if (lowerDesc.includes('qualify') || lowerDesc.includes('lead')) return 'LEAD_QUALIFICATION';
    if (lowerDesc.includes('document') || lowerDesc.includes('process')) return 'PROCESS_DOCUMENTS';
    if (lowerDesc.includes('market') || lowerDesc.includes('analyze')) return 'MARKET_ANALYSIS';
    if (lowerDesc.includes('proposal') || lowerDesc.includes('send')) return 'SEND_PROPOSAL';
    return 'FIND_PROPERTY';
  }

  _createExecutionPlan(
    taskCategory: string,
    route: { primary: string[] },
    context: Record<string, any>
  ): ExecutionStep[] {
    return route.primary.map((assistant, index) => ({
      stepNumber: index + 1,
      assistant,
      task: taskCategory,
      input: context,
      critical: true,
      passOutputAs: index < route.primary.length - 1 ? `result_${assistant}` : null,
    }));
  }

  _aggregateResults(results: Record<string, any>, taskCategory: string) {
    return {
      taskCategory,
      timestamp: new Date(),
      results,
      summary: this._createSummary(results, taskCategory),
    };
  }

  _createSummary(results: Record<string, any>, taskCategory: string): string {
    if (taskCategory === 'FIND_PROPERTY' && results.MARY?.output?.properties) {
      return `Found ${results.MARY.output.properties.length} matching properties. Top match: ${results.MARY.output.properties[0]?.name}`;
    }
    if (taskCategory === 'SCHEDULE_VIEWING' && results.LINDA?.output?.scheduled) {
      return `Viewing scheduled for ${results.LINDA.output.viewingTime} with ${results.LINDA.output.agent}`;
    }
    return 'Task completed successfully';
  }

  _getNextStep(taskCategory: string): string {
    return (NEXT_STEP_MAP as Record<string, string>)[taskCategory] || 'Complete';
  }

  _recordOrchestration(
    orchestrationId: string,
    taskCategory: string,
    route: { primary: string[] },
    result: Record<string, any>,
    elapsedTime: number
  ) {
    this.orchestrationHistory.push({
      orchestrationId,
      taskCategory,
      route: route.primary,
      success: result.success !== false,
      elapsedTime,
      timestamp: new Date(),
      assistantsUsed: Object.keys(result.results || {}),
    });

    if (!this.routingLearning[taskCategory]) {
      this.routingLearning[taskCategory] = [];
    }
    this.routingLearning[taskCategory].push({
      route: route.primary.join('+'),
      success: result.success !== false,
      time: elapsedTime,
    });
  }

  getOptimalRoute(taskCategory: string): string[] {
    if (!this.routingLearning[taskCategory] || this.routingLearning[taskCategory].length === 0) {
      return this.taskRouterMatrix[taskCategory]?.primary || ['ZOE'];
    }

    const routes: Record<
      string,
      { successes: number; total: number; avgTime: number; times: number[] }
    > = {};
    this.routingLearning[taskCategory].forEach(attempt => {
      if (!routes[attempt.route]) {
        routes[attempt.route] = { successes: 0, total: 0, avgTime: 0, times: [] };
      }
      routes[attempt.route].total++;
      routes[attempt.route].times.push(attempt.time);
      if (attempt.success) routes[attempt.route].successes++;
      routes[attempt.route].avgTime =
        routes[attempt.route].times.reduce((a, b) => a + b) / routes[attempt.route].times.length;
    });

    let bestRoute = Object.keys(routes)[0];
    let bestScore = 0;

    Object.entries(routes).forEach(([route, stats]) => {
      const successRate = stats.successes / stats.total;
      const speedScore = 1 / (stats.avgTime / 1000);
      const score = successRate * 0.7 + speedScore * 0.3;
      if (score > bestScore) {
        bestScore = score;
        bestRoute = route;
      }
    });

    return bestRoute.split('+');
  }

  getAnalytics(taskCategory: string | null = null) {
    const relevantHistory = taskCategory
      ? this.orchestrationHistory.filter(h => h.taskCategory === taskCategory)
      : this.orchestrationHistory;

    const totalOrchestrations = relevantHistory.length;
    const successCount = relevantHistory.filter(h => h.success).length;
    const avgTime =
      relevantHistory.reduce((sum, h) => sum + h.elapsedTime, 0) / totalOrchestrations || 0;

    return {
      totalOrchestrations,
      successCount,
      successRate: ((successCount / totalOrchestrations) * 100).toFixed(1) + '%',
      averageTime: Math.round(avgTime) + 'ms',
      taskCategories: [...new Set(relevantHistory.map(h => h.taskCategory))],
      mostUsedAssistants: this._getMostUsedAssistants(relevantHistory),
    };
  }

  _getMostUsedAssistants(history: Array<Record<string, any>>) {
    const assistantCounts: Record<string, number> = {};
    history.forEach(record => {
      record.assistantsUsed?.forEach((assistant: string) => {
        assistantCounts[assistant] = (assistantCounts[assistant] || 0) + 1;
      });
    });

    return Object.entries(assistantCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([assistant, count]) => ({ assistant, usageCount: count }));
  }
}
