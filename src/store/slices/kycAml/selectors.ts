// @ts-nocheck
import { initialState } from "./initialState";

export const selectKYCProfiles = (state) => state.kycAml?.profiles || initialState.profiles;
export const selectVerificationQueue = (state) => state.kycAml?.verificationQueue || initialState.verificationQueue;
export const selectAMLAlerts = (state) => state.kycAml?.alerts || initialState.alerts;
export const selectPEPScreening = (state) => state.kycAml?.pepScreening || initialState.pepScreening;
export const selectSanctionsCheck = (state) => state.kycAml?.sanctionsCheck || initialState.sanctionsCheck;
export const selectComplianceStats = (state) => state.kycAml?.stats || initialState.stats;
export const selectActiveProfile = (state) => state.kycAml?.activeProfile || null;
export const selectSelectedAlert = (state) => state.kycAml?.selectedAlert || null;
export const selectFilters = (state) => state.kycAml?.filters || initialState.filters;
export const selectNotifications = (state) => state.kycAml?.notifications || [];
export const selectUnreadNotifications = (state) => 
  (state.kycAml?.notifications || []).filter(n => !n.read);
export const selectUIState = (state) => state.kycAml?.ui || initialState.ui;

export const selectHighRiskProfiles = (state) => 
  (state.kycAml?.profiles?.data || []).filter(p => p.riskLevel === 'HIGH' || p.riskLevel === 'PROHIBITED');

export const selectPendingVerifications = (state) =>
  (state.kycAml?.verificationQueue?.data || []).filter(p => p.status === 'PENDING_VERIFICATION');

export const selectActiveAlerts = (state) =>
  (state.kycAml?.alerts?.data || []).filter(a => a.status === 'OPEN' || a.status === 'INVESTIGATING');

export default kycAmlSlice.reducer;

