// @ts-nocheck
/**
 * Wednesday Business & Technology Integrations Plan Redux Slice — Facade
 */
import { createSlice } from "@reduxjs/toolkit";
import { fetchMonitoringMetrics, loadWednesdayPlan } from "./wednesdayPlan/thunks";
import { INITIAL_STATE } from "./wednesdayPlan/initialState";
import { wednesdayPlanReducers } from "./wednesdayPlan/reducers";

export * from "./wednesdayPlan/thunks";
export * from "./wednesdayPlan/selectors";

const wednesdayPlanSlice = createSlice({
  name: "wednesday",
  initialState: INITIAL_STATE,
  reducers: wednesdayPlanReducers,
  extraReducers: builder => {
    // Fetch monitoring metrics
    builder
      .addCase(fetchMonitoringMetrics.pending, state => {
        state.loading.metrics = true;
      })
      .addCase(fetchMonitoringMetrics.fulfilled, (state, _action) => {
        state.loading.metrics = false;
        // Metrics will be processed through specific update actions
      })
      .addCase(fetchMonitoringMetrics.rejected, (state, action) => {
        state.loading.metrics = false;
        state.error.metrics = action.payload;
      });

    // Load Wednesday plan
    builder
      .addCase(loadWednesdayPlan.pending, state => {
        state.loading.plan = true;
      })
      .addCase(loadWednesdayPlan.fulfilled, (state, action) => {
        state.loading.plan = false;
        state.knowledgeBase.plan.content = action.payload;
      })
      .addCase(loadWednesdayPlan.rejected, (state, action) => {
        state.loading.plan = false;
        state.error.plan = action.payload;
      });
  },
});

export const {
  startWednesdayExecution,
  completeWednesdayExecution,
  updateRequirementStatus,
  recordZoeApprovedChange,
  updateMetricActual,
  updateVercelMetrics,
  updateMongoDBMetrics,
  updateAPIEndpointStatus,
  updateServiceHealth,
  addCriticalIssue,
  addBlocker,
  addPerformanceAlert,
  createEscalation,
  notifyZoe,
  resolveEscalation,
  startMorningSession,
  completeMorningSession,
  startAfternoonSession,
  completeAfternoonSession,
  recordTaskCompletion,
  loadPlanContent,
  setActiveTab,
  toggleMetricsPanel,
} = wednesdayPlanSlice.actions;

export default wednesdayPlanSlice.reducer;

