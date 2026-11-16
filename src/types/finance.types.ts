/**
 * White Caves CRM - Transaction, Leasing & Financial Types
 */

export enum TransactionType {
  SALE = 'sale',
  LEASE = 'lease',
}

export enum TransactionStatus {
  INQUIRY = 'inquiry',
  OFFER_MADE = 'offer_made',
  OFFER_NEGOTIATING = 'offer_negotiating',
  OFFER_ACCEPTED = 'offer_accepted',
  CONTRACT_SIGNED = 'contract_signed',
  PAYMENT_PENDING = 'payment_pending',
  PAYMENT_COMPLETED = 'payment_completed',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  leadId: string;
  propertyId: string;
  agentId: string;
  buyerName: string;
  buyerEmail: string;
  sellerName: string;
  sellerEmail: string;
  offerPrice: {
    amount: number;
    currency: 'AED' | 'USD' | 'EUR';
  };
  finalPrice?: {
    amount: number;
    currency: 'AED' | 'USD' | 'EUR';
  };
  commission: {
    percentage: number;
    amount: number;
    paidToAgent: number;
    paidToBroker: number;
  };
  timeline: {
    inquiryDate: Date;
    offerDate?: Date;
    acceptanceDate?: Date;
    signatureDate?: Date;
    closingDate?: Date;
  };
  documents: string[]; // URLs
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommissionCalculation {
  transactionId: string;
  agentId: string;
  percentage: number;
  amount: number;
  status: 'pending' | 'approved' | 'paid';
  paidDate?: Date;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passport?: string;
  visaNumber?: string;
  employerName?: string;
  monthlyIncome?: number;
  references?: string[];
  documents: string[]; // URLs
  status: 'application' | 'approved' | 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Lease {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: {
    amount: number;
    currency: 'AED' | 'USD' | 'EUR';
  };
  securityDeposit?: {
    amount: number;
    currency: 'AED' | 'USD' | 'EUR';
  };
  status: 'draft' | 'signed' | 'active' | 'ended' | 'terminated';
  ejariRegistration?: string;
  documents: string[]; // URLs
  createdAt: Date;
  updatedAt: Date;
}

export interface RentPayment {
  id: string;
  leaseId: string;
  amount: {
    amount: number;
    currency: 'AED' | 'USD' | 'EUR';
  };
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  method?: 'bank_transfer' | 'credit_card' | 'cash' | 'check';
  notes?: string;
}

export interface Payment {
  id: string;
  transactionId?: string;
  amount: {
    amount: number;
    currency: 'AED' | 'USD' | 'EUR';
  };
  type: 'commission' | 'rent' | 'deposit' | 'escrow';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  method: 'bank_transfer' | 'credit_card' | 'stripe' | 'check';
  reference?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface FinancialSummary {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  totalRevenue: number;
  totalExpenses: number;
  totalCommissions: number;
  netProfit: number;
  profitMargin: number;
  timestamp: Date;
}

export interface FinanceState {
  transactions: Transaction[];
  commissions: CommissionCalculation[];
  summary: FinancialSummary | null;
  loading: boolean;
  error: string | null;
}

