import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export interface Lead {
  id: string;
  name: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
}

interface LeadsState {
  activeLeadId: string | null;
  list: Lead[];
  leads: any[];
  metrics: Record<string, any>;
  loading: boolean;
  metricsLoading: boolean;
  error: string | null;
}

const initialState: LeadsState = {
  activeLeadId: 'L-100',
  list: [
    { id: 'L-100', name: 'James Carter', score: 88, status: 'new' },
    { id: 'L-101', name: 'Sarah Ahmed', score: 92, status: 'contacted' },
  ],
  leads: [],
  metrics: {
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    negotiating: 0,
    converted: 0,
    lost: 0,
    conversionRate: 0,
  },
  loading: false,
  metricsLoading: false,
  error: null,
};

export const loadLeads = createAsyncThunk('leads/loadLeads', async () => {
  return [];
});

export const loadLeadMetrics = createAsyncThunk('leads/loadMetrics', async () => {
  return {};
});

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setActiveLead: (state, action: PayloadAction<string>) => {
      state.activeLeadId = action.payload;
    },
    updateLeadScore: (state, action: PayloadAction<{ id: string; score: number }>) => {
      const lead = state.list.find(l => l.id === action.payload.id);
      if (lead) lead.score = action.payload.score;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
      })
      .addCase(loadLeadMetrics.fulfilled, (state, action) => {
        state.metrics = { ...state.metrics, ...action.payload };
      });
  },
});

export const selectAllLeads = (state: any) =>
  state?.leads?.leads?.length > 0 ? state.leads.leads : state?.crmData?.leads?.items || [];

export const selectLeadMetrics = (state: any) =>
  state?.leads?.metrics || { total: 0, new: 0, qualified: 0 };

export const { setActiveLead, updateLeadScore } = leadsSlice.actions;
export default leadsSlice.reducer;

