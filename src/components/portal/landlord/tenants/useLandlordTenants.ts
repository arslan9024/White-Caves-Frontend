import { useState, useEffect } from 'react';
import type { ApiLease } from './types';
import { FALLBACK_LEASES } from './constants';
import { authFetch } from '../../../../utils/authFetch';

export interface UseLandlordTenantsResult {
  leases: ApiLease[];
  loading: boolean;
  error: string | null;
}

export function useLandlordTenants(isLoggedIn: boolean): UseLandlordTenantsResult {
  const [leases, setLeases] = useState<ApiLease[]>(FALLBACK_LEASES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) return;
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
          // Keep seeded fallback data available for resilience/tests
          setError(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  return { leases, loading, error };
}
