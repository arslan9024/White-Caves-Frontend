import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";


export const selectWhatsAppSession = (state: RootState) => state.whatsapp.session;
export const selectWhatsAppMessages = (state: RootState) => state.whatsapp.messages;
export const selectWhatsAppQueue = (state: RootState) => state.whatsapp.queue;
export const selectWhatsAppHealth = (state: RootState) => state.whatsapp.health;
export const selectWhatsAppLoading = (state: RootState) => state.whatsapp.loading;
export const selectWhatsAppError = (state: RootState) => state.whatsapp.error;
export const selectWhatsAppSuccess = (state: RootState) => state.whatsapp.success;
export const selectWhatsAppQRCode = (state: RootState) => state.whatsapp.qrCode;
export const selectWhatsAppModal = createSelector(
  (state: RootState) => state.whatsapp.showModal,
  (state: RootState) => state.whatsapp.modalType,
  (show, type) => ({ show, type })
);
export const selectWhatsAppIsConnected = (state: RootState) =>
  state.whatsapp.session?.connectionStatus === 'authenticated';
export const selectWhatsAppIsConnecting = (state: RootState) =>
  state.whatsapp.session?.connectionStatus === 'connecting' ||
  state.whatsapp.session?.connectionStatus === 'qr_pending';


