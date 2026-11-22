import {
  LIFECYCLE_RECOMMENDATIONS,
  SEASONAL_RECOMMENDATIONS,
  TRIGGER_RECOMMENDATIONS,
} from './recommendationCatalog';

export class ServiceRecommendationEngine {
  lifecycleRecommendations: Record<string, { services: Array<Record<string, any>> }>;
  triggerRecommendations: Record<string, Array<Record<string, any>>>;
  seasonalRecommendations: Record<string, { recommendations: string[]; focus: string }>;

  constructor() {
    this.lifecycleRecommendations = LIFECYCLE_RECOMMENDATIONS;
    this.triggerRecommendations = TRIGGER_RECOMMENDATIONS;
    this.seasonalRecommendations = SEASONAL_RECOMMENDATIONS;
  }

  getRecommendations(customerData: Record<string, any> | null, options: { limit?: number } = {}) {
    if (!customerData) {
      return { recommendations: [], reason: 'No customer data' };
    }

    const recommendations: Array<Record<string, any>> = [];
    const usedServices = new Set(customerData.purchasedServices || []);

    const lifecycle = this._determineLifecycleStage(customerData);
    const lifecycleRecs = this.lifecycleRecommendations[lifecycle] || { services: [] };

    for (const service of lifecycleRecs.services) {
      if (!usedServices.has(service.serviceId)) {
        recommendations.push({
          ...service,
          recommendationType: 'LIFECYCLE',
          lifecycleStage: lifecycle,
          scoringFactors: {
            lifecycle: 50,
            priority: this._getPriorityScore(service.priority),
            relevance: 100,
          },
        });
      }
    }

    if (customerData.lastEvent) {
      const triggerRecs = this.triggerRecommendations[customerData.lastEvent] || [];
      for (const service of triggerRecs) {
        if (!usedServices.has(service.serviceId)) {
          recommendations.push({
            ...service,
            recommendationType: 'TRIGGER',
            triggerEvent: customerData.lastEvent,
            scoringFactors: {
              trigger: 70,
              priority: this._getPriorityScore(service.priority),
              relevance: 85,
              timeliness: this._calculateTimeliness(service.recommendationWindow),
            },
          });
        }
      }
    }

    const quarter = this._getCurrentQuarter();
    const seasonalRecs = this.seasonalRecommendations[quarter];
    if (seasonalRecs) {
      for (const serviceId of seasonalRecs.recommendations) {
        recommendations.push({
          serviceId,
          recommendationType: 'SEASONAL',
          season: quarter,
          scoringFactors: { seasonal: 30, relevance: 70 },
        });
      }
    }

    recommendations.sort(
      (a, b) => this._calculateRecommendationScore(b) - this._calculateRecommendationScore(a)
    );

    const topN = options.limit || 5;
    const topRecommendations = recommendations.slice(0, topN);

    return {
      customerProfile: {
        id: customerData.id,
        tier: customerData.tier,
        lifecycleStage: lifecycle,
        transactionCount: customerData.transactionCount || 0,
        totalValue: customerData.totalValue || 0,
        lastTransaction: customerData.lastTransaction,
      },
      recommendations: topRecommendations,
      totalRecommendations: recommendations.length,
      estimatedAdditionalRevenue: this._estimateRevenueImpact(topRecommendations),
      generatedAt: new Date(),
    };
  }

  _determineLifecycleStage(customerData: Record<string, any>): string {
    const transactionCount = customerData.transactionCount || 0;
    const totalValue = customerData.totalValue || 0;

    if (transactionCount === 0) return 'PROSPECT';
    if (transactionCount === 1) return 'FIRST_TIME_BUYER';
    if (transactionCount <= 2) return 'PROPERTY_OWNER';
    if (transactionCount <= 5) return 'MULTI_PROPERTY_OWNER';
    if (transactionCount > 5 || totalValue > 500000000) return 'INSTITUTIONAL_INVESTOR';

    return 'PROPERTY_OWNER';
  }

  _estimateRevenueImpact(recommendations: Array<Record<string, any>>) {
    let oneTimeRevenue = 0;
    let annualRecurringRevenue = 0;

    for (const rec of recommendations) {
      if (rec.expectedValue) {
        const conversionProb = rec.conversionProbability || 0.25;
        if (rec.expectedRecurring && rec.recurringValue) {
          annualRecurringRevenue += rec.recurringValue * 12 * conversionProb;
        } else {
          oneTimeRevenue += rec.expectedValue * conversionProb;
        }
      }
    }

    return {
      oneTimeRevenue: Math.round(oneTimeRevenue),
      annualRecurringRevenue: Math.round(annualRecurringRevenue),
      estimatedTotal: Math.round(oneTimeRevenue + annualRecurringRevenue),
    };
  }

  _calculateRecommendationScore(recommendation: Record<string, any>): number {
    const factors = recommendation.scoringFactors || {};
    const weight = { lifecycle: 0.3, trigger: 0.4, seasonal: 0.2, priority: 0.1 };
    return (
      (factors.lifecycle || 0) * weight.lifecycle +
      (factors.trigger || 0) * weight.trigger +
      (factors.seasonal || 0) * weight.seasonal +
      (factors.priority || 0) * weight.priority
    );
  }

  _getPriorityScore(priority: string): number {
    const priorityScores: Record<string, number> = { CRITICAL: 100, HIGH: 80, MEDIUM: 50, LOW: 20 };
    return priorityScores[priority] || 50;
  }

  _calculateTimeliness(window: string): number {
    const windowDays = parseInt(window.split(' ')[0]);
    return Math.max(30, 100 - windowDays * 2);
  }

  _getCurrentQuarter(): string {
    const month = new Date().getMonth();
    if (month < 3) return 'Q1';
    if (month < 6) return 'Q2';
    if (month < 9) return 'Q3';
    return 'Q4';
  }

  recordRecommendationOutcome(
    recommendationId: string,
    customerData: Record<string, any>,
    accepted: boolean,
    notes = ''
  ) {
    return {
      recommendationId,
      customerId: customerData.id,
      accepted,
      timestamp: new Date(),
      notes,
      lifecycleStage: this._determineLifecycleStage(customerData),
      recordedAt: new Date(),
    };
  }
}
