// @ts-nocheck
const initialState = {
  providers: {
    list: [],
    available: [],
    loading: false,
    error: null
  },
  
  analysis: {
    data: null,
    summary: null,
    loading: false,
    error: null,
    lastUpdated: null
  },
  
  components: {
    list: [],
    summary: {},
    analysisRunId: null,
    loading: false,
    error: null
  },
  
  srs: {
    documents: [],
    currentDocument: null,
    latestDocument: null,
    generating: false,
    loading: false,
    error: null,
    generationProgress: 0
  },
  
  audit: {
    report: null,
    analysisData: null,
    provider: null,
    generating: false,
    error: null
  },
  
  actions: {
    catalog: [],
    summary: {},
    loading: false,
    error: null
  },
  
  ui: {
    activeTab: 'overview',
    selectedComponent: null,
    selectedDocument: null,
    srsConfig: {
      detailLevel: 'standard',
      format: 'markdown',
      includeDiagrams: true,
      includeCompliance: true,
      includeArabic: false,
      preferredProvider: null
    }
  }
};

export { initialState };

