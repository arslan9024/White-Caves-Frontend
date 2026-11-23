import { useState, useCallback, useEffect } from 'react';
import type { Lead } from '../types';
import { EMPTY_LEAD, ITEMS_PER_PAGE, type ModalMode } from './constants';
import { computeLeadStats, filterLeads } from './leadHelpers';

export function useLeadsManagement(initialLeads: Lead[] | undefined) {
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [localLeads, setLocalLeads] = useState<Lead[]>(() => initialLeads ?? []);
  const [modalMode, setModalMode] = useState<ModalMode>('none');
  const [editTarget, setEditTarget] = useState<Lead | null>(null);
  const [form, setForm] = useState<Omit<Lead, 'id' | 'createdAt'>>(EMPTY_LEAD);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [sourceFilter, statusFilter, priorityFilter]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const openAdd = useCallback(() => {
    setForm(EMPTY_LEAD);
    setEditTarget(null);
    setModalMode('add');
  }, []);

  const openEdit = useCallback((lead: Lead) => {
    const { id: _id, createdAt: _ca, ...rest } = lead;
    setForm(rest);
    setEditTarget(lead);
    setModalMode('edit');
  }, []);

  const openDelete = useCallback((lead: Lead) => {
    setEditTarget(lead);
    setModalMode('delete');
  }, []);

  const closeModal = useCallback(() => {
    setModalMode('none');
    setEditTarget(null);
  }, []);

  const handleSave = useCallback(() => {
    if (!form.name.trim()) return;
    if (modalMode === 'add') {
      const nextId = Math.max(0, ...localLeads.map(l => l.id)) + 1;
      setLocalLeads(prev => [
        ...prev,
        { id: nextId, createdAt: new Date().toISOString(), ...form },
      ]);
      showToast('✅ Lead added successfully');
    } else if (modalMode === 'edit' && editTarget) {
      setLocalLeads(prev => prev.map(l => (l.id === editTarget.id ? { ...l, ...form } : l)));
      showToast('✅ Lead updated successfully');
    }
    closeModal();
  }, [form, modalMode, localLeads, editTarget, showToast, closeModal]);

  const handleDelete = useCallback(() => {
    if (!editTarget) return;
    setLocalLeads(prev => prev.filter(l => l.id !== editTarget.id));
    showToast('🗑️ Lead removed');
    closeModal();
  }, [editTarget, showToast, closeModal]);

  const handleStatusChange = useCallback((id: number, status: string) => {
    setLocalLeads(prev => prev.map(l => (l.id === id ? { ...l, status } : l)));
  }, []);

  const filteredLeads = filterLeads(localLeads, sourceFilter, statusFilter, priorityFilter);
  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const leadStats = computeLeadStats(localLeads);

  return {
    sourceFilter,
    setSourceFilter,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    currentPage,
    setCurrentPage,
    modalMode,
    editTarget,
    form,
    setForm,
    toast,
    showToast,
    openAdd,
    openEdit,
    openDelete,
    closeModal,
    handleSave,
    handleDelete,
    handleStatusChange,
    filteredLeads,
    paginatedLeads,
    totalPages,
    leadStats,
  };
}
