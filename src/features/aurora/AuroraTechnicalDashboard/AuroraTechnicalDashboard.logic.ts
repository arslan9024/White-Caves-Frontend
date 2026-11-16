/**
 * Aurora Technical Dashboard — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing active tabs, refresh timer intervals, and health polling
 * Strictly < 350 lines
 */

import { useState, useEffect } from 'react';
import { authFetch } from '../../../utils/authFetch';
import type { AuroraTab } from './AuroraTechnicalDashboard.types';

export function useAuroraTechnicalDashboardLogic() {
  const [activeTab, setActiveTab] = useState<AuroraTab>('health');
  const [refreshInterval, setRefreshInterval] = useState(10000);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await authFetch('/api/aurora/monitoring/health');
        const data = await response.json();
        void data;
      } catch {
        // Non-critical fallback
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return {
    activeTab,
    setActiveTab,
    refreshInterval,
    setRefreshInterval,
  };
}

