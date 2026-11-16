// @ts-nocheck
export const leasingServices = [
    {
      id: 'svc-9',
      name: 'Residential Rental',
      category: 'leasing',
      description: 'End-to-end residential leasing with Ejari registration',
      icon: '🏠',
      status: 'active',
      avgDuration: '7-14 days',
      avgValue: 'AED 85K/year',
      monthlyVolume: 95,
      workflow: ['inquiry', 'viewing', 'application', 'approval', 'contract', 'ejari', 'handover'],
      assistants: ['daisy', 'vesta'],
      stages: [
        { id: 'inquiry', name: 'Inquiry', icon: '📞', duration: 'Same day', actions: ['Requirements gathering', 'Budget confirmation', 'Availability check'] },
        { id: 'viewing', name: 'Viewing', icon: '👁️', duration: '1-3 days', actions: ['Schedule viewing', 'Property tour', 'Q&A session'] },
        { id: 'application', name: 'Application', icon: '📝', duration: '1 day', actions: ['Application form', 'Document submission', 'Initial checks'] },
        { id: 'approval', name: 'Approval', icon: '✅', duration: '2-3 days', actions: ['Background check', 'Reference verification', 'Landlord approval'] },
        { id: 'contract', name: 'Contract', icon: '📄', duration: '1-2 days', actions: ['Contract drafting', 'Terms review', 'Signing'] },
        { id: 'ejari', name: 'Ejari', icon: '🏛️', duration: '1-2 days', actions: ['DLD submission', 'Registration', 'Certificate issuance'] },
        { id: 'handover', name: 'Handover', icon: '🔑', duration: '1 day', actions: ['Inventory check', 'Key handover', 'Welcome pack'] }
      ]
    },
    {
      id: 'svc-10',
      name: 'Commercial Leasing',
      category: 'leasing',
      description: 'Office, retail, and warehouse leasing for businesses',
      icon: '🏢',
      status: 'active',
      avgDuration: '30-60 days',
      avgValue: 'AED 250K/year',
      monthlyVolume: 18,
      workflow: ['requirements', 'site_visit', 'negotiation', 'fitout', 'lease_signing'],
      assistants: ['daisy', 'laila'],
      stages: [
        { id: 'requirements', name: 'Requirements', icon: '📋', duration: '1-2 days', actions: ['Space needs', 'Location preferences', 'Budget range'] },
        { id: 'site_visit', name: 'Site Visit', icon: '🏢', duration: '3-7 days', actions: ['Property tours', 'Space assessment', 'Infrastructure check'] },
        { id: 'negotiation', name: 'Negotiation', icon: '🤝', duration: '1-2 weeks', actions: ['Rent negotiation', 'Term discussion', 'Incentives'] },
        { id: 'fitout', name: 'Fit-out', icon: '🔨', duration: '2-8 weeks', actions: ['Design approval', 'Construction', 'Handover preparation'] },
        { id: 'lease_signing', name: 'Lease Signing', icon: '✍️', duration: '3-5 days', actions: ['Contract finalization', 'Legal review', 'Execution'] }
      ]
    },
    {
      id: 'svc-11',
      name: 'Tenant Screening',
      category: 'leasing',
      description: 'Comprehensive background and credit verification',
      icon: '🔍',
      status: 'active',
      avgDuration: '2-3 days',
      avgValue: 'Service fee',
      monthlyVolume: 110,
      workflow: ['application', 'background_check', 'income_verify', 'credit_check', 'report'],
      assistants: ['laila', 'daisy'],
      stages: [
        { id: 'application', name: 'Application', icon: '📝', duration: 'Day 1', actions: ['Form submission', 'Document collection', 'Initial review'] },
        { id: 'background_check', name: 'Background Check', icon: '🔎', duration: '1 day', actions: ['Identity verification', 'Reference check', 'History review'] },
        { id: 'income_verify', name: 'Income Verification', icon: '💰', duration: '1 day', actions: ['Employment confirmation', 'Salary verification', 'Bank statements'] },
        { id: 'credit_check', name: 'Credit Check', icon: '📊', duration: '1 day', actions: ['Credit score', 'Payment history', 'Liability review'] },
        { id: 'report', name: 'Report', icon: '📄', duration: 'Day 3', actions: ['Risk assessment', 'Recommendation', 'Landlord report'] }
      ]
    },
    {
      id: 'svc-12',
      name: 'Lease Renewal',
      category: 'leasing',
      description: 'Hassle-free lease renewal with Ejari update',
      icon: '🔄',
      status: 'active',
      avgDuration: '5-10 days',
      avgValue: 'Existing rent',
      monthlyVolume: 42,
      workflow: ['reminder', 'negotiation', 'new_terms', 'signing', 'ejari_update'],
      assistants: ['daisy', 'nina'],
      stages: [
        { id: 'reminder', name: 'Reminder', icon: '🔔', duration: '90 days before', actions: ['Expiry notification', 'Renewal intent', 'Initial discussion'] },
        { id: 'negotiation', name: 'Negotiation', icon: '🤝', duration: '1-2 weeks', actions: ['Rent review', 'Term discussion', 'Condition updates'] },
        { id: 'new_terms', name: 'New Terms', icon: '📝', duration: '2-3 days', actions: ['Term finalization', 'Contract update', 'Approval'] },
        { id: 'signing', name: 'Signing', icon: '✍️', duration: '1 day', actions: ['Contract signing', 'Payment processing', 'Documentation'] },
        { id: 'ejari_update', name: 'Ejari Update', icon: '🏛️', duration: '1-2 days', actions: ['DLD update', 'New certificate', 'Record update'] }
      ]
    },
    {
      id: 'svc-13',
      name: 'Ejari Registration',
      category: 'leasing',
      description: 'Official tenancy contract registration with Dubai Land Department',
      icon: '🏛️',
      status: 'active',
      avgDuration: '1-2 days',
      avgValue: 'AED 220',
      monthlyVolume: 135,
      workflow: ['document_collection', 'dld_portal', 'submission', 'certificate'],
      assistants: ['laila', 'daisy'],
      stages: [
        { id: 'document_collection', name: 'Document Collection', icon: '📁', duration: '1-2 hours', actions: ['Passport copies', 'Visa pages', 'Title deed', 'Contract'] },
        { id: 'dld_portal', name: 'DLD Portal', icon: '💻', duration: '30 min', actions: ['Data entry', 'Document upload', 'Fee payment'] },
        { id: 'submission', name: 'Submission', icon: '📤', duration: '15 min', actions: ['Application submit', 'Confirmation receipt', 'Tracking number'] },
        { id: 'certificate', name: 'Certificate', icon: '📜', duration: '24-48 hours', actions: ['Certificate issuance', 'PDF download', 'Tenant notification'] }
      ]
    },
    {
      id: 'svc-14',
      name: 'Key Handover',
      category: 'leasing',
      description: 'Professional property handover with inventory documentation',
      icon: '🔑',
      status: 'active',
      avgDuration: '2-4 hours',
      avgValue: 'Included',
      monthlyVolume: 85,
      workflow: ['inspection', 'inventory_check', 'keys_transfer', 'welcome_pack'],
      assistants: ['vesta', 'daisy'],
      stages: [
        { id: 'inspection', name: 'Inspection', icon: '🔍', duration: '1 hour', actions: ['Condition check', 'Photo documentation', 'Meter readings'] },
        { id: 'inventory_check', name: 'Inventory Check', icon: '📋', duration: '30 min', actions: ['Furniture list', 'Appliance check', 'Accessory count'] },
        { id: 'keys_transfer', name: 'Keys Transfer', icon: '🔑', duration: '15 min', actions: ['Key handover', 'Access cards', 'Parking fobs'] },
        { id: 'welcome_pack', name: 'Welcome Pack', icon: '🎁', duration: '15 min', actions: ['Building info', 'Emergency contacts', 'Area guide'] }
      ]
    },
    {
      id: 'svc-15',
      name: 'Rent Collection',
      category: 'leasing',
      description: 'Automated rent collection and landlord payouts',
      icon: '💰',
      status: 'active',
      avgDuration: 'Monthly cycle',
      avgValue: 'Portfolio based',
      monthlyVolume: 450,
      workflow: ['invoice', 'reminder', 'collection', 'receipt', 'landlord_payout'],
      assistants: ['theodora', 'daisy'],
      stages: [
        { id: 'invoice', name: 'Invoice', icon: '📧', duration: '7 days before', actions: ['Invoice generation', 'Email dispatch', 'Payment link'] },
        { id: 'reminder', name: 'Reminder', icon: '🔔', duration: '3 days before', actions: ['WhatsApp reminder', 'SMS alert', 'App notification'] },
        { id: 'collection', name: 'Collection', icon: '💳', duration: 'Due date', actions: ['Card payment', 'Bank transfer', 'Cheque deposit'] },
        { id: 'receipt', name: 'Receipt', icon: '🧾', duration: 'Immediate', actions: ['Receipt generation', 'Confirmation email', 'Record update'] },
        { id: 'landlord_payout', name: 'Landlord Payout', icon: '💸', duration: '3-5 days', actions: ['Commission deduction', 'Transfer initiation', 'Statement'] }
      ]
    }
];

