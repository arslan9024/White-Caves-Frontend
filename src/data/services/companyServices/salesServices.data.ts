// @ts-nocheck
export const salesServices = [
    {
      id: 'svc-1',
      name: 'Off-Plan Purchase',
      category: 'sales',
      description: 'Purchase new development properties directly from developers with flexible payment plans',
      icon: '🏗️',
      status: 'active',
      avgDuration: '30-60 days',
      avgValue: 'AED 2.5M',
      monthlyVolume: 45,
      workflow: ['research', 'selection', 'booking', 'payment_plan', 'handover'],
      assistants: ['sophia', 'atlas'],
      stages: [
        { id: 'research', name: 'Research', icon: '🔍', duration: '3-5 days', actions: ['Market analysis', 'Developer review', 'Project comparison'] },
        { id: 'selection', name: 'Selection', icon: '🏗️', duration: '5-7 days', actions: ['Unit selection', 'Floor plan review', 'Price negotiation'] },
        { id: 'booking', name: 'Booking', icon: '📝', duration: '1-2 days', actions: ['Reservation form', 'Initial deposit', 'Document collection'] },
        { id: 'payment_plan', name: 'Payment Plan', icon: '💳', duration: '1-3 days', actions: ['Plan selection', 'Payment schedule', 'Contract signing'] },
        { id: 'handover', name: 'Handover', icon: '🔑', duration: 'At completion', actions: ['Inspection', 'Snagging', 'Key collection'] }
      ]
    },
    {
      id: 'svc-2',
      name: 'Secondary Market Sale',
      category: 'sales',
      description: 'Buy or sell existing properties in the secondary market',
      icon: '🏠',
      status: 'active',
      avgDuration: '45-90 days',
      avgValue: 'AED 3.2M',
      monthlyVolume: 32,
      workflow: ['valuation', 'listing', 'marketing', 'viewing', 'negotiation', 'closing'],
      assistants: ['sophia', 'clara'],
      stages: [
        { id: 'valuation', name: 'Valuation', icon: '📊', duration: '2-3 days', actions: ['Property inspection', 'Market comparison', 'Price recommendation'] },
        { id: 'listing', name: 'Listing', icon: '📋', duration: '1-2 days', actions: ['Photo shoot', 'Description writing', 'Portal upload'] },
        { id: 'marketing', name: 'Marketing', icon: '📣', duration: 'Ongoing', actions: ['Portal featuring', 'Social media', 'Email campaigns'] },
        { id: 'viewing', name: 'Viewing', icon: '👁️', duration: 'Per request', actions: ['Schedule viewing', 'Property tour', 'Feedback collection'] },
        { id: 'negotiation', name: 'Negotiation', icon: '🤝', duration: '3-7 days', actions: ['Offer presentation', 'Counter offers', 'Terms agreement'] },
        { id: 'closing', name: 'Closing', icon: '✅', duration: '7-14 days', actions: ['Contract signing', 'DLD transfer', 'Payment processing'] }
      ]
    },
    {
      id: 'svc-3',
      name: 'Property Selling',
      category: 'sales',
      description: 'Full-service property selling with maximum value optimization',
      icon: '📈',
      status: 'active',
      avgDuration: '60-120 days',
      avgValue: 'AED 4.1M',
      monthlyVolume: 28,
      workflow: ['valuation', 'documentation', 'marketing', 'buyer_match', 'negotiation', 'transfer'],
      assistants: ['sophia', 'olivia'],
      stages: [
        { id: 'valuation', name: 'Valuation', icon: '💰', duration: '2-3 days', actions: ['Expert assessment', 'Market analysis', 'Pricing strategy'] },
        { id: 'documentation', name: 'Documentation', icon: '📁', duration: '3-5 days', actions: ['Title deed', 'NOC collection', 'Legal clearance'] },
        { id: 'marketing', name: 'Marketing', icon: '📣', duration: 'Ongoing', actions: ['Professional photos', 'Virtual tour', 'Premium listing'] },
        { id: 'buyer_match', name: 'Buyer Match', icon: '🎯', duration: 'Ongoing', actions: ['Lead qualification', 'Buyer screening', 'Interest matching'] },
        { id: 'negotiation', name: 'Negotiation', icon: '🤝', duration: '5-10 days', actions: ['Offer review', 'Price negotiation', 'Terms finalization'] },
        { id: 'transfer', name: 'Transfer', icon: '🔑', duration: '7-14 days', actions: ['DLD appointment', 'Fund transfer', 'Handover'] }
      ]
    },
    {
      id: 'svc-4',
      name: 'Luxury Property Sales',
      category: 'sales',
      description: 'White-glove service for ultra-luxury properties above AED 10M',
      icon: '👑',
      status: 'active',
      avgDuration: '90-180 days',
      avgValue: 'AED 18M',
      monthlyVolume: 8,
      workflow: ['vip_intro', 'private_viewing', 'custom_terms', 'white_glove_closing'],
      assistants: ['kairos', 'sophia'],
      stages: [
        { id: 'vip_intro', name: 'VIP Introduction', icon: '🎩', duration: '1-3 days', actions: ['Personal consultation', 'Lifestyle assessment', 'Portfolio presentation'] },
        { id: 'private_viewing', name: 'Private Viewing', icon: '🏰', duration: 'By appointment', actions: ['Exclusive access', 'Champagne tour', 'Privacy guaranteed'] },
        { id: 'custom_terms', name: 'Custom Terms', icon: '📜', duration: '7-14 days', actions: ['Bespoke negotiation', 'Special conditions', 'Legal customization'] },
        { id: 'white_glove_closing', name: 'White Glove Closing', icon: '🤵', duration: '14-30 days', actions: ['Concierge service', 'Full coordination', 'VIP handover'] }
      ]
    },
    {
      id: 'svc-5',
      name: 'Investment Advisory',
      category: 'sales',
      description: 'Strategic property investment guidance and portfolio management',
      icon: '📊',
      status: 'active',
      avgDuration: 'Ongoing',
      avgValue: 'AED 5M+',
      monthlyVolume: 15,
      workflow: ['consultation', 'portfolio_analysis', 'roi_modeling', 'recommendation'],
      assistants: ['maven', 'cipher'],
      stages: [
        { id: 'consultation', name: 'Consultation', icon: '💼', duration: '1-2 hours', actions: ['Goals assessment', 'Risk profiling', 'Budget planning'] },
        { id: 'portfolio_analysis', name: 'Portfolio Analysis', icon: '📈', duration: '3-5 days', actions: ['Current holdings', 'Performance review', 'Gap analysis'] },
        { id: 'roi_modeling', name: 'ROI Modeling', icon: '🧮', duration: '2-3 days', actions: ['Yield projections', 'Capital appreciation', 'Scenario analysis'] },
        { id: 'recommendation', name: 'Recommendation', icon: '💡', duration: '1-2 days', actions: ['Property shortlist', 'Investment memo', 'Action plan'] }
      ]
    },
    {
      id: 'svc-6',
      name: 'Developer Partnership',
      category: 'sales',
      description: 'Establish exclusive inventory partnerships with premier developers',
      icon: '🤝',
      status: 'active',
      avgDuration: '30-60 days',
      avgValue: 'Commission based',
      monthlyVolume: 3,
      workflow: ['contact', 'negotiation', 'agreement', 'inventory_access', 'commission_setup'],
      assistants: ['atlas', 'zoe'],
      stages: [
        { id: 'contact', name: 'Contact', icon: '📞', duration: '1-2 weeks', actions: ['Developer outreach', 'Initial meeting', 'Proposal presentation'] },
        { id: 'negotiation', name: 'Negotiation', icon: '🤝', duration: '2-4 weeks', actions: ['Terms discussion', 'Commission rates', 'Exclusivity terms'] },
        { id: 'agreement', name: 'Agreement', icon: '📝', duration: '1 week', actions: ['Contract drafting', 'Legal review', 'Signing'] },
        { id: 'inventory_access', name: 'Inventory Access', icon: '🗄️', duration: '3-5 days', actions: ['System integration', 'Unit allocation', 'Training'] },
        { id: 'commission_setup', name: 'Commission Setup', icon: '💰', duration: '1-2 days', actions: ['Rate configuration', 'Payment terms', 'Reporting setup'] }
      ]
    },
    {
      id: 'svc-7',
      name: 'Property Valuation',
      category: 'sales',
      description: 'Professional property valuation and market analysis',
      icon: '🔍',
      status: 'active',
      avgDuration: '3-5 days',
      avgValue: 'Service fee',
      monthlyVolume: 85,
      workflow: ['inspection', 'market_analysis', 'comparable_study', 'report'],
      assistants: ['cipher', 'mary'],
      stages: [
        { id: 'inspection', name: 'Inspection', icon: '🏠', duration: '1-2 hours', actions: ['Physical assessment', 'Condition rating', 'Photo documentation'] },
        { id: 'market_analysis', name: 'Market Analysis', icon: '📊', duration: '1-2 days', actions: ['Area trends', 'Price movements', 'Demand analysis'] },
        { id: 'comparable_study', name: 'Comparable Study', icon: '⚖️', duration: '1 day', actions: ['Similar properties', 'Recent sales', 'Price adjustments'] },
        { id: 'report', name: 'Report', icon: '📄', duration: '1 day', actions: ['Valuation report', 'Price recommendation', 'Market insights'] }
      ]
    },
    {
      id: 'svc-8',
      name: 'Buyer Consultation',
      category: 'sales',
      description: 'Personalized buyer guidance and property matching',
      icon: '🎯',
      status: 'active',
      avgDuration: '1-2 weeks',
      avgValue: 'Included',
      monthlyVolume: 120,
      workflow: ['needs_analysis', 'budget_planning', 'property_matching', 'shortlist'],
      assistants: ['clara', 'sophia'],
      stages: [
        { id: 'needs_analysis', name: 'Needs Analysis', icon: '📝', duration: '30-60 min', actions: ['Requirements gathering', 'Lifestyle assessment', 'Priority ranking'] },
        { id: 'budget_planning', name: 'Budget Planning', icon: '💵', duration: '1-2 hours', actions: ['Financial review', 'Mortgage options', 'Total cost analysis'] },
        { id: 'property_matching', name: 'Property Matching', icon: '🔎', duration: '2-5 days', actions: ['Database search', 'Criteria matching', 'Option filtering'] },
        { id: 'shortlist', name: 'Shortlist', icon: '📋', duration: '1 day', actions: ['Top recommendations', 'Comparison matrix', 'Viewing schedule'] }
      ]
    }
];

