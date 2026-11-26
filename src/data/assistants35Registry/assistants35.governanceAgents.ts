import type { AssistantDef } from './assistants35.types';
import { operationalUtilityAgents } from './assistants35.operationalAgents';

const governanceCoreAgents: AssistantDef[] = [
  {
    id: 'evangeline',
    name: 'AI Evangeline',
    code: 'AI_EVANGELINE',
    title: 'NOC & Title Transfer Conveyancing Specialist',
    departmentId: 'conveyancing_transactions',
    departmentName: 'Conveyancing & Transaction Management',
    icon: 'Stamp',
    color: '#14B8A6',
    avatar: 'https://ui-avatars.com/api/?name=Evangeline+AI&background=14B8A6&color=fff',
    status: 'optimal',
    description:
      'Coordinates developer No Objection Certificates (NOCs), service charge clearances, and Form F bindings.',
    specialty: 'Conveyancing & NOC Verification',
    capabilities: [
      'Developer NOC Workflow Automation',
      'Service Charge Balance Audit',
      'Form F Digital Signature Tracking',
    ],
    slaResponseTime: '< 15s',
    metrics: { accuracyRate: 99.6, tasksCompletedToday: 82, systemHealth: 'optimal' },
    apiEndpoints: ['/api/conveyancing/noc', '/api/conveyancing/transfer-status'],
    dataFlows: {
      inputs: ['signed_mou_documents', 'developer_statements'],
      outputs: ['noc_applications', 'cleared_transfer_packets'],
    },
  },
  {
    id: 'trustee_bot',
    name: 'AI Trustee Bot',
    code: 'AI_TRUSTEE_BOT',
    title: 'DLD Registration Trustee Appointment Coordinator',
    departmentId: 'conveyancing_transactions',
    departmentName: 'Conveyancing & Transaction Management',
    icon: 'CalendarCheck',
    color: '#0D9488',
    avatar: 'https://ui-avatars.com/api/?name=Trustee+AI&background=0D9488&color=fff',
    status: 'optimal',
    description:
      'Schedules and coordinates closing appointments with approved DLD Registration Trustee offices across Dubai.',
    specialty: 'Trustee Closing Management',
    capabilities: [
      'Trustee Office Availability Scans',
      'Managers Cheque Calculation (4% DLD Fee + AED 4,000 Trustee Fee)',
      'Title Deed Delivery Tracking',
    ],
    slaResponseTime: '< 25s',
    metrics: { accuracyRate: 100.0, tasksCompletedToday: 48, systemHealth: 'optimal' },
    apiEndpoints: ['/api/trustee/book', '/api/trustee/fee-calculator'],
    dataFlows: {
      inputs: ['noc_approval_packets', 'buyer_seller_schedules'],
      outputs: ['trustee_booking_confirmations', 'managers_cheque_breakdowns'],
    },
  },
  {
    id: 'predict',
    name: 'AI Predict',
    code: 'AI_PREDICT',
    title: 'Dubai Property Valuation & Price Forecaster',
    departmentId: 'market_iot_intelligence',
    departmentName: 'Market Intelligence & IoT Data Science',
    icon: 'BarChart3',
    color: '#64748B',
    avatar: 'https://ui-avatars.com/api/?name=Predict+AI&background=64748B&color=fff',
    status: 'optimal',
    description:
      'Applies neural regressors over 10 years of historical DLD transactions to predict 12-month capital appreciation.',
    specialty: 'Automated Valuation Models (AVM)',
    capabilities: [
      'Square Foot Price Projection',
      'Rental Yield Simulation',
      'Macroeconomic FX Correlation',
    ],
    slaResponseTime: '< 8s',
    metrics: { accuracyRate: 98.9, tasksCompletedToday: 420, systemHealth: 'optimal' },
    apiEndpoints: ['/api/predict/valuation', '/api/predict/forecast'],
    dataFlows: {
      inputs: ['property_attributes', 'dld_transaction_timeseries'],
      outputs: ['avm_valuation_estimates', 'confidence_intervals'],
    },
  },
  {
    id: 'heatmap',
    name: 'AI Heatmap',
    code: 'AI_HEATMAP',
    title: 'Community Demand & Transaction Vector Tracker',
    departmentId: 'market_iot_intelligence',
    departmentName: 'Market Intelligence & IoT Data Science',
    icon: 'MapPin',
    color: '#475569',
    avatar: 'https://ui-avatars.com/api/?name=Heatmap+AI&background=475569&color=fff',
    status: 'optimal',
    description:
      'Visualizes real-time investor search clusters and transaction velocities across Downtown, Marina, and DAMAC Hills 2.',
    specialty: 'Geospatial Demand Clustering',
    capabilities: [
      'Search Density Heatmapping',
      'Metro Proximity Premium Indexing',
      'Yield Density Contours',
    ],
    slaResponseTime: '< 12s',
    metrics: { accuracyRate: 99.3, tasksCompletedToday: 680, systemHealth: 'optimal' },
    apiEndpoints: ['/api/heatmap/vectors', '/api/heatmap/community-demand'],
    dataFlows: {
      inputs: ['search_query_logs', 'listing_view_telemetry'],
      outputs: ['geospatial_geojson_layers', 'hotspot_alerts'],
    },
  },
];

export const governanceAgents: AssistantDef[] = [
  ...governanceCoreAgents,
  ...operationalUtilityAgents,
];
