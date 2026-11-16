// @ts-nocheck
export const complianceServices = [
    {
      id: 'svc-29',
      name: 'KYC Verification',
      category: 'compliance',
      description: 'Know Your Customer identity verification',
      icon: '🆔',
      status: 'active',
      avgDuration: '2-4 hours',
      avgValue: 'Per transaction',
      monthlyVolume: 185,
      workflow: ['document_upload', 'verification', 'risk_score', 'approval_reject'],
      assistants: ['laila'],
      stages: [
        { id: 'document_upload', name: 'Document Upload', icon: '📤', duration: '5-10 min', actions: ['Passport upload', 'Visa upload', 'Emirates ID'] },
        { id: 'verification', name: 'Verification', icon: '🔍', duration: '1-2 hours', actions: ['Document validation', 'Cross-reference', 'Authenticity check'] },
        { id: 'risk_score', name: 'Risk Score', icon: '📊', duration: '30 min', actions: ['Risk calculation', 'PEP check', 'Sanctions screening'] },
        { id: 'approval_reject', name: 'Approval/Reject', icon: '✅', duration: '30 min', actions: ['Decision making', 'Notification', 'Documentation'] }
      ]
    },
    {
      id: 'svc-30',
      name: 'AML Screening',
      category: 'compliance',
      description: 'Anti-Money Laundering transaction monitoring',
      icon: '🛡️',
      status: 'active',
      avgDuration: 'Real-time + review',
      avgValue: 'Per transaction',
      monthlyVolume: 520,
      workflow: ['transaction', 'flag_check', 'investigation', 'clear_escalate'],
      assistants: ['laila', 'zoe'],
      stages: [
        { id: 'transaction', name: 'Transaction', icon: '💳', duration: 'Real-time', actions: ['Transaction capture', 'Pattern analysis', 'Threshold check'] },
        { id: 'flag_check', name: 'Flag Check', icon: '🚩', duration: 'Instant', actions: ['Rule matching', 'Alert generation', 'Priority assignment'] },
        { id: 'investigation', name: 'Investigation', icon: '🔍', duration: '1-5 days', actions: ['Case review', 'Evidence gathering', 'Source verification'] },
        { id: 'clear_escalate', name: 'Clear/Escalate', icon: '⚖️', duration: '1-2 days', actions: ['Decision', 'Documentation', 'Regulatory report'] }
      ]
    },
    {
      id: 'svc-31',
      name: 'Contract Review',
      category: 'compliance',
      description: 'Legal contract review and compliance verification',
      icon: '📜',
      status: 'active',
      avgDuration: '2-5 days',
      avgValue: 'Per contract',
      monthlyVolume: 95,
      workflow: ['draft', 'legal_review', 'comments', 'revision', 'approval'],
      assistants: ['evangeline', 'laila'],
      stages: [
        { id: 'draft', name: 'Draft', icon: '📝', duration: '1-2 days', actions: ['Template selection', 'Term customization', 'Initial draft'] },
        { id: 'legal_review', name: 'Legal Review', icon: '⚖️', duration: '1-2 days', actions: ['Clause review', 'Risk assessment', 'Compliance check'] },
        { id: 'comments', name: 'Comments', icon: '💬', duration: '1 day', actions: ['Feedback compilation', 'Change requests', 'Clarifications'] },
        { id: 'revision', name: 'Revision', icon: '✏️', duration: '1 day', actions: ['Amendments', 'Version update', 'Final review'] },
        { id: 'approval', name: 'Approval', icon: '✅', duration: '1 day', actions: ['Final approval', 'Signature', 'Archive'] }
      ]
    },
    {
      id: 'svc-32',
      name: 'Regulatory Compliance',
      category: 'compliance',
      description: 'RERA and regulatory compliance auditing',
      icon: '🏛️',
      status: 'active',
      avgDuration: 'Quarterly',
      avgValue: 'N/A',
      monthlyVolume: 4,
      workflow: ['audit', 'gap_analysis', 'remediation', 'certification'],
      assistants: ['laila', 'aurora'],
      stages: [
        { id: 'audit', name: 'Audit', icon: '🔍', duration: '1-2 weeks', actions: ['Process review', 'Documentation check', 'Interviews'] },
        { id: 'gap_analysis', name: 'Gap Analysis', icon: '📊', duration: '3-5 days', actions: ['Compliance gaps', 'Risk prioritization', 'Recommendations'] },
        { id: 'remediation', name: 'Remediation', icon: '🔧', duration: '2-4 weeks', actions: ['Action plans', 'Implementation', 'Progress tracking'] },
        { id: 'certification', name: 'Certification', icon: '📜', duration: '1-2 days', actions: ['Final review', 'Certification', 'Reporting'] }
      ]
    }
];

