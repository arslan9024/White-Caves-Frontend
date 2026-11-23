/**
 * useLeadManagement — Custom hook for Lead CRUD operations
 * Decomposed under AEGIS V5.1 AEG-042 (< 350 lines).
 * Acts as backwards-compatible entry point and unified orchestrator.
 */
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatCurrency as formatCurrencyUtil, formatDate as formatDateUtil } from '../../../utils';
import { createLogger } from '../../../utils/logger';
import type { AppDispatch } from '../../../store/store';
import {
  selectAllLeads,
  selectLeadsLoading,
  selectLeadsError,
  fetchLeadsFromAPI,
  createLeadAPI,
  updateLeadAPI,
  deleteLeadAPI,
  addActivity,
} from '../../../store/crmDataSlice';

import type { Lead, LeadFormData } from './leadTypes';
import { ITEMS_PER_PAGE, STATUS_BADGE_VARIANTS } from './leadConstants';
import { calculateLeadScore, assignAgentForScore, checkDuplicateLead } from './leadScoring';
import { validateLeadForm } from './leadValidation';
import { useLeadState } from './useLeadState';

// Re-exports for backwards compatibility
export * from './leadTypes';
export * from './leadConstants';
export * from './leadScoring';
export * from './leadValidation';
export * from './useLeadState';

const log = createLogger('useLeadManagement');

