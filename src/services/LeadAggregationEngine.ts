/**
 * LeadAggregationEngine
 *
 * Unified lead management across all property portals:
 * - Bayut
 * - PropertyFinder
 * - Dubizzle
 * - Skyloov
 */

import { BayutAdapter } from '../adapters/BayutAdapter';
import { PropertyFinderAdapter } from '../adapters/PropertyFinderAdapter';
import { DubizzleAdapter } from '../adapters/DubizzleAdapter';
import { SkyloovAdapter } from '../adapters/SkyloovAdapter';

import type {
  Lead,
  Agent,
  DeduplicationRule,
  ScoringRule,
  AssignmentRule,
  PortalCredentials,
  PortalAdapterInstance,
  PortalAdapterMap,
  AggregationResult,
  AggregationStatus,
  AggregationStatistics,
} from './leadAggregation/types';
import {
  getDefaultDeduplicationRules,
  getDefaultScoringRules,
} from './leadAggregation/defaultRules';
import {
  generateDeduplicationKey,
  deduplicateLeadsList,
  evaluateLeadScore,
  getLeadRatingText,
  scoreLeadsList,
  assignLeadsToAgentsList,
} from './leadAggregation/processors';
import {
  filterLeadsByScoreRange,
  filterHotLeads,
  filterLeadsByPortal,
  filterUnassignedLeads,
  calculateLeadStatistics,
} from './leadAggregation/analytics';
import {
  initializeAdapters,
  fetchAllLeadsFromAdapters,
  setupWebhooksForAdapters,
} from './leadAggregation/adapterManager';
import {
  startAutoAggregationScheduler,
  stopAutoAggregationScheduler,
  processWebhookPayload,
} from './leadAggregation/webhookManager';

export class LeadAggregationEngine {
  adapters: PortalAdapterMap;
  leads: Lead[] = [];
  deduplicationRules: DeduplicationRule[] = [];
  scoringRules: ScoringRule[] = [];
  assignmentRules: AssignmentRule[] = [];
  isProcessing = false;
  lastSync: string | null = null;
  syncInterval = 5 * 60 * 1000;
  webhookHandlers: Record<string, any> = {};
  autoAggregationInterval: any = null;

  constructor() {
    this.adapters = {
      bayut: new BayutAdapter() as PortalAdapterInstance,
      propertyfinder: new PropertyFinderAdapter() as PortalAdapterInstance,
      dubizzle: new DubizzleAdapter() as PortalAdapterInstance,
      skyloov: new SkyloovAdapter() as PortalAdapterInstance,
    };
  }

  async initialize(
    credentials: PortalCredentials = {}
  ): Promise<Record<string, { success: boolean; message: string }>> {
    return initializeAdapters(this.adapters, credentials);
  }

  getAdapter(portalName: string): PortalAdapterInstance | null {
    return this.adapters[portalName.toLowerCase()] || null;
  }

  async fetchAllLeads(filters: Record<string, any> = {}): Promise<Record<string, any[]>> {
    return fetchAllLeadsFromAdapters(this.adapters, filters);
  }

