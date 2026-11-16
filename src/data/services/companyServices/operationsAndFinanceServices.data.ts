// @ts-nocheck
export const operationsServices = [
    {
      id: 'svc-16',
      name: 'Property Viewing',
      category: 'operations',
      description: 'Scheduled property tours for prospective buyers and tenants',
      icon: '👁️',
      status: 'active',
      avgDuration: '1-2 hours',
      avgValue: 'Lead conversion',
      monthlyVolume: 320,
      workflow: ['request', 'scheduling', 'confirmation', 'tour', 'followup'],
      assistants: ['clara', 'linda'],
      stages: [
        { id: 'request', name: 'Request', icon: '📞', duration: 'Immediate', actions: ['Inquiry receipt', 'Requirements capture', 'Availability check'] },
        { id: 'scheduling', name: 'Scheduling', icon: '📅', duration: '1-24 hours', actions: ['Slot selection', 'Agent assignment', 'Calendar booking'] },
        { id: 'confirmation', name: 'Confirmation', icon: '✅', duration: '1 hour before', actions: ['Reminder SMS', 'WhatsApp confirm', 'Address share'] },
        { id: 'tour', name: 'Tour', icon: '🚶', duration: '45-90 min', actions: ['Property walkthrough', 'Feature highlight', 'Q&A'] },
        { id: 'followup', name: 'Follow-up', icon: '📧', duration: '24 hours', actions: ['Thank you message', 'Feedback request', 'Next steps'] }
      ]
    },
    {
      id: 'svc-17',
      name: 'Maintenance Request',
      category: 'operations',
      description: 'Property maintenance and repair coordination',
      icon: '🔧',
      status: 'active',
      avgDuration: '1-7 days',
      avgValue: 'Variable',
      monthlyVolume: 180,
      workflow: ['report', 'assessment', 'quote', 'approval', 'work', 'verify'],
      assistants: ['sentinel', 'vesta'],
      stages: [
        { id: 'report', name: 'Report', icon: '📝', duration: 'Immediate', actions: ['Issue description', 'Photo upload', 'Priority setting'] },
        { id: 'assessment', name: 'Assessment', icon: '🔍', duration: '24 hours', actions: ['Technician visit', 'Problem diagnosis', 'Scope definition'] },
        { id: 'quote', name: 'Quote', icon: '💰', duration: '1-2 days', actions: ['Cost estimate', 'Parts list', 'Timeline'] },
        { id: 'approval', name: 'Approval', icon: '✅', duration: '1-2 days', actions: ['Owner review', 'Budget check', 'Approval'] },
        { id: 'work', name: 'Work', icon: '🔨', duration: '1-5 days', actions: ['Schedule work', 'Execute repair', 'Quality check'] },
        { id: 'verify', name: 'Verify', icon: '✔️', duration: '1 day', actions: ['Tenant inspection', 'Sign-off', 'Case closure'] }
      ]
    },
    {
      id: 'svc-18',
      name: 'Property Inspection',
      category: 'operations',
      description: 'Regular property condition inspections and reporting',
      icon: '📋',
      status: 'active',
      avgDuration: '1-2 hours',
      avgValue: 'Service fee',
      monthlyVolume: 65,
      workflow: ['appointment', 'checklist', 'report', 'defects_log', 'action_items'],
      assistants: ['sentinel', 'juno'],
      stages: [
        { id: 'appointment', name: 'Appointment', icon: '📅', duration: '3-5 days', actions: ['Schedule booking', 'Tenant notification', 'Access arrangement'] },
        { id: 'checklist', name: 'Checklist', icon: '☑️', duration: '1-2 hours', actions: ['Room-by-room check', 'Condition rating', 'Photo evidence'] },
        { id: 'report', name: 'Report', icon: '📄', duration: '1-2 days', actions: ['Report generation', 'Photo compilation', 'Summary'] },
        { id: 'defects_log', name: 'Defects Log', icon: '⚠️', duration: 'With report', actions: ['Issue documentation', 'Priority ranking', 'Responsibility assignment'] },
        { id: 'action_items', name: 'Action Items', icon: '📝', duration: '1 day', actions: ['Task creation', 'Deadline setting', 'Assignment'] }
      ]
    },
    {
      id: 'svc-19',
      name: 'Inventory Management',
      category: 'operations',
      description: 'Property database management and listing coordination',
      icon: '🗄️',
      status: 'active',
      avgDuration: 'Continuous',
      avgValue: 'N/A',
      monthlyVolume: 9378,
      workflow: ['data_entry', 'verification', 'photos', 'pricing', 'publishing'],
      assistants: ['mary', 'olivia'],
      stages: [
        { id: 'data_entry', name: 'Data Entry', icon: '⌨️', duration: '15-30 min', actions: ['Property details', 'Feature input', 'Classification'] },
        { id: 'verification', name: 'Verification', icon: '✅', duration: '10 min', actions: ['Data accuracy', 'Duplicate check', 'Owner verification'] },
        { id: 'photos', name: 'Photos', icon: '📷', duration: '1-2 hours', actions: ['Photo upload', 'Quality check', 'Ordering'] },
        { id: 'pricing', name: 'Pricing', icon: '💰', duration: '5-10 min', actions: ['Market comparison', 'Price setting', 'Owner approval'] },
        { id: 'publishing', name: 'Publishing', icon: '🌐', duration: '5 min', actions: ['Portal selection', 'Listing activation', 'Confirmation'] }
      ]
    },
    {
      id: 'svc-20',
      name: 'Snagging & Defects',
      category: 'operations',
      description: 'New property defect identification and resolution',
      icon: '🔎',
      status: 'active',
      avgDuration: '2-4 weeks',
      avgValue: 'Included',
      monthlyVolume: 25,
      workflow: ['inspection', 'log', 'developer_report', 'resolution', 'signoff'],
      assistants: ['vesta', 'sentinel'],
      stages: [
        { id: 'inspection', name: 'Inspection', icon: '🔍', duration: '2-4 hours', actions: ['Detailed walkthrough', 'Defect identification', 'Photo documentation'] },
        { id: 'log', name: 'Log', icon: '📋', duration: '1 day', actions: ['Defect listing', 'Categorization', 'Priority assignment'] },
        { id: 'developer_report', name: 'Developer Report', icon: '📨', duration: '1-2 days', actions: ['Report compilation', 'Developer submission', 'Follow-up schedule'] },
        { id: 'resolution', name: 'Resolution', icon: '🔧', duration: '1-3 weeks', actions: ['Developer repairs', 'Progress tracking', 'Quality checks'] },
        { id: 'signoff', name: 'Sign-off', icon: '✅', duration: '1 day', actions: ['Final inspection', 'Owner approval', 'Case closure'] }
      ]
    },
    {
      id: 'svc-21',
      name: 'Move-in Coordination',
      category: 'operations',
      description: 'Complete move-in support including utilities setup',
      icon: '📦',
      status: 'active',
      avgDuration: '1-3 days',
      avgValue: 'Included',
      monthlyVolume: 75,
      workflow: ['schedule', 'utilities_setup', 'access_cards', 'welcome'],
      assistants: ['juno', 'vesta'],
      stages: [
        { id: 'schedule', name: 'Schedule', icon: '📅', duration: '2-3 days before', actions: ['Date confirmation', 'Time slot', 'Contact sharing'] },
        { id: 'utilities_setup', name: 'Utilities Setup', icon: '⚡', duration: '1-2 days', actions: ['DEWA transfer', 'Internet activation', 'AC registration'] },
        { id: 'access_cards', name: 'Access Cards', icon: '🎫', duration: '1 day', actions: ['Building access', 'Gym/pool cards', 'Parking registration'] },
        { id: 'welcome', name: 'Welcome', icon: '🏠', duration: 'Move-in day', actions: ['Key handover', 'Building tour', 'Emergency contacts'] }
      ]
    },
    {
      id: 'svc-22',
      name: 'Move-out Process',
      category: 'operations',
      description: 'Streamlined move-out with deposit settlement',
      icon: '🚪',
      status: 'active',
      avgDuration: '7-14 days',
      avgValue: 'Deposit based',
      monthlyVolume: 45,
      workflow: ['notice', 'inspection', 'deposit_settlement', 'key_return'],
      assistants: ['daisy', 'theodora'],
      stages: [
        { id: 'notice', name: 'Notice', icon: '📢', duration: '90 days before', actions: ['Notice receipt', 'Acknowledgment', 'Timeline confirmation'] },
        { id: 'inspection', name: 'Inspection', icon: '🔍', duration: '7 days before', actions: ['Property check', 'Damage assessment', 'Cleaning requirements'] },
        { id: 'deposit_settlement', name: 'Deposit Settlement', icon: '💰', duration: '7-14 days', actions: ['Deduction calculation', 'Owner approval', 'Refund processing'] },
        { id: 'key_return', name: 'Key Return', icon: '🔑', duration: 'Last day', actions: ['Final walkthrough', 'Key collection', 'Access deactivation'] }
      ]
    },
    {
      id: 'svc-23',
      name: 'Facility Management',
      category: 'operations',
      description: 'Building systems and common area management',
      icon: '🏗️',
      status: 'active',
      avgDuration: 'Ongoing',
      avgValue: 'Contract based',
      monthlyVolume: 120,
      workflow: ['request', 'assignment', 'execution', 'qa', 'closure'],
      assistants: ['juno', 'sentinel'],
      stages: [
        { id: 'request', name: 'Request', icon: '📝', duration: 'Immediate', actions: ['Issue reporting', 'Category selection', 'Priority setting'] },
        { id: 'assignment', name: 'Assignment', icon: '👷', duration: '1-4 hours', actions: ['Team allocation', 'Resource assignment', 'Schedule'] },
        { id: 'execution', name: 'Execution', icon: '🔧', duration: '1-24 hours', actions: ['Work execution', 'Progress updates', 'Part replacement'] },
        { id: 'qa', name: 'QA', icon: '✅', duration: '1-2 hours', actions: ['Quality check', 'Functionality test', 'Documentation'] },
        { id: 'closure', name: 'Closure', icon: '📁', duration: '30 min', actions: ['Report filing', 'Notification', 'Case closure'] }
      ]
    }
];

