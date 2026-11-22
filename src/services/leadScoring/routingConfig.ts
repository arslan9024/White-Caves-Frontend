import type {
  AlternativeAssistant,
  AssistantAnalyticsBreakdown,
  AssistantProbabilityMap,
  EmptyRoutingAnalyticsResult,
  RoutingAnalyticsResult,
  RoutingContext,
  RoutingHistoryRecord,
  RoutingProbabilitiesMap,
} from './types';

export const DEFAULT_ROUTING_PROBABILITIES: RoutingProbabilitiesMap = {
  FIND_PROPERTY: {
    MARY: 0.95, // Inventory specialist
    CIPHER: 0.85, // Market analysis
    SAGE: 0.8,
    HUNTER: 0.7,
  },
  SCHEDULE_VIEWING: {
    LINDA: 0.98, // WhatsApp specialist
    CLARA: 0.9, // CRM specialist
    NINA: 0.75, // Bot
    SOPHIA: 0.7, // Pipeline
  },
  CALCULATE_FINANCE: {
    THEODORA: 0.99, // Finance specialist
    CIPHER: 0.8, // Market analysis
    PENNY: 0.85, // Commission tracker
  },
  LEAD_QUALIFICATION: {
    CLARA: 0.95, // CRM specialist
    HUNTER: 0.9, // Lead prospecting
    SOPHIA: 0.8, // Pipeline
    CIPHER: 0.7,
  },
  PROCESS_DOCUMENTS: {
    MAX: 0.98, // Document processor
    HENRY: 0.85, // Compliance
    IVY: 0.8, // EJARI specialist
  },
  MARKET_ANALYSIS: {
    CIPHER: 0.97, // Market specialist
    SAGE: 0.95, // Market trends
    OLIVIA: 0.85, // Marketing
    HUNTER: 0.7,
  },
  SEND_PROPOSAL: {
    LINDA: 0.96, // Communication
    ZOE: 0.95, // Executive
    CLARA: 0.85, // CRM
    THEODORA: 0.8,
  },
  EJARI_REGISTRATION: {
    IVY: 0.99, // Leasing specialist
    MAX: 0.85, // Documents
    HENRY: 0.75, // Compliance
    NINA: 0.7, // Automation
  },
  TENANT_SCREENING: {
    HUNTER: 0.9, // Prospecting (similar skills)
    CLARA: 0.85, // CRM
    HENRY: 0.8, // Compliance
    MAX: 0.7,
  },
  PROPERTY_VALUATION: {
    CIPHER: 0.97, // Market analysis
    SAGE: 0.95, // Market trends
    THEODORA: 0.85, // Finance
    OLIVIA: 0.7,
  },
};

export const BASE_PROCESSING_TIMES: Record<string, number> = {
  FIND_PROPERTY: 180, // 3 min
  SCHEDULE_VIEWING: 180,
  CALCULATE_FINANCE: 300, // 5 min
  LEAD_QUALIFICATION: 240, // 4 min
  PROCESS_DOCUMENTS: 600, // 10 min
  MARKET_ANALYSIS: 300,
  SEND_PROPOSAL: 120, // 2 min
  EJARI_REGISTRATION: 900, // 15 min
  TENANT_SCREENING: 1800, // 30 min
  PROPERTY_VALUATION: 300,
};

export const ASSISTANT_SPEED_BONUS: Record<string, number> = {
  NINA: 0.7, // Fastest (automation)
  LINDA: 0.8, // WhatsApp fast
  MARY: 0.85,
  THEODORA: 1.0, // Standard
  CIPHER: 1.1, // Slower (analysis)
  MAX: 1.2, // Slowest (detailed work)
};

export const ASSISTANT_SYNERGIES: Record<string, [string, string]> = {
  FIND_PROPERTY: ['MARY', 'CIPHER'], // Property + Market analysis
  SCHEDULE_VIEWING: ['LINDA', 'CLARA'], // WhatsApp + CRM
  CALCULATE_FINANCE: ['THEODORA', 'CIPHER'], // Finance + Market
  PROCESS_DOCUMENTS: ['MAX', 'HENRY'], // Docs + Compliance
  MARKET_ANALYSIS: ['CIPHER', 'SAGE'], // Market analysis combo
};

export const ROUTE_REASONS: Record<string, string> = {
  FIND_PROPERTY:
    'Mary specializes in property inventory matching. Cipher adds market analysis for better recommendations.',
  SCHEDULE_VIEWING:
    'Linda handles WhatsApp communication. Clara integrates with CRM for seamless scheduling.',
  CALCULATE_FINANCE: 'Theodora is finance expert. Combined with Cipher for market-aware pricing.',
  LEAD_QUALIFICATION: 'Clara manages CRM relationships. Hunter brings lead prospecting expertise.',
  PROCESS_DOCUMENTS: 'Max processes documents efficiently. Henry ensures compliance verification.',
  MARKET_ANALYSIS: 'Cipher provides detailed analysis. Sage detects emerging trends.',
  SEND_PROPOSAL: 'Linda communicates clearly. Zoe ensures executive-level quality.',
  EJARI_REGISTRATION: 'Ivy specializes in EJARI leasing workflows.',
  TENANT_SCREENING: 'Hunter has prospecting skills applicable to tenant evaluation.',
  PROPERTY_VALUATION: 'Cipher analyzes markets. Sage provides trend insights.',
};

