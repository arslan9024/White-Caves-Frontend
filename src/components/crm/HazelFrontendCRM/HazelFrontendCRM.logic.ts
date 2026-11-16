import { useState, useMemo } from 'react';
import { COMPONENT_LIBRARY } from './HazelFrontendCRM.data';
import { ComponentStats } from './HazelFrontendCRM.types';

export function useHazelFrontendCRM() {
  const [activeTab, setActiveTab] = useState('overview');
  const [themeMode, setThemeMode] = useState('dark');

  const componentStats: ComponentStats = useMemo(
    () => ({
      total: COMPONENT_LIBRARY.length,
      stable: COMPONENT_LIBRARY.filter(c => c.status === 'stable').length,
      new: COMPONENT_LIBRARY.filter(c => c.status === 'new').length,
      totalUsage: COMPONENT_LIBRARY.reduce((sum, c) => sum + c.usage, 0),
    }),
    []
  );

  return {
    activeTab,
    setActiveTab,
    themeMode,
    setThemeMode,
    componentStats,
  };
}

