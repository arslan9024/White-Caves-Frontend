// @ts-nocheck
import { createSelector } from "@reduxjs/toolkit";

export const selectWednesdayPlan = state => state.wednesday.plan;
export const selectZoeRequirements = state => state.wednesday.zoe.requirements;
export const selectZoeMetrics = state => state.wednesday.zoe.metrics;
export const selectZoeApprovedChanges = state => state.wednesday.zoe.approvedChanges;
export const selectAuroraMonitoring = state => state.wednesday.aurora.monitoring;
export const selectAuroraFindings = state => state.wednesday.aurora.findings;
export const selectActiveEscalations = state => state.wednesday.escalations.active;
export const selectEscalationHistory = state => state.wednesday.escalations.history;
export const selectTimelineProgress = state => state.wednesday.timeline;
export const selectKnowledgeBase = state => state.wednesday.knowledgeBase.plan;
export const selectUIState = state => state.wednesday.ui;
export const selectCriticalAlerts = createSelector([selectAuroraFindings], findings =>
  findings.criticalIssues.filter(i => i.status === 'open')
);
export const selectOpenBlockers = createSelector([selectAuroraFindings], findings =>
  findings.blockers.filter(b => b.status === 'open')
);

