import { StatutoryFlowType, StatutoryFlowDefinition } from './StatutoryWizards.types';

export const LEASING_AND_TAX_STATUTORY_FLOWS: Partial<
  Record<StatutoryFlowType, StatutoryFlowDefinition>
> = {
  EJARI_TENANCY_ATTESTATION: {
    flowType: 'EJARI_TENANCY_ATTESTATION',
    title: 'Ejari Tenancy Contract Registration & Attestation',
    code: 'DLD-EJARI',
    authorityBadge: 'EJARI SOVEREIGN',
    authorityColor: '#EC4899',
    description:
      'Mandatory government tenancy registration issuing the official Ejari certificate number.',
    deliverableResultToken: 'EJARI_CERTIFICATE_ISSUED',
    steps: [
      {
        stepNumber: 1,
        title: 'Tenancy Parameters & DEWA Premise Linking',
        description: 'Enter annual rent, lease dates, and 9-digit DEWA premise identifier.',
        authority: 'DLD',
        fields: [
          {
            key: 'annualRentAED',
            label: 'Annual Contract Rent (AED)',
            defaultValue: '180000',
            placeholder: 'Annual Rent',
          },
          {
            key: 'dewaPremiseNumber',
            label: '9-Digit DEWA Premise Number',
            defaultValue: '908234190',
            placeholder: 'Premise #',
          },
          {
            key: 'leaseStartDate',
            label: 'Lease Commencement Date',
            defaultValue: '2026-02-01',
            placeholder: 'YYYY-MM-DD',
          },
          {
            key: 'leaseEndDate',
            label: 'Lease Expiration Date',
            defaultValue: '2027-01-31',
            placeholder: 'YYYY-MM-DD',
          },
        ],
      },
      {
        stepNumber: 2,
        title: 'Payment Schedule & Cheque Frequency',
        description: 'Record post-dated cheque splits and security deposit collection.',
        authority: 'DLD',
        fields: [
          {
            key: 'numberOfCheques',
            label: 'Installment Frequency',
            defaultValue: '4',
            placeholder: '1, 2, 4, 6',
          },
          {
            key: 'securityDepositAED',
            label: 'Refundable Security Deposit (AED)',
            defaultValue: '9000',
            placeholder: 'Deposit AED',
          },
        ],
      },
    ],
  },

  PDC_CHEQUE_REGISTRATION: {
    flowType: 'PDC_CHEQUE_REGISTRATION',
    title: 'PDC Rental Cheque Ledger Registration',
    code: 'PDC-LEDGER',
    authorityBadge: 'BANKING CLEARED',
    authorityColor: '#F59E0B',
    description:
      'Register serial numbers, bank routing codes, maturity dates, and vaulted collection status.',
    deliverableResultToken: 'PDC_SCHEDULE_VAULTED_COMPLIANT',
    steps: [
      {
        stepNumber: 1,
        title: 'Cheque Inventory Ingestion',
        description: 'Record sequential cheques, issuing banks, and IBAN drawer details.',
        authority: 'CENTRAL_BANK',
        fields: [
          {
            key: 'bankName',
            label: 'Drawer UAE Bank Name',
            defaultValue: 'Dubai Islamic Bank',
            placeholder: 'Bank Name',
          },
          {
            key: 'firstChequeNumber',
            label: 'First Serial Cheque #',
            defaultValue: 'CHQ-1001',
            placeholder: 'e.g. CHQ-1001',
          },
          {
            key: 'chequeAmountAED',
            label: 'Per-Cheque Value (AED)',
            defaultValue: '45000',
            placeholder: 'Amount AED',
          },
        ],
      },
    ],
  },

  TITLE_DEED_VERIFICATION: {
    flowType: 'TITLE_DEED_VERIFICATION',
    title: 'DLD Sovereign Title Deed Attestation',
    code: 'DLD-TD-VAL',
    authorityBadge: 'DUBAI REST LEDGER',
    authorityColor: '#06B6D4',
    description: 'Instant cryptographic validation against Dubai Land Department digital ledger.',
    deliverableResultToken: 'TITLE_DEED_ATTESTED_VALID',
    steps: [
      {
        stepNumber: 1,
        title: 'Municipal Coordinate Verification',
        description:
          'Verify community master developer, area square footage, and title certificate.',
        authority: 'DLD',
        fields: [
          {
            key: 'titleDeedCertificate',
            label: 'Title Deed Certificate #',
            defaultValue: '2026/889104',
            placeholder: 'Certificate #',
          },
          {
            key: 'builtUpAreaSqft',
            label: 'Verified BUA (Sqft)',
            defaultValue: '4500',
            placeholder: 'BUA Area',
          },
          {
            key: 'mortgageStatus',
            label: 'Mortgage / Encumbrance Flag',
            defaultValue: 'CLEAR_NO_MORTGAGE',
            placeholder: 'Clear / Mortgaged',
          },
        ],
      },
    ],
  },

  FTA_VAT_TAX_INVOICE: {
    flowType: 'FTA_VAT_TAX_INVOICE',
    title: 'Federal Tax Authority (FTA) 5% VAT Tax Invoice',
    code: 'FTA-VAT-INV',
    authorityBadge: 'FTA UAE REGISTERED',
    authorityColor: '#8B5CF6',
    description:
      'Issue official UAE VAT Tax Invoice with White Caves 15-digit TRN and QR tax hash.',
    deliverableResultToken: 'FTA_TAX_INVOICE_POSTED_LEDGER',
    steps: [
      {
        stepNumber: 1,
        title: 'Taxable Supply & TRN Registration',
        description:
          'Calculate 5% standard VAT on brokerage commission and generate sequential tax invoice.',
        authority: 'FTA',
        fields: [
          {
            key: 'companyTRN',
            label: 'White Caves Tax Registration Number',
            defaultValue: '100-8923-4410-0003',
            placeholder: 'TRN 15 digits',
          },
          {
            key: 'grossCommissionAED',
            label: 'Taxable Service Commission (AED)',
            defaultValue: '9000',
            placeholder: 'Commission',
          },
          {
            key: 'vatAmountAED',
            label: '5% UAE VAT Amount (AED)',
            defaultValue: '450',
            placeholder: 'VAT 5%',
          },
          {
            key: 'totalInvoiceAED',
            label: 'Total Payable with VAT (AED)',
            defaultValue: '9450',
            placeholder: 'Gross Payable',
          },
        ],
      },
    ],
  },
};
