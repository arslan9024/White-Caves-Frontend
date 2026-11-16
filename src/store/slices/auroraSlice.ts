// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./aurora/initialState";
import {
  fetchProviders,
  fetchAnalysis,
  fetchAnalysisSummary,
  scanComponents,
  fetchComponentCompletion,
  generateSRS,
  fetchSRSDocuments,
  fetchSRSDocument,
  fetchLatestSRS,
  generateAudit,
  fetchActionCatalog,
} from "./aurora/thunks";

// ── Re-exports ──
export * from "./aurora/thunks";
export * from "./aurora/selectors";

const auroraSlice = createSlice({
  name: 'aurora',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.ui.activeTab = action.payload;
    },
    setSelectedComponent: (state, action) => {
      state.ui.selectedComponent = action.payload;
    },
    setSelectedDocument: (state, action) => {
      state.ui.selectedDocument = action.payload;
    },
    setSRSConfig: (state, action) => {
      state.ui.srsConfig = { ...state.ui.srsConfig, ...action.payload };
    },
    setGenerationProgress: (state, action) => {
      state.srs.generationProgress = action.payload;
    },
    clearError: (state, action) => {
      const section = action.payload;
      if (state[section]) {
        state[section].error = null;
      }
    },
    resetAudit: (state) => {
      state.audit = initialState.audit;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.providers.loading = true;
        state.providers.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.providers.loading = false;
        state.providers.list = action.payload.providers;
        state.providers.available = action.payload.available;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.providers.loading = false;
        state.providers.error = action.payload;
      })
      
      .addCase(fetchAnalysis.pending, (state) => {
        state.analysis.loading = true;
        state.analysis.error = null;
      })
      .addCase(fetchAnalysis.fulfilled, (state, action) => {
        state.analysis.loading = false;
        state.analysis.data = action.payload;
        state.analysis.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchAnalysis.rejected, (state, action) => {
        state.analysis.loading = false;
        state.analysis.error = action.payload;
      })
      
      .addCase(fetchAnalysisSummary.pending, (state) => {
        state.analysis.loading = true;
      })
      .addCase(fetchAnalysisSummary.fulfilled, (state, action) => {
        state.analysis.loading = false;
        state.analysis.summary = action.payload;
      })
      .addCase(fetchAnalysisSummary.rejected, (state, action) => {
        state.analysis.loading = false;
        state.analysis.error = action.payload;
      })
      
      .addCase(scanComponents.pending, (state) => {
        state.components.loading = true;
        state.components.error = null;
      })
      .addCase(scanComponents.fulfilled, (state, action) => {
        state.components.loading = false;
        state.components.analysisRunId = action.payload.analysisRunId;
        state.components.summary = action.payload.summary;
      })
      .addCase(scanComponents.rejected, (state, action) => {
        state.components.loading = false;
        state.components.error = action.payload;
      })
      
      .addCase(fetchComponentCompletion.pending, (state) => {
        state.components.loading = true;
      })
      .addCase(fetchComponentCompletion.fulfilled, (state, action) => {
        state.components.loading = false;
        state.components.list = action.payload.components || [];
        state.components.summary = action.payload.summary || {};
        state.components.analysisRunId = action.payload.analysisRunId;
      })
      .addCase(fetchComponentCompletion.rejected, (state, action) => {
        state.components.loading = false;
        state.components.error = action.payload;
      })
      
      .addCase(generateSRS.pending, (state) => {
        state.srs.generating = true;
        state.srs.error = null;
        state.srs.generationProgress = 10;
      })
      .addCase(generateSRS.fulfilled, (state, action) => {
        state.srs.generating = false;
        state.srs.generationProgress = 100;
        state.srs.currentDocument = {
          ...action.payload.document,
          content: action.payload.content
        };
        state.srs.latestDocument = action.payload.document;
        state.srs.documents = [action.payload.document, ...state.srs.documents];
      })
      .addCase(generateSRS.rejected, (state, action) => {
        state.srs.generating = false;
        state.srs.generationProgress = 0;
        state.srs.error = action.payload;
      })
      
      .addCase(fetchSRSDocuments.pending, (state) => {
        state.srs.loading = true;
      })
      .addCase(fetchSRSDocuments.fulfilled, (state, action) => {
        state.srs.loading = false;
        state.srs.documents = action.payload;
      })
      .addCase(fetchSRSDocuments.rejected, (state, action) => {
        state.srs.loading = false;
        state.srs.error = action.payload;
      })
      
      .addCase(fetchSRSDocument.pending, (state) => {
        state.srs.loading = true;
      })
      .addCase(fetchSRSDocument.fulfilled, (state, action) => {
        state.srs.loading = false;
        state.srs.currentDocument = action.payload;
      })
      .addCase(fetchSRSDocument.rejected, (state, action) => {
        state.srs.loading = false;
        state.srs.error = action.payload;
      })
      
      .addCase(fetchLatestSRS.fulfilled, (state, action) => {
        state.srs.latestDocument = action.payload;
      })
      
      .addCase(generateAudit.pending, (state) => {
        state.audit.generating = true;
        state.audit.error = null;
      })
      .addCase(generateAudit.fulfilled, (state, action) => {
        state.audit.generating = false;
        state.audit.report = action.payload.report;
        state.audit.analysisData = action.payload.analysisData;
        state.audit.provider = action.payload.provider;
      })
      .addCase(generateAudit.rejected, (state, action) => {
        state.audit.generating = false;
        state.audit.error = action.payload;
      })
      
      .addCase(fetchActionCatalog.pending, (state) => {
        state.actions.loading = true;
      })
      .addCase(fetchActionCatalog.fulfilled, (state, action) => {
        state.actions.loading = false;
        state.actions.catalog = action.payload.catalog;
        state.actions.summary = action.payload.summary;
      })
      .addCase(fetchActionCatalog.rejected, (state, action) => {
        state.actions.loading = false;
        state.actions.error = action.payload;
      });
  }
});

export const {
  setActiveTab,
  setSelectedComponent,
  setSelectedDocument,
  setSRSConfig,
  setGenerationProgress,
  clearError,
  resetAudit
} = auroraSlice.actions;


export default auroraSlice.reducer;

