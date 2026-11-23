/**
 * useDashboardTabs Hook
 * =====================
 * Handles active tab state, URL search params synchronization,
 * deep linking to AI assistants, and Cockpit mode security restrictions.
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { selectAssistant as selectAIAssistant } from '../../store/slices/aiAssistantDashboardSlice';
import { AI_ASSISTANTS_REGISTRY } from '../../store/slices/aiAssistant/registry';
import { getTabsForRole, getRoleInfo } from '../../config/ROLE_TAB_MAPPING';
import { useDocumentTitle } from '../useDocumentTitle';
import { fetchDashboardOverview } from '../../store/crmDataSlice';

interface UseDashboardTabsParams {
  currentRole: string;
  isSuperUser: boolean;
  selectedAssistantRedux: string | null;
}

export function useDashboardTabs({
  currentRole,
  isSuperUser,
  selectedAssistantRedux,
}: UseDashboardTabsParams) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(searchParams.get('tab') || 'overview');

  // ─── Tab / Role Info ──────────────────────────────────────
  const availableTabs = getTabsForRole(currentRole);
  const availableTabIds = useMemo(() => new Set(availableTabs.map(tab => tab.id)), [availableTabs]);
  const roleInfo = getRoleInfo(currentRole);
  useDocumentTitle(`${roleInfo.label} Dashboard`);

  // Sync active tab to URL search params
  useEffect((): void => {
    if (!activeTab) {
      return;
    }

    if (searchParams.get('tab') === activeTab) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('tab', activeTab);
    setSearchParams(nextParams);
  }, [activeTab, searchParams, setSearchParams]);

  // Cockpit mode is executive-only: remove it from URL for non-superusers.
  useEffect(() => {
    if (isSuperUser || !searchParams.has('cockpit')) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('cockpit');
    setSearchParams(nextParams);
  }, [isSuperUser, searchParams, setSearchParams]);

  // Deep-link handling: /dashboard?tab=<assistantId>
  useEffect(() => {
    const requestedTab = (searchParams.get('tab') || 'overview').toLowerCase();

    if (requestedTab in AI_ASSISTANTS_REGISTRY) {
      if (activeTab !== requestedTab) {
        setActiveTab(requestedTab);
      }

      if (selectedAssistantRedux !== requestedTab) {
        dispatch(selectAIAssistant(requestedTab));
      }

      return;
    }

    if (availableTabIds.has(requestedTab) && activeTab !== requestedTab) {
      setActiveTab(requestedTab);
      return;
    }

    if (!availableTabIds.has(requestedTab) && activeTab !== 'overview') {
      setActiveTab('overview');
    }
  }, [searchParams, activeTab, dispatch, availableTabIds, selectedAssistantRedux]);

  // Re-fetch overview when role changes
  const prevRoleRef = useRef(currentRole);
  useEffect(() => {
    if (prevRoleRef.current !== currentRole) {
      prevRoleRef.current = currentRole;
      const promise = dispatch(fetchDashboardOverview()) as unknown as {
        abort?: () => void;
      };
      return () => {
        promise.abort?.();
      };
    }
  }, [dispatch, currentRole]);

  return {
    activeTab,
    setActiveTab,
    availableTabs,
    roleInfo,
  };
}
