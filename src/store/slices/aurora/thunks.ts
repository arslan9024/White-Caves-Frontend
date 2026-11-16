// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = '/api/aurora';

export const fetchProviders = createAsyncThunk(
  'aurora/fetchProviders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/providers`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAnalysis = createAsyncThunk(
  'aurora/fetchAnalysis',
  async ({ refresh = false } = {}, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/analyze?refresh=${refresh}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.analysis;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAnalysisSummary = createAsyncThunk(
  'aurora/fetchAnalysisSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/analyze/summary`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.summary;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const scanComponents = createAsyncThunk(
  'aurora/scanComponents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/scan-components`, { method: 'POST' });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComponentCompletion = createAsyncThunk(
  'aurora/fetchComponentCompletion',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/components/completion`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const generateSRS = createAsyncThunk(
  'aurora/generateSRS',
  async (config = {}, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/generate-srs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSRSDocuments = createAsyncThunk(
  'aurora/fetchSRSDocuments',
  async ({ status, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      params.append('limit', limit);
      
      const response = await fetch(`${API_BASE}/srs?${params}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.documents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSRSDocument = createAsyncThunk(
  'aurora/fetchSRSDocument',
  async (documentId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/srs/${documentId}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.document;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLatestSRS = createAsyncThunk(
  'aurora/fetchLatestSRS',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/srs-latest`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.document;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const generateAudit = createAsyncThunk(
  'aurora/generateAudit',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/audit`, { method: 'POST' });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchActionCatalog = createAsyncThunk(
  'aurora/fetchActionCatalog',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/scan-actions`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

