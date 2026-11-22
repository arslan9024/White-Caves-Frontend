import React, { FC } from 'react';
import type { AttemptStatus } from './types';
import { STATUS_OPTIONS, SINCE_OPTIONS } from './constants';

interface FiltersSectionProps {
  status: AttemptStatus;
  sinceMinutes: number;
  emailFilter: string;
  loading: boolean;
  attemptsCount: number;
  onStatusChange: (status: AttemptStatus) => void;
  onSinceMinutesChange: (sinceMinutes: number) => void;
  onEmailFilterChange: (email: string) => void;
  onRefresh: () => void;
  onExportCsv: () => void;
}

export const FiltersSection: FC<FiltersSectionProps> = ({
  status,
  sinceMinutes,
  emailFilter,
  loading,
  attemptsCount,
  onStatusChange,
  onSinceMinutesChange,
  onEmailFilterChange,
  onRefresh,
  onExportCsv,
}) => {
  return (
    <section className="ls-filters" aria-label="Filters">
      <label className="ls-filter">
        <span>Status</span>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as AttemptStatus)}
          aria-label="Status filter"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="ls-filter">
        <span>Window</span>
        <select
          value={sinceMinutes}
          onChange={(e) => onSinceMinutesChange(Number(e.target.value))}
          aria-label="Window filter"
        >
          {SINCE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="ls-filter ls-filter-grow">
        <span>Email contains</span>
        <input
          type="search"
          value={emailFilter}
          onChange={(e) => onEmailFilterChange(e.target.value)}
          placeholder="e.g. ghost@whitecaves.ae"
          aria-label="Email filter"
        />
      </label>
      <button
        type="button"
        className="ls-refresh"
        onClick={onRefresh}
        disabled={loading}
      >
        {loading ? 'Refreshing…' : 'Refresh'}
      </button>
      <button
        type="button"
        className="ls-export"
        onClick={onExportCsv}
        disabled={loading || attemptsCount === 0}
        aria-label="Export current view to CSV"
      >
        Export CSV
      </button>
    </section>
  );
};
