import React, { FC } from 'react';
import type { LoginAttempt } from './types';

interface AttemptsTableProps {
  loading: boolean;
  attempts: LoginAttempt[];
  unlockingId: string | null;
  onUnlock: (target: LoginAttempt) => void;
}

export const AttemptsTable: FC<AttemptsTableProps> = ({
  loading,
  attempts,
  unlockingId,
  onUnlock,
}) => {
  return (
    <section className="ls-table-wrap" aria-label="Login attempts">
      <table className="ls-table">
        <thead>
          <tr>
            <th>When</th>
            <th>Action</th>
            <th>User</th>
            <th>Reason</th>
            <th>IP</th>
            <th>User Agent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading && attempts.length === 0 && (
            <tr>
              <td colSpan={7} className="ls-empty">Loading…</td>
            </tr>
          )}
          {!loading && attempts.length === 0 && (
            <tr>
              <td colSpan={7} className="ls-empty">No attempts in the selected window.</td>
            </tr>
          )}
          {attempts.map((row) => {
            const md = (row.metadata || {}) as Record<string, unknown>;
            const reason = (md.reason as string | undefined) || (row.action === 'login' ? 'success' : '—');
            const ip = (md.ip as string | undefined) || '—';
            const ua = (md.userAgent as string | undefined) || '—';
            const isFailed = row.action === 'login_failed';
            const canUnlock = isFailed && (row.userId || row.user?.email || md.emailAttempt);
            return (
              <tr key={row.id} className={`ls-row ls-row-${row.action}`}>
                <td>{new Date(row.createdAt).toLocaleString()}</td>
                <td>
                  <span className={`ls-badge ls-badge-${row.action}`}>{row.action}</span>
                </td>
                <td>
                  {row.user?.email || (md.emailAttempt as string | undefined) || '—'}
                  {row.user?.role && <small className="ls-role">{row.user.role}</small>}
                </td>
                <td>{reason}</td>
                <td>{ip}</td>
                <td className="ls-ua" title={ua}>{ua}</td>
                <td>
                  {canUnlock ? (
                    <button
                      type="button"
                      className="ls-unlock"
                      onClick={() => onUnlock(row)}
                      disabled={unlockingId === row.id}
                    >
                      {unlockingId === row.id ? 'Unlocking…' : 'Unlock'}
                    </button>
                  ) : (
                    <span className="ls-muted">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
