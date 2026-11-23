/**
 * Flagship Journey: Prepare Tenancy Contract
 * Category: Leasing
 */

import { JourneyDefinition } from '../../../types/journey';

export const prepareTenancyContractJourney: JourneyDefinition = {
  id: 'prepare-tenancy-contract',
  title: 'Prepare Tenancy Contract',
  category: 'leasing',
  family: 'Leasing Journeys',
  icon: '📄',
  description:
    'Guided mission to assemble verified property, landlord, tenant, contract terms, and required documents into an official Dubai tenancy contract.',
  estimatedMinutes: 4,
  defaultData: {
    propertyId: 'prop_damac_sycamore_131',
    propertyName: 'Sycamore 131',
    community: 'DAMAC Hills 2',
    propertyType: '3 Bedroom Townhouse',
    plotArea: '1,882 sqft',
    buaArea: '2,460 sqft',
    propertyVerified: true,

    landlordId: 'landlord_arslan_malik',
    landlordName: 'Arslan Malik',
    landlordEmail: 'arslan.malik@example.com',
    landlordPhone: '+971 50 123 4567',
    landlordEmiratesId: '784-1988-1234567-1',
    landlordVerified: true,

    tenantId: 'tenant_sarah_jenkins',
    tenantName: 'Sarah Jenkins',
    tenantEmail: 'sarah.jenkins@example.com',
    tenantPhone: '+971 52 987 6543',
    tenantPassportNo: 'N8472910',
    tenantEmiratesId: '784-1992-7654321-2',
    tenantVerified: true,

    annualRent: 95000,
    chequesCount: 2,
    securityDepositPct: 5,
    startDate: '2026-09-01',
    endDate: '2027-08-31',
    usageType: 'Residential',

    documents: {
      landlordEmiratesId: true,
      tenantPassport: true,
      tenantEmiratesId: true,
      titleDeed: true,
      tradeLicense: false,
      previousContract: false,
    },
  },
  steps: [
    {
      id: 'property',
      title: 'Property Selection',
      shortLabel: 'Property',
      description: 'Identify and verify the subject property unit and linked ownership.',
      type: 'entity-selection',
      milestoneTag: 'Property Verified',
      requiredFields: ['propertyName', 'community'],
      validate: data => {
        const issues = [];
        if (!data.propertyName) {
          issues.push({
            id: 'prop-missing-name',
            stepId: 'property',
            field: 'propertyName',
            title: 'Property Not Selected',
            description: 'Please search and link an active property unit.',
            actionLabel: 'Select Property',
            severity: 'error' as const,
          });
        }
        return issues;
      },
    },
    {
      id: 'landlord',
      title: 'Landlord Verification',
      shortLabel: 'Landlord',
      description: 'Review and verify the property owner KYC and contact record.',
      type: 'entity-review',
      milestoneTag: 'Landlord Verified',
      requiredFields: ['landlordName', 'landlordEmail', 'landlordPhone', 'landlordEmiratesId'],
      validate: data => {
        const issues = [];
        if (!data.landlordEmail) {
          issues.push({
            id: 'landlord-missing-email',
            stepId: 'landlord',
            field: 'landlordEmail',
            title: 'Landlord Email Missing',
            description:
              'Landlord email is required to dispatch contract for electronic signature.',
            actionLabel: 'Add Landlord Email',
            severity: 'error' as const,
          });
        }
        return issues;
      },
    },
    {
      id: 'tenant',
      title: 'Tenant Verification',
      shortLabel: 'Tenant',
      description: 'Verify the prospective tenant identity, passport, and Emirates ID.',
      type: 'entity-review',
      milestoneTag: 'Tenant Verified',
      requiredFields: ['tenantName', 'tenantEmail', 'tenantPhone', 'tenantEmiratesId'],
      validate: data => {
        const issues = [];
        if (!data.tenantEmiratesId && !data.tenantPassportNo) {
          issues.push({
            id: 'tenant-missing-id',
            stepId: 'tenant',
            field: 'tenantEmiratesId',
            title: 'Tenant ID Document Missing',
            description: 'Either Emirates ID or Passport is mandatory under RERA.',
            actionLabel: 'Add Tenant ID',
            severity: 'error' as const,
          });
        }
        return issues;
      },
    },
    {
      id: 'terms',
      title: 'Contract Terms',
      shortLabel: 'Terms',
      description: 'Specify rent amount, payment schedule, cheque distribution, and dates.',
      type: 'form',
      milestoneTag: 'Deal Terms Finalized',
      requiredFields: ['annualRent', 'chequesCount', 'startDate', 'endDate'],
      validate: data => {
        const issues = [];
        if (!data.annualRent || Number(data.annualRent) <= 0) {
          issues.push({
            id: 'terms-zero-rent',
            stepId: 'terms',
            field: 'annualRent',
            title: 'Annual Rent Required',
            description: 'Annual rent must be greater than AED 0.',
            actionLabel: 'Enter Rent Amount',
            severity: 'error' as const,
          });
        }
        if (new Date(data.endDate) <= new Date(data.startDate)) {
          issues.push({
            id: 'terms-invalid-dates',
            stepId: 'terms',
            field: 'endDate',
            title: 'Invalid Tenancy Period',
            description: 'End date must be after the tenancy start date.',
            actionLabel: 'Adjust Dates',
            severity: 'error' as const,
          });
        }
        return issues;
      },
    },
    {
      id: 'documents',
      title: 'Required Documents',
      shortLabel: 'Documents',
      description: 'Verify essential compliance documents checklist before document generation.',
      type: 'checklist',
      milestoneTag: 'Documents Complete',
      validate: data => {
        const issues = [];
        const docs = data.documents || {};
        if (!docs.landlordEmiratesId) {
          issues.push({
            id: 'doc-missing-landlord-eid',
            stepId: 'documents',
            title: 'Landlord Emirates ID Required',
            description: 'Upload or confirm Landlord Emirates ID copy.',
            actionLabel: 'Verify Landlord EID',
            severity: 'error' as const,
          });
        }
        if (!docs.tenantEmiratesId && !docs.tenantPassport) {
          issues.push({
            id: 'doc-missing-tenant-id',
            stepId: 'documents',
            title: 'Tenant ID Document Required',
            description: 'Upload Tenant Passport or Emirates ID copy.',
            actionLabel: 'Verify Tenant ID',
            severity: 'error' as const,
          });
        }
        return issues;
      },
    },
    {
      id: 'review',
      title: 'Smart Review',
      shortLabel: 'Review',
      description: 'High-confidence review of all entity parameters and clauses.',
      type: 'smart-review',
    },
    {
      id: 'processing',
      title: 'Generating Contract',
      shortLabel: 'Generate',
      description: 'Executing document generation, clause compilation, and RERA formatting.',
      type: 'processing',
    },
    {
      id: 'result',
      title: 'Tenancy Contract Ready',
      shortLabel: 'Outcome',
      description: 'Contract generated and ready for digital dispatch, signature, and Ejari.',
      type: 'result',
    },
  ],
};
