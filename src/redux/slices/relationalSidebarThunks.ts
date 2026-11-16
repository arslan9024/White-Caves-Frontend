// @ts-nocheck
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDepartmentDataFromApi } from '../../mocks/apiHandler';

// Thunk for fetching department-specific data
export const fetchDepartmentData = createAsyncThunk(
  'relationalSidebar/fetchDepartmentData',
  async (departmentId, { rejectWithValue }) => {
    try {
      const response = await fetchDepartmentDataFromApi(departmentId);
      if (!response.success) throw new Error(response.error);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching assistant data
export const fetchAssistantData = createAsyncThunk(
  'relationalSidebar/fetchAssistantData',
  async (assistantId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/ai/assistants/${assistantId}`);
      if (response.ok) {
        const json = await response.json();
        return json.data || json;
      }

      return {
        id: assistantId,
        name: `Nadia Assistant ${assistantId}`,
        status: 'active',
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching context-specific data (e.g., inventory)
export const fetchContextualData = createAsyncThunk(
  'relationalSidebar/fetchContextualData',
  async ({ assistantId, context }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/ai/assistants/${assistantId}/contexts/${context}`);
      if (response.ok) {
        const json = await response.json();
        return json.data || json;
      }

      return {
        context,
        assistantId,
        data: [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