export function computeContextBonus(assistant: string, context: RoutingContext): number {
  let contextBonus = 0;

  if (context.customerTier === 'ULTRA_PREMIUM' || context.customerTier === 'CORPORATE') {
    if (assistant === 'ZOE' || assistant === 'KAIROS') contextBonus += 0.05;
  }
  if (context.complexity === 'HIGH') {
    if (assistant === 'THEODORA' || assistant === 'HENRY') contextBonus += 0.03;
  }
  if (context.urgency === 'IMMEDIATE') {
    if (assistant === 'NINA' || assistant === 'LINDA') contextBonus += 0.04;
  }
  if (context.preferredLanguage === 'ARABIC') {
    if (['LAILA', 'KAIROS'].includes(assistant)) contextBonus += 0.05;
  }

  return contextBonus;
}

export function computeLearnedProbabilities(
  routingHistory: RoutingHistoryRecord[],
  taskType: string
): AssistantProbabilityMap {
  const relevant = routingHistory.filter(r => r.taskType === taskType);
  if (relevant.length === 0) return {};

  const learned: Record<string, { successes: number; total: number }> = {};

  for (const record of relevant) {
    if (!learned[record.assistant]) {
      learned[record.assistant] = { successes: 0, total: 0 };
    }
    learned[record.assistant].total += 1;
    if (record.success) learned[record.assistant].successes += 1;
  }

  const probabilities: AssistantProbabilityMap = {};
  for (const [assistant, stats] of Object.entries(learned)) {
    probabilities[assistant] = stats.successes / stats.total;
  }

  return probabilities;
}

export function getAlternatives(
  probabilities: AssistantProbabilityMap,
  selected: string | null,
  count: number
): AlternativeAssistant[] {
  return Object.entries(probabilities)
    .filter(([asst]) => asst !== selected)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([assistant, score]) => ({
      assistant,
      confidence: `${(score * 100).toFixed(1)}%`,
    }));
}

export function estimateProcessingTime(taskType: string, assistant: string | null): string {
  const baseTime = BASE_PROCESSING_TIMES[taskType] || 300;
  const speedMultiplier = (assistant && ASSISTANT_SPEED_BONUS[assistant]) || 1.0;

  return `${Math.round(baseTime * speedMultiplier)} seconds`;
}

export function shouldCombineAssistants(
  taskType: string,
  assistant1: string,
  assistant2: string
): boolean {
  const synergy = ASSISTANT_SYNERGIES[taskType];
  if (!synergy) return false;

  return (
    (synergy.includes(assistant1) && synergy.includes(assistant2)) ||
    (synergy.includes(assistant2) && synergy.includes(assistant1))
  );
}

export function getReasoningForRoute(taskType: string): string {
  return (
    ROUTE_REASONS[taskType] ||
    'Optimal assistant selected based on task requirements and success history.'
  );
}

export function computeRoutingAnalytics(
  routingHistory: RoutingHistoryRecord[],
  taskType: string | null = null
): RoutingAnalyticsResult | EmptyRoutingAnalyticsResult {
  const relevant = taskType ? routingHistory.filter(r => r.taskType === taskType) : routingHistory;

  if (relevant.length === 0) {
    return { message: 'No routing history available' };
  }

  const successCount = relevant.filter(r => r.success).length;
  const rawByAssistant: Record<string, { routed: number; successful: number; times: number[] }> =
    {};

  for (const record of relevant) {
    if (!rawByAssistant[record.assistant]) {
      rawByAssistant[record.assistant] = { routed: 0, successful: 0, times: [] };
    }
    rawByAssistant[record.assistant].routed += 1;
    if (record.success) rawByAssistant[record.assistant].successful += 1;
    rawByAssistant[record.assistant].times.push(record.processingTime);
  }

  const byAssistant: Record<string, AssistantAnalyticsBreakdown> = {};
  for (const [assistant, stats] of Object.entries(rawByAssistant)) {
    const avgMs = Math.round(stats.times.reduce((a, b) => a + b, 0) / stats.times.length);
    byAssistant[assistant] = {
      routed: stats.routed,
      successful: stats.successful,
      avgTime: `${avgMs} ms`,
      successRate: `${((stats.successful / stats.routed) * 100).toFixed(1)}%`,
    };
  }

  const avgProcessingTime = Math.round(
    relevant.reduce((sum, r) => sum + r.processingTime, 0) / relevant.length
  );

  return {
    totalRoutings: relevant.length,
    successCount,
    successRate: `${((successCount / relevant.length) * 100).toFixed(1)}%`,
    averageProcessingTime: `${avgProcessingTime} ms`,
    byAssistant,
  };
}