export const marketingServices = [
    {
      id: 'svc-33',
      name: 'Property Marketing',
      category: 'marketing',
      description: 'Professional property photography and multi-portal listing',
      icon: '📸',
      status: 'active',
      avgDuration: '3-5 days',
      avgValue: 'Per property',
      monthlyVolume: 85,
      workflow: ['photography', 'listing', 'multi_platform', 'analytics'],
      assistants: ['olivia', 'mary'],
      stages: [
        { id: 'photography', name: 'Photography', icon: '📷', duration: '2-4 hours', actions: ['Photo shoot', 'Video tour', 'Drone footage'] },
        { id: 'listing', name: 'Listing', icon: '📝', duration: '1-2 days', actions: ['Description writing', 'Feature highlighting', 'SEO optimization'] },
        { id: 'multi_platform', name: 'Multi-Platform', icon: '🌐', duration: '1 day', actions: ['Bayut', 'Property Finder', 'Dubizzle', 'Website'] },
        { id: 'analytics', name: 'Analytics', icon: '📊', duration: 'Ongoing', actions: ['View tracking', 'Lead monitoring', 'Performance reports'] }
      ]
    },
    {
      id: 'svc-34',
      name: 'Lead Generation',
      category: 'marketing',
      description: 'Multi-channel lead acquisition and scoring',
      icon: '🎯',
      status: 'active',
      avgDuration: 'Continuous',
      avgValue: 'AED 150 per lead',
      monthlyVolume: 450,
      workflow: ['campaign', 'capture', 'score', 'route', 'followup'],
      assistants: ['olivia', 'clara', 'hunter'],
      stages: [
        { id: 'campaign', name: 'Campaign', icon: '📣', duration: 'Ongoing', actions: ['Ad creation', 'Targeting', 'Budget management'] },
        { id: 'capture', name: 'Capture', icon: '📥', duration: 'Real-time', actions: ['Form submission', 'Call tracking', 'Chat leads'] },
        { id: 'score', name: 'Score', icon: '⭐', duration: 'Instant', actions: ['AI scoring', 'Intent analysis', 'Priority assignment'] },
        { id: 'route', name: 'Route', icon: '🔀', duration: 'Instant', actions: ['Agent matching', 'Availability check', 'Assignment'] },
        { id: 'followup', name: 'Follow-up', icon: '📞', duration: '< 5 min', actions: ['Initial contact', 'Qualification', 'Appointment'] }
      ]
    },
    {
      id: 'svc-35',
      name: 'Client Communication',
      category: 'marketing',
      description: 'Automated client nurturing and retention',
      icon: '💬',
      status: 'active',
      avgDuration: 'Lifecycle',
      avgValue: 'Retention based',
      monthlyVolume: 2500,
      workflow: ['inquiry', 'response', 'nurture', 'conversion', 'retention'],
      assistants: ['linda', 'nina'],
      stages: [
        { id: 'inquiry', name: 'Inquiry', icon: '📩', duration: 'Instant', actions: ['Message receipt', 'Intent detection', 'Routing'] },
        { id: 'response', name: 'Response', icon: '💬', duration: '< 2 min', actions: ['Auto-response', 'AI suggestion', 'Agent handoff'] },
        { id: 'nurture', name: 'Nurture', icon: '🌱', duration: 'Weeks-Months', actions: ['Drip campaigns', 'Content sharing', 'Check-ins'] },
        { id: 'conversion', name: 'Conversion', icon: '🎯', duration: 'Variable', actions: ['Deal closure', 'Onboarding', 'Thank you'] },
        { id: 'retention', name: 'Retention', icon: '🔄', duration: 'Ongoing', actions: ['Anniversary messages', 'Referral requests', 'Feedback'] }
      ]
    }
  ];

