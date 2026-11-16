/**
 * Executive Dashboard — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing time ranges, department filters, tabs, and refresh timers
 * Strictly < 350 lines
 */

import { useState } from 'react';
import type { TimeRange, DashboardTab } from './ExecutiveDashboard.types';

export function useExecutiveDashboardLogic() {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  return {
    timeRange,
    setTimeRange,
    selectedDepartment,
    setSelectedDepartment,
    activeTab,
    setActiveTab,
    refreshing,
    handleRefresh,
  };
}

