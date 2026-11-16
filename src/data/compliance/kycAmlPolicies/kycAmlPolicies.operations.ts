// @ts-nocheck
export const kycOperations = {
  pepCategories: {
    domestic: {
      categories: [
        'Head of State/Government',
        'Senior Politicians',
        'Senior Government Officials',
        'Judicial Officials',
        'Military Officers',
        'State-Owned Enterprise Executives',
        'Political Party Officials'
      ],
      riskWeight: 30
    },
    foreign: {
      categories: [
        'Foreign Head of State/Government',
        'Foreign Senior Politicians',
        'International Organization Officials',
        'Ambassadors/Diplomats'
      ],
      riskWeight: 35
    },
    international: {
      categories: [
        'UN Officials',
        'World Bank Officials',
        'IMF Officials',
        'Regional Organization Officials'
      ],
      riskWeight: 25
    },
    familyAssociates: {
      categories: [
        'Spouse',
        'Children',
        'Parents',
        'Siblings',
        'Close Business Associates'
      ],
      riskWeight: 20
    }
  },

  sanctionsLists: [
    { id: 'un_consolidated', name: 'UN Consolidated Sanctions List', priority: 1, mandatory: true },
    { id: 'ofac_sdn', name: 'OFAC SDN List (US)', priority: 2, mandatory: true },
    { id: 'eu_consolidated', name: 'EU Consolidated Sanctions List', priority: 3, mandatory: true },
    { id: 'uk_sanctions', name: 'UK Sanctions List', priority: 4, mandatory: true },
    { id: 'uae_local', name: 'UAE Local Terrorist List', priority: 1, mandatory: true },
    { id: 'interpol', name: 'Interpol Wanted List', priority: 5, mandatory: false },
    { id: 'worldcheck', name: 'World-Check (Refinitiv)', priority: 6, mandatory: false }
  ],

  highRiskCountries: {
    fatfBlacklist: ['North Korea', 'Iran', 'Myanmar'],
    fatfGreylist: ['Syria', 'Yemen', 'South Sudan', 'Mali', 'Burkina Faso', 'Cameroon', 'DRC', 'Mozambique', 'Nigeria', 'Senegal', 'Tanzania', 'Turkey', 'UAE', 'Vietnam'],
    enhancedDueDiligence: ['Russia', 'Belarus', 'Venezuela', 'Zimbabwe', 'Cuba']
  },

  amlRedFlags: {
    transactionPatterns: [
      { id: 'structuring', description: 'Multiple transactions just below reporting threshold', severity: 'HIGH' },
      { id: 'rapid_movement', description: 'Rapid movement of funds in and out', severity: 'HIGH' },
      { id: 'round_amounts', description: 'Unusually round transaction amounts', severity: 'MEDIUM' },
      { id: 'third_party', description: 'Third party payments without clear relationship', severity: 'HIGH' },
      { id: 'cash_intensive', description: 'Unusually large cash transactions', severity: 'HIGH' },
      { id: 'geographic_mismatch', description: 'Transaction location mismatches customer profile', severity: 'MEDIUM' },
      { id: 'unusual_frequency', description: 'Unusual frequency of transactions', severity: 'MEDIUM' },
      { id: 'price_manipulation', description: 'Property price significantly above/below market', severity: 'HIGH' }
    ],
    customerBehavior: [
      { id: 'reluctant_info', description: 'Reluctant to provide information', severity: 'MEDIUM' },
      { id: 'inconsistent_info', description: 'Inconsistent or contradictory information', severity: 'HIGH' },
      { id: 'unusual_documents', description: 'Unusual or suspicious documents', severity: 'HIGH' },
      { id: 'nominee_structures', description: 'Complex nominee/shell company structures', severity: 'HIGH' },
      { id: 'rushed_transaction', description: 'Unusual urgency to complete transaction', severity: 'MEDIUM' },
      { id: 'no_concern_price', description: 'No concern about property price or terms', severity: 'MEDIUM' }
    ],
    propertyFlags: [
      { id: 'rapid_resale', description: 'Property resold within short period at significant markup', severity: 'HIGH' },
      { id: 'abandoned_transaction', description: 'Transaction abandoned after deposit', severity: 'MEDIUM' },
      { id: 'multiple_properties', description: 'Multiple property purchases in short time', severity: 'MEDIUM' },
      { id: 'renovation_inflated', description: 'Inflated renovation costs', severity: 'HIGH' }
    ]
  },

  reportingThresholds: {
    ctr: { threshold: 55000, currency: 'AED', description: 'Cash Transaction Report' },
    str: { threshold: 0, currency: 'AED', description: 'Suspicious Transaction Report - any amount' },
    ptr: { threshold: 500000, currency: 'AED', description: 'Property Transaction Report' }
  },

  verificationWorkflow: {
    steps: [
      { id: 'document_collection', name: 'Document Collection', order: 1, requiredDocs: ['passport', 'emirates_id'], timeout: 72 },
      { id: 'document_verification', name: 'Document Verification', order: 2, automated: true, timeout: 1 },
      { id: 'identity_verification', name: 'Identity Verification', order: 3, automated: true, timeout: 1 },
      { id: 'pep_screening', name: 'PEP Screening', order: 4, automated: true, timeout: 1 },
      { id: 'sanctions_check', name: 'Sanctions Check', order: 5, automated: true, timeout: 1 },
      { id: 'risk_assessment', name: 'Risk Assessment', order: 6, automated: true, timeout: 1 },
      { id: 'edd_review', name: 'EDD Review', order: 7, automated: false, conditionalOn: 'HIGH_RISK', timeout: 48 },
      { id: 'compliance_approval', name: 'Compliance Approval', order: 8, automated: false, timeout: 24 },
      { id: 'onboarding_complete', name: 'Onboarding Complete', order: 9, automated: true, timeout: 1 }
    ],
    escalationRules: {
      pepMatch: { escalateTo: 'compliance_officer', priority: 'HIGH', deadline: 24 },
      sanctionsMatch: { escalateTo: 'mlro', priority: 'CRITICAL', deadline: 1 },
      highRisk: { escalateTo: 'compliance_officer', priority: 'HIGH', deadline: 48 },
      documentIssues: { escalateTo: 'kyc_analyst', priority: 'MEDIUM', deadline: 72 }
    }
  },

  auditRequirements: {
    retentionPeriod: 5,
    retentionUnit: 'years',
    requiredFields: ['timestamp', 'action', 'actor', 'customer_id', 'details', 'ip_address', 'device_info'],
    immutable: true,
    encryption: 'AES-256-GCM'
  },

  roles: {
    kyc_analyst: {
      name: 'KYC Analyst',
      permissions: ['view_profiles', 'verify_documents', 'request_info', 'create_cases'],
      aiAssistant: 'laila'
    },
    compliance_officer: {
      name: 'Compliance Officer',
      permissions: ['view_profiles', 'verify_documents', 'approve_onboarding', 'manage_alerts', 'file_str', 'access_reports'],
      aiAssistant: 'henry'
    },
    mlro: {
      name: 'Money Laundering Reporting Officer',
      permissions: ['full_access', 'file_str', 'regulatory_reports', 'policy_management'],
      aiAssistant: 'henry'
    },
    auditor: {
      name: 'Internal Auditor',
      permissions: ['view_only', 'audit_reports', 'compliance_reports'],
      aiAssistant: 'henry'
    }
  },

  assistantIntegration: {
    henry: {
      role: 'Compliance Officer',
      department: 'compliance',
      fullAccess: true,
      capabilities: ['full_kyc_management', 'aml_alerts', 'str_filing', 'policy_management', 'audit_oversight']
    },
    laila: {
      role: 'Arabic Communications & Document Verification',
      department: 'communications',
      capabilities: ['document_verification', 'arabic_document_ocr', 'customer_communication', 'translation']
    },
    theodora: {
      role: 'CFO Intelligence',
      department: 'finance',
      capabilities: ['transaction_monitoring', 'financial_screening', 'payment_verification', 'fund_tracking']
    },
    evangeline: {
      role: 'Legal AI',
      department: 'legal',
      capabilities: ['legal_compliance', 'contract_review', 'regulatory_research', 'sanctions_interpretation']
    }
  }
};

