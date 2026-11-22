/**
 * Document Auto-Fill Types & Entity Registry
 */

export interface AutoFillContext {
  leadId?: string;
  propertyId?: string;
  transactionId?: string;
  commissionId?: string;
  viewingId?: string;
  leaseId?: string;
  offerId?: string;
}

export interface AutoFillResult {
  variables: Record<string, string>;
  context: {
    type: string;
    entitiesUsed: string[];
    clauseSelections: Record<string, string>;
    missingFields: string[];
  };
}

export interface AutoFillableEntity {
  type: string;
  label: string;
  requiredEntities: string[];
  optionalEntities: string[];
}

/**
 * Maps document types → which entities they need for auto-fill.
 */
export const DOCUMENT_ENTITY_MAP: Record<string, AutoFillableEntity> = {
  mou: {
    type: 'mou',
    label: 'Memorandum of Understanding',
    requiredEntities: ['lead', 'property'],
    optionalEntities: ['transaction'],
  },
  form_f: {
    type: 'form_f',
    label: 'Form F — Tenancy Contract',
    requiredEntities: ['lead', 'property'],
    optionalEntities: ['lease'],
  },
  noc: {
    type: 'noc',
    label: 'No Objection Certificate',
    requiredEntities: ['property'],
    optionalEntities: ['lead', 'transaction'],
  },
  commission_invoice: {
    type: 'commission_invoice',
    label: 'Commission Invoice',
    requiredEntities: ['commission'],
    optionalEntities: ['lead', 'property'],
  },
  viewing_report: {
    type: 'viewing_report',
    label: 'Property Viewing Report',
    requiredEntities: ['lead', 'property'],
    optionalEntities: ['viewing'],
  },
  offer_letter: {
    type: 'offer_letter',
    label: 'Property Offer Letter',
    requiredEntities: ['lead', 'property'],
    optionalEntities: ['offer'],
  },
};
