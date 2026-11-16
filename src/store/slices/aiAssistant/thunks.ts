import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../../constants';
import { AI_ASSISTANTS_REGISTRY } from './registry';
import type { AIAssistant, AssistantMetrics } from './types';

export const fetchAllAssistants = createAsyncThunk(
  'aiAssistantDashboard/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return {
        assistants: AI_ASSISTANTS_REGISTRY,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateAssistantMetricsAsync = createAsyncThunk(
  'aiAssistantDashboard/updateMetrics',
  async (
    payload: { assistantId: string; metrics: Partial<AssistantMetrics> },
    { rejectWithValue }
  ) => {
    try {
      return { ...payload, timestamp: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Phase 0.8 — Fetch the markdown plan for a specific assistant from /api/assistants/:id/plan.
 * Requires the user to be authenticated; called lazily when an assistant is selected.
 */
export const fetchAssistantPlan = createAsyncThunk(
  'aiAssistantDashboard/fetchPlan',
  async (assistantId: string, { rejectWithValue }) => {
    try {
      const { assistantsService } = await import('../../../services/assistantsService');
      const response = await assistantsService.getPlan(assistantId);
      return { id: assistantId, plan: response.plan };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to load assistant plan'
      );
    }
  }
);

// ============================================================================
// SLICE DEFINITION
// ============================================================================

