// @ts-nocheck
export const kycRules = {
  version: '2.0',
  effectiveDate: '2024-01-01',
  jurisdiction: 'UAE',
  regulatoryAuthorities: ['CBUAE', 'SCA', 'RERA', 'DLD', 'goAML', 'FIU'],

  riskCategories: {
    LOW: { level: 1, label: 'Low Risk', color: '#10B981', reviewPeriod: 365 },
    MEDIUM: { level: 2, label: 'Medium Risk', color: '#F59E0B', reviewPeriod: 180 },
    HIGH: { level: 3, label: 'High Risk', color: '#EF4444', reviewPeriod: 90 },
    PROHIBITED: { level: 4, label: 'Prohibited', color: '#7C3AED', reviewPeriod: 0 }
  },

  customerDueDiligence: {
    CDD: {
      name: 'Customer Due Diligence',
      thresholdAED: 55000,
      goAmlReportingRequired: true,
      documents: ['passport', 'emirates_id', 'visa', 'proof_of_address'],
      requiredFor: ['LOW', 'MEDIUM'],
      validityDays: 365
    },
    EDD: {
      name: 'Enhanced Due Diligence',
      thresholdAED: 500000,
      goAmlReportingRequired: true,
      documents: ['passport', 'emirates_id', 'visa', 'proof_of_address', 'source_of_funds', 'bank_statements', 'income_proof'],
      requiredFor: ['HIGH'],
      validityDays: 180,
      additionalChecks: ['pep_screening', 'sanctions_check', 'adverse_media', 'source_of_wealth']
    }
  },

  documentRequirements: {
    passport: {
      id: 'passport',
      name: 'Passport',
      description: 'Valid passport with minimum 6 months validity',
      required: true,
      validityCheck: true,
      ocrFields: ['full_name', 'nationality', 'passport_number', 'date_of_birth', 'expiry_date', 'gender']
    },
    emirates_id: {
      id: 'emirates_id',
      name: 'Emirates ID',
      description: 'Valid UAE Emirates ID card',
      required: true,
      validityCheck: true,
      ocrFields: ['id_number', 'full_name_en', 'full_name_ar', 'nationality', 'expiry_date']
    },
    visa: {
      id: 'visa',
      name: 'UAE Visa',
      description: 'Valid UAE residence visa or entry permit',
      required: true,
      validityCheck: true,
      ocrFields: ['visa_type', 'sponsor', 'profession', 'expiry_date']
    },
    proof_of_address: {
      id: 'proof_of_address',
      name: 'Proof of Address',
      description: 'Utility bill, bank statement, or tenancy contract (within 3 months)',
      required: true,
      validityCheck: false,
      maxAgeDays: 90,
      acceptedTypes: ['utility_bill', 'bank_statement', 'ejari_certificate', 'tenancy_contract']
    },
    source_of_funds: {
      id: 'source_of_funds',
      name: 'Source of Funds Declaration',
      description: 'Declaration of source of funds for transaction',
      required: false,
      requiredForEDD: true,
      acceptedTypes: ['salary', 'business_income', 'investment_returns', 'inheritance', 'property_sale', 'gift']
    },
    bank_statements: {
      id: 'bank_statements',
      name: 'Bank Statements',
      description: 'Last 6 months bank statements',
      required: false,
      requiredForEDD: true,
      maxAgeDays: 30,
      minimumPeriodMonths: 6
    },
    income_proof: {
      id: 'income_proof',
      name: 'Income Proof',
      description: 'Salary certificate, trade license, or tax returns',
      required: false,
      requiredForEDD: true,
      acceptedTypes: ['salary_certificate', 'trade_license', 'audited_financials', 'tax_returns']
    },
    company_documents: {
      id: 'company_documents',
      name: 'Company Documents',
      description: 'For corporate entities: trade license, MOA, board resolution',
      required: false,
      requiredFor: ['corporate'],
      documents: ['trade_license', 'memorandum_of_association', 'board_resolution', 'shareholder_register', 'ubo_declaration']
    }
  },

  riskScoringMatrix: {
    customerType: {
      individual_resident: 0,
      individual_non_resident: 10,
      corporate_local: 5,
      corporate_foreign: 15,
      trust_foundation: 20,
      pep: 30,
      pep_family: 25
    },
    nationality: {
      gcc: 0,
      low_risk_country: 5,
      medium_risk_country: 15,
      high_risk_country: 30,
      fatf_blacklist: 50,
      sanctioned_country: 100
    },
    transactionValue: {
      below_50k: 0,
      '50k_to_500k': 5,
      '500k_to_2m': 10,
      '2m_to_10m': 20,
      above_10m: 30
    },
    transactionType: {
      residential_rental: 0,
      residential_purchase: 5,
      commercial_rental: 5,
      commercial_purchase: 10,
      offplan_purchase: 10,
      investment_portfolio: 15,
      cash_transaction: 25
    },
    sourceOfFunds: {
      salary: 0,
      business_income: 5,
      investment_returns: 5,
      property_sale: 10,
      inheritance: 10,
      gift: 15,
      crypto: 25,
      unknown: 30
    },
    occupation: {
      employed: 0,
      self_employed: 5,
      business_owner: 5,
      investor: 10,
      retired: 5,
      student: 10,
      unemployed: 15,
      high_risk_profession: 20
    }
  },

  riskThresholds: {
    low: { min: 0, max: 25 },
    medium: { min: 26, max: 50 },
    high: { min: 51, max: 75 },
    prohibited: { min: 76, max: 100 }
  },

};

