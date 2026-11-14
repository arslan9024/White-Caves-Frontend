import { useState, useMemo } from 'react';
import { MATCHES } from './PrismCRM.data';
import { PrismTab } from './PrismCRM.types';

export const usePrismCRM = () => {
  const [activeTab, setActiveTab] = useState<PrismTab>('matches');
  const [areaFilter, setAreaFilter] = useState('All');

  const filteredMatches = useMemo(() => {
    return areaFilter === 'All' ? MATCHES : MATCHES.filter(m => m.area === areaFilter);
  }, [areaFilter]);

  const tabs: { id: PrismTab; label: string }[] = [
    { id: 'matches', label: '🔮 Matches' },
    { id: 'algorithm', label: '⚙️ Algorithm' },
    { id: 'inventory', label: '🏘️ Inventory View' },
    { id: 'docs', label: '📚 Docs' },
    { id: 'lifecycle', label: '🔄 Lifecycle' },
  ];

  return {
    activeTab,
    setActiveTab,
    areaFilter,
    setAreaFilter,
    filteredMatches,
    tabs,
  };
};
