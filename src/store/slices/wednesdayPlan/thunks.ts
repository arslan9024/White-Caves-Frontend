// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authFetch } from "../../../utils/authFetch";

export const fetchMonitoringMetrics = createAsyncThunk(
  'wednesday/fetchMonitoringMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authFetch('/api/aurora/monitoring/health');
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadWednesdayPlan = createAsyncThunk(
  'wednesday/loadPlan',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authFetch('/api/wednesday/plan');
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.plan;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
