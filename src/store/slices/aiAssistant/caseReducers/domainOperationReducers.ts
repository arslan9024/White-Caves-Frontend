// @ts-nocheck
/* eslint-disable security/detect-object-injection */
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  AIAssistantDashboardState,
  ExecutiveSuggestion,
  ExecutiveSuggestionsState,
  OliviaInsights,
  OliviaCoordination,
  MonitoredSite,
  Lead,
  Activity,
} from '../types';
import { MAX_AUDIT_LOG, MAX_ACTIVITY_LOG } from '../initialState';

export const domainOperationReducers = {
    updateOliviaSyncSchedule: (state, action: PayloadAction<string>) => {
      state.oliviaAutomation.syncSchedule = action.payload;
    },
    toggleOliviaMonitoring: state => {
      state.oliviaAutomation.activeMonitoring = !state.oliviaAutomation.activeMonitoring;
    },
    updateOliviaPropertySync: state => {
      state.oliviaAutomation.lastPropertySync = new Date().toISOString();
    },
    updateOliviaMarketResearch: state => {
      state.oliviaAutomation.lastMarketResearch = new Date().toISOString();
    },
    updateOliviaInsights: (state, action: PayloadAction<Partial<OliviaInsights>>) => {
      state.oliviaAutomation.insightsData = {
        ...state.oliviaAutomation.insightsData,
        ...action.payload,
        lastUpdated: new Date().toISOString(),
      };
    },
    updateOliviaCoordination: (state, action: PayloadAction<Partial<OliviaCoordination>>) => {
      state.oliviaAutomation.coordination = {
        ...state.oliviaAutomation.coordination,
        ...action.payload,
      };
    },
    updateOliviaSiteStatus: (
      state,
      action: PayloadAction<{
        siteName: string;
        status: MonitoredSite['status'];
        dataPoints?: unknown;
      }>
    ) => {
      const { siteName, status, dataPoints } = action.payload;
      const site = state.oliviaAutomation.monitoredSites.find(s => s.name === siteName);
      if (site) {
        site.status = status;
        site.lastCheck = new Date().toISOString();
        if (dataPoints !== undefined) site.dataPoints = dataPoints;
      }
    },
    addOliviaActivity: (state, action: PayloadAction<Omit<Activity, 'id' | 'timestamp'>>) => {
      const activity = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      } as Activity;
      state.oliviaAutomation.activityLog.unshift(activity);
      if (state.oliviaAutomation.activityLog.length > MAX_ACTIVITY_LOG) {
        state.oliviaAutomation.activityLog.pop();
      }
    },

    // ── Executive suggestions ───────────────────────────────────────────
    addExecutiveSuggestion: (
      state,
      action: PayloadAction<Omit<ExecutiveSuggestion, 'id' | 'timestamp' | 'status'>>
    ) => {
      const suggestion: ExecutiveSuggestion = {
        id: `sugg_${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'unreviewed',
        ...action.payload,
      };
      state.executiveSuggestions.inbox.unshift(suggestion);
    },
    updateSuggestionStatus: (
      state,
      action: PayloadAction<{ suggestionId: string; status: ExecutiveSuggestion['status'] }>
    ) => {
      const { suggestionId, status } = action.payload;
      const suggestion = state.executiveSuggestions.inbox.find(s => s.id === suggestionId);
      if (suggestion) suggestion.status = status;
    },
    setSuggestionFilters: (
      state,
      action: PayloadAction<Partial<ExecutiveSuggestionsState['filters']>>
    ) => {
      state.executiveSuggestions.filters = {
        ...state.executiveSuggestions.filters,
        ...action.payload,
      };
    },
    clearSuggestionFilters: state => {
      state.executiveSuggestions.filters = {
        priority: 'all',
        department: 'all',
        status: 'unreviewed',
      };
    },

    // ── Confidential vault ──────────────────────────────────────────────
    requestVaultAccess: (
      state,
      action: PayloadAction<{ documentId: string; requesterId: string; reason: string }>
    ) => {
      const { documentId, requesterId, reason } = action.payload;
      state.confidentialVault.accessRequests.push({
        id: `req_${Date.now()}`,
        documentId,
        requesterId,
        reason,
        status: 'pending',
        requestedAt: new Date().toISOString(),
        reviewedBy: null,
        reviewedAt: null,
      });
      state.confidentialVault.vaultStats.pendingRequests += 1;
    },
    approveVaultRequest: (
      state,
      action: PayloadAction<{ requestId: string; approverId: string }>
    ) => {
      const { requestId, approverId } = action.payload;
      const request = state.confidentialVault.accessRequests.find(r => r.id === requestId);
      if (request) {
        request.status = 'approved';
        request.reviewedBy = approverId;
        request.reviewedAt = new Date().toISOString();
        state.confidentialVault.vaultStats.pendingRequests = Math.max(
          0,
          state.confidentialVault.vaultStats.pendingRequests - 1
        );
        state.confidentialVault.vaultStats.recentAccesses += 1;
        const doc = state.confidentialVault.documents.find(d => d.id === request.documentId);
        if (doc) {
          doc.accessLog.push({
            accessedBy: request.requesterId,
            accessedAt: new Date().toISOString(),
          });
        }
      }
    },
    denyVaultRequest: (
      state,
      action: PayloadAction<{ requestId: string; approverId: string; reason: string }>
    ) => {
      const { requestId, approverId, reason } = action.payload;
      const request = state.confidentialVault.accessRequests.find(r => r.id === requestId);
      if (request) {
        request.status = 'denied';
        request.reviewedBy = approverId;
        request.reviewedAt = new Date().toISOString();
        request.denyReason = reason;
        state.confidentialVault.vaultStats.pendingRequests = Math.max(
          0,
          state.confidentialVault.vaultStats.pendingRequests - 1
        );
      }
    },

    // ── Lead management ─────────────────────────────────────────────────
    addIncomingLead: (state, action: PayloadAction<Omit<Lead, 'id' | 'receivedAt'>>) => {
      state.leadManagementHub.incomingLeads.push({
        id: `lead_${Date.now()}`,
        receivedAt: new Date().toISOString(),
        initialIntent: undefined,
        ...action.payload,
      });
      state.leadManagementHub.funnelMetrics.totalIncoming += 1;
    },
    qualifyLead: (
      state,
      action: PayloadAction<{
        leadId: string;
        assignedIntent: unknown;
        qualificationScore: number;
        structuredData: unknown;
      }>
    ) => {
      const { leadId, assignedIntent, qualificationScore, structuredData } = action.payload;
      const lead = state.leadManagementHub.incomingLeads.find(l => l.id === leadId);
      if (lead) {
        state.leadManagementHub.processedLeads[leadId] = {
          status: 'qualified',
          assignedIntent,
          qualificationScore,
          structuredData,
          qualifiedAt: new Date().toISOString(),
          routedTo: null,
          routedAt: null,
        };
      }
    },
    routeLeadToSpecialist: (
      state,
      action: PayloadAction<{ leadId: string; specialist: string }>
    ) => {
      const { leadId, specialist } = action.payload;
      const processed = state.leadManagementHub.processedLeads[leadId];
      if (processed) {
        processed.status = 'routed';
        processed.routedTo = specialist;
        processed.routedAt = new Date().toISOString();
        if (!state.leadManagementHub.specialistPipelines[specialist]) {
          state.leadManagementHub.specialistPipelines[specialist] = {
            leadIds: [],
            pipelineStages: [],
          };
        }
        state.leadManagementHub.specialistPipelines[specialist].leadIds.push(leadId);
      }
    },
    updateLeadPipelineStage: (
      state,
      action: PayloadAction<{ leadId: string; specialist: string; stage: string }>
    ) => {
      const { leadId, stage } = action.payload;
      const processed = state.leadManagementHub.processedLeads[leadId];
      if (processed) processed.currentStage = stage;
    },

    // ── Compliance engine ───────────────────────────────────────────────
    addComplianceAuditLog: (
      state,
      action: PayloadAction<Omit<Record<string, unknown>, 'id' | 'timestamp'>>
    ) => {
      const entry = {
        id: `audit_${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.complianceEngine.auditLog.unshift(entry);
      if (state.complianceEngine.auditLog.length > MAX_AUDIT_LOG) {
        state.complianceEngine.auditLog.pop();
      }
    },
    flagTransaction: (
      state,
      action: PayloadAction<Omit<Record<string, unknown>, 'id' | 'flaggedAt' | 'status'>>
    ) => {
      const transaction = {
        id: `tx_${Date.now()}`,
        flaggedAt: new Date().toISOString(),
        status: 'pending_review',
        ...action.payload,
      };
      state.complianceEngine.amlMonitor.flaggedTransactions.push(transaction);
      state.complianceEngine.amlMonitor.investigationQueue.push(transaction.id as string);
    },

    // ── Task lifecycle ─────────────────────────────────────────────────────

    /**
     * Moves a task to a new lifecycle stage and automatically fires a
     * notification (info / warning / critical) for that assistant.
     */
};

