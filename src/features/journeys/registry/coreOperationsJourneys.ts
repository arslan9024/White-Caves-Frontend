/**
 * Core Onboarding & Deal Operations Journeys
 * Journeys: Property Onboarding, Landlord Onboarding, Tenant Onboarding,
 * Leasing Deal Creation, Contract Digital Signing, Payment Collection,
 * Ejari Registration, Property Handover, Tenancy Renewal.
 */

import { JourneyDefinition } from '../../../types/journey';

export const CORE_OPERATIONS_JOURNEYS: Record<string, JourneyDefinition> = {
  // 2. Property Onboarding
  'property-onboarding': {
    id: 'property-onboarding',
    title: 'Property Onboarding',
    category: 'property',
    family: 'Property Journeys',
    icon: '🏠',
    description:
      'Capture unit details, deed verification, floor plans, specs, and assign designated listing agent.',
    estimatedMinutes: 5,
    steps: [
      {
        id: 'basics',
        title: 'Basic Information',
        type: 'form',
        requiredFields: ['title', 'propertyType', 'community'],
      },
      {
        id: 'ownership',
        title: 'Ownership & Deed',
        type: 'entity-review',
        requiredFields: ['titleDeedNo', 'ownerId'],
      },
      { id: 'specs', title: 'Specifications & Amenities', type: 'form' },
      { id: 'media', title: 'Photos & Media', type: 'checklist' },
      { id: 'review', title: 'Review & Publish', type: 'smart-review' },
      { id: 'result', title: 'Property Onboarded', type: 'result' },
    ],
  },

  // 3. Landlord Onboarding
  'landlord-onboarding': {
    id: 'landlord-onboarding',
    title: 'Landlord Onboarding',
    category: 'landlord',
    family: 'Landlord Journeys',
    icon: '👤',
    description:
      'Complete landlord KYC, Emirates ID/Passport verification, bank account details for rent remittance, and Form A agreement.',
    estimatedMinutes: 4,
    steps: [
      {
        id: 'contact',
        title: 'Contact Details',
        type: 'form',
        requiredFields: ['name', 'email', 'phone'],
      },
      {
        id: 'kyc',
        title: 'KYC & ID Verification',
        type: 'checklist',
        requiredFields: ['emiratesId'],
      },
      {
        id: 'banking',
        title: 'Bank Account Details',
        type: 'form',
        requiredFields: ['iban', 'bankName'],
      },
      { id: 'review', title: 'Review Profile', type: 'smart-review' },
      { id: 'result', title: 'Landlord Approved', type: 'result' },
    ],
  },

  // 4. Tenant Onboarding
  'tenant-onboarding': {
    id: 'tenant-onboarding',
    title: 'Tenant Onboarding',
    category: 'tenant',
    family: 'Tenant Journeys',
    icon: '👤',
    description:
      'Onboard prospective tenant, verify employment/visa, passport, Emirates ID, and pre-screen affordability.',
    estimatedMinutes: 4,
    steps: [
      {
        id: 'profile',
        title: 'Tenant Profile',
        type: 'form',
        requiredFields: ['name', 'email', 'phone'],
      },
      { id: 'documents', title: 'Identity & Visa', type: 'checklist' },
      { id: 'preferences', title: 'Leasing Preferences', type: 'form' },
      { id: 'review', title: 'Screening Review', type: 'smart-review' },
      { id: 'result', title: 'Tenant Onboarded', type: 'result' },
    ],
  },

  // 5. Leasing Deal Creation
  'leasing-deal-creation': {
    id: 'leasing-deal-creation',
    title: 'Create Leasing Deal',
    category: 'leasing',
    family: 'Leasing Journeys',
    icon: '🔑',
    description:
      'Convert an accepted offer into an active deal pipeline with commission calculation, agency fee, and milestones.',
    estimatedMinutes: 3,
    steps: [
      { id: 'parties', title: 'Property & Parties', type: 'entity-selection' },
      { id: 'financials', title: 'Financial Terms', type: 'form' },
      { id: 'commission', title: 'Agency Commission', type: 'form' },
      { id: 'review', title: 'Confirm Deal', type: 'smart-review' },
      { id: 'result', title: 'Deal Active', type: 'result' },
    ],
  },

  // 6. Contract Signing
  'contract-signing': {
    id: 'contract-signing',
    title: 'Contract Digital Signing',
    category: 'leasing',
    family: 'Leasing Journeys',
    icon: '✍️',
    description:
      'Dispatch tenancy agreement to Landlord and Tenant via UAE PASS / DocuSign and track real-time signature audit trail.',
    estimatedMinutes: 2,
    steps: [
      { id: 'contract-select', title: 'Select Contract', type: 'entity-selection' },
      { id: 'signers', title: 'Verify Signatories', type: 'entity-review' },
      { id: 'dispatch', title: 'Dispatch Invitations', type: 'processing' },
      { id: 'result', title: 'Signing Active', type: 'result' },
    ],
  },

  // 7. Payment Collection
  'payment-collection': {
    id: 'payment-collection',
    title: 'Payment & Cheque Collection',
    category: 'leasing',
    family: 'Finance Journeys',
    icon: '💰',
    description:
      'Record rent post-dated cheques (PDCs), security deposit receipt, VAT invoice generation, and custodial escrow tracking.',
    estimatedMinutes: 4,
    steps: [
      { id: 'contract-ref', title: 'Contract Reference', type: 'entity-selection' },
      { id: 'deposit', title: 'Security Deposit', type: 'form' },
      { id: 'cheques', title: 'Post-Dated Cheques (PDC)', type: 'checklist' },
      { id: 'receipt', title: 'Generate Receipts & Invoice', type: 'smart-review' },
      { id: 'result', title: 'Payments Recorded', type: 'result' },
    ],
  },

  // 8. Create Ejari
  'create-ejari': {
    id: 'create-ejari',
    title: 'Ejari Registration',
    category: 'compliance',
    family: 'Compliance Journeys',
    icon: '🏛️',
    description:
      'Register official tenancy contract with Dubai Land Department (DLD) REST API / Ejari portal and obtain Ejari certificate.',
    estimatedMinutes: 3,
    steps: [
      { id: 'prerequisites', title: 'Ejari Prerequisites Check', type: 'checklist' },
      { id: 'dld-payload', title: 'Review DLD Payload', type: 'smart-review' },
      { id: 'submission', title: 'Submit to DLD', type: 'processing' },
      { id: 'result', title: 'Ejari Registered', type: 'result' },
    ],
  },

  // 9. Property Handover
  'property-handover': {
    id: 'property-handover',
    title: 'Property Handover & Move-In',
    category: 'property-management',
    family: 'Property Management Journeys',
    icon: '🚪',
    description:
      'Conduct move-in snagging inspection, record DEWA meter readings, inventory check, and hand over access keys/cards.',
    estimatedMinutes: 5,
    steps: [
      { id: 'handover-details', title: 'Handover Appointment', type: 'form' },
      { id: 'snagging', title: 'Inspection & Meter Readings', type: 'checklist' },
      { id: 'keys', title: 'Key & Access Handover', type: 'checklist' },
      { id: 'signoff', title: 'Tenant Sign-Off', type: 'smart-review' },
      { id: 'result', title: 'Handover Complete', type: 'result' },
    ],
  },

  // 10. Tenancy Renewal
  'tenancy-renewal': {
    id: 'tenancy-renewal',
    title: 'Tenancy Contract Renewal',
    category: 'leasing',
    family: 'Leasing Journeys',
    icon: '🔄',
    description:
      'Check RERA Rental Index calculator allowable increase, dispatch 90-day renewal notice, negotiate terms, and renew agreement.',
    estimatedMinutes: 4,
    steps: [
      { id: 'current-lease', title: 'Current Lease Check', type: 'entity-selection' },
      { id: 'rera-index', title: 'RERA Rental Index Evaluation', type: 'form' },
      { id: 'terms-update', title: 'Updated Renewal Terms', type: 'form' },
      { id: 'review', title: 'Review Renewal', type: 'smart-review' },
      { id: 'result', title: 'Renewal Dispatched', type: 'result' },
    ],
  },
};
