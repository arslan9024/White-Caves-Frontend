/**
 * LandlordOfferReviewTab — Offer Review: Approve / Reject / Counter Tenant Offers
 * Wired to live API — GET /api/offers/received, PATCH /api/offers/:id.
 * Decomposed under AEGIS V5.1 AEG-042 (< 350 lines) with backwards-compatible exports.
 */

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import '../../../pages/RolePages.css';
import { PendingOfferCard, useLandlordOffers } from './offerReview';

export * from './offerReview';

const LandlordOfferReviewTab: FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const state = useLandlordOffers(Boolean(currentUser));

  if (!currentUser) {
    return (
      <div className="empty-state">
        <p>You must be logged in to review offers.</p>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="tab-content-section">
        <p className="empty-state-text">Loading offers…</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="tab-content-section">
        <p className="empty-state-text" style={{ color: 'var(--error-red, #ef4444)' }}>
          {state.error}
        </p>
      </div>
    );
  }

  return (
    <div className="tab-content-section landlord-offer-review-tab">
      <div className="tab-header">
        <h3>Offer Review</h3>
        <p>Review, approve, reject, or counter incoming lease offers on your properties.</p>
      </div>

      <div className="summary-grid" data-testid="offer-review-summary">
        <div className="summary-card">
          <h4>Pending Review</h4>
          <p>{state.pendingOffers.length}</p>
        </div>
        <div className="summary-card">
          <h4>Accepted</h4>
          <p>{state.offers.filter(o => o.status === 'accepted').length}</p>
        </div>
        <div className="summary-card">
          <h4>Countered</h4>
          <p>{state.offers.filter(o => o.status === 'countered').length}</p>
        </div>
        <div className="summary-card">
          <h4>Rejected</h4>
          <p>{state.offers.filter(o => o.status === 'rejected').length}</p>
        </div>
      </div>

      {state.pendingOffers.length > 0 && (
        <section data-testid="pending-offers-section">
          <h4>Pending Offers</h4>
          {state.pendingOffers.map(offer => (
            <PendingOfferCard
              key={offer.id}
              offer={offer}
              isActive={state.activeOfferId === offer.id}
              actionType={state.actionType}
              rejectionReason={state.rejectionReason}
              onRejectionReasonChange={state.setRejectionReason}
              counterAmount={state.counterAmount}
              onCounterAmountChange={state.setCounterAmount}
              submitting={state.submitting}
              onAccept={state.handleAccept}
              onOpenAction={state.openAction}
              onConfirmReject={state.handleReject}
              onConfirmCounter={state.handleCounter}
              onCancelAction={state.cancelAction}
            />
          ))}
        </section>
      )}

      {state.decidedOffers.length > 0 && (
        <section data-testid="decided-offers-section">
          <h4>Previous Decisions</h4>
          {state.decidedOffers.map(offer => (
            <div
              key={offer.id}
              className="payment-row offer-card"
              data-testid={`decided-offer-${offer.id}`}
            >
              <div className="offer-info">
                <strong>{offer.propertyTitle}</strong>
                <p>Tenant: {offer.tenantName}</p>
                <p>
                  Offered: AED {offer.amount.toLocaleString()} / month
                  {offer.counterAmount
                    ? ` → Counter: AED ${offer.counterAmount.toLocaleString()}`
                    : ''}
                </p>
                {offer.rejectionReason && <p>Reason: {offer.rejectionReason}</p>}
              </div>
              <div>
                <span className={`status-badge status-${offer.status}`}>{offer.status}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {state.offers.length === 0 && (
        <div className="empty-state" data-testid="no-offers-state">
          <p>No offers on your properties yet.</p>
        </div>
      )}
    </div>
  );
};

export default LandlordOfferReviewTab;