  addDeduplicationRule(rule: DeduplicationRule): void {
    this.deduplicationRules.push({ ...rule, priority: rule.priority || 50 });
    this.deduplicationRules.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  addScoringRule(rule: ScoringRule): void {
    this.scoringRules.push(rule);
  }

  addAssignmentRule(rule: AssignmentRule): void {
    this.assignmentRules.push(rule);
  }

  setupDefaultRules(): void {
    getDefaultDeduplicationRules().forEach(r => this.addDeduplicationRule(r));
    getDefaultScoringRules().forEach(r => this.addScoringRule(r));
  }

  async deduplicateLeads(leads: Lead[]): Promise<Lead[]> {
    return deduplicateLeadsList(leads, this.deduplicationRules);
  }

  generateDeduplicationKey(lead: Lead, fields: string[]): string {
    return generateDeduplicationKey(lead, fields);
  }

  scoreLead(lead: Lead): number {
    return evaluateLeadScore(lead, this.scoringRules);
  }

  scoreLeads(leads: Lead[]): Lead[] {
    return scoreLeadsList(leads, this.scoringRules);
  }

  getLeadRating(score: number): string {
    return getLeadRatingText(score);
  }

  assignLeadsToAgents(leads: Lead[], agents: Agent[] = []): Lead[] {
    return assignLeadsToAgentsList(leads, this.assignmentRules, agents);
  }

  async aggregateLeads(filters: Record<string, any> = {}): Promise<AggregationResult | null> {
    if (this.isProcessing) return null;
    this.isProcessing = true;
    const startTime = Date.now();

    try {
      const leadsByPortal = await this.fetchAllLeads(filters);
      const allLeads = Object.values(leadsByPortal).flat();
      const deduplicated = await this.deduplicateLeads(allLeads);
      const scored = this.scoreLeads(deduplicated);

      this.leads = scored;
      this.lastSync = new Date().toISOString();

      return {
        success: true,
        timestamp: this.lastSync,
        duration: Date.now() - startTime,
        portalCounts: Object.entries(leadsByPortal).reduce(
          (acc, [portal, leads]) => {
            acc[portal] = leads.length;
            return acc;
          },
          {} as Record<string, number>
        ),
        totalFetched: allLeads.length,
        afterDeduplication: deduplicated.length,
        currentLeads: scored.length,
      };
    } catch (error: any) {
      return { success: false, error: error?.message || 'Aggregation failed' };
    } finally {
      this.isProcessing = false;
    }
  }

  startAutoAggregation(interval: number = this.syncInterval): void {
    startAutoAggregationScheduler({
      getCurrentInterval: () => this.autoAggregationInterval,
      setCurrentInterval: timer => {
        this.autoAggregationInterval = timer;
      },
      syncInterval: this.syncInterval,
      aggregateLeads: () => this.aggregateLeads(),
      interval,
    });
  }

  stopAutoAggregation(): void {
    stopAutoAggregationScheduler(
      () => this.autoAggregationInterval,
      timer => {
        this.autoAggregationInterval = timer;
      }
    );
  }

  getLeadsByScoreRange(minScore: number, maxScore: number): Lead[] {
    return filterLeadsByScoreRange(this.leads, minScore, maxScore);
  }

  getHotLeads(threshold = 70): Lead[] {
    return filterHotLeads(this.leads, threshold);
  }

  getLeadsByPortal(portalId: string): Lead[] {
    return filterLeadsByPortal(this.leads, portalId);
  }

  getUnassignedLeads(): Lead[] {
    return filterUnassignedLeads(this.leads);
  }

  getStatus(): AggregationStatus {
    return {
      isProcessing: this.isProcessing,
      lastSync: this.lastSync,
      totalLeads: this.leads.length,
      hotLeads: this.getHotLeads().length,
      unassignedLeads: this.getUnassignedLeads().length,
      portalBreakdown: {
        bayut: this.getLeadsByPortal('bayut').length,
        propertyfinder: this.getLeadsByPortal('propertyfinder').length,
        dubizzle: this.getLeadsByPortal('dubizzle').length,
        skyloov: this.getLeadsByPortal('skyloov').length,
      },
      adapterHealth: Object.entries(this.adapters).reduce(
        (acc, [name, adapter]) => {
          acc[name] = adapter?.getSyncStatus ? adapter.getSyncStatus() : null;
          return acc;
        },
        {} as Record<string, any>
      ),
    };
  }

  async setupWebhooks(
    webhookUrl: string
  ): Promise<Record<string, { success: boolean; webhookId?: string; error?: string }>> {
    return setupWebhooksForAdapters(this.adapters, webhookUrl);
  }

  async handleWebhookPayload(portalName: string, payload: any): Promise<any> {
    return processWebhookPayload(this.adapters, portalName, payload, () => this.aggregateLeads());
  }

  getStatistics(): AggregationStatistics {
    return calculateLeadStatistics(this.leads);
  }
}

export * from './leadAggregation';
export default LeadAggregationEngine;
