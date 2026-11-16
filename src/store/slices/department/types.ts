import type {
  DepartmentData,
  KPI,
  DateRange,
  Trend,
  DepartmentSummary,
} from "../../../services/departmentService";
export interface DepartmentState {
  // List of available departments
  departments: Array<{ code: string; name: string }>;

  // Department data by code (includes KPIs, trends, summary)
  departmentData: Record<string, DepartmentData>;

  // KPIs by department code
  kpis: Record<string, KPI[]>;

  // Trends by department code
  trends: Record<string, Trend[]>;

  // Summaries by department code
  summaries: Record<string, DepartmentSummary>;

  // Loading states for different operations
  loading: {
    departments: boolean;
    data: boolean;
    kpis: boolean;
    trends: boolean;
    summary: boolean;
  };

  // Error states
  error: {
    departments: string | null;
    data: string | null;
    kpis: string | null;
    trends: string | null;
    summary: string | null;
  };

  // Last updated timestamps
  lastUpdated: {
    departments: number | null;
    data: Record<string, number>;
    kpis: Record<string, number>;
    trends: Record<string, number>;
  };

  // Currently selected department
  selectedDepartment: string | null;
}

/**
 * Initial State
 */
const initialState: DepartmentState = {
  departments: [],
  departmentData: {},
  kpis: {},
  trends: {},
  summaries: {},
  loading: {
    departments: false,
    data: false,
    kpis: false,
    trends: false,
    summary: false,
  },
  error: {
    departments: null,
    data: null,
    kpis: null,
    trends: null,
    summary: null,
  },
  lastUpdated: {
    departments: null,
    data: {},
    kpis: {},
    trends: {},
  },
  selectedDepartment: null,
};

/**
 * Initial state export
 */
export { initialState };

