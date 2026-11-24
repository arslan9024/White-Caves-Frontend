/**
 * useTransactionManagement — Custom hook for Transaction CRUD operations
 */
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatCurrency as formatCurrencyUtil, formatDate as formatDateUtil } from '../../../utils';
import { createLogger } from '../../../utils/logger';
import type { AppDispatch } from '../../../store/store';
import {
  selectAllTransactions,
  selectTransactionsLoading,
  selectTransactionsError,
  fetchTransactionsFromAPI,
  createTransactionAPI,
  updateTransactionAPI,
  deleteTransactionAPI,
  addActivity,
} from '../../../store/crmDataSlice';
import {
  type Transaction,
  type TransactionFormData,
  STATUS_CONFIG,
  TYPE_LABELS,
  PIPELINE_STAGES,
  ITEMS_PER_PAGE,
  EMPTY_FORM,
  calculateCommission,
  validateStateTransition,
  validateKYC,
} from './transactionManagement.helpers';
export {
  type Transaction,
  type TransactionFormData,
  STATUS_CONFIG,
  TYPE_LABELS,
  PIPELINE_STAGES,
  calculateCommission,
  validateStateTransition,
  validateKYC,
};
const log = createLogger('useTransactionManagement');
export function useTransactionManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const allTransactions = useSelector(selectAllTransactions) as Transaction[];
  const loading = useSelector(selectTransactionsLoading);
  const error = useSelector(selectTransactionsError);
  useEffect(() => {
    dispatch(fetchTransactionsFromAPI({}));
  }, [dispatch]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, typeFilter]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState<TransactionFormData>({ ...EMPTY_FORM });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((t: Transaction) => {
      const matchesSearch =
        !search ||
        [t.property_title, t.client_name, t.agent_name, t.notes].some(field =>
          field?.toLowerCase().includes(search.toLowerCase())
        );
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchesType = typeFilter === 'all' || t.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [allTransactions, search, statusFilter, typeFilter]);
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const summaryStats = useMemo(() => {
    const total = allTransactions.length;
    const pending = allTransactions.filter(t => t.status === 'pending').length;
    const completed = allTransactions.filter(t => t.status === 'completed').length;
    const totalValue = allTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    return { total, pending, completed, totalValue };
  }, [allTransactions]);
  const pipelineCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PIPELINE_STAGES.forEach(stage => {
      counts[stage] = allTransactions.filter(t => t.status === stage).length;
    });
    return counts;
  }, [allTransactions]);
  const resetForm = useCallback(() => setFormData({ ...EMPTY_FORM }), []);
  const openCreateModal = useCallback(() => {
    resetForm();
    setShowCreateModal(true);
  }, [resetForm]);
  const closeCreateModal = useCallback(() => {
    setShowCreateModal(false);
    resetForm();
  }, [resetForm]);
  const closeEditModal = useCallback(() => {
    setShowEditModal(false);
    setSelectedTransaction(null);
    resetForm();
  }, [resetForm]);
  const closeDeleteModal = useCallback(() => {
    setShowDeleteConfirm(false);
    setSelectedTransaction(null);
  }, []);
  const handleCreate = useCallback(() => {
    if (!formData.amount || Number(formData.amount) <= 0) return;
    if (formData.status !== 'draft' && formData.status !== 'pending') {
      setErrorMessage('New deals must start in Draft or Pending state.');
      return;
    }
    const { total } = calculateCommission(Number(formData.amount));
    const rera_status = validateKYC(formData) ? 'Forms Cleared' : 'Forms Pending';
    const transactionData = {
      type: formData.type,
      amount: Number(formData.amount),
      status: formData.status,
      commission: total,
      rera_status,
      propertyId: formData.property_title.trim() || undefined,
      leadId: formData.client_name.trim() || undefined,
      agentId: formData.agent_name.trim() || undefined,
      closingDate: formData.closing_date || undefined,
      notes: [formData.notes.trim(), formData.status ? `status: ${formData.status}` : '']
        .filter(Boolean)
        .join(' | '),
    };
    dispatch(createTransactionAPI(transactionData))
      .then(result => {
        if (createTransactionAPI.fulfilled.match(result)) {
          dispatch(
            addActivity({
              id: Date.now(),
              type: 'transaction',
              description: `New ${formData.type} transaction created`,
              timestamp: new Date().toISOString(),
            })
          );
          setShowCreateModal(false);
          resetForm();
        } else if (createTransactionAPI.rejected.match(result)) {
          setErrorMessage(
            (result.payload as string) || 'Failed to create transaction. Please try again.'
          );
        }
      })
      .catch((err: unknown) => {
        log.error('Failed to create transaction:', err instanceof Error ? err.message : String(err));
        setErrorMessage('An unexpected error occurred. Please try again.');
      });
  }, [dispatch, formData, resetForm]);
  const handleEdit = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setFormData({
      type: transaction.type || 'sale',
      status: transaction.status || 'draft',
      amount: transaction.amount?.toString() || '',
      property_title: transaction.property_title || '',
      client_name: transaction.client_name || '',
      agent_name: transaction.agent_name || '',
      closing_date: transaction.closing_date || '',
      notes: transaction.notes || '',
    });
    setShowEditModal(true);
  }, []);
  const handleSaveEdit = useCallback(() => {
    if (!formData.amount || Number(formData.amount) <= 0) {
      setErrorMessage('Transaction amount is required.');
      return;
    }
    if (!selectedTransaction) return;
    if (!validateStateTransition(selectedTransaction.status || 'draft', formData.status)) {
      setErrorMessage(
        `Invalid status transition from ${selectedTransaction.status} to ${formData.status}. Please follow the pipeline stages.`
      );
      return;
    }
    const { total } = calculateCommission(Number(formData.amount));
    const rera_status = validateKYC(formData) ? 'Forms Cleared' : 'Forms Pending';
    const typeSnapshot = formData.type;
    dispatch(
      updateTransactionAPI({
        id: String(selectedTransaction.id),
        type: formData.type,
        status: formData.status,
        amount: Number(formData.amount) || 0,
        commission: total,
        rera_status,
        closingDate: formData.closing_date || undefined,
        notes: [
          formData.notes.trim(),
          formData.property_title.trim() ? `property: ${formData.property_title.trim()}` : '',
          formData.client_name.trim() ? `client: ${formData.client_name.trim()}` : '',
          formData.agent_name.trim() ? `agent: ${formData.agent_name.trim()}` : '',
        ]
          .filter(Boolean)
          .join(' | '),
      })
    )
      .then(result => {
        if (updateTransactionAPI.fulfilled.match(result)) {
          dispatch(
            addActivity({
              id: Date.now(),
              type: 'transaction',
              description: `Transaction updated: ${typeSnapshot}`,
              timestamp: new Date().toISOString(),
            })
          );
          setShowEditModal(false);
          setSelectedTransaction(null);
          resetForm();
        } else if (updateTransactionAPI.rejected.match(result)) {
          setErrorMessage(
            (result.payload as string) || 'Failed to update transaction. Please try again.'
          );
        }
      })
      .catch((err: unknown) => {
        log.error('Failed to update transaction:', err instanceof Error ? err.message : String(err));
        setErrorMessage('An unexpected error occurred. Please try again.');
      });
  }, [dispatch, selectedTransaction, formData, resetForm]);
  const handleDelete = useCallback(() => {
    if (!selectedTransaction) return;
    dispatch(deleteTransactionAPI(String(selectedTransaction.id)))
      .then(result => {
        if (deleteTransactionAPI.fulfilled.match(result)) {
          dispatch(
            addActivity({
              id: Date.now(),
              type: 'transaction',
              description: `Transaction deleted`,
              timestamp: new Date().toISOString(),
            })
          );
          setShowDeleteConfirm(false);
          setSelectedTransaction(null);
        } else if (deleteTransactionAPI.rejected.match(result)) {
          setErrorMessage(
            (result.payload as string) || 'Failed to delete transaction. Please try again.'
          );
        }
      })
      .catch((err: unknown) => {
        log.error('Failed to delete transaction:', err instanceof Error ? err.message : String(err));
        setErrorMessage('An unexpected error occurred. Please try again.');
      });
  }, [dispatch, selectedTransaction]);
  const confirmDelete = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDeleteConfirm(true);
  }, []);
  const getStatusBadgeVariant = useCallback(
    (status: string) => STATUS_CONFIG[status]?.badgeVariant || 'secondary',
    []
  );
  const formatCurrency = useCallback(
    (amount: number | undefined) => formatCurrencyUtil(amount),
    []
  );
  const formatDate = useCallback((dateStr: string | undefined) => formatDateUtil(dateStr), []);
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);
  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  }, []);
  const handleTypeFilterChange = useCallback((value: string) => {
    setTypeFilter(value);
    setCurrentPage(1);
  }, []);
  const retryFetch = useCallback(() => dispatch(fetchTransactionsFromAPI({})), [dispatch]);
  const goBack = useCallback(() => navigate('/owner/crm'), [navigate]);
  return {
    allTransactions,
    filteredTransactions,
    paginatedTransactions,
    summaryStats,
    pipelineCounts,
    totalPages,
    loading,
    error,
    search,
    statusFilter,
    typeFilter,
    currentPage,
    showCreateModal,
    showEditModal,
    showDeleteConfirm,
    selectedTransaction,
    formData,
    setFormData,
    errorMessage,
    setErrorMessage,
    ITEMS_PER_PAGE,
    openCreateModal,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    handleCreate,
    handleEdit,
    handleSaveEdit,
    handleDelete,
    confirmDelete,
    handleSearchChange,
    handleStatusFilterChange,
    handleTypeFilterChange,
    setCurrentPage,
    retryFetch,
    goBack,
    getStatusBadgeVariant,
    formatCurrency,
    formatDate,
  };
}
