import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "../authSlice";
import { initialState } from "./whatsapp/initialState";
import type { WhatsAppMessage, WhatsAppSession } from "./whatsapp/types";
import {
  initializeWhatsAppSession,
  connectWhatsApp,
  getSessionStatus,
  sendMessage,
  getQueueStatus,
  disconnectWhatsApp,
  getServiceHealth,
} from "./whatsapp/thunks";

// ── Re-exports ──
export type * from "./whatsapp/types";
export * from "./whatsapp/thunks";
export * from "./whatsapp/selectors";


const whatsappSlice = createSlice({
  name: 'whatsapp',
  initialState,
  reducers: {
    // Sync actions
    setQRCode: (state, action: PayloadAction<string>) => {
      state.qrCode = action.payload;
      state.showModal = true;
      state.modalType = 'qr';
    },
    clearQRCode: state => {
      state.qrCode = null;
      state.showModal = false;
      state.modalType = null;
    },
    addMessage: (state, action: PayloadAction<WhatsAppMessage>) => {
      state.messages.push(action.payload);
    },
    clearError: state => {
      state.error = null;
    },
    clearSuccess: state => {
      state.success = null;
    },
    toggleModal: (
      state,
      action: PayloadAction<{
        show: boolean;
        type?: 'qr' | 'messages' | 'queue' | 'settings' | null;
      }>
    ) => {
      state.showModal = action.payload.show;
      if (action.payload.type) {
        state.modalType = action.payload.type;
      }
    },
    updateSessionStatus: (state, action: PayloadAction<Partial<WhatsAppSession>>) => {
      if (state.session) {
        state.session = { ...state.session, ...action.payload };
      }
    },
    addQueuedMessage: (state, action: PayloadAction<WhatsAppMessage>) => {
      state.queue.messages.push(action.payload);
      state.queue.size = state.queue.messages.length;
    },
    removeQueuedMessage: (state, action: PayloadAction<string>) => {
      state.queue.messages = state.queue.messages.filter(m => m.id !== action.payload);
      state.queue.size = state.queue.messages.length;
    },
  },
  extraReducers: builder => {
    // Initialize Session
    builder
      .addCase(initializeWhatsAppSession.pending, state => {
        state.loading.connecting = true;
        state.error = null;
      })
      .addCase(initializeWhatsAppSession.fulfilled, (state, action) => {
        state.loading.connecting = false;
        state.session = action.payload.sessionId
          ? {
              sessionId: action.payload.sessionId,
              ownerEmail: action.payload.ownerEmail,
              connectionStatus: 'connecting' as const,
              messageCount: 0,
              autoReplyEnabled: false,
              chatbotEnabled: false,
            }
          : null;
        state.success = 'Session initialized';
      })
      .addCase(initializeWhatsAppSession.rejected, (state, action) => {
        state.loading.connecting = false;
        state.error = action.payload as string;
      });

    // Connect WhatsApp
    builder
      .addCase(connectWhatsApp.pending, state => {
        state.loading.connecting = true;
        state.error = null;
      })
      .addCase(connectWhatsApp.fulfilled, (state, action) => {
        state.loading.connecting = false;
        state.qrCode = action.payload.qrCode;
        state.showModal = true;
        state.modalType = 'qr';
        state.success = 'QR code generated. Scan to connect.';
      })
      .addCase(connectWhatsApp.rejected, (state, action) => {
        state.loading.connecting = false;
        state.error = action.payload as string;
      });

    // Get Session Status
    builder
      .addCase(getSessionStatus.fulfilled, (state, action) => {
        state.session = action.payload;
      })
      .addCase(getSessionStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Send Message
    builder
      .addCase(sendMessage.pending, state => {
        state.loading.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, _action) => {
        state.loading.sending = false;
        state.success = 'Message sent successfully';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading.sending = false;
        state.error = action.payload as string;
      });

    // Get Queue Status
    builder
      .addCase(getQueueStatus.fulfilled, (state, action) => {
        state.queue = action.payload.queue;
      })
      .addCase(getQueueStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Disconnect
    builder
      .addCase(disconnectWhatsApp.pending, state => {
        state.loading.disconnecting = true;
        state.error = null;
      })
      .addCase(disconnectWhatsApp.fulfilled, state => {
        state.loading.disconnecting = false;
        state.session = null;
        state.messages = [];
        state.success = 'WhatsApp disconnected';
      })
      .addCase(disconnectWhatsApp.rejected, (state, action) => {
        state.loading.disconnecting = false;
        state.error = action.payload as string;
      });

    // Get Service Health
    builder
      .addCase(getServiceHealth.fulfilled, (state, action) => {
        state.health = action.payload.health;
      })
      .addCase(getServiceHealth.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // --- SECURITY: Reset all WhatsApp data on logout ---
    builder.addCase(logout, () => initialState);
  },
});

export const {
  setQRCode,
  clearQRCode,
  addMessage,
  clearError,
  clearSuccess,
  toggleModal,
  updateSessionStatus,
  addQueuedMessage,
  removeQueuedMessage,
} = whatsappSlice.actions;

// ================================
// Selectors
// ================================

export default whatsappSlice.reducer;

