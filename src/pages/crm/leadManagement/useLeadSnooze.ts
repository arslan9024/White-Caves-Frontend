import { useState, useCallback, useMemo } from 'react';
import type { Lead } from '../hooks/useLeadManagement';

const SNOOZE_STORAGE_KEY = 'wc-snoozed-leads';
const SNOOZE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const useLeadSnooze = (filteredLeads: Lead[], currentPage: number, itemsPerPage: number) => {
  const [snoozedLeads, setSnoozedLeads] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem(SNOOZE_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const handleSnooze = useCallback((lead: Lead) => {
    const leadId = String(lead.id);
    const snoozeUntil = Date.now() + SNOOZE_DURATION_MS;
    setSnoozedLeads(prev => {
      const updated = { ...prev, [leadId]: snoozeUntil };
      try {
        localStorage.setItem(SNOOZE_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save snoozed leads:', err);
      }
      return updated;
    });
  }, []);

  const activeFilteredLeads = useMemo(() => {
    const now = Date.now();
    return filteredLeads.filter(lead => {
      const snoozeUntil = snoozedLeads[String(lead.id)];
      return !snoozeUntil || now >= snoozeUntil;
    });
  }, [filteredLeads, snoozedLeads]);

  const activePaginatedLeads = useMemo(() => {
    return activeFilteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [activeFilteredLeads, currentPage, itemsPerPage]);

  return {
    snoozedLeads,
    handleSnooze,
    activeFilteredLeads,
    activePaginatedLeads,
  };
};
