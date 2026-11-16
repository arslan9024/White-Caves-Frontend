import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { logout } from '../../authSlice';
import type { AIAssistantDashboardState } from './types';
import { fetchAllAssistants, updateAssistantMetricsAsync, fetchAssistantPlan } from './thunks';
import { getInitialState } from './initialState';

export const addAIAssistantExtraReducers = (builder: ActionReducerMapBuilder<AIAssistantDashboardState>) => {
  builder
    .addCase(fetchAllAssistants.pending, state => {
      state.allAssistants.isLoading = true;
    })
    .addCase(fetchAllAssistants.fulfilled, (state, action) => {
      state.allAssistants.isLoading = false;
      state.allAssistants.lastFetched = action.payload.timestamp;
    })
    .addCase(updateAssistantMetricsAsync.fulfilled, (state, action) => {
      const { assistantId, metrics } = action.payload;
      if (state.allAssistants.byId[assistantId]) {
        state.allAssistants.byId[assistantId].metrics = {
          ...state.allAssistants.byId[assistantId].metrics,
          ...metrics,
        };
      }
    })
    // ── Phase 0.8 — assistant plan loading ────────────────────────────
    .addCase(fetchAssistantPlan.pending, (state, action) => {
      state.plansLoading[action.meta.arg] = true;
      state.plansError[action.meta.arg] = null;
    })
    .addCase(fetchAssistantPlan.fulfilled, (state, action) => {
      state.plansLoading[action.payload.id] = false;
      state.plans[action.payload.id] = action.payload.plan;
    })
    .addCase(fetchAssistantPlan.rejected, (state, action) => {
      state.plansLoading[action.meta.arg] = false;
      state.plansError[action.meta.arg] = (action.payload ?? 'Failed to load plan') as string;
    })
    .addCase(logout, () => getInitialState());
};

