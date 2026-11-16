// @ts-nocheck
export const assistantDocsBatch2 = {
  hazel: {
    overview: 'Elite Frontend Engineer maintaining the design system and UI component library',
    phase: 'Production',
    version: '1.3',
    features: [
      { name: 'Component Library', status: 'active', description: 'Reusable UI component catalog' },
      { name: 'Design System', status: 'active', description: 'Tokens, typography, spacing standards' },
      { name: 'Theme Manager', status: 'active', description: 'Light/dark theme configuration' },
      { name: 'Accessibility Audit', status: 'active', description: 'WCAG compliance checking' },
      { name: 'Responsive Testing', status: 'active', description: 'Multi-device preview tools' },
      { name: 'Icon Library', status: 'active', description: 'Lucide icon management' }
    ],
    roadmap: [
      { feature: 'Storybook Integration', quarter: 'Q2 2025' },
      { feature: 'Figma Sync', quarter: 'Q3 2025' }
    ],
    integrations: ['Aurora (Tech Lead)', 'Figma'],
    dataFlows: { inputs: ['Aurora'], outputs: ['Aurora'] }
  },
  willow: {
    overview: 'Elite Backend Engineer managing APIs, database optimization, and system reliability',
    phase: 'Production',
    version: '1.4',
    features: [
      { name: 'API Dashboard', status: 'active', description: 'API health and usage monitoring' },
      { name: 'Database Monitor', status: 'active', description: 'Query performance and optimization' },
      { name: 'Performance Metrics', status: 'active', description: 'Response times and throughput' },
      { name: 'Security Center', status: 'active', description: 'Security scanning and alerts' },
      { name: 'Cache Management', status: 'active', description: 'Redis cache configuration' },
      { name: 'Data Pipeline', status: 'active', description: 'ETL job monitoring' }
    ],
    roadmap: [
      { feature: 'GraphQL Playground', quarter: 'Q2 2025' },
      { feature: 'Auto-Scaling Config', quarter: 'Q3 2025' }
    ],
    integrations: ['Aurora (Tech Lead)', 'MongoDB', 'Redis'],
    dataFlows: { inputs: ['Aurora'], outputs: ['Aurora'] }
  },
  evangeline: {
    overview: 'Legal Risk Analyst monitoring contracts, regulations, and transaction compliance',
    phase: 'Production',
    version: '1.2',
    features: [
      { name: 'Legal Risk Analysis', status: 'active', description: 'Proactive legal issue identification' },
      { name: 'Contract Monitoring', status: 'active', description: 'Track contract status and renewals' },
      { name: 'Regulatory Tracker', status: 'active', description: 'RERA/DLD regulation updates' },
      { name: 'Dispute Prevention', status: 'active', description: 'Early warning system for conflicts' },
      { name: 'Best Practices Library', status: 'active', description: 'Legal templates and guidelines' },
      { name: 'Clause Analysis', status: 'active', description: 'AI-powered contract clause review' }
    ],
    roadmap: [
      { feature: 'AI Contract Drafting', quarter: 'Q2 2025' },
      { feature: 'Court Case Tracking', quarter: 'Q3 2025' }
    ],
    integrations: ['Laila (Compliance)', 'Theodora (Finance)', 'Clara (Leads)'],
    dataFlows: { inputs: ['Laila', 'Theodora', 'Clara'], outputs: ['Zoe', 'Laila'] }
  },
  sentinel: {
    overview: 'Property Monitoring AI with IoT integration, predictive maintenance, and emergency response',
    phase: 'Production',
    version: '1.1',
    features: [
      { name: 'Property Monitoring', status: 'active', description: 'IoT sensor data dashboard' },
      { name: 'Predictive Maintenance', status: 'active', description: 'AI-predicted maintenance needs' },
      { name: 'Inspection Scheduler', status: 'active', description: 'Automated inspection scheduling' },
      { name: 'Vendor Management', status: 'active', description: 'Contractor database and dispatch' },
      { name: 'Emergency Response', status: 'active', description: '24/7 emergency coordination' },
      { name: 'Work Order System', status: 'active', description: 'Maintenance work order tracking' }
    ],
    roadmap: [
      { feature: 'Smart Home Integration', quarter: 'Q2 2025' },
      { feature: 'Drone Inspection', quarter: 'Q4 2025' }
    ],
    integrations: ['Mary (Inventory)', 'Daisy (Leasing)', 'Juno (Facilities)'],
    dataFlows: { inputs: ['Mary'], outputs: ['Mary', 'Daisy'] }
  },
  hunter: {
    overview: 'Lead Prospecting AI scanning markets for potential buyers and sellers',
    phase: 'Production',
    version: '1.0',
    features: [
      { name: 'Prospect Analysis', status: 'active', description: 'Identify high-potential prospects' },
      { name: 'Market Scanning', status: 'active', description: 'Monitor listing portals for opportunities' },
      { name: 'Pattern Detection', status: 'active', description: 'Buying/selling pattern recognition' },
      { name: 'Outreach Campaigns', status: 'active', description: 'Automated prospect outreach' },
      { name: 'Lead Enrichment', status: 'active', description: 'Enhance lead data with external sources' },
      { name: 'Cold Lead Warming', status: 'active', description: 'Re-engage dormant prospects' }
    ],
    roadmap: [
      { feature: 'Social Media Prospecting', quarter: 'Q2 2025' },
      { feature: 'AI Intent Scoring', quarter: 'Q3 2025' }
    ],
    integrations: ['Clara (Leads)', 'Mary (Inventory)', 'Olivia (Marketing)'],
    dataFlows: { inputs: ['Mary', 'Olivia'], outputs: ['Clara'] }
  },
  henry: {
    overview: 'Record Keeper & Timeline Master creating immutable audit trails and compliance reports',
    phase: 'Production',
    version: '1.0',
    features: [
      { name: 'Event Timeline', status: 'active', description: 'Chronological activity visualization' },
      { name: 'Audit Log', status: 'active', description: 'Immutable action records' },
      { name: 'Timeline Analytics', status: 'active', description: 'Pattern analysis across events' },
      { name: 'Compliance Reports', status: 'active', description: 'Automated compliance documentation' },
      { name: 'Search & Query', status: 'active', description: 'Powerful event search engine' },
      { name: 'SLA Monitoring', status: 'active', description: 'Service level agreement tracking' }
    ],
    roadmap: [
      { feature: 'Blockchain Anchoring', quarter: 'Q3 2025' },
      { feature: 'AI Anomaly Detection', quarter: 'Q4 2025' }
    ],
    integrations: ['All Assistants', 'Zoe (Executive)', 'Laila (Compliance)'],
    dataFlows: { inputs: ['All'], outputs: ['Zoe', 'Laila', 'Aurora'] }
  },
  cipher: {
    overview: 'Predictive Market Analyst using DLD data and economic indicators for property valuation',
    phase: 'Production',
    version: '1.0',
    features: [
      { name: 'Market Trends', status: 'active', description: 'Real-time market trend analysis' },
      { name: 'Price Predictions', status: 'active', description: 'AI-powered valuation forecasts' },
      { name: 'Competitor Tracking', status: 'active', description: 'Monitor competitor activity' },
      { name: 'Economic Indicators', status: 'active', description: 'Track macro-economic factors' },
      { name: 'Investment Scoring', status: 'active', description: 'Property investment ratings' },
      { name: 'Demand Forecasting', status: 'active', description: 'Predict area demand trends' }
    ],
    roadmap: [
      { feature: 'DLD API Integration', quarter: 'Q2 2025' },
      { feature: 'AI Market Reports', quarter: 'Q3 2025' }
    ],
    integrations: ['Mary (Inventory)', 'Henry (Audit)', 'Maven (Investment)', 'Olivia (Marketing)'],
    dataFlows: { inputs: ['Mary', 'Henry'], outputs: ['Zoe', 'Olivia', 'Maven'] }
  },
  atlas: {
    overview: 'Development & Project Intelligence for off-plan projects, zoning, and developer tracking',
    phase: 'Production',
    version: '1.0',
    features: [
      { name: 'Project Pipeline', status: 'active', description: 'Track upcoming developments' },
      { name: 'Feasibility Analysis', status: 'active', description: 'ROI and viability assessments' },
      { name: 'Developer Tracking', status: 'active', description: 'Developer reputation database' },
      { name: 'Zoning Analysis', status: 'active', description: 'Land use and zoning maps' },
      { name: 'Market Gap Detection', status: 'active', description: 'Identify underserved markets' },
      { name: 'ROI Projections', status: 'active', description: 'Investment return modeling' }
    ],
    roadmap: [
      { feature: 'Dubai Municipality Integration', quarter: 'Q2 2025' },
      { feature: '3D Development Viewer', quarter: 'Q4 2025' }
    ],
    integrations: ['Mary (Inventory)', 'Clara (Leads)', 'Cipher (Market)'],
    dataFlows: { inputs: ['Cipher', 'Mary'], outputs: ['Mary', 'Clara', 'Cipher'] }
  },
  vesta: {
    overview: 'Project & Snagging Coordinator tracking construction milestones and handover processes',
    phase: 'Production',
    version: '1.0',
    features: [
      { name: 'Milestone Tracker', status: 'active', description: 'Construction progress monitoring' },
      { name: 'Snagging Manager', status: 'active', description: 'Digital defect reporting' },
      { name: 'Handover Coordination', status: 'active', description: 'Unit handover workflows' },
      { name: 'Defect Reporting', status: 'active', description: 'Photo-based defect logging' },
      { name: 'Developer Communication', status: 'active', description: 'Automated developer updates' },
      { name: 'Image Recognition', status: 'active', description: 'AI defect detection from photos' }
    ],
    roadmap: [
      { feature: 'AR Snagging Tool', quarter: 'Q3 2025' },
      { feature: 'Warranty Tracking', quarter: 'Q4 2025' }
    ],
    integrations: ['Mary (Inventory)', 'Linda (WhatsApp)', 'Atlas (Projects)'],
    dataFlows: { inputs: ['Atlas', 'Mary'], outputs: ['Mary', 'Linda'] }
  },
  juno: {
    overview: 'Smart Community & Facilities Manager with IoT integration and energy optimization',
    phase: 'Production',
    version: '1.0',
    features: [
      { name: 'Facilities Manager', status: 'active', description: 'Community amenity management' },
      { name: 'IoT Dashboard', status: 'active', description: 'Smart building sensor data' },
      { name: 'Community Events', status: 'active', description: 'Event scheduling and promotion' },
      { name: 'Energy Optimization', status: 'active', description: 'Utility usage optimization' },
      { name: 'Access Control', status: 'active', description: 'Gate and door access management' },
      { name: 'Service Automation', status: 'active', description: 'Automated service requests' }
    ],
    roadmap: [
      { feature: 'Resident Mobile App', quarter: 'Q2 2025' },
      { feature: 'Solar Panel Integration', quarter: 'Q4 2025' }
    ],
    integrations: ['Sentinel (Monitoring)', 'Mary (Inventory)', 'Nina (Bots)'],
    dataFlows: { inputs: ['Sentinel', 'Mary'], outputs: ['Nina', 'Sentinel'] }
  },
  kairos: {
    overview: 'Luxury Concierge & VIP Experience curator for high-net-worth clients',
    phase: 'Production',
    version: '1.0',
    features: [
      { name: 'VIP Client Manager', status: 'active', description: 'Premium client database' },
      { name: 'Concierge Services', status: 'active', description: 'Personalized service coordination' },
      { name: 'Lifestyle Coordination', status: 'active', description: 'Interior design, relocation services' },
      { name: 'Partner Network', status: 'active', description: 'Premium service provider directory' },
      { name: 'Exclusive Access', status: 'active', description: 'Early access to premium listings' },
      { name: 'White-Glove Service', status: 'active', description: 'End-to-end transaction support' }
    ],
    roadmap: [
      { feature: 'Private Jet Booking', quarter: 'Q2 2025' },
      { feature: 'Art Collection Advisory', quarter: 'Q4 2025' }
    ],
    integrations: ['Clara (Leads)', 'Linda (WhatsApp)', 'Sophia (Sales)'],
    dataFlows: { inputs: ['Clara', 'Sophia'], outputs: ['Clara', 'Linda'] }
  },
  maven: {
    overview: 'Investment Strategy & Portfolio Optimizer analyzing yields and providing investment advice',
    phase: 'Production',
    version: '1.0',
    features: [
      { name: 'Portfolio Analysis', status: 'active', description: 'Multi-property portfolio tracking' },
      { name: 'Yield Optimization', status: 'active', description: 'Rental yield maximization' },
      { name: 'Tax Planning', status: 'active', description: 'Tax-efficient investment strategies' },
      { name: 'Investment Advice', status: 'active', description: 'Buy/hold/sell recommendations' },
      { name: 'Risk Assessment', status: 'active', description: 'Investment risk scoring' },
      { name: 'Performance Tracking', status: 'active', description: 'ROI and appreciation tracking' }
    ],
    roadmap: [
      { feature: 'Golden Visa Calculator', quarter: 'Q2 2025' },
      { feature: 'International Market Comparison', quarter: 'Q4 2025' }
    ],
    integrations: ['Cipher (Market)', 'Theodora (Finance)', 'Mary (Inventory)', 'Zoe (Executive)'],
    dataFlows: { inputs: ['Cipher', 'Theodora', 'Mary'], outputs: ['Zoe', 'Clara'] }
  }
};

