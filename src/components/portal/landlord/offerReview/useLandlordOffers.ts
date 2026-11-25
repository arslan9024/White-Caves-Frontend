/**
 * useLandlordOffers.ts — State & API controller hook for LandlordOfferReviewTab
 * Single-purpose module (< 350 lines, AEG-042).
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { authFetch } from '../../../../utils/authFetch';
import { createLogger } from '../../../../utils/logger';
import {
  apiOfferToEntry,
  type ApiOffer,
  type OfferEntry,
  type OfferStatus,
} from './offerReview.types';

const log = createLogger('LandlordOfferReviewTab');

export function useLandlordOffers(isAuthenticated: boolean) {
  const [offers, setOffers] = useState<OfferEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'reject' | 'counter' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [counterAmount, setCounterAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;

    authFetch('/api/offers/received')
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          const raw: ApiOffer[] = data.data ?? [];
          setOffers(raw.map(apiOfferToEntry));
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          log.error('Failed to load offers:', err);
          setError('Unable to load offers. Please refresh.');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const patchOffer = useCallback(
    async (
      offerId: string,
      body: Record<string, unknown>,
      optimisticUpdate: (prev: OfferEntry[]) => OfferEntry[]
    ) => {
      setSubmitting(true);
      setOffers(optimisticUpdate);
      try {
        const res = await authFetch(`/api/offers/${offerId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message ?? 'Request failed');
        }
      } catch (err) {
        log.error('Offer action failed, reverting:', err);
        setOffers(prev =>
          prev.map(o => (o.id === offerId ? { ...o, status: 'pending' as OfferStatus } : o))
        );
        setError('Action failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  const pendingOffers = useMemo(() => offers.filter(o => o.status === 'pending'), [offers]);
  const decidedOffers = useMemo(() => offers.filter(o => o.status !== 'pending'), [offers]);

  const handleAccept = useCallback(
    (offerId: string) => {
      void patchOffer(offerId, { status: 'accepted' }, prev =>
        prev.map(o => (o.id === offerId ? { ...o, status: 'accepted' as OfferStatus } : o))
      );
    },
    [patchOffer]
  );

  const handleReject = useCallback(
    (offerId: string) => {
      if (!rejectionReason.trim()) return;
      void patchOffer(offerId, { status: 'rejected', rejectionReason }, prev =>
        prev.map(o =>
          o.id === offerId ? { ...o, status: 'rejected' as OfferStatus, rejectionReason } : o
        )
      );
      setActiveOfferId(null);
      setActionType(null);
      setRejectionReason('');
    },
    [patchOffer, rejectionReason]
  );

  const handleCounter = useCallback(
    (offerId: string) => {
      const amount = parseFloat(counterAmount);
      if (!amount || amount <= 0) return;
      void patchOffer(offerId, { status: 'countered', counterAmount: amount }, prev =>
        prev.map(o =>
          o.id === offerId ? { ...o, status: 'countered' as OfferStatus, counterAmount: amount } : o
        )
      );
      setActiveOfferId(null);
      setActionType(null);
      setCounterAmount('');
    },
    [patchOffer, counterAmount]
  );

  const openAction = useCallback((offerId: string, type: 'reject' | 'counter') => {
    setActiveOfferId(offerId);
    setActionType(type);
    setRejectionReason('');
    setCounterAmount('');
  }, []);

  const cancelAction = useCallback(() => {
    setActiveOfferId(null);
    setActionType(null);
  }, []);

  return {
    offers,
    pendingOffers,
    decidedOffers,
    loading,
    error,
    activeOfferId,
    actionType,
    rejectionReason,
    setRejectionReason,
    counterAmount,
    setCounterAmount,
    submitting,
    handleAccept,
    handleReject,
    handleCounter,
    openAction,
    cancelAction,
  };
}
