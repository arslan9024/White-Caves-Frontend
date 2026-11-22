import React, { FC } from 'react';

interface SummaryCardsProps {
  successCount: number;
  failureCount: number;
  totalCount: number;
}

export const SummaryCards: FC<SummaryCardsProps> = ({ successCount, failureCount, totalCount }) => {
  return (
    <section className="ls-summary">
      <div className="ls-summary-card ls-summary-success">
        <span className="ls-summary-label">Successful</span>
        <span className="ls-summary-value">{successCount}</span>
      </div>
      <div className="ls-summary-card ls-summary-failed">
        <span className="ls-summary-label">Failed</span>
        <span className="ls-summary-value">{failureCount}</span>
      </div>
      <div className="ls-summary-card ls-summary-total">
        <span className="ls-summary-label">Total</span>
        <span className="ls-summary-value">{totalCount}</span>
      </div>
    </section>
  );
};
