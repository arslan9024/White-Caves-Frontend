import { useState, useCallback, useEffect } from 'react';
import type { LoginAttempt, SecurityStats, ActiveLockouts, AttemptStatus } from './types';
import {
  fetchLoginAttempts,
  fetchSecurityStats,
  fetchActiveLockoutsApi,
  unlockTarget,
  unlockIpAddress,
  exportAttemptsToCsv,
} from './securityService';
import { createLogger } from '../../../utils/logger';

const log = createLogger('useLoginSecurity');

export const useLoginSecurity = () => {
  const [status, setStatus] = useState<AttemptStatus>('all');
  const [sinceMinutes, setSinceMinutes] = useState<number>(24 * 60);
  const [emailFilter, setEmailFilter] = useState<string>('');
  const [attempts, setAttempts] = useState<LoginAttempt[]>([]);
  const [stats, setStats] = useState<SecurityStats | null>(null);
  const [activeLockouts, setActiveLockouts] = useState<ActiveLockouts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unlockingId, setUnlockingId] = useState<string | null>(null);
  const [unlockingIp, setUnlockingIp] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fetchAttempts = useCallback(
    async (signal?: AbortSignal): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const json = await fetchLoginAttempts({ status, sinceMinutes, emailFilter, signal });
        setAttempts(json.data || []);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        log.error('Failed to fetch login attempts', err);
        const msg = err instanceof Error ? err.message : 'Failed to load login attempts.';
        setError(msg.startsWith('Request failed:') ? msg : 'Failed to load login attempts.');
      } finally {
        setLoading(false);
      }
    },
    [status, sinceMinutes, emailFilter]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchAttempts(controller.signal);
    return () => controller.abort();
  }, [fetchAttempts]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const data = await fetchSecurityStats(sinceMinutes, controller.signal);
        setStats(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        log.error('Failed to fetch security stats', err);
      }
    })();
    return () => controller.abort();
  }, [sinceMinutes]);

  const fetchActiveLockouts = useCallback(async (signal?: AbortSignal): Promise<void> => {
    try {
      const data = await fetchActiveLockoutsApi(signal);
      if (data && Array.isArray(data.accounts) && Array.isArray(data.ips)) {
        setActiveLockouts(data);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      log.error('Failed to fetch active lockouts', err);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchActiveLockouts(controller.signal);
    return () => controller.abort();
  }, [fetchActiveLockouts, sinceMinutes]);

  const handleUnlock = async (target: LoginAttempt): Promise<void> => {
    const userId = target.userId;
    const email =
      (target.user?.email || (target.metadata?.emailAttempt as string | undefined)) ?? null;
    if (!userId && !email) {
      setToast('Cannot unlock — no user identifier on this row.');
      return;
    }
    if (!window.confirm(`Unlock ${email || userId}? This clears their recent failed attempts.`)) {
      return;
    }
    try {
      setUnlockingId(target.id);
      const payload: { userId?: string; email?: string } = {};
      if (userId) {
        payload.userId = userId;
      } else if (email) {
        payload.email = email;
      }
      const json = await unlockTarget(payload);
      setToast(
        `Unlocked ${json.data?.email ?? email}; cleared ${json.data?.clearedFailures ?? 0} failures.`
      );
      await fetchAttempts();
      await fetchActiveLockouts();
    } catch (err: unknown) {
      log.error('Unlock request failed', err);
      const msg = err instanceof Error ? err.message : 'Unlock failed (network error).';
      setToast(msg.startsWith('Unlock failed:') ? msg : 'Unlock failed (network error).');
    } finally {
      setUnlockingId(null);
    }
  };

  const handleUnlockIp = async (ip: string): Promise<void> => {
    if (!ip) return;
    if (!window.confirm(`Unlock IP ${ip}? This clears recent failed attempts from this address.`)) {
      return;
    }
    try {
      setUnlockingIp(ip);
      const json = await unlockIpAddress(ip);
      setToast(`Unlocked IP ${ip}; cleared ${json.data?.clearedFailures ?? 0} failures.`);
      await fetchAttempts();
      await fetchActiveLockouts();
    } catch (err: unknown) {
      log.error('Unlock IP request failed', err);
      const msg = err instanceof Error ? err.message : 'Unlock IP failed (network error).';
      setToast(msg.startsWith('Unlock IP failed:') ? msg : 'Unlock IP failed (network error).');
    } finally {
      setUnlockingIp(null);
    }
  };

  const handleUnlockAccount = async (userId: string, email: string | null): Promise<void> => {
    const label = email || userId;
    if (!window.confirm(`Unlock ${label}? This clears their recent failed attempts.`)) return;
    try {
      setUnlockingId(userId);
      const json = await unlockTarget({ userId });
      setToast(
        `Unlocked ${json.data?.email ?? label}; cleared ${json.data?.clearedFailures ?? 0} failures.`
      );
      await fetchAttempts();
      await fetchActiveLockouts();
    } catch (err: unknown) {
      log.error('Unlock (active) request failed', err);
      const msg = err instanceof Error ? err.message : 'Unlock failed (network error).';
      setToast(msg.startsWith('Unlock failed:') ? msg : 'Unlock failed (network error).');
    } finally {
      setUnlockingId(null);
    }
  };

  const handleExportCsv = (): void => {
    const count = exportAttemptsToCsv(attempts, status);
    if (count === 0) {
      setToast('No rows to export.');
    } else {
      setToast(`Exported ${count} row(s).`);
    }
  };

  return {
    status,
    setStatus,
    sinceMinutes,
    setSinceMinutes,
    emailFilter,
    setEmailFilter,
    attempts,
    stats,
    activeLockouts,
    loading,
    error,
    unlockingId,
    unlockingIp,
    toast,
    fetchAttempts,
    handleUnlock,
    handleUnlockIp,
    handleUnlockAccount,
    handleExportCsv,
  };
};
