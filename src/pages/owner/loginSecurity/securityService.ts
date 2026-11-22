import { authFetch } from '../../../utils/authFetch';
import type { AttemptsResponse, LoginAttempt } from './types';

export const exportAttemptsToCsv = (attempts: LoginAttempt[], status: string): number => {
  if (attempts.length === 0) {
    return 0;
  }
  const escape = (v: unknown): string => {
    const s = v == null ? '' : String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = ['timestamp', 'action', 'email', 'reason', 'ip', 'userAgent', 'description'];
  const rows = attempts.map((a) => {
    const md = (a.metadata || {}) as Record<string, unknown>;
    return [
      new Date(a.createdAt).toISOString(),
      a.action,
      a.user?.email || (md.emailAttempt as string | undefined) || '',
      (md.reason as string | undefined) || '',
      (md.ip as string | undefined) || '',
      (md.userAgent as string | undefined) || '',
      a.description,
    ].map(escape).join(',');
  });
  const csv = [header.join(','), ...rows].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  link.href = url;
  link.download = `login-security-${status}-${stamp}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return attempts.length;
};

export const fetchLoginAttempts = async (params: {
  status: string;
  sinceMinutes: number;
  emailFilter: string;
  signal?: AbortSignal;
}): Promise<AttemptsResponse> => {
  const query = new URLSearchParams();
  query.set('status', params.status);
  query.set('sinceMinutes', String(params.sinceMinutes));
  query.set('limit', '100');
  if (params.emailFilter.trim()) {
    query.set('email', params.emailFilter.trim());
  }
  const res = await authFetch(`/api/auth/security/login-attempts?${query.toString()}`, { signal: params.signal });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const fetchSecurityStats = async (sinceMinutes: number, signal?: AbortSignal) => {
  const res = await authFetch(`/api/auth/security/stats?sinceMinutes=${sinceMinutes}`, { signal });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data || null;
};

export const fetchActiveLockoutsApi = async (signal?: AbortSignal) => {
  const res = await authFetch('/api/auth/security/active-lockouts', { signal });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json?.data || null;
};

export const unlockTarget = async (payload: { userId?: string; email?: string }) => {
  const res = await authFetch('/api/auth/security/unlock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Unlock failed: ${res.status} ${text}`);
  }
  return res.json();
};

export const unlockIpAddress = async (ip: string) => {
  const res = await authFetch('/api/auth/security/unlock-ip', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ip }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Unlock IP failed: ${res.status} ${text}`);
  }
  return res.json();
};
