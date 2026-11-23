import React, { FC } from 'react';
import { formatCurrency } from '../../../../utils';
import type {
  PaymentControlsProps,
  PaymentSummaryCardsProps,
  PaymentRowProps,
  PaymentStatusFilter,
} from './types';

export const PaymentSummaryCards: FC<PaymentSummaryCardsProps> = ({ summary }) => {
  return (
    <div className="summary-grid" data-testid="payments-summary">
      <div className="summary-card" data-testid="summary-total-monthly-income">
        <h4>Total Scheduled</h4>
        <p>{formatCurrency(summary.totalMonthlyIncome)}</p>
      </div>
      <div className="summary-card" data-testid="summary-collected-this-month">
        <h4>Collected</h4>
        <p>{formatCurrency(summary.collectedThisMonth)}</p>
      </div>
      <div className="summary-card" data-testid="summary-outstanding-balance">
        <h4>Outstanding</h4>
        <p>{formatCurrency(summary.outstandingBalance)}</p>
      </div>
    </div>
  );
};

export const PaymentControls: FC<PaymentControlsProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onClearDateRange,
}) => {
  return (
    <div className="tab-controls">
      <input
        data-testid="payment-search"
        type="text"
        placeholder="Search by property or tenant"
        value={searchQuery}
        onChange={event => onSearchChange(event.target.value)}
      />

      <select
        data-testid="payment-status-filter"
        value={statusFilter}
        onChange={event => onStatusFilterChange(event.target.value as PaymentStatusFilter)}
      >
        <option value="all">All Statuses</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="overdue">Overdue</option>
      </select>

      <div className="date-range-filter" data-testid="payment-date-range">
        <label
          htmlFor="payment-date-from"
          style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginRight: '0.35rem' }}
        >
          From
        </label>
        <input
          id="payment-date-from"
          data-testid="payment-date-from"
          type="date"
          value={dateFrom}
          onChange={e => onDateFromChange(e.target.value)}
          style={{
            padding: '0.4rem 0.5rem',
            fontSize: '0.85rem',
            borderRadius: '6px',
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            color: 'var(--text-primary)',
          }}
        />
        <label
          htmlFor="payment-date-to"
          style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0.35rem' }}
        >
          To
        </label>
        <input
          id="payment-date-to"
          data-testid="payment-date-to"
          type="date"
          value={dateTo}
          onChange={e => onDateToChange(e.target.value)}
          style={{
            padding: '0.4rem 0.5rem',
            fontSize: '0.85rem',
            borderRadius: '6px',
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            color: 'var(--text-primary)',
          }}
        />
        {(dateFrom || dateTo) && (
          <button
            type="button"
            data-testid="payment-date-clear"
            onClick={onClearDateRange}
            style={{
              fontSize: '0.78rem',
              padding: '0.3rem 0.6rem',
              borderRadius: '6px',
              border: '1px solid var(--card-border)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
            aria-label="Clear date filter"
          >
            ✕ Clear
          </button>
        )}
      </div>
    </div>
  );
};

export const PaymentRow: FC<PaymentRowProps> = ({ payment, onSelect }) => {
  return (
    <button
      type="button"
      className="payment-row"
      data-testid={`payment-row-${payment.id}`}
      onClick={() => onSelect(payment.id)}
    >
      <div>
        <strong>{payment.property}</strong>
        <p>{payment.tenant}</p>
      </div>
      <div>
        <p>Due: {payment.dueDate}</p>
      </div>
      <div>
        <p>{formatCurrency(payment.amount)}/month</p>
        <span className={`status-badge status-${payment.status}`}>{payment.status}</span>
      </div>
    </button>
  );
};