export const financeServices = [
    {
      id: 'svc-24',
      name: 'Invoice Processing',
      category: 'finance',
      description: 'Automated invoice generation and tracking',
      icon: '📧',
      status: 'active',
      avgDuration: '1-2 days',
      avgValue: 'Variable',
      monthlyVolume: 650,
      workflow: ['generate', 'send', 'track', 'collect', 'receipt'],
      assistants: ['theodora'],
      stages: [
        { id: 'generate', name: 'Generate', icon: '📄', duration: 'Instant', actions: ['Invoice creation', 'Line items', 'Tax calculation'] },
        { id: 'send', name: 'Send', icon: '📤', duration: 'Instant', actions: ['Email dispatch', 'SMS notification', 'Portal update'] },
        { id: 'track', name: 'Track', icon: '👁️', duration: 'Ongoing', actions: ['View tracking', 'Reminder scheduling', 'Escalation rules'] },
        { id: 'collect', name: 'Collect', icon: '💳', duration: 'Due date', actions: ['Payment receipt', 'Multi-channel', 'Reconciliation'] },
        { id: 'receipt', name: 'Receipt', icon: '🧾', duration: 'Immediate', actions: ['Receipt generation', 'Ledger update', 'Confirmation'] }
      ]
    },
    {
      id: 'svc-25',
      name: 'Payment Collection',
      category: 'finance',
      description: 'Multi-channel payment collection and reconciliation',
      icon: '💳',
      status: 'active',
      avgDuration: 'Real-time',
      avgValue: 'AED 125K avg',
      monthlyVolume: 520,
      workflow: ['invoice', 'reminder', 'payment', 'confirmation', 'ledger_update'],
      assistants: ['theodora', 'nina'],
      stages: [
        { id: 'invoice', name: 'Invoice', icon: '📧', duration: 'Scheduled', actions: ['Invoice dispatch', 'Payment link', 'QR code'] },
        { id: 'reminder', name: 'Reminder', icon: '🔔', duration: 'Automated', actions: ['WhatsApp reminder', 'Email follow-up', 'SMS alert'] },
        { id: 'payment', name: 'Payment', icon: '💳', duration: 'Instant', actions: ['Card payment', 'Bank transfer', 'Aani QR'] },
        { id: 'confirmation', name: 'Confirmation', icon: '✅', duration: 'Instant', actions: ['Payment confirmation', 'Receipt email', 'App notification'] },
        { id: 'ledger_update', name: 'Ledger Update', icon: '📊', duration: 'Instant', actions: ['Account update', 'Balance reconciliation', 'Report generation'] }
      ]
    },
    {
      id: 'svc-26',
      name: 'Commission Calculation',
      category: 'finance',
      description: 'Automated agent commission calculation and payouts',
      icon: '💰',
      status: 'active',
      avgDuration: '3-5 days',
      avgValue: 'AED 85K avg',
      monthlyVolume: 45,
      workflow: ['sale_close', 'rate_apply', 'agent_split', 'approval', 'payout'],
      assistants: ['theodora', 'sophia'],
      stages: [
        { id: 'sale_close', name: 'Sale Close', icon: '🤝', duration: 'Trigger', actions: ['Deal closure', 'Value confirmation', 'Documentation'] },
        { id: 'rate_apply', name: 'Rate Apply', icon: '📊', duration: 'Instant', actions: ['Rate lookup', 'Tier calculation', 'Bonus check'] },
        { id: 'agent_split', name: 'Agent Split', icon: '👥', duration: 'Instant', actions: ['Split calculation', 'Team share', 'Manager override'] },
        { id: 'approval', name: 'Approval', icon: '✅', duration: '1-2 days', actions: ['Manager review', 'Finance approval', 'Final confirmation'] },
        { id: 'payout', name: 'Payout', icon: '💸', duration: '2-3 days', actions: ['Payment processing', 'Bank transfer', 'Pay slip'] }
      ]
    },
    {
      id: 'svc-27',
      name: 'Escrow Management',
      category: 'finance',
      description: 'Secure escrow holding and conditional release',
      icon: '🔐',
      status: 'active',
      avgDuration: '30-90 days',
      avgValue: 'AED 500K avg',
      monthlyVolume: 15,
      workflow: ['deposit', 'hold', 'conditions_met', 'release'],
      assistants: ['theodora', 'laila'],
      stages: [
        { id: 'deposit', name: 'Deposit', icon: '💵', duration: '1-2 days', actions: ['Fund receipt', 'Account credit', 'Confirmation'] },
        { id: 'hold', name: 'Hold', icon: '🔒', duration: 'Variable', actions: ['Secure holding', 'Status tracking', 'Interest accrual'] },
        { id: 'conditions_met', name: 'Conditions Met', icon: '☑️', duration: 'Variable', actions: ['Condition verification', 'Documentation check', 'Approval'] },
        { id: 'release', name: 'Release', icon: '💸', duration: '1-3 days', actions: ['Fund release', 'Transfer execution', 'Confirmation'] }
      ]
    },
    {
      id: 'svc-28',
      name: 'Financial Reporting',
      category: 'finance',
      description: 'Comprehensive financial analysis and reporting',
      icon: '📊',
      status: 'active',
      avgDuration: 'Monthly/Quarterly',
      avgValue: 'N/A',
      monthlyVolume: 12,
      workflow: ['data_gather', 'analysis', 'report', 'review', 'distribution'],
      assistants: ['theodora', 'zoe'],
      stages: [
        { id: 'data_gather', name: 'Data Gather', icon: '📥', duration: '2-3 days', actions: ['Transaction export', 'System integration', 'Data validation'] },
        { id: 'analysis', name: 'Analysis', icon: '🔍', duration: '2-3 days', actions: ['Trend analysis', 'KPI calculation', 'Variance analysis'] },
        { id: 'report', name: 'Report', icon: '📄', duration: '1-2 days', actions: ['Report generation', 'Chart creation', 'Summary writing'] },
        { id: 'review', name: 'Review', icon: '👁️', duration: '1-2 days', actions: ['Management review', 'Feedback incorporation', 'Finalization'] },
        { id: 'distribution', name: 'Distribution', icon: '📤', duration: '1 day', actions: ['Stakeholder distribution', 'Archive', 'Meeting schedule'] }
      ]
    }
];

