import { useState, useMemo, useCallback } from 'react';
import type { Lead, LeadFormData } from './leadTypes';
import { EMPTY_FORM, ITEMS_PER_PAGE } from './leadConstants';

export function useLeadState(allLeads: Lead[]) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<LeadFormData>({ ...EMPTY_FORM });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filteredLeads = useMemo(() => {
    return allLeads.filter((lead: Lead) => {
      const matchesSearch =
        !search ||
        [lead.name, lead.company, lead.email, lead.phone].some(field =>
          field?.toLowerCase().includes(search.toLowerCase())
        );
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [allLeads, search, statusFilter, sourceFilter]);

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);

  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const statusCounts = useMemo(() => {
    const counts = new Map<string, number>([['all', allLeads.length]]);
    allLeads.forEach((lead: Lead) => {
      const status = lead.status || 'unknown';
      counts.set(status, (counts.get(status) ?? 0) + 1);
    });
    return counts;
  }, [allLeads]);

  const resetForm = useCallback(() => {
    setFormData({ ...EMPTY_FORM });
    setErrorMessage(null);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  }, []);

  const handleSourceFilterChange = useCallback((value: string) => {
    setSourceFilter(value);
    setCurrentPage(1);
  }, []);

  return {
    search,
    statusFilter,
    sourceFilter,
    currentPage,
    setCurrentPage,
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
    filteredLeads,
    paginatedLeads,
    totalPages,
    statusCounts,
    resetForm,
    handleSearchChange,
    handleStatusFilterChange,
    handleSourceFilterChange,
  };
}
