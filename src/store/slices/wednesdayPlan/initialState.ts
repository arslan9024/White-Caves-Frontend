// @ts-nocheck
export const INITIAL_STATE = {
  plan: {
    id: 'wednesday-2026-01-22',
    name: 'WEDNESDAY_BUSINESS_TECHNOLOGY_INTEGRATIONS',
    date: '2026-01-22',
    status: 'scheduled', // scheduled, in_progress, completed
    createdAt: '2026-01-17T14:30:00Z',
    lastUpdated: '2026-01-17T14:30:00Z',
    totalTasks: 26,
  },

  // Zoe's business requirements & decisions
  zoe: {
    requirements: {
      buyerJourney: {
        name: 'Buyer Journey: Search → Offer → Contract',
        status: 'pending', // pending, in_progress, completed, blocked
        completionPercent: 0,
        changeLog: [],
        isApproved: true,
        approvalDate: null,
        notes: '',
      },
      sellerJourney: {
        name: 'Seller Journey: List → Lead → Negotiate → Close',
        status: 'pending',
        completionPercent: 0,
        changeLog: [],
        isApproved: true,
        approvalDate: null,
        notes: '',
      },
      tenantJourney: {
        name: 'Tenant Journey: Apply → Screen → Contract → Sign',
        status: 'pending',
        completionPercent: 0,
        changeLog: [],
        isApproved: true,
        approvalDate: null,
        notes: '',
      },
      leasingAgentWorkflow: {
        name: 'Leasing Agent: Screen → Verify → Approve',
        status: 'pending',
        completionPercent: 0,
        changeLog: [],
        isApproved: true,
        approvalDate: null,
        notes: '',
      },
      salesAgentWorkflow: {
        name: 'Sales Agent: Lead → Deal → Close',
        status: 'pending',
        completionPercent: 0,
        changeLog: [],
        isApproved: true,
        approvalDate: null,
        notes: '',
      },
      adminOversight: {
        name: 'Admin Dashboard: Monitor All Workflows',
        status: 'pending',
        completionPercent: 0,
        changeLog: [],
        isApproved: true,
        approvalDate: null,
        notes: '',
      },
    },
    metrics: {
      leadConversion: { target: 0.15, actual: null, status: 'not_tested', unit: 'ratio' },
      workflowCompletion: { target: 1.0, actual: null, status: 'not_tested', unit: 'percent' },
      errorRate: { target: 0.001, actual: null, status: 'not_tested', unit: 'percent' },
      apiResponseTime: { target: 500, actual: null, status: 'not_tested', unit: 'ms' },
      concurrentUsers: { target: 100, actual: null, status: 'not_tested', unit: 'users' },
      contractExecutionRate: { target: 0.98, actual: null, status: 'not_tested', unit: 'percent' },
      compliancePassRate: { target: 1.0, actual: null, status: 'not_tested', unit: 'percent' },
    },
    approvedChanges: [],
    decisionLog: [],
    readOnly: false,
  },

  // Aurora's technical metrics & findings
  aurora: {
    monitoring: {
      vercel: {
        status: 'checking',
        deploymentStatus: null,
        buildTime: null,
        errorRate: null,
        uptime: null,
        lastCheck: null,
        history: [],
      },
      mongodb: {
        status: 'checking',
        queryPerformance: null,
        connections: null,
        storage: null,
        indexHealth: null,
        lastCheck: null,
        history: [],
      },
      apiEndpoints: [
        {
          endpoint: '/api/sourcing/opportunities',
          status: 'pending',
          responseTime: null,
          errorRate: null,
        },
        {
          endpoint: '/api/sourcing/analyze-conversation',
          status: 'pending',
          responseTime: null,
          errorRate: null,
        },
        {
          endpoint: '/api/sourcing/opportunities/:id/verify',
          status: 'pending',
          responseTime: null,
          errorRate: null,
        },
        {
          endpoint: '/api/sourcing/opportunities/:id/add-to-inventory',
          status: 'pending',
          responseTime: null,
          errorRate: null,
        },
        {
          endpoint: '/api/sourcing/statistics',
          status: 'pending',
          responseTime: null,
          errorRate: null,
        },
        { endpoint: '/api/owners', status: 'pending', responseTime: null, errorRate: null },
        { endpoint: '/api/owners/:id', status: 'pending', responseTime: null, errorRate: null },
        {
          endpoint: '/api/properties/search',
          status: 'pending',
          responseTime: null,
          errorRate: null,
        },
        { endpoint: '/api/leads', status: 'pending', responseTime: null, errorRate: null },
        { endpoint: '/api/leads/:id', status: 'pending', responseTime: null, errorRate: null },
      ],
      services: [
        {
          service: 'PropertySourcingServices',
          status: 'pending',
          health: null,
          responseTime: null,
        },
        { service: 'LeadScoringEngine', status: 'pending', health: null, responseTime: null },
        { service: 'AgentAssignmentService', status: 'pending', health: null, responseTime: null },
        {
          service: 'ComplianceValidationService',
          status: 'pending',
          health: null,
          responseTime: null,
        },
        { service: 'ChatbotService', status: 'pending', health: null, responseTime: null },
        { service: 'DynamicPricingEngine', status: 'pending', health: null, responseTime: null },
        { service: 'ConversationAnalyzer', status: 'pending', health: null, responseTime: null },
        { service: 'WhatsAppWebIntegration', status: 'pending', health: null, responseTime: null },
        { service: 'PropertyQueryService', status: 'pending', health: null, responseTime: null },
        {
          service: 'ServiceRecommendationEngine',
          status: 'pending',
          health: null,
          responseTime: null,
        },
        {
          service: 'PropertyStatusEventService',
          status: 'pending',
          health: null,
          responseTime: null,
        },
      ],
    },
    findings: {
      criticalIssues: [],
      blockers: [],
      performanceAlerts: [],
      dataIntegrityIssues: [],
      securityConcerns: [],
    },
    systemHealth: {
      overall: 'initializing',
      components: {},
    },
  },

  // Shared escalations & alerts
  escalations: {
    active: [],
    history: [],
    resolutionLog: [],
  },

  // Session timeline tracking
  timeline: {
    morningSession: {
      startTime: null,
      endTime: null,
      completedTasks: [],
      progress: 0,
      status: 'pending',
    },
    afternoonSession: {
      startTime: null,
      endTime: null,
      completedTasks: [],
      progress: 0,
      status: 'pending',
    },
    eveningDebrief: {
      startTime: null,
      endTime: null,
      completedTasks: [],
      summary: null,
      status: 'pending',
    },
  },

  // Knowledge bases
  knowledgeBase: {
    plan: {
      content: null,
      sections: [
        { id: 'company-structure', title: 'Company Structure & Business Model', accessible: true },
        { id: 'user-roles', title: 'Six Core User Roles', accessible: true },
        { id: 'business-services', title: 'Business Services & Processes', accessible: true },
        { id: 'user-workflows', title: 'User Personas & Business Workflows', accessible: true },
        { id: 'technology-architecture', title: 'Technology Architecture', accessible: true },
        { id: 'features', title: 'Complete Feature List', accessible: true },
        {
          id: 'integration-objectives',
          title: 'Wednesday Integration Objectives',
          accessible: true,
        },
        { id: 'success-metrics', title: 'Success Metrics & KPIs', accessible: true },
        { id: 'timeline', title: 'Wednesday Execution Timeline', accessible: true },
        { id: 'deliverables', title: 'Deliverables for Wednesday', accessible: true },
      ],
      searchIndex: {},
      lastLoaded: null,
    },
  },

  // UI state
  ui: {
    activeTab: 'overview',
    selectedWorkflow: null,
    showMetricsPanel: true,
    showEscalations: true,
    notificationCount: 0,
    criticalAlertCount: 0,
  },

  // Loading and error states
  loading: {
    plan: false,
    metrics: false,
    findings: false,
  },
  error: {
    plan: null,
    metrics: null,
    findings: null,
  },
};

