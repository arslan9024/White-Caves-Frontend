/**
 * TransactionManager — Logic Layer (State & API Handlers)
 * Standard: Mary Allen Wilkes Protocol (.logic.ts)
 * Single Purpose File Law: < 350 lines
 */

import { useState, useEffect, useCallback } from 'react';
import type {
  DLDTransaction,
  TransactionStats,
  PaginationState,
  FilterState,
  SortConfig,
  ToastItem,
  ModalMode,
} from './TransactionManager.types';
import { INITIAL_FILTERS } from './TransactionManager.data';

const jsonHeaders = { 'Content-Type': 'application/json' };

const requestJson = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, init);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }
  return data;
};

export function useTransactionManagerLogic() {
  const [transactions, setTransactions] = useState<DLDTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 25,
    total: 0,
    pages: 0,
  });
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    sortBy: 'instanceDate',
    sortOrder: 'desc',
  });
  const [selectedTransaction, setSelectedTransaction] = useState<DLDTransaction | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('view');
  const [editForm, setEditForm] = useState<Partial<DLDTransaction>>({});
  const [importing, setImporting] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, color = '#EF4444') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => Boolean(v))
      );
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        sortBy: sortConfig.sortBy,
        sortOrder: sortConfig.sortOrder,
        ...activeFilters,
      });

      const data = await requestJson(`/api/transactions?${params}`);
      if (data.success) {
        setTransactions(data.data);
        setPagination(prev => ({ ...prev, ...data.pagination }));
      }
    } catch {
      // Handled via state
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, sortConfig, filters]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await requestJson('/api/transactions/stats');
      if (data.success) {
        setStats(data.stats);
      }
    } catch {
      // Handled via state
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleSort = (field: string) => {
    setSortConfig(prev => ({
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleView = (transaction: DLDTransaction) => {
    setSelectedTransaction(transaction);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEdit = (transaction: DLDTransaction) => {
    setSelectedTransaction(transaction);
    setEditForm({ ...transaction });
    setModalMode('edit');
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedTransaction(null);
    setEditForm({
      transactionNumber: `WC-${Date.now()}`,
      instanceDate: new Date().toISOString(),
      group: 'Sales',
      procedure: 'Sell - Pre registration',
      isOffplan: 'Off-Plan',
      isFreehold: 'Free Hold',
      usage: 'Residential',
      area: '',
      propType: 'Unit',
      propSubType: 'Flat',
      transValue: 0,
      actualArea: 0,
      rooms: '1 B/R',
      parking: '1',
      project: '',
    });
    setModalMode('create');
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (modalMode === 'create') {
        await requestJson('/api/transactions', {
          method: 'POST',
          headers: jsonHeaders,
          body: JSON.stringify(editForm),
        });
      } else if (selectedTransaction?._id) {
        await requestJson(`/api/transactions/${selectedTransaction._id}`, {
          method: 'PUT',
          headers: jsonHeaders,
          body: JSON.stringify(editForm),
        });
      }
      setShowModal(false);
      fetchTransactions();
      fetchStats();
    } catch {
      showToast('Failed to save transaction', '#EF4444');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await requestJson(`/api/transactions/${id}`, { method: 'DELETE' });
      fetchTransactions();
      fetchStats();
    } catch {
      showToast('Failed to delete transaction', '#EF4444');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const data = await requestJson('/api/transactions/import', {
        method: 'POST',
        body: formData,
      });
      if (data.success) {
        showToast(`Successfully imported ${data.imported} transactions`, '#10B981');
        fetchTransactions();
        fetchStats();
      }
    } catch {
      showToast('Failed to import file', '#EF4444');
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  };

  return {
    transactions,
    loading,
    stats,
    pagination,
    filters,
    showFilters,
    sortConfig,
    selectedTransaction,
    showModal,
    modalMode,
    editForm,
    importing,
    toasts,
    setPagination,
    setShowFilters,
    setShowModal,
    setEditForm,
    handleSort,
    handleFilterChange,
    clearFilters,
    handleView,
    handleEdit,
    handleCreate,
    handleSave,
    handleDelete,
    handleImport,
    fetchTransactions,
  };
}

