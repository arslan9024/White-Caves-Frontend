/**
 * PlanManager — Logic Layer (Mary Allen Wilkes Architecture)
 * State coordination hook managing plan loading, search filters, and CRUD triggers
 */

import { useState, useEffect, useCallback } from 'react';
import { authFetch } from '../../../utils/authFetch';
import type { PlanItem, PlanStats, StatusMessage } from './PlanManager.types';

export function usePlanManagerLogic() {
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanItem | null>(null);
  const [stats, setStats] = useState<PlanStats | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const showStatus = (type: 'error' | 'success' | 'info', text: string) => {
    setStatusMessage({ type, text });
  };

  const loadPlans = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (filterStatus !== 'all') params.append('status', filterStatus);

      const response = await authFetch(`/api/plans/list?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to load plans');

      const data = (await response.json()) as { plans: PlanItem[] };
      setPlans(data.plans || []);
    } catch {
      showStatus('error', 'Failed to load plans');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filterStatus]);

  const loadStats = useCallback(async () => {
    try {
      const response = await authFetch('/api/plans/stats');
      if (response.ok) {
        const data = (await response.json()) as PlanStats;
        setStats(data);
      }
    } catch {
      // Non-blocking telemetry
    }
  }, []);

  useEffect(() => {
    loadPlans();
    loadStats();
  }, [loadPlans, loadStats]);

  const toggleSelectPlan = (id: string) => {
    setSelectedPlans(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const deletePlan = async (id: string) => {
    try {
      const res = await authFetch(`/api/plans/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showStatus('success', 'Plan deleted successfully');
        loadPlans();
      } else {
        showStatus('error', 'Failed to delete plan');
      }
    } catch {
      showStatus('error', 'Failed to delete plan');
    }
  };

  return {
    plans,
    loading,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    selectedPlans,
    showCreateModal,
    setShowCreateModal,
    showMergeModal,
    setShowMergeModal,
    editingPlan,
    setEditingPlan,
    stats,
    statusMessage,
    loadPlans,
    toggleSelectPlan,
    deletePlan,
    showStatus,
  };
}
