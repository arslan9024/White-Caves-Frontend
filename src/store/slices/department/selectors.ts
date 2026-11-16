export const selectDepartments = (state: { departments: { departments: unknown[] } }) =>
  state.departments.departments;
export const selectDepartmentData = (state: {
  departments: { departmentData: Record<string, unknown> };
}) => state.departments.departmentData;
export const selectDepartmentKPIs = (state: { departments: { kpis: Record<string, unknown[]> } }) =>
  state.departments.kpis;
export const selectDepartmentTrends = (state: {
  departments: { trends: Record<string, unknown[]> };
}) => state.departments.trends;
export const selectDepartmentSummaries = (state: {
  departments: { summaries: Record<string, unknown> };
}) => state.departments.summaries;

// NOTE: loading/error are keyed maps, not primitive values.
export const selectDepartmentLoading = (state: {
  departments: {
    loading: {
      departments: boolean;
      data: boolean;
      kpis: boolean;
      trends: boolean;
      summary: boolean;
    };
  };
}) => state.departments.loading;

export const selectDepartmentError = (state: {
  departments: {
    error: {
      departments: string | null;
      data: string | null;
      kpis: string | null;
      trends: string | null;
      summary: string | null;
    };
  };
}) => state.departments.error;

// Specific error selectors for fine-grained error handling
export const selectDepartmentsFetchError = (state: {
  departments: { error: { departments: string | null } };
}) => state.departments.error.departments;

export const selectDepartmentDataError = (state: {
  departments: { error: { data: string | null } };
}) => state.departments.error.data;

export const selectDepartmentKPIsError = (state: {
  departments: { error: { kpis: string | null } };
}) => state.departments.error.kpis;

export const selectDepartmentTrendsError = (state: {
  departments: { error: { trends: string | null } };
}) => state.departments.error.trends;

export const selectDepartmentSummaryError = (state: {
  departments: { error: { summary: string | null } };
}) => state.departments.error.summary;

export const selectSelectedDepartment = (state: {
  departments: { selectedDepartment: string | null };
}) => state.departments.selectedDepartment;
