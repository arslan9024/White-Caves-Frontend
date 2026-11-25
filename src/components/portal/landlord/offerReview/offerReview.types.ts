/**
 * offerReview.types.ts — Data types and API mappers for LandlordOfferReviewTab
 * Single-purpose module (< 350 lines, AEG-042).
 */

export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'countered';

export interface OfferEntry {
  id: string;
  propertyTitle: string;
  tenantName: string;
  amount: number;
  currency: string;
  terms: string;
  expiresAt: string;
  status: OfferStatus;
  counterAmount?: number;
  rejectionReason?: string;
}

export interface ApiOffer {
  id: string;
  amount: number;
  terms: string | null;
  expiresAt: string | null;
  status: string;
  counterAmount: number | null;
  rejectionReason: string | null;
  property: {
    id: string;
    title: string;
    location: string;
  } | null;
  buyer: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export const apiOfferToEntry = (o: ApiOffer): OfferEntry => ({
  id: o.id,
  propertyTitle: o.property?.title ?? 'Unknown Property',
  tenantName: o.buyer?.name ?? 'Unknown Applicant',
  amount: o.amount ?? 0,
  currency: 'AED',
  terms: o.terms ?? '—',
  expiresAt: o.expiresAt
    ? new Date(o.expiresAt).toLocaleDateString('en-AE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '—',
  status: (['pending', 'accepted', 'rejected', 'countered'].includes(o.status)
    ? o.status
    : 'pending') as OfferStatus,
  counterAmount: o.counterAmount ?? undefined,
  rejectionReason: o.rejectionReason ?? undefined,
});
