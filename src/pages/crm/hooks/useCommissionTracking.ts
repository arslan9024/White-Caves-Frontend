/**
 * useCommissionTracking — Custom hook for Commission CRUD operations
 * Extracts all business logic, state, and Redux interactions from CommissionTrackingPage.
 */
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatCurrency as formatCurrencyUtil, formatDate as formatDateUtil } from '../../../utils';
import { createLogger } from '../../../utils/logger';
import type { AppDispatch } from '../../../store/store';
import {
  selectAllCommissions,
  selectCommissionsLoading,
  selectCommissionsError,
  fetchCommissionsFromAPI,
  createCommissionAPI,
  updateCommissionAPI,
  addActivity,
} from '../../../store/crmDataSlice';
import {
  Commission,
  CommissionFormData,
  STATUS_CONFIG,
  TYPE_LABELS,
  ITEMS_PER_PAGE,
  EMPTY_FORM,
} from './commissionTracking.types';

export type { Commission, CommissionFormData };
export { STATUS_CONFIG, TYPE_LABELS, ITEMS_PER_PAGE, EMPTY_FORM };

const log = createLogger('useCommissionTracking');

export function useCommissionTracking() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const allCommissions = useSelector(selectAllCommissions) as Commission[];
  const loading = useSelector(selectCommissionsLoading);
  const error = useSelector(selectCommissionsError);

  useEffect(() => {
    dispatch(fetchCommissionsFromAPI({}));
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
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);
  const [formData, setFormData] = useState<CommissionFormData>({ ...EMPTY_FORM });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filteredCommissions = useMemo(() => {
    return allCommissions.filter((c: Commission) => {
      const matchesSearch =
        !search ||
        [c.agent_name, c.property_title, c.notes].some(field =>
          field?.toLowerCase().includes(search.toLowerCase())
        );
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchesType = typeFilter === 'all' || c.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [allCommissions, search, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filteredCommissions.length / ITEMS_PER_PAGE);

  const paginatedCommissions = filteredCommissions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const summaryStats = useMemo(() => {
    const pending = allCommissions
      .filter(c => c.status === 'pending')
      .reduce((sum, c) => sum + (c.amount || 0), 0);
    const approved = allCommissions
      .filter(c => c.status === 'approved')
      .reduce((sum, c) => sum + (c.amount || 0), 0);
    const paid = allCommissions
      .filter(c => c.status === 'paid')
      .reduce((sum, c) => sum + (c.amount || 0), 0);
    return { pending, approved, paid };
  }, [allCommissions]);

  const resetForm = useCallback(() => {
    setFormData({ ...EMPTY_FORM });
  }, []);

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
    setSelectedCommission(null);
    resetForm();
  }, [resetForm]);

  const handleCreate = useCallback(() => {
    if (!formData.agent_name.trim()) return;
    if (!formData.amount || Number(formData.amount) <= 0) return;

    const commissionData = {
      agentId: formData.agent_name.trim(),
      amount: Number(formData.amount),
      percentage: formData.percentage ? Number(formData.percentage) : undefined,
      type: formData.type,
      notes: [
        formData.notes.trim(),
        formData.property_title.trim() ? `property: ${formData.property_title.trim()}` : '',
        formData.status ? `status: ${formData.status}` : '',
      ]
        .filter(Boolean)
        .join(' | '),
    };

    dispatch(createCommissionAPI(commissionData))
      .then(result => {
        if (createCommissionAPI.fulfilled.match(result)) {
          dispatch(
            addActivity({
              id: Date.now(),
              type: 'commission',
              description: `New commission created for ${formData.agent_name}`,
              timestamp: new Date().toISOString(),
            })
          );
          setShowCreateModal(false);
          resetForm();
        } else if (createCommissionAPI.rejected.match(result)) {
          const msg =
            (result.payload as string) || 'Failed to create commission. Please try again.';
          setErrorMessage(msg);
        }
      })
      .catch((error: unknown) => {
        log.error(
          'Failed to create commission:',
          error instanceof Error ? error.message : String(error)
        );
        setErrorMessage('An unexpected error occurred. Please try again.');
      });
  }, [dispatch, formData, resetForm]);

  const handleEdit = useCallback((commission: Commission) => {
    setSelectedCommission(commission);
    setFormData({
      agent_name: commission.agent_name || '',
      amount: commission.amount?.toString() || '',
      percentage: commission.percentage?.toString() || '',
      type: commission.type || 'sale',
      status: commission.status || 'pending',
      property_title: commission.property_title || '',
      notes: commission.notes || '',
    });
    setShowEditModal(true);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (!formData.agent_name.trim()) {
      setErrorMessage('Agent name is required.');
      return;
    }
    if (selectedCommission) {
      const agentSnapshot = formData.agent_name;
      dispatch(
        updateCommissionAPI({
          id: String(selectedCommission.id),
          status: formData.status,
          amount: Number(formData.amount) || 0,
          notes: [
            formData.notes.trim(),
            formData.agent_name.trim() ? `agent: ${formData.agent_name.trim()}` : '',
            formData.property_title.trim() ? `property: ${formData.property_title.trim()}` : '',
            formData.type ? `type: ${formData.type}` : '',
          ]
            .filter(Boolean)
            .join(' | '),
        })
      )
        .then(result => {
          if (updateCommissionAPI.fulfilled.match(result)) {
            dispatch(
              addActivity({
                id: Date.now(),
                type: 'commission',
                description: `Commission updated for ${agentSnapshot}`,
                timestamp: new Date().toISOString(),
              })
            );
            setShowEditModal(false);
            setSelectedCommission(null);
            resetForm();
          } else if (updateCommissionAPI.rejected.match(result)) {
            const msg =
              (result.payload as string) || 'Failed to update commission. Please try again.';
            setErrorMessage(msg);
          }
        })
        .catch((error: unknown) => {
          log.error(
            'Failed to update commission:',
            error instanceof Error ? error.message : String(error)
          );
          setErrorMessage('An unexpected error occurred. Please try again.');
        });
    }
  }, [dispatch, selectedCommission, formData, resetForm]);

  const getStatusBadgeVariant = useCallback((status: string) => {
    return STATUS_CONFIG[status]?.badgeVariant || 'secondary';
  }, []);

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

  const retryFetch = useCallback(() => {
    dispatch(fetchCommissionsFromAPI({}));
  }, [dispatch]);

  const goBack = useCallback(() => {
    navigate('/owner/crm');
  }, [navigate]);

  return {
    allCommissions,
    filteredCommissions,
    paginatedCommissions,
    summaryStats,
    totalPages,
    loading,
    error,
    search,
    statusFilter,
    typeFilter,
    currentPage,
    showCreateModal,
    showEditModal,
    selectedCommission,
    formData,
    setFormData,
    errorMessage,
    setErrorMessage,
    ITEMS_PER_PAGE,
    openCreateModal,
    closeCreateModal,
    closeEditModal,
    handleCreate,
    handleEdit,
    handleSaveEdit,
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

