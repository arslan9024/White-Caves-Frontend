import { createAsyncThunk } from "@reduxjs/toolkit";
import { authFetch } from "../../../utils/authFetch";
import { getErrorMessage } from "../../../constants";
import type { WhatsAppMessage } from "./types";

export const initializeWhatsAppSession = createAsyncThunk(
  'whatsapp/initializeSession',
  async (
    { sessionId, ownerEmail }: { sessionId: string; ownerEmail: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authFetch('/api/whatsapp/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, ownerEmail }),
      });

      if (!response.ok) {
        let errorData: Record<string, unknown> = {};
        try {
          const contentType = response.headers.get('content-type');
          if (contentType?.includes('application/json')) {
            errorData = await response.json();
          }
        } catch {
          // Response body not parseable — use default message
        }
        const msg =
          (typeof errorData?.message === 'string' ? errorData.message : '') ||
          (typeof errorData?.error === 'string' ? errorData.error : '') ||
          `Request failed with status ${response.status}`;
        return rejectWithValue(msg);
      }

      return await response.json();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const connectWhatsApp = createAsyncThunk(
  'whatsapp/connect',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authFetch('/api/whatsapp/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionMethod: 'qr' }),
      });

      if (!response.ok) {
        const msg = await extractErrorMessage(response);
        return rejectWithValue(msg);
      }

      return await response.json();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const getSessionStatus = createAsyncThunk(
  'whatsapp/getSessionStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authFetch('/api/whatsapp/session');

      if (!response.ok) {
        const msg = await extractErrorMessage(response);
        return rejectWithValue(msg);
      }

      return await response.json();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'whatsapp/sendMessage',
  async (
    {
      phoneNumber,
      message,
      priority = 'normal',
    }: { phoneNumber: string; message: string; priority?: 'high' | 'normal' | 'low' },
    { rejectWithValue }
  ) => {
    try {
      const response = await authFetch('/api/whatsapp/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, message, priority }),
      });

      if (!response.ok) {
        const msg = await extractErrorMessage(response);
        return rejectWithValue(msg);
      }

      return await response.json();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const getQueueStatus = createAsyncThunk(
  'whatsapp/getQueueStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authFetch('/api/whatsapp/queue-status');

      if (!response.ok) {
        const msg = await extractErrorMessage(response);
        return rejectWithValue(msg);
      }

      return await response.json();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const disconnectWhatsApp = createAsyncThunk(
  'whatsapp/disconnect',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authFetch('/api/whatsapp/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const msg = await extractErrorMessage(response);
        return rejectWithValue(msg);
      }

      return await response.json();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const getServiceHealth = createAsyncThunk(
  'whatsapp/getServiceHealth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authFetch('/api/whatsapp/health');

      if (!response.ok) {
        const msg = await extractErrorMessage(response);
        return rejectWithValue(msg);
      }

      return await response.json();
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  }
);

// ================================
// Slice
// ================================

