// ── Payment Domain Types ────────────────────────────────────────────────────────

export interface ApiLease {
  id: string;
  propertyId: string;
  tenantId: string;
  monthlyRent: number;
  depositAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  nextPaymentDue?: string | null;
  tenant: { id: string; name: string; email: string } | null;
  property: { id: string; title: string; location: string } | null;
}

export interface ApiPdc {
  id: string;
  chequeNumber?: string | null;
  amount: number;
  dueDate: string;
  status: string;
}

export type PaymentStatus = 'paid' | 'pending' | 'overdue';
export type PaymentStatusFilter = 'all' | PaymentStatus;

export interface PaymentEntry {
  id: string; // leaseId
  property: string;
  tenant: string;
  dueDate: string;
  amount: number;
  status: PaymentStatus;
}

export interface PaymentSummary {
  totalMonthlyIncome: number;
  collectedThisMonth: number;
  outstandingBalance: number;
}

export interface PdcModalProps {
  leaseId: string;
  paymentId: string;
  amount: number;
  property: string;
  tenant: string;
  onClose: () => void;
}

export interface PaymentControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: PaymentStatusFilter;
  onStatusFilterChange: (status: PaymentStatusFilter) => void;
  dateFrom: string;
  onDateFromChange: (date: string) => void;
  dateTo: string;
  onDateToChange: (date: string) => void;
  onClearDateRange: () => void;
}

export interface PaymentSummaryCardsProps {
  summary: PaymentSummary;
}

export interface PaymentRowProps {
  payment: PaymentEntry;
  onSelect: (id: string) => void;
}
