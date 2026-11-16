/**
 * Contract Generator Page — Types Layer (Mary Allen Wilkes Architecture)
 * Strict typing for offer payloads, generated contracts, and step workflows
 */

export type ContractGenStep = 'preview' | 'review' | 'customize' | 'ready';

export interface OfferPayload {
  id: string;
  offerAmount: number;
  propertyTitle?: string;
  propertyAddress?: string;
  buyerName?: string;
  sellerName?: string;
  createdAt?: string;
}

export interface GeneratedContract {
  id: string;
  contractNumber: string;
  templateType: string;
  offerId: string;
  htmlContent?: string;
  status: string;
  downloadUrl?: string;
}

