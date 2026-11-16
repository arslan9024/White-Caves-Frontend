// @ts-nocheck
export const COMPANY_INFO = {
  name: 'White Caves Real Estate LLC',
  location: 'Dubai, UAE',
  licenseNumber: 'DED-123456',
  established: 2018,
  vision: 'To be the premier digital solution for luxury real estate in Dubai',
  mission: 'Leveraging advanced technology and AI to streamline operations and enhance user experience'
};

export const DEPARTMENTS = {
  EXEC: {
    id: 'EXEC',
    name: 'Executive Office',
    purpose: 'Strategic direction, major deal approvals, stakeholder relations',
    head: 'Managing Director',
    headName: 'Arslan Malik',
    assistant: 'Zara (Assistant Manager)',
    teamMembers: ['Managing Director', 'Zara', 'Executive Assistant'],
    contactEmail: 'executive@whitecaves.ae',
    internalPhone: 'Ext. 100',
    directReportsFrom: ['SALES', 'PROPMGMT', 'MARKETING', 'OPERATIONS', 'TECHNOLOGY'],
    keyResponsibilities: [
      'Final approval on transactions > 5M AED',
      'Investor relations',
      'Company strategy and vision',
      'Partnership agreements'
    ],
    aiAssistant: 'Zoe'
  },
  SALES: {
    id: 'SALES',
    name: 'Sales & Leasing Division',
    purpose: 'Revenue generation through property transactions',
    head: 'Director of Sales',
    headName: 'Tariq Al-Farsi',
    teams: [
      { name: 'Residential Sales', focus: 'Villas, Apartments, Penthouses', teamLead: 'Sarah Chen' },
      { name: 'Commercial Leasing', focus: 'Office, Retail, Warehouse', teamLead: 'James Wilson' },
      { name: 'Off-Plan & New Developments', focus: 'Pre-construction projects', teamLead: 'Rashid Al-Maktoum' }
    ],
    keyMetrics: ['Monthly closings', 'Pipeline value', 'Conversion rate', 'Average deal size'],
    contactEmail: 'sales@whitecaves.ae',
    internalPhone: 'Ext. 201',
    reportingTo: 'EXEC',
    aiAssistants: ['Clara', 'Linda', 'Nancy']
  },
  PROPMGMT: {
    id: 'PROPMGMT',
    name: 'Property Management Division',
    purpose: 'Maximizing owner ROI through professional property management',
    head: 'Head of Property Management',
    headName: 'Layla Hassan',
    portfolioManaged: '125+ properties',
    propertyTypes: ['Luxury Villas (Palm, Emirates Hills)', 'Premium Apartments (Downtown, Marina)', 'Commercial Towers (DIFC, Business Bay)'],
    teams: [
      { name: 'Client Relations', focus: 'Owner satisfaction, reporting' },
      { name: 'Operations', focus: 'Maintenance, facilities, 24/7 emergency' },
      { name: 'Tenant Management', focus: 'Screening, contracts, rent collection' }
    ],
    contactEmail: 'management@whitecaves.ae',
    emergencyPhone: '+971-55-123-4567',
    internalPhone: 'Ext. 301',
    reportingTo: 'EXEC',
    aiAssistants: ['Mary', 'Olivia']
  },
  MARKETING: {
    id: 'MARKETING',
    name: 'Marketing & Business Development',
    purpose: 'Brand building, lead generation, digital presence',
    head: 'Marketing Director',
    headName: 'Omar Khalid',
    channels: [
      { channel: 'Digital Marketing', platforms: ['Instagram', 'LinkedIn', 'Property Finder', 'Bayut'] },
      { channel: 'Partnerships', focus: 'Developers, Banks, Immigration Consultants' },
      { channel: 'Events & Sponsorships', focus: 'Property exhibitions, investor meetups' }
    ],
    contactEmail: 'marketing@whitecaves.ae',
    internalPhone: 'Ext. 401',
    reportingTo: 'EXEC',
    aiAssistants: ['Olivia', 'Sophia']
  },
  OPERATIONS: {
    id: 'OPERATIONS',
    name: 'Operations & Finance',
    purpose: 'Legal compliance, financial management, administrative support',
    head: 'Chief Financial Officer',
    headName: 'Fatima Al-Zahra',
    teams: [
      { name: 'Transaction Processing', focus: 'DLD procedures, Ejari, contract legalization' },
      { name: 'Finance & Accounting', focus: 'Invoicing, commissions, financial reporting' },
      { name: 'HR & Administration', focus: 'Staff management, office operations' }
    ],
    contactEmail: 'operations@whitecaves.ae',
    internalPhone: 'Ext. 501',
    reportingTo: 'EXEC',
    aiAssistants: ['Nina', 'Theodora']
  }
};

