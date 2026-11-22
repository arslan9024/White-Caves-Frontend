import React, { FC } from 'react';
import type { SecurityStats } from './types';

interface StatsSectionProps {
  stats: SecurityStats | null;
  unlockingIp: string | null;
  onUnlockIp: (ip: string) => void;
}

export const StatsSection: FC<StatsSectionProps> = ({ stats, unlockingIp, onUnlockIp }) => {
  if (!stats || !stats.totals) {
    return null;
  }

  return (
    <section className="ls-stats" aria-label="Aggregate stats for the selected window">
      <div className="ls-stats-tile">
        <span className="ls-stats-label">Unique IPs</span>
        <span className="ls-stats-value">{stats.uniqueIpCount}</span>
      </div>
      <div className="ls-stats-tile">
        <span className="ls-stats-label">Password changes</span>
        <span className="ls-stats-value">{stats.totals.passwordChanges}</span>
      </div>
      <div className="ls-stats-tile">
        <span className="ls-stats-label">Password failures</span>
        <span className="ls-stats-value">{stats.totals.passwordChangeFailures}</span>
      </div>
      <div className="ls-stats-tile">
        <span className="ls-stats-label">Account unlocks</span>
        <span className="ls-stats-value">{stats.totals.accountUnlocks}</span>
      </div>
      <div className="ls-stats-tile ls-stats-list">
        <span className="ls-stats-label">Top offending IPs</span>
        {stats.topOffendingIps.length === 0 ? (
          <span className="ls-muted">None</span>
        ) : (
          <ul>
            {stats.topOffendingIps.map((row) => (
              <li key={row.ip}>
                <code>{row.ip}</code> <span className="ls-muted">({row.failures})</span>
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
        )}
      </div>
      <div className="ls-stats-tile ls-stats-list">
        <span className="ls-stats-label">Top targeted emails</span>
        {stats.topTargetedEmails.length === 0 ? (
          <span className="ls-muted">None</span>
        ) : (
          <ul>
            {stats.topTargetedEmails.map((row) => (
              <li key={row.email}>
                {row.email} <span className="ls-muted">({row.failures})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
