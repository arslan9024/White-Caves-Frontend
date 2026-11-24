/**
 * White Caves Real Estate LLC - Statutory Flow Definitions
 * Standard: AEGIS Canonical 7-Category Architecture Standard (Static Data)
 * Single Purpose File Law: < 350 lines
 */

import { StatutoryFlowDefinition, StatutoryFlowType } from './StatutoryWizards.types';

import { LEASING_AND_TAX_STATUTORY_FLOWS } from './statutoryWizardsLeasing.data';

export const STATUTORY_FLOWS: Record<StatutoryFlowType, StatutoryFlowConfig> = {
  FORM_A_SELLER_AGREEMENT: {
    flowType: 'FORM_A_SELLER_AGREEMENT',
    title: 'DLD Form A: Seller Agency Listing Agreement',
    code: 'DLD-FRM-A',
    authorityBadge: 'DLD TRAKHEESI',
    authorityColor: '#EF4444',
    description:
      'Mandatory agency listing agreement between property owner and White Caves Real Estate.',
    deliverableResultToken: 'TRAKHEESI_PERMIT_AUTH_CONFIRMED',
    steps: [
      {
        stepNumber: 1,
        title: 'Title Deed & Ownership Validation',
        description: 'Verify owner Emirates ID and match with Dubai Land Department Title Deed.',
        authority: 'DLD',
        fields: [
          {
            key: 'titleDeedNumber',
            label: 'Title Deed Number',
            defaultValue: 'TD-908124',
            placeholder: 'e.g. TD-908124',
          },
          {
            key: 'ownerFullName',
            label: 'Owner Legal Name',
            defaultValue: 'Emaar Asset Holdings',
            placeholder: 'Owner Full Name',
          },
          {
            key: 'plotNumber',
            label: 'Plot / Municipality Number',
            defaultValue: 'PLOT-DH2-4410',
            placeholder: 'e.g. PLOT-1234',
          },
        ],
      },
      {
        stepNumber: 2,
        title: 'Broker Authorization & Commission Terms',
        description:
          'Specify listing period, asking price, and agreed brokerage commission percent.',
        authority: 'RERA',
        fields: [
          {
            key: 'listingPriceAED',
            label: 'Asking Price (AED)',
            defaultValue: '25000000',
            placeholder: 'Price in AED',
          },
          {
            key: 'commissionPercent',
            label: 'Broker Commission (%)',
            defaultValue: '2.0',
            placeholder: 'Commission %',
          },
          {
            key: 'reraBrokerNumber',
            label: 'RERA Certified Broker ID',
            defaultValue: 'BRN-48910',
            placeholder: 'Broker BRN',
          },
        ],
      },
      {
        stepNumber: 3,
        title: 'Trakheesi Advertising Permit Attestation',
        description: 'Issue official DLD Trakheesi QR advertising permit for verified marketing.',
        authority: 'DLD',
        fields: [
          {
            key: 'trakheesiPermitNumber',
            label: 'Generated Trakheesi Number',
            defaultValue: 'TRAK-2026-99214',
            placeholder: 'Permit ID',
          },
          {
            key: 'permitExpiryDate',
            label: 'Permit Expiry Date',
            defaultValue: '2026-12-31',
            placeholder: 'YYYY-MM-DD',
          },
        ],
      },
    ],
  },

  FORM_B_BUYER_AGREEMENT: {
    flowType: 'FORM_B_BUYER_AGREEMENT',
    title: 'DLD Form B: Buyer Agency Representation Agreement',
    code: 'DLD-FRM-B',
    authorityBadge: 'RERA COMPLIANCE',
    authorityColor: '#3B82F6',
    description:
      'Statutory mandate appointing White Caves as the exclusive purchasing representative.',
    deliverableResultToken: 'FORM_B_REPRESENTATION_ACTIVE',
    steps: [
      {
        stepNumber: 1,
        title: 'Buyer KYC & Identity Verification',
        description: 'Perform UN/UAE AML screening and passport/Emirates ID intake.',
        authority: 'RERA',
        fields: [
          {
            key: 'buyerName',
            label: 'Buyer Legal Full Name',
            defaultValue: 'Sir Arthur Pendelton',
            placeholder: 'Buyer Name',
          },
          {
            key: 'buyerPassportOrEID',
            label: 'Passport / Emirates ID',
            defaultValue: 'GBR-P88210492',
            placeholder: 'Doc ID',
          },
          {
            key: 'amlStatus',
            label: 'AML Sanction Screening',
            defaultValue: 'CLEARED_PEP_NEGATIVE',
            placeholder: 'Screening State',
          },
        ],
      },
      {
        stepNumber: 2,
        title: 'Target Investment & Budget Parameters',
        description: 'Define search radius, community scope, and maximum allocated capital.',
        authority: 'RERA',
        fields: [
          {
            key: 'targetCommunity',
            label: 'Primary Preferred Community',
            defaultValue: 'Palm Jumeirah',
            placeholder: 'Community',
          },
          {
            key: 'maxBudgetAED',
            label: 'Maximum Approved Budget (AED)',
            defaultValue: '35000000',
            placeholder: 'Budget AED',
          },
          {
            key: 'buyerCommissionPercent',
            label: 'Agreed Buyer Fee (%)',
            defaultValue: '2.0',
            placeholder: '2.0%',
          },
        ],
      },
    ],
  },

  FORM_F_SALE_MOU: {
    flowType: 'FORM_F_SALE_MOU',
    title: 'DLD Form F: Unified Real Estate Contract of Sale (MOU)',
    code: 'DLD-FRM-F',
    authorityBadge: 'DLD DUBAI REST',
    authorityColor: '#10B981',
    description:
      'Official unified contract of sale binding Buyer, Seller, and Broker with 10% escrow security.',
    deliverableResultToken: 'FORM_F_EXECUTED_DEPOSIT_LOCKED',
    steps: [
      {
        stepNumber: 1,
        title: 'Transactional Asset & Counterparty Binding',
        description: 'Link buyer, seller, broker licenses, and title deed record.',
        authority: 'DLD',
        fields: [
          {
            key: 'contractNumber',
            label: 'Form F Unified Contract ID',
            defaultValue: 'WC-MOU-2026-781',
            placeholder: 'MOU ID',
          },
          {
            key: 'salePriceAED',
            label: 'Agreed Final Sale Price (AED)',
            defaultValue: '25000000',
            placeholder: 'Price AED',
          },
          {
            key: 'transferDate',
            label: 'Target DLD Trustee Transfer Date',
            defaultValue: '2026-03-15',
            placeholder: 'YYYY-MM-DD',
          },
        ],
      },
      {
        stepNumber: 2,
        title: '10% Escrow Security Cheque Intake',
        description: 'Deposit 10% manager cheque payable to the seller in escrow custody.',
        authority: 'CENTRAL_BANK',
        fields: [
          {
            key: 'depositChequeNumber',
            label: 'Manager Cheque Number',
            defaultValue: 'CHQ-MGR-99201',
            placeholder: 'Cheque Number',
          },
          {
            key: 'depositAmountAED',
            label: '10% Deposit Amount (AED)',
            defaultValue: '2500000',
            placeholder: 'Deposit AED',
          },
          {
            key: 'issuingBank',
            label: 'Issuing UAE Central Bank Entity',
            defaultValue: 'Emirates NBD',
            placeholder: 'Bank Name',
          },
        ],
      },
    ],
  },

  ...(LEASING_AND_TAX_STATUTORY_FLOWS as Record<StatutoryFlowType, StatutoryFlowConfig>),
};
