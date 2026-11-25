/**
 * PendingOfferCard.tsx — Pending tenant offer review card with Reject & Counter forms
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { FC } from 'react';
import { CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import type { OfferEntry } from './offerReview.types';

interface PendingOfferCardProps {
  offer: OfferEntry;
  isActive: boolean;
  actionType: 'reject' | 'counter' | null;
  rejectionReason: string;
  onRejectionReasonChange: (value: string) => void;
  counterAmount: string;
  onCounterAmountChange: (value: string) => void;
  submitting: boolean;
  onAccept: (offerId: string) => void;
  onOpenAction: (offerId: string, type: 'reject' | 'counter') => void;
  onConfirmReject: (offerId: string) => void;
  onConfirmCounter: (offerId: string) => void;
  onCancelAction: () => void;
}

export const PendingOfferCard: FC<PendingOfferCardProps> = ({
  offer,
  isActive,
  actionType,
  rejectionReason,
  onRejectionReasonChange,
  counterAmount,
  onCounterAmountChange,
  submitting,
  onAccept,
  onOpenAction,
  onConfirmReject,
  onConfirmCounter,
  onCancelAction,
}) => (
  <div className="payment-row offer-card" data-testid={`offer-card-${offer.id}`}>
    <div className="offer-info">
      <strong>{offer.propertyTitle}</strong>
      <p>Tenant: {offer.tenantName}</p>
      <p>Offered Rent: AED {offer.amount.toLocaleString()} / month</p>
      <p>Terms: {offer.terms}</p>
      <p>Expires: {offer.expiresAt}</p>
    </div>

    <div className="offer-actions">
      <button
        type="button"
        className="btn-primary"
        onClick={() => onAccept(offer.id)}
        disabled={submitting}
        data-testid={`accept-offer-${offer.id}`}
      >
        <CheckCircle2 size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
        Accept
      </button>
      <button
        type="button"
        className="btn-secondary"
        onClick={() => onOpenAction(offer.id, 'counter')}
        disabled={submitting}
        data-testid={`counter-offer-${offer.id}`}
      >
        <RefreshCw size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
        Counter
      </button>
      <button
        type="button"
        className="btn-danger"
        onClick={() => onOpenAction(offer.id, 'reject')}
        disabled={submitting}
        data-testid={`reject-offer-${offer.id}`}
      >
        <XCircle size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
        Reject
      </button>
    </div>

    {isActive && actionType === 'reject' && (
      <div className="action-form" data-testid={`reject-form-${offer.id}`}>
        <label htmlFor={`rejection-reason-${offer.id}`}>Rejection Reason (required)</label>
        <input
          id={`rejection-reason-${offer.id}`}
          type="text"
          placeholder="e.g. Rent too low, preferred longer lease"
          value={rejectionReason}
          onChange={e => onRejectionReasonChange(e.target.value)}
          data-testid={`rejection-reason-input-${offer.id}`}
        />
        <div className="form-actions">
          <button
            type="button"
            className="btn-danger"
            disabled={!rejectionReason.trim()}
            onClick={() => onConfirmReject(offer.id)}
            data-testid={`confirm-reject-${offer.id}`}
          >
            Confirm Rejection
          </button>
          <button type="button" className="btn-secondary" onClick={onCancelAction}>
            Cancel
          </button>
        </div>
      </div>
    )}

    {isActive && actionType === 'counter' && (
      <div className="action-form" data-testid={`counter-form-${offer.id}`}>
        <label htmlFor={`counter-amount-${offer.id}`}>Counter Offer Amount (AED/month)</label>
        <input
          id={`counter-amount-${offer.id}`}
          type="number"
          placeholder="e.g. 8000"
          min="1"
          value={counterAmount}
          onChange={e => onCounterAmountChange(e.target.value)}
          data-testid={`counter-amount-input-${offer.id}`}
        />
        <div className="form-actions">
          <button
            type="button"
            className="btn-primary"
            disabled={!counterAmount || parseFloat(counterAmount) <= 0}
            onClick={() => onConfirmCounter(offer.id)}
            data-testid={`confirm-counter-${offer.id}`}
          >
            Send Counter Offer
          </button>
          <button type="button" className="btn-secondary" onClick={onCancelAction}>
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>
);

export default PendingOfferCard;