export function useLeadManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const allLeads = useSelector(selectAllLeads) as Lead[];
  const loading = useSelector(selectLeadsLoading);
  const error = useSelector(selectLeadsError);

  // Fetch leads on mount
  useEffect(() => {
    const promise = dispatch(fetchLeadsFromAPI({}));
    return () => {
      promise.abort?.();
    };
  }, [dispatch]);

  const state = useLeadState(allLeads);
  const {
    showCreateModal,
    setShowCreateModal,
    showEditModal,
    setShowEditModal,
    showDeleteConfirm,
    setShowDeleteConfirm,
    selectedLead,
    setSelectedLead,
    formData,
    setFormData,
    errorMessage,
    setErrorMessage,
    resetForm,
  } = state;

  const openCreateModal = useCallback(() => {
    resetForm();
    setShowCreateModal(true);
  }, [resetForm, setShowCreateModal]);

  const closeCreateModal = useCallback(() => {
    setShowCreateModal(false);
    resetForm();
  }, [resetForm, setShowCreateModal]);

  const closeEditModal = useCallback(() => {
    setShowEditModal(false);
    setSelectedLead(null);
    resetForm();
  }, [resetForm, setShowEditModal, setSelectedLead]);

  const closeDeleteModal = useCallback(() => {
    setShowDeleteConfirm(false);
    setSelectedLead(null);
  }, [setShowDeleteConfirm, setSelectedLead]);

  const handleCreate = useCallback(() => {
    const validation = validateLeadForm(formData, true);
    if (!validation.isValid) {
      if (validation.errorMessage) setErrorMessage(validation.errorMessage);
      return;
    }

    setErrorMessage(null);

    if (checkDuplicateLead(formData, allLeads)) {
      setErrorMessage('Duplicate Lead Detected: A lead with this email or phone already exists.');
      return;
    }

    const score = calculateLeadScore(formData);
    const assigned_to = assignAgentForScore(score);

    const leadData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      budget: formData.budget ? Number(formData.budget) : undefined,
      score,
      assigned_to,
      created_at: new Date().toISOString(),
      last_activity: new Date().toISOString(),
    };

    dispatch(createLeadAPI(leadData))
      .then(result => {
        if (createLeadAPI.fulfilled.match(result)) {
          dispatch(
            addActivity({
              id: Date.now(),
              type: 'lead',
              description: `New lead created: ${formData.name} (${formData.company || 'No company'})`,
              timestamp: new Date().toISOString(),
            })
          );
          setShowCreateModal(false);
          resetForm();
        } else if (createLeadAPI.rejected.match(result)) {
          const msg = (result.payload as string) || 'Failed to create lead. Please try again.';
          setErrorMessage(msg);
        }
      })
      .catch((err: unknown) => {
        log.error('Failed to create lead:', err instanceof Error ? err.message : String(err));
        setErrorMessage('An unexpected error occurred. Please try again.');
      });
  }, [dispatch, formData, allLeads, resetForm, setErrorMessage, setShowCreateModal]);

  const handleEdit = useCallback(
    (lead: Lead) => {
      setSelectedLead(lead);
      setFormData({
        name: lead.name || '',
        company: lead.company || '',
        email: lead.email || '',
        phone: lead.phone || '',
        status: lead.status || 'new',
        source: lead.source || 'direct',
        budget: lead.budget?.toString() || lead.value?.toString() || '',
        notes: lead.notes || '',
      });
      setShowEditModal(true);
    },
    [setSelectedLead, setFormData, setShowEditModal]
  );

  const handleSaveEdit = useCallback(() => {
    const validation = validateLeadForm(formData, true);
    if (!validation.isValid) {
      if (validation.errorMessage) setErrorMessage(validation.errorMessage);
      return;
    }

    setErrorMessage(null);
    if (!selectedLead) return;

    if (checkDuplicateLead(formData, allLeads, selectedLead.id)) {
      setErrorMessage('Duplicate Lead Detected: A lead with this email or phone already exists.');
      return;
    }

    const score = calculateLeadScore(formData);
    const assigned_to = assignAgentForScore(score);
    const nameSnapshot = formData.name;

    dispatch(
      updateLeadAPI({
        id: selectedLead.id,
        ...formData,
        budget: formData.budget ? Number(formData.budget) : undefined,
        score,
        assigned_to,
        last_activity: new Date().toISOString(),
      })
    )
      .then(result => {
        if (updateLeadAPI.fulfilled.match(result)) {
          dispatch(
            addActivity({
              id: Date.now(),
              type: 'lead',
              description: `Lead updated: ${nameSnapshot}`,
              timestamp: new Date().toISOString(),
            })
          );
          setShowEditModal(false);
          setSelectedLead(null);
          resetForm();
        } else if (updateLeadAPI.rejected.match(result)) {
          const msg = (result.payload as string) || 'Failed to update lead. Please try again.';
          setErrorMessage(msg);
        }
      })
      .catch((err: unknown) => {
        log.error('Failed to update lead:', err instanceof Error ? err.message : String(err));
        setErrorMessage('An unexpected error occurred. Please try again.');
      });
  }, [
    dispatch,
    selectedLead,
    formData,
    allLeads,
    resetForm,
    setErrorMessage,
    setShowEditModal,
    setSelectedLead,
  ]);

  const handleDelete = useCallback(() => {
    if (!selectedLead) return;

    dispatch(deleteLeadAPI(selectedLead.id))
      .then(result => {
        if (deleteLeadAPI.fulfilled.match(result)) {
          dispatch(
            addActivity({
              id: Date.now(),
              type: 'lead',
              description: `Lead deleted: ${selectedLead.name}`,
              timestamp: new Date().toISOString(),
            })
          );
          setShowDeleteConfirm(false);
          setSelectedLead(null);
        } else if (deleteLeadAPI.rejected.match(result)) {
          const msg = (result.payload as string) || 'Failed to delete lead. Please try again.';
          setErrorMessage(msg);
        }
      })
      .catch((err: unknown) => {
        log.error('Failed to delete lead:', err instanceof Error ? err.message : String(err));
        setErrorMessage('An unexpected error occurred. Please try again.');
      });
  }, [dispatch, selectedLead, setErrorMessage, setShowDeleteConfirm, setSelectedLead]);

  const confirmDelete = useCallback(
    (lead: Lead) => {
      setSelectedLead(lead);
      setErrorMessage(null);
      setShowDeleteConfirm(true);
    },
    [setSelectedLead, setErrorMessage, setShowDeleteConfirm]
  );

  const getStatusBadgeVariant = useCallback((status: string) => {
    return STATUS_BADGE_VARIANTS.get(status) ?? 'secondary';
  }, []);

  const formatCurrency = useCallback(
    (amount: number | undefined) => formatCurrencyUtil(amount),
    []
  );
  const formatDate = useCallback((dateStr: string | undefined) => formatDateUtil(dateStr), []);

  const retryFetch = useCallback(() => {
    dispatch(fetchLeadsFromAPI({}));
  }, [dispatch]);

  const goBack = useCallback(() => {
    navigate('/owner/crm');
  }, [navigate]);

  return {
    allLeads,
    filteredLeads: state.filteredLeads,
    paginatedLeads: state.paginatedLeads,
    statusCounts: state.statusCounts,
    totalPages: state.totalPages,
    loading,
    error,
    search: state.search,
    statusFilter: state.statusFilter,
    sourceFilter: state.sourceFilter,
    currentPage: state.currentPage,
    showCreateModal,
    showEditModal,
    showDeleteConfirm,
    selectedLead,
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
    handleSearchChange: state.handleSearchChange,
    handleStatusFilterChange: state.handleStatusFilterChange,
    handleSourceFilterChange: state.handleSourceFilterChange,
    setCurrentPage: state.setCurrentPage,
    retryFetch,
    goBack,
    getStatusBadgeVariant,
    formatCurrency,
    formatDate,
  };
}
