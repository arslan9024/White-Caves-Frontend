import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Invoice, Expense } from '../data/finance';
import { FINANCE_FEATURES } from '../data/features';
import {
  fetchCommissionsFromAPI,
  fetchFinanceSummary,
  createCommissionAPI,
  updateCommissionAPI,
  bulkPayCommissionsAPI,
  selectAllCommissions,
  selectPendingCommissions,
  selectApprovedCommissions,
  selectPaidCommissions,
  selectCommissionsLoading,
  selectCommissionsError,
  fetchInvoicesFromAPI,
  createInvoiceAPI,
  updateInvoiceAPI,
  deleteInvoiceAPI,
  selectAllInvoices,
  selectPendingInvoices,
  selectPaidInvoices,
  selectOverdueInvoices,
  selectInvoicesLoading,
  selectInvoicesError,
  fetchExpensesFromAPI,
  createExpenseAPI,
  updateExpenseAPI,
  deleteExpenseAPI,
  selectAllExpenses,
  selectPendingExpenses,
  selectApprovedExpenses,
  selectExpensesLoading,
  selectExpensesError,
} from '../../../../store/crmDataSlice';
import type { AppDispatch } from '../../../../store/store';

export InvoiceRecord extends Invoice {
  totalAmount?: number;
  notes?: string;
  vatAmount?: number;
  createdAt?: string | Date;
}

export ExpenseRecord extends Expense {
  notes?: string;
  receiptUrl?: string;
}

export CommissionRecord {
  id: string;
  amount: number;
  status: string;
  agentId?: string;
  agentName?: string;
  agent_name?: string;
  leadId?: string;
  propertyId?: string;
  percentage?: number;
  type?: string;
  notes?: string;
  paidAt?: string;
  createdAt?: string;
  [key: string]: unknown;
}

export mapInvoiceRecord = (item: Record<string, unknown>): InvoiceRecord => ({
  id: String(item.id ?? ''),
  client: String(item.client ?? 'Unknown Client'),
  property: String(item.property ?? 'N/A'),
  amount: Number(item.amount ?? 0),
  totalAmount: item.totalAmount !== undefined ? Number(item.totalAmount) : undefined,
  status: String(item.status ?? 'pending'),
  date: String(item.date ?? item.createdAt ?? new Date().toISOString().slice(0, 10)),
  dueDate: String(item.dueDate ?? new Date().toISOString().slice(0, 10)),
  notes: item.notes ? String(item.notes) : undefined,
  vatAmount: item.vatAmount !== undefined ? Number(item.vatAmount) : undefined,
});

export mapExpenseRecord = (item: Record<string, unknown>): ExpenseRecord => ({
  id: Number(item.id ?? 0),
  category: String(item.category ?? 'General'),
  description: String(item.description ?? ''),
  amount: Number(item.amount ?? 0),
  date: String(item.date ?? item.createdAt ?? new Date().toISOString().slice(0, 10)),
  status: String(item.status ?? 'pending'),
  notes: item.notes ? String(item.notes) : undefined,
  receiptUrl: item.receiptUrl ? String(item.receiptUrl) : undefined,
});

export mapCommissionRecord = (item: Record<string, unknown>): CommissionRecord => ({
  id: String(item.id ?? ''),
  amount: Number(item.amount ?? 0),
  status: String(item.status ?? 'pending'),
  agentId: item.agentId ? String(item.agentId) : undefined,
  agentName: item.agentName ? String(item.agentName) : undefined,
  agent_name: item.agent_name ? String(item.agent_name) : undefined,
  leadId: item.leadId ? String(item.leadId) : undefined,
  propertyId: item.propertyId ? String(item.propertyId) : undefined,
  percentage: item.percentage !== undefined ? Number(item.percentage) : undefined,
  type: item.type ? String(item.type) : undefined,
  notes: item.notes ? String(item.notes) : undefined,
  paidAt: item.paidAt ? String(item.paidAt) : undefined,
  createdAt: item.createdAt ? String(item.createdAt) : undefined,
});

