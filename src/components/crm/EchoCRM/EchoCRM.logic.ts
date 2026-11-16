import { useState, useMemo } from 'react';
import { EchoTab, EchoClient } from './EchoCRM.types';
import { CLIENTS, TIMELINE } from './EchoCRM.data';

export const useEchoCRM = () => {
  const [activeTab, setActiveTab] = useState<EchoTab>('timeline');
  const [selectedClient, setSelectedClient] = useState<EchoClient>(CLIENTS[0]);
  const [search, setSearch] = useState('');

  const filteredClients = useMemo(() => {
    return CLIENTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const clientTimeline = useMemo(() => {
    return TIMELINE.filter(e => e.client === selectedClient.name);
  }, [selectedClient]);

  const tabs: { id: EchoTab; label: string }[] = [
    { id: 'timeline', label: '📅 Timeline' },
    { id: 'clients', label: '👥 Clients' },
    { id: 'channels', label: '📡 Channels' },
    { id: 'docs', label: '📚 Docs' },
    { id: 'lifecycle', label: '🔄 Lifecycle' },
  ];

  return {
    activeTab,
    setActiveTab,
    selectedClient,
    setSelectedClient,
    search,
    setSearch,
    filteredClients,
    clientTimeline,
    tabs,
  };
};

