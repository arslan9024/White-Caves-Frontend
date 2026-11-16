// @ts-nocheck
const initialState = {
  profiles: {
    data: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 50, total: 0 }
  },
  verificationQueue: {
    data: [],
    loading: false,
    error: null
  },
  alerts: {
    data: [],
    loading: false,
    error: null,
    unreadCount: 0
  },
  pepScreening: {
    results: [],
    loading: false,
    error: null
  },
  sanctionsCheck: {
    results: [],
    loading: false,
    error: null
  },
  stats: {
    data: null,
    loading: false,
    error: null
  },
  notifications: [],
  activeProfile: null,
  selectedAlert: null,
  filters: {
    status: 'all',
    riskLevel: 'all',
    dateRange: null,
    search: ''
  },
  ui: {
    sidePanel: null,
    activeTab: 'queue',
    showNotifications: false
  }
};


export { initialState };

