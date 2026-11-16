import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./department/types";
import {
  fetchAllDepartments,
  fetchDepartmentData,
  fetchDepartmentKPIs,
  fetchDepartmentTrends,
  fetchDepartmentSummary,
} from "./department/thunks";

// ── Re-exports ──
export type * from "./department/types";
export * from "./department/thunks";
export * from "./department/selectors";
const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    // Clear specific error
    clearError: (state, action: PayloadAction<keyof DepartmentState['error']>) => {
      state.error[action.payload] = null;
    },

    // Clear all errors
    clearAllErrors: state => {
      state.error = {
        departments: null,
        data: null,
        kpis: null,
        trends: null,
        summary: null,
      };
    },

    // Clear all department data
    clearDepartmentData: state => {
      state.departmentData = {};
      state.kpis = {};
      state.trends = {};
      state.summaries = {};
    },

    // Set selected department
    setSelectedDepartment: (state, action: PayloadAction<string | null>) => {
      state.selectedDepartment = action.payload;
    },

    // Manually set department data (for testing or custom updates)
    setDepartmentData: (state, action: PayloadAction<DepartmentData>) => {
      state.departmentData[action.payload.code] = action.payload;
    },
  },

  extraReducers: builder => {
    // Fetch all departments
    builder
      .addCase(fetchAllDepartments.pending, state => {
        state.loading.departments = true;
        state.error.departments = null;
      })
      .addCase(fetchAllDepartments.fulfilled, (state, action) => {
        state.loading.departments = false;
        state.departments = action.payload;
        state.lastUpdated.departments = Date.now();
      })
      .addCase(fetchAllDepartments.rejected, (state, action) => {
        state.loading.departments = false;
        state.error.departments = action.payload as string;
      });

    // Fetch department data
    builder
      .addCase(fetchDepartmentData.pending, state => {
        state.loading.data = true;
        state.error.data = null;
      })
      .addCase(fetchDepartmentData.fulfilled, (state, action) => {
        state.loading.data = false;
        state.departmentData = { ...state.departmentData, ...action.payload };
        const code = Object.keys(action.payload)[0];
        // eslint-disable-next-line security/detect-object-injection
        state.lastUpdated.data[code] = Date.now();
      })
      .addCase(fetchDepartmentData.rejected, (state, action) => {
        state.loading.data = false;
        state.error.data = action.payload as string;
      });

    // Fetch KPIs
    builder
      .addCase(fetchDepartmentKPIs.pending, state => {
        state.loading.kpis = true;
        state.error.kpis = null;
      })
      .addCase(fetchDepartmentKPIs.fulfilled, (state, action) => {
        state.loading.kpis = false;
        state.kpis[action.payload.code] = action.payload.kpis;
        state.lastUpdated.kpis[action.payload.code] = Date.now();
      })
      .addCase(fetchDepartmentKPIs.rejected, (state, action) => {
        state.loading.kpis = false;
        state.error.kpis = action.payload as string;
      });

    // Fetch trends
    builder
      .addCase(fetchDepartmentTrends.pending, state => {
        state.loading.trends = true;
        state.error.trends = null;
      })
      .addCase(fetchDepartmentTrends.fulfilled, (state, action) => {
        state.loading.trends = false;
        state.trends[action.payload.code] = action.payload.trends;
        state.lastUpdated.trends[action.payload.code] = Date.now();
      })
      .addCase(fetchDepartmentTrends.rejected, (state, action) => {
        state.loading.trends = false;
        state.error.trends = action.payload as string;
      });

    // Fetch summary
    builder
      .addCase(fetchDepartmentSummary.pending, state => {
        state.loading.summary = true;
        state.error.summary = null;
      })
      .addCase(fetchDepartmentSummary.fulfilled, (state, action) => {
        state.loading.summary = false;
        state.summaries[action.payload.code] = action.payload.summary;
      })
      .addCase(fetchDepartmentSummary.rejected, (state, action) => {
        state.loading.summary = false;
        state.error.summary = action.payload as string;
      });
  },
});

/**
 * Actions
 */
export const {
  clearError,
  clearAllErrors,
  clearDepartmentData,
  setSelectedDepartment,
  setDepartmentData,
} = departmentSlice.actions;

/**
 * Export Reducer
 */
export default departmentSlice.reducer;

