import React, { FC } from 'react';
import type { ActiveLockouts } from './types';

interface ActiveLockoutsSectionProps {
  activeLockouts: ActiveLockouts;
  unlockingId: string | null;
  unlockingIp: string | null;
  onUnlockAccount: (userId: string, email: string | null) => void;
  onUnlockIp: (ip: string) => void;
}

export const ActiveLockoutsSection: FC<ActiveLockoutsSectionProps> = ({
  activeLockouts,
  unlockingId,
  unlockingIp,
  onUnlockAccount,
  onUnlockIp,
}) => {
  if (activeLockouts.accounts.length === 0 && activeLockouts.ips.length === 0) {
    return null;
  }

  return (
    <section className="ls-active-lockouts" aria-label="Currently active lockouts">
      <h2 className="ls-active-title">
        🔒 Active lockouts
        <span className="ls-muted ls-active-meta">
          {' '}({activeLockouts.windowMinutes}-min window · account ≥{activeLockouts.accountThreshold} · ip ≥{activeLockouts.ipThreshold})
        </span>
      </h2>
      <div className="ls-active-grid">
        {activeLockouts.accounts.length > 0 && (
          <div className="ls-active-col">
            <h3>Accounts ({activeLockouts.accounts.length})</h3>
            <ul>
              {activeLockouts.accounts.map((a) => (
                <li key={a.userId}>
                  <span>{a.email || a.userId}</span>
                  <span className="ls-muted">{a.failures} fails · {Math.ceil(a.retryAfterSeconds / 60)}m left</span>
                  <button
                    type="button"
                    className="ls-ip-unlock-btn"
                    onClick={() => onUnlockAccount(a.userId, a.email)}
                    disabled={unlockingId === a.userId}
                    aria-label={`Unlock account ${a.email || a.userId}`}
                  >
                    {unlockingId === a.userId ? 'Unlocking…' : 'Unlock'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeLockouts.ips.length > 0 && (
          <div className="ls-active-col">
            <h3>IPs ({activeLockouts.ips.length})</h3>
            <ul>
              {activeLockouts.ips.map((row) => (
                <li key={row.ip}>
                  <code>{row.ip}</code>
                  <span className="ls-muted">{row.failures} fails · {Math.ceil(row.retryAfterSeconds / 60)}m left</span>
                  <button
                    type="button"
                    className="ls-ip-unlock-btn"
                    onClick={() => onUnlockIp(row.ip)}
                    disabled={unlockingIp === row.ip}
                    aria-label={`Unlock IP ${row.ip}`}
                  >
                    {unlockingIp === row.ip ? 'Unlocking…' : 'Unlock'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
