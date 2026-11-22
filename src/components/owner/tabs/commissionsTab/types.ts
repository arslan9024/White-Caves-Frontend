export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'disputed' | 'cancelled';

export interface Commission {
  _id: string;
  propertyTitle: string;
  agentName: string;
  clientName: string;
  transactionValue: number;
  commissionRate: number;
  commissionAmount: number;
  status: CommissionStatus;
  propertyType: string;
  createdAt: string;
  paidAt?: string;
  notes?: string;
}

export interface CommissionSummary {
  totalCommissions: number;
  totalAmount: number;
  pendingAmount: number;
  paidAmount: number;
  approvedAmount: number;
  averageCommissionRate: number;
  topAgent?: { name: string; totalCommission: number };
}

export interface CommissionsTabProps {
  data?: unknown;
  loading?: boolean;
  onAction?: (action: string, id?: string) => void;
}
