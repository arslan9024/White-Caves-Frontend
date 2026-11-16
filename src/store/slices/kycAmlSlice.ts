// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./kycAml/initialState";
import {
  fetchKYCProfiles,
  fetchVerificationQueue,
  fetchAMLAlerts,
  fetchComplianceStats,
  createKYCProfile,
  updateKYCProfile,
  verifyDocument,
  runPEPScreening,
  runSanctionsCheck,
  resolveAMLAlert,
} from "./kycAml/thunks";

// ── Re-exports ──
export * from "./kycAml/thunks";
export * from "./kycAml/selectors";

const kycAmlSlice = createSlice({
  name: 'kycAml',
  initialState,
  reducers: {
    setActiveProfile: (state, action) => {
      state.activeProfile = action.payload;
    },
    setSelectedAlert: (state, action) => {
      state.selectedAlert = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setActiveTab: (state, action) => {
      state.ui.activeTab = action.payload;
    },
    setSidePanel: (state, action) => {
      state.ui.sidePanel = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload
      });
      if (state.notifications.length > 50) {
        state.notifications.pop();
      }
    },
    markNotificationRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) notification.read = true;
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    toggleNotifications: (state) => {
      state.ui.showNotifications = !state.ui.showNotifications;
    },
    realTimeAlertReceived: (state, action) => {
      const alert = action.payload;
      state.alerts.data.unshift(alert);
      state.alerts.unreadCount += 1;
      state.notifications.unshift({
        id: Date.now(),
        type: 'aml_alert',
        severity: alert.severity,
        title: 'New AML Alert',
        message: alert.description,
        timestamp: new Date().toISOString(),
        read: false,
        alertId: alert.id
      });
    },
    realTimeProfileUpdate: (state, action) => {
      const updated = action.payload;
      const index = state.profiles.data.findIndex(p => p.id === updated.id);
      if (index !== -1) {
        state.profiles.data[index] = updated;
      }
      if (state.activeProfile?.id === updated.id) {
        state.activeProfile = updated;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKYCProfiles.pending, (state) => {
        state.profiles.loading = true;
        state.profiles.error = null;
      })
      .addCase(fetchKYCProfiles.fulfilled, (state, action) => {
        state.profiles.loading = false;
        state.profiles.data = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.profiles.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchKYCProfiles.rejected, (state, action) => {
        state.profiles.loading = false;
        state.profiles.error = action.payload;
      })
      .addCase(fetchVerificationQueue.pending, (state) => {
        state.verificationQueue.loading = true;
        state.verificationQueue.error = null;
      })
      .addCase(fetchVerificationQueue.fulfilled, (state, action) => {
        state.verificationQueue.loading = false;
        state.verificationQueue.data = action.payload.data || action.payload;
      })
      .addCase(fetchVerificationQueue.rejected, (state, action) => {
        state.verificationQueue.loading = false;
        state.verificationQueue.error = action.payload;
      })
      .addCase(fetchAMLAlerts.pending, (state) => {
        state.alerts.loading = true;
        state.alerts.error = null;
      })
      .addCase(fetchAMLAlerts.fulfilled, (state, action) => {
        state.alerts.loading = false;
        state.alerts.data = action.payload.data || action.payload;
      })
      .addCase(fetchAMLAlerts.rejected, (state, action) => {
        state.alerts.loading = false;
        state.alerts.error = action.payload;
      })
      .addCase(fetchComplianceStats.pending, (state) => {
        state.stats.loading = true;
        state.stats.error = null;
      })
      .addCase(fetchComplianceStats.fulfilled, (state, action) => {
        state.stats.loading = false;
        state.stats.data = action.payload;
      })
      .addCase(fetchComplianceStats.rejected, (state, action) => {
        state.stats.loading = false;
        state.stats.error = action.payload;
      })
      .addCase(createKYCProfile.fulfilled, (state, action) => {
        state.profiles.data.unshift(action.payload);
      })
      .addCase(updateKYCProfile.fulfilled, (state, action) => {
        const index = state.profiles.data.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.profiles.data[index] = action.payload;
        }
      })
      .addCase(verifyDocument.fulfilled, (state, action) => {
        if (state.activeProfile) {
          const docIndex = state.activeProfile.documents?.findIndex(
            d => d.type === action.payload.documentType
          );
          if (docIndex !== -1) {
            state.activeProfile.documents[docIndex] = {
              ...state.activeProfile.documents[docIndex],
              ...action.payload.verification
            };
          }
        }
      })
      .addCase(runPEPScreening.pending, (state) => {
        state.pepScreening.loading = true;
        state.pepScreening.error = null;
      })
      .addCase(runPEPScreening.fulfilled, (state, action) => {
        state.pepScreening.loading = false;
        state.pepScreening.results = action.payload;
      })
      .addCase(runPEPScreening.rejected, (state, action) => {
        state.pepScreening.loading = false;
        state.pepScreening.error = action.payload;
      })
      .addCase(runSanctionsCheck.pending, (state) => {
        state.sanctionsCheck.loading = true;
        state.sanctionsCheck.error = null;
      })
      .addCase(runSanctionsCheck.fulfilled, (state, action) => {
        state.sanctionsCheck.loading = false;
        state.sanctionsCheck.results = action.payload;
      })
      .addCase(runSanctionsCheck.rejected, (state, action) => {
        state.sanctionsCheck.loading = false;
        state.sanctionsCheck.error = action.payload;
      })
      .addCase(resolveAMLAlert.fulfilled, (state, action) => {
        const index = state.alerts.data.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.alerts.data[index] = action.payload;
        }
        if (state.selectedAlert?.id === action.payload.id) {
          state.selectedAlert = action.payload;
        }
      });
  }
});

export const {
  setActiveProfile,
  setSelectedAlert,
  setFilters,
  clearFilters,
  setActiveTab,
  setSidePanel,
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
  toggleNotifications,
  realTimeAlertReceived,
  realTimeProfileUpdate
} = kycAmlSlice.actions;


export default kycAmlSlice.reducer;

