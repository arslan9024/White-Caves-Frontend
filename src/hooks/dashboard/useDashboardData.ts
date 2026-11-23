/**
 * useDashboardData Hook
 * =====================
 * Handles Redux CRM selectors, data composition, dispatch fetches, and retry logic.
 */

import { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import {
  fetchLeadsFromAPI,
  fetchPropertiesFromAPI,
  fetchAgentsFromAPI,
  fetchDashboardOverview,
  selectAllLeads,
  selectAllProperties,
  selectAllAgents,
  selectAllCommissions,
  selectOverviewData,
  selectLeadsLoading,
  selectPropertiesLoading,
  selectAgentsLoading,
  selectLeadsError,
  selectPropertiesError,
  selectAgentsError,
  selectRecentActivities,
  selectHotLeads,
} from '../../store/crmDataSlice';
import type { DashboardData, AbortableDispatch } from './types';
import { EMPTY_CRM_ARRAY, normalizeDashboardError } from './types';

export function useDashboardData() {
  const dispatch = useAppDispatch();

  // ─── Redux CRM Data Selectors ─────────────────────────────
  const allLeads = useSelector(selectAllLeads);
  const hotLeads = useSelector(selectHotLeads);
  const allProperties = useSelector(selectAllProperties);
  const allAgents = useSelector(selectAllAgents);
  const allCommissions = useSelector(selectAllCommissions);
  const overview = useSelector(selectOverviewData);
  const recentActivities = useSelector((state: RootState) => selectRecentActivities(state, 10));
  const leadsLoading = useSelector(selectLeadsLoading);
  const propertiesLoading = useSelector(selectPropertiesLoading);
  const agentsLoading = useSelector(selectAgentsLoading);

  const leadsError = useSelector(selectLeadsError);
  const propertiesError = useSelector(selectPropertiesError);
  const agentsError = useSelector(selectAgentsError);

  // Composite loading / error
  const isLoading = leadsLoading || propertiesLoading || agentsLoading;
  const error = useMemo(
    () => normalizeDashboardError(leadsError || propertiesError || agentsError || null),
    [leadsError, propertiesError, agentsError]
  );

  // ─── Dashboard Data (memoized) ────────────────────────────
  const dashboardData = useMemo<DashboardData>(
    () => ({
      properties: allProperties,
      agents: allAgents,
      leads: allLeads,
      hotLeads,
      commissions: allCommissions,
      recentActivities,
      overview,
      contracts: EMPTY_CRM_ARRAY,
      tenants: EMPTY_CRM_ARRAY,
      payments: EMPTY_CRM_ARRAY,
      leases: EMPTY_CRM_ARRAY,
      applications: EMPTY_CRM_ARRAY,
      savedProperties: EMPTY_CRM_ARRAY,
      searchHistory: EMPTY_CRM_ARRAY,
      offers: EMPTY_CRM_ARRAY,
      sales: EMPTY_CRM_ARRAY,
      myRental: EMPTY_CRM_ARRAY,
      maintenanceRequests: EMPTY_CRM_ARRAY,
      leaseInfo: EMPTY_CRM_ARRAY,
    }),
    [allProperties, allAgents, allLeads, hotLeads, allCommissions, recentActivities, overview]
  );

  const dispatchDashboardFetches = useCallback(
    ({ force = false }: { force?: boolean } = {}): AbortableDispatch[] => {
      const requests: AbortableDispatch[] = [];

      if (force || (!allLeads.length && !leadsLoading)) {
        requests.push(dispatch(fetchLeadsFromAPI({})) as unknown as AbortableDispatch);
      }

      if (force || (!allProperties.length && !propertiesLoading)) {
        requests.push(dispatch(fetchPropertiesFromAPI({})) as unknown as AbortableDispatch);
      }

      if (force || (!allAgents.length && !agentsLoading)) {
        requests.push(dispatch(fetchAgentsFromAPI()) as unknown as AbortableDispatch);
      }

      if (force || !overview) {
        requests.push(dispatch(fetchDashboardOverview()) as unknown as AbortableDispatch);
      }

      return requests;
    },
    [
      dispatch,
      allLeads.length,
      leadsLoading,
      allProperties.length,
      propertiesLoading,
      allAgents.length,
      agentsLoading,
      overview,
    ]
  );

  const handleRetryAll = useCallback(() => {
    dispatchDashboardFetches({ force: true });
  }, [dispatchDashboardFetches]);

  return {
    dashboardData,
    isLoading,
    error,
    dispatchDashboardFetches,
    handleRetryAll,
  };
}
