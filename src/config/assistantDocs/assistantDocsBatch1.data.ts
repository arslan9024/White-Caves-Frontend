// @ts-nocheck
export const assistantDocsBatch1 = {
  zoe: {
    overview: 'Executive Assistant & Strategic Intelligence hub receiving AI-powered suggestions from all departments',
    phase: 'Production',
    version: '2.0',
    features: [
      { name: 'Executive Suggestion Inbox', status: 'active', description: 'Receives prioritized suggestions from all 24 assistants with confidence scoring' },
      { name: 'Priority Filtering', status: 'active', description: 'Filter by priority (critical/high/medium/low) and department' },
      { name: 'Status Management', status: 'active', description: 'Acknowledge, escalate, or archive suggestions' },
      { name: 'Cross-Department Analytics', status: 'active', description: 'KPI dashboards pulling data from all departments' },
      { name: 'Executive Calendar', status: 'active', description: 'Meeting management and scheduling' },
      { name: 'Task Management', status: 'active', description: 'Priority-based task tracking for leadership' },
      { name: 'Confidential Vault Access', status: 'active', description: 'Dual-approval access to sensitive documents' }
    ],
    roadmap: [
      { feature: 'Voice Command Integration', quarter: 'Q2 2025' },
      { feature: 'Mobile Executive App', quarter: 'Q2 2025' },
      { feature: 'AI Meeting Summarization', quarter: 'Q3 2025' }
    ],
    integrations: ['All Assistants', 'Google Calendar', 'Microsoft Teams'],
    dataFlows: { inputs: ['All Assistants'], outputs: ['Executive Reports'] }
  },
  linda: {
    overview: 'WhatsApp CRM Manager handling 23+ agent WhatsApp numbers with AI-powered lead qualification',
    phase: 'Production',
    version: '1.5',
    features: [
      { name: 'Multi-Agent Management', status: 'active', description: 'Manage 23+ WhatsApp Business accounts' },
      { name: 'Conversation Routing', status: 'active', description: 'Intelligent routing based on language, inquiry type, and agent availability' },
      { name: 'Template Messaging', status: 'active', description: 'Approved message templates for quick responses' },
      { name: 'Lead Pre-Qualification', status: 'active', description: 'AI-powered lead scoring from conversations' },
      { name: 'Quick Replies', status: 'active', description: 'Predefined responses for common inquiries' },
      { name: 'Broadcast Manager', status: 'active', description: 'Bulk messaging for campaigns and announcements' },
      { name: 'Agent Status Monitoring', status: 'active', description: 'Real-time agent availability tracking' }
    ],
    roadmap: [
      { feature: 'WhatsApp Business API Integration', quarter: 'Q1 2025' },
      { feature: 'AI Sentiment Analysis', quarter: 'Q2 2025' },
      { feature: 'Multi-Language Auto-Translation', quarter: 'Q2 2025' }
    ],
    integrations: ['WhatsApp Business', 'Clara (Leads)', 'Mary (Inventory)'],
    dataFlows: { inputs: ['Nina'], outputs: ['Clara', 'Mary'] }
  },
  nina: {
    overview: 'WhatsApp Bot Developer creating and managing conversation automation flows',
    phase: 'Production',
    version: '1.3',
    features: [
      { name: 'Bot Builder', status: 'active', description: 'Visual drag-and-drop bot creation interface' },
      { name: 'Flow Designer', status: 'active', description: 'Multi-step conversation flow management' },
      { name: 'Session Monitoring', status: 'active', description: 'Real-time bot session tracking' },
      { name: 'Bot Analytics', status: 'active', description: 'Performance metrics and engagement stats' },
      { name: 'Intent Classification', status: 'active', description: 'AI-powered message intent detection' },
      { name: 'Fallback Handling', status: 'active', description: 'Graceful escalation to human agents' }
    ],
    roadmap: [
      { feature: 'GPT-4 Integration', quarter: 'Q1 2025' },
      { feature: 'Multi-Channel Bots (Telegram, Messenger)', quarter: 'Q3 2025' }
    ],
    integrations: ['WhatsApp API', 'Linda (CRM)', 'OpenAI'],
    dataFlows: { inputs: [], outputs: ['Linda'] }
  },
  mary: {
    overview: 'Inventory CRM Manager for DAMAC Hills 2 with 9,378+ property units and data acquisition tools',
    phase: 'Production',
    version: '2.1',
    features: [
      { name: 'Property Database', status: 'active', description: 'Complete inventory of 9,378+ units across clusters' },
      { name: 'Cluster Browser', status: 'active', description: 'Navigate properties by cluster and unit type' },
      { name: 'DAMAC Asset Fetcher', status: 'active', description: 'Generate S3 URLs for property assets' },
      { name: 'Image Data Extractor', status: 'active', description: 'OCR-based data extraction from images' },
      { name: 'Web Data Harvester', status: 'active', description: 'Scrape property data from listing portals' },
      { name: 'Excel Import/Export', status: 'active', description: 'Bulk data management via spreadsheets' },
      { name: 'Filter & Search', status: 'active', description: 'Advanced filtering by status, price, size' }
    ],
    roadmap: [
      { feature: 'AI Property Valuation', quarter: 'Q2 2025' },
      { feature: 'Virtual Tour Integration', quarter: 'Q2 2025' },
      { feature: '3D Floor Plan Viewer', quarter: 'Q3 2025' }
    ],
    integrations: ['Clara (Leads)', 'Linda (WhatsApp)', 'Olivia (Marketing)'],
    dataFlows: { inputs: ['Clara', 'Sentinel'], outputs: ['Clara', 'Linda', 'Olivia'] }
  },
  nancy: {
    overview: 'HR Manager handling employee lifecycle, recruitment, and performance management',
    phase: 'Production',
    version: '1.4',
    features: [
      { name: 'Employee Directory', status: 'active', description: 'Complete staff database with profiles' },
      { name: 'Recruitment Pipeline', status: 'active', description: 'Candidate tracking from application to hire' },
      { name: 'Resume Screening', status: 'active', description: 'AI-powered resume analysis and scoring' },
      { name: 'Attendance Tracker', status: 'active', description: 'Time and attendance management' },
      { name: 'Performance Reviews', status: 'active', description: 'Periodic evaluation management' },
      { name: 'Onboarding Workflows', status: 'active', description: 'Automated new hire onboarding' },
      { name: 'Leave Management', status: 'active', description: 'Leave requests and approvals' }
    ],
    roadmap: [
      { feature: 'AI Interview Scheduler', quarter: 'Q2 2025' },
      { feature: 'Employee Wellness Tracking', quarter: 'Q3 2025' }
    ],
    integrations: ['Zoe (Executive)', 'Payroll Systems'],
    dataFlows: { inputs: [], outputs: ['Zoe'] }
  },
  daisy: {
    overview: 'Leasing & Tenant Manager for rental properties, Ejari registration, and tenant lifecycle',
    phase: 'Production',
    version: '1.6',
    features: [
      { name: 'Lease Management', status: 'active', description: 'Create and track lease agreements' },
      { name: 'Tenant Directory', status: 'active', description: 'Complete tenant database with contracts' },
      { name: 'Ejari Integration', status: 'active', description: 'Digital Ejari registration workflow' },
      { name: 'Maintenance Requests', status: 'active', description: 'Tenant maintenance ticket system' },
      { name: 'Rent Collection', status: 'active', description: 'Payment tracking and reminders' },
      { name: 'Rental Analytics', status: 'active', description: 'Occupancy rates and yield analysis' },
      { name: 'Renewal Management', status: 'active', description: 'Automated lease renewal workflows' }
    ],
    roadmap: [
      { feature: 'Smart Lock Integration', quarter: 'Q2 2025' },
      { feature: 'Tenant Portal App', quarter: 'Q3 2025' }
    ],
    integrations: ['Mary (Inventory)', 'Theodora (Finance)', 'Sentinel (Maintenance)'],
    dataFlows: { inputs: ['Mary', 'Sentinel'], outputs: ['Mary', 'Theodora'] }
  },
  clara: {
    overview: 'Leads CRM Manager with pipeline management, lead scoring, and conversion tracking',
    phase: 'Production',
    version: '2.0',
    features: [
      { name: 'Lead Pipeline', status: 'active', description: 'Visual pipeline with drag-and-drop stages' },
      { name: 'Lead Scoring', status: 'active', description: 'AI-powered lead qualification scoring' },
      { name: 'Activity Timeline', status: 'active', description: 'Complete interaction history per lead' },
      { name: 'Nurturing Workflows', status: 'active', description: 'Automated follow-up sequences' },
      { name: 'Lead Import/Export', status: 'active', description: 'Bulk lead management' },
      { name: 'Source Tracking', status: 'active', description: 'Attribution by lead source' },
      { name: 'Conversion Analytics', status: 'active', description: 'Pipeline performance metrics' }
    ],
    roadmap: [
      { feature: 'Predictive Lead Scoring', quarter: 'Q1 2025' },
      { feature: 'Auto Lead Assignment', quarter: 'Q2 2025' }
    ],
    integrations: ['Linda (WhatsApp)', 'Mary (Inventory)', 'Sophia (Sales)', 'Hunter (Prospecting)'],
    dataFlows: { inputs: ['Linda', 'Mary', 'Hunter'], outputs: ['Mary', 'Sophia', 'Linda'] }
  },
  sophia: {
    overview: 'Sales Pipeline Manager with deal tracking, forecasting, and commission calculations',
    phase: 'Production',
    version: '1.5',
    features: [
      { name: 'Deal Tracker', status: 'active', description: 'Track deals from offer to closing' },
      { name: 'Sales Pipeline', status: 'active', description: 'Visual deal progression management' },
      { name: 'Sales Forecasting', status: 'active', description: 'Revenue predictions and trends' },
      { name: 'Commission Calculator', status: 'active', description: 'Automated commission calculations' },
      { name: 'Territory Management', status: 'active', description: 'Agent territory assignments' },
      { name: 'Performance Dashboard', status: 'active', description: 'Agent and team performance metrics' }
    ],
    roadmap: [
      { feature: 'AI Deal Probability', quarter: 'Q2 2025' },
      { feature: 'Competitive Analysis', quarter: 'Q3 2025' }
    ],
    integrations: ['Clara (Leads)', 'Theodora (Finance)', 'Zoe (Executive)'],
    dataFlows: { inputs: ['Clara'], outputs: ['Theodora', 'Zoe'] }
  },
  theodora: {
    overview: 'Finance Director managing invoicing, payments, escrow, and financial reporting',
    phase: 'Production',
    version: '1.7',
    features: [
      { name: 'Invoice Management', status: 'active', description: 'Create and track invoices' },
      { name: 'Payment Tracker', status: 'active', description: 'Payment status and history' },
      { name: 'Escrow Management', status: 'active', description: 'Secure transaction holding accounts' },
      { name: 'Financial Reports', status: 'active', description: 'P&L, balance sheets, cash flow' },
      { name: 'Budget Analysis', status: 'active', description: 'Department budget tracking' },
      { name: 'Commission Payouts', status: 'active', description: 'Agent commission processing' }
    ],
    roadmap: [
      { feature: 'Stripe Integration', quarter: 'Q1 2025' },
      { feature: 'Automated Reconciliation', quarter: 'Q2 2025' }
    ],
    integrations: ['Sophia (Sales)', 'Daisy (Leasing)', 'Laila (Compliance)', 'Stripe'],
    dataFlows: { inputs: ['Sophia', 'Daisy'], outputs: ['Laila', 'Zoe'] }
  },
  olivia: {
    overview: 'Marketing & Automation Manager for campaigns, listings, and market intelligence',
    phase: 'Production',
    version: '1.8',
    features: [
      { name: 'Campaign Manager', status: 'active', description: 'Multi-channel marketing campaigns' },
      { name: 'Property Availability Sync', status: 'active', description: 'Auto-sync with Mary inventory' },
      { name: 'Social Media Hub', status: 'active', description: 'Schedule and publish social content' },
      { name: 'Listing Optimization', status: 'active', description: 'SEO and listing quality tools' },
      { name: 'Market Intelligence', status: 'active', description: 'Competitor tracking from Bayut/Dubizzle' },
      { name: 'Content Automation', status: 'active', description: 'AI-generated property descriptions' }
    ],
    roadmap: [
      { feature: 'AI Content Writer', quarter: 'Q2 2025' },
      { feature: 'Video Marketing Tools', quarter: 'Q3 2025' }
    ],
    integrations: ['Mary (Inventory)', 'Bayut', 'Property Finder', 'Dubizzle'],
    dataFlows: { inputs: ['Mary'], outputs: ['Zoe'] }
  },
  laila: {
    overview: 'Compliance Officer managing KYC/AML, regulatory compliance, and audit trails',
    phase: 'Production',
    version: '1.4',
    features: [
      { name: 'KYC Verification', status: 'active', description: 'Client identity verification workflows' },
      { name: 'AML Monitoring', status: 'active', description: 'Anti-money laundering checks' },
      { name: 'Contract Review', status: 'active', description: 'Legal document compliance checks' },
      { name: 'Audit Trail', status: 'active', description: 'Immutable activity logging' },
      { name: 'Regulatory Alerts', status: 'active', description: 'RERA/DLD compliance notifications' },
      { name: 'Risk Scoring', status: 'active', description: 'Transaction risk assessment' }
    ],
    roadmap: [
      { feature: 'UAE Pass Integration', quarter: 'Q1 2025' },
      { feature: 'Automated PEP Screening', quarter: 'Q2 2025' }
    ],
    integrations: ['Theodora (Finance)', 'Clara (Leads)', 'Evangeline (Legal)'],
    dataFlows: { inputs: ['Theodora', 'Clara'], outputs: ['Zoe', 'Evangeline'] }
  },
  aurora: {
    overview: 'CTO & Systems Architect overseeing technical operations, deployments, and AI governance',
    phase: 'Production',
    version: '1.6',
    features: [
      { name: 'System Health Dashboard', status: 'active', description: 'Real-time infrastructure monitoring' },
      { name: 'Deployment Pipeline', status: 'active', description: 'CI/CD and release management' },
      { name: 'Documentation Hub', status: 'active', description: 'Technical documentation portal' },
      { name: 'AI Governance', status: 'active', description: 'AI assistant performance and controls' },
      { name: 'Application Portfolio', status: 'active', description: 'Manage all company applications' },
      { name: 'Performance Analytics', status: 'active', description: 'App performance metrics' }
    ],
    roadmap: [
      { feature: 'Automated Testing Suite', quarter: 'Q2 2025' },
      { feature: 'Disaster Recovery Dashboard', quarter: 'Q3 2025' }
    ],
    integrations: ['All Assistants', 'GitHub', 'Vercel'],
    dataFlows: { inputs: ['All'], outputs: ['All'] }
  },
};

