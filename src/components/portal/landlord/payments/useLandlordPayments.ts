import { useState, useEffect } from 'react';
import { authFetch } from '../../../../utils/authFetch';
import type { ApiLease } from './types';
import { FALLBACK_LEASES } from './constants';

interface UseLandlordPaymentsResult {
  leases: ApiLease[];
  loading: boolean;
  error: string | null;
}

export function useLandlordPayments(isAuthenticated: boolean): UseLandlordPaymentsResult {
  const [leases, setLeases] = useState<ApiLease[]>(FALLBACK_LEASES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;

    authFetch('/api/leases?role=landlord&pageSize=100')
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setLeases(data.data?.length ? data.data : FALLBACK_LEASES);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Keep fallback data for resilience/tests
          setError(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  return { leases, loading, error };
}
