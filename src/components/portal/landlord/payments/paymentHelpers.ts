import type {
  ApiLease,
  PaymentEntry,
  PaymentStatus,
  PaymentSummary,
  PaymentStatusFilter,
} from './types';

export function derivePaymentStatus(lease: ApiLease): PaymentStatus {
  if (lease.status === 'paid' || lease.status === 'pending' || lease.status === 'overdue') {
    return lease.status;
  }
  if (lease.status === 'terminated' || lease.status === 'expired') return 'paid';
  if (!lease.nextPaymentDue) return 'pending';
  const due = new Date(lease.nextPaymentDue);
  const today = new Date();
  return due < today ? 'overdue' : 'pending';
}

export function mapLeasesToPayments(leases: ApiLease[]): PaymentEntry[] {
  return leases.map(lease => ({
    id: lease.id,
    property: lease.property?.title ?? 'Unknown Property',
    tenant: lease.tenant?.name ?? 'Unknown Tenant',
    dueDate: lease.nextPaymentDue
      ? new Date(lease.nextPaymentDue).toLocaleDateString('en-AE')
      : 'N/A',
    amount: lease.monthlyRent,
    status: derivePaymentStatus(lease),
  }));
}

export function filterPayments(
  payments: PaymentEntry[],
  leases: ApiLease[],
  statusFilter: PaymentStatusFilter,
  searchQuery: string,
  dateFrom: string,
  dateTo: string
): PaymentEntry[] {
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const fromMs = dateFrom ? new Date(dateFrom).getTime() : null;
  const toMs = dateTo ? new Date(dateTo + 'T23:59:59').getTime() : null;

  return payments.filter(payment => {
    const statusMatch = statusFilter === 'all' || payment.status === statusFilter;
    const searchMatch =
      normalizedSearch.length === 0 ||
      payment.id.toLowerCase().includes(normalizedSearch) ||
      payment.property.toLowerCase().includes(normalizedSearch) ||
      payment.tenant.toLowerCase().includes(normalizedSearch);

    // date-range filter: compare against the raw ISO due date from the lease
    const leaseForPayment = leases.find(l => l.id === payment.id);
    const dueDateMs = leaseForPayment?.nextPaymentDue
      ? new Date(leaseForPayment.nextPaymentDue).getTime()
      : null;

    const dateMatch =
      (!fromMs || (dueDateMs !== null && dueDateMs >= fromMs)) &&
      (!toMs || (dueDateMs !== null && dueDateMs <= toMs));

    return statusMatch && searchMatch && dateMatch;
  });
}

export function computePaymentSummary(payments: PaymentEntry[]): PaymentSummary {
  return {
    totalMonthlyIncome: payments.reduce((sum, p) => sum + p.amount, 0),
    collectedThisMonth: payments
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0),
    outstandingBalance: payments
      .filter(p => p.status === 'pending' || p.status === 'overdue')
      .reduce((sum, p) => sum + p.amount, 0),
  };
}
