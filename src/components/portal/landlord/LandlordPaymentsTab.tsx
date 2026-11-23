/**
 * LandlordPaymentsTab — Phase 29: Live API integration
 *
 * Payment schedule derived from active leases.
 * Each lease = one payment entry per month (using nextPaymentDue).
 * Clicking a row fetches that lease's PDC schedule.
 *
 * Decomposed under AEGIS V5.1 AEG-042 into single-purpose companion modules.
 *
 * @component
 */

import React, { FC, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import '../../../pages/RolePages.css';

import {
  type PaymentStatusFilter,
  type PaymentEntry,
  type PaymentSummary,
  useLandlordPayments,
  mapLeasesToPayments,
  filterPayments,
  computePaymentSummary,
  PdcModal,
  PaymentSummaryCards,
  PaymentControls,
  PaymentRow,
} from './payments';

// Re-export all companion definitions for 100% backwards-compatibility
export * from './payments';

const LandlordPaymentsTab: FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedLeaseId, setSelectedLeaseId] = useState<string | null>(null);

  const { leases, loading, error } = useLandlordPayments(Boolean(currentUser));

  const payments: PaymentEntry[] = useMemo(() => mapLeasesToPayments(leases), [leases]);

  const filteredPayments = useMemo(
    () => filterPayments(payments, leases, statusFilter, searchQuery, dateFrom, dateTo),
    [payments, leases, statusFilter, searchQuery, dateFrom, dateTo]
  );

  const summary: PaymentSummary = useMemo(() => computePaymentSummary(payments), [payments]);

  const selectedPayment = useMemo(
    () => payments.find(p => p.id === selectedLeaseId) ?? null,
    [payments, selectedLeaseId]
  );

  const handleClearDateRange = useCallback(() => {
    setDateFrom('');
    setDateTo('');
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedLeaseId(null);
  }, []);

  if (!currentUser) {
    return (
      <div className="empty-state">
        <p>You must be logged in to view your payment schedule.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="empty-state" data-testid="payments-loading">
        <p>⏳ Loading payment data…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state" data-testid="payments-error">
        <p>⚠️ {error}</p>
        <button className="btn-secondary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="tab-content-section landlord-payments-tab">
      <div className="tab-header">
        <h3>Rent Payments</h3>
        <p>Track rent collection, pending invoices, and overdue payments across your portfolio.</p>
      </div>

      <PaymentSummaryCards summary={summary} />

      <PaymentControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        onClearDateRange={handleClearDateRange}
      />

      {filteredPayments.length === 0 ? (
        <div className="empty-state" data-testid="payments-empty-state">
          <p>No payments match your current filters.</p>
        </div>
      ) : (
        <div className="payments-list" data-testid="payments-list">
          {filteredPayments.map(payment => (
            <PaymentRow key={payment.id} payment={payment} onSelect={setSelectedLeaseId} />
          ))}
        </div>
      )}

      {selectedPayment && selectedLeaseId && (
        <PdcModal
          leaseId={selectedLeaseId}
          paymentId={selectedPayment.id}
          amount={selectedPayment.amount}
          property={selectedPayment.property}
          tenant={selectedPayment.tenant}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default LandlordPaymentsTab;
