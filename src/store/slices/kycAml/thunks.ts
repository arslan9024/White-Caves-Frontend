// @ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchKYCProfiles = createAsyncThunk(
  'kycAml/fetchProfiles',
  async ({ status, riskLevel, limit = 50 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (riskLevel) params.append('riskLevel', riskLevel);
      params.append('limit', limit);
      
      const response = await fetch(`/api/compliance/kyc?${params}`);
      if (!response.ok) throw new Error('Failed to fetch profiles');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVerificationQueue = createAsyncThunk(
  'kycAml/fetchQueue',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/compliance/verification-queue');
      if (!response.ok) throw new Error('Failed to fetch queue');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAMLAlerts = createAsyncThunk(
  'kycAml/fetchAlerts',
  async ({ status, severity, limit = 50 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (severity) params.append('severity', severity);
      params.append('limit', limit);
      
      const response = await fetch(`/api/compliance/aml-alerts?${params}`);
      if (!response.ok) throw new Error('Failed to fetch alerts');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComplianceStats = createAsyncThunk(
  'kycAml/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/compliance/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createKYCProfile = createAsyncThunk(
  'kycAml/createProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/compliance/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      if (!response.ok) throw new Error('Failed to create profile');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateKYCProfile = createAsyncThunk(
  'kycAml/updateProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/compliance/kyc/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyDocument = createAsyncThunk(
  'kycAml/verifyDocument',
  async ({ profileId, documentType, documentData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/compliance/kyc/${profileId}/documents/${documentType}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(documentData)
      });
      if (!response.ok) throw new Error('Document verification failed');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const runPEPScreening = createAsyncThunk(
  'kycAml/pepScreening',
  async (screeningData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/compliance/pep-screen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(screeningData)
      });
      if (!response.ok) throw new Error('PEP screening failed');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const runSanctionsCheck = createAsyncThunk(
  'kycAml/sanctionsCheck',
  async (checkData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/compliance/sanctions-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkData)
      });
      if (!response.ok) throw new Error('Sanctions check failed');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resolveAMLAlert = createAsyncThunk(
  'kycAml/resolveAlert',
  async ({ alertId, resolution }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/compliance/aml-alerts/${alertId}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resolution)
      });
      if (!response.ok) throw new Error('Failed to resolve alert');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


