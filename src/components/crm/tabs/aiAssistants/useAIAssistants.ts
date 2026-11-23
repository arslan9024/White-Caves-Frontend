import { useMemo, useState } from 'react';
import { AIAssistantItem } from './types';
import { AI_ASSISTANTS } from './constants';

export interface UseAIAssistantsReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDept: string;
  setSelectedDept: (dept: string) => void;
  selectedAssistant: string | null;
  setSelectedAssistant: (id: string | null) => void;
  filteredAssistants: AIAssistantItem[];
}

export function useAIAssistants(
  initialAssistants: AIAssistantItem[] = AI_ASSISTANTS
): UseAIAssistantsReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null);

  const filteredAssistants = useMemo(() => {
    return initialAssistants.filter(asst => {
      const matchesSearch =
        asst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asst.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All' || asst.dept === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [initialAssistants, searchQuery, selectedDept]);

  return {
    searchQuery,
    setSearchQuery,
    selectedDept,
    setSelectedDept,
    selectedAssistant,
    setSelectedAssistant,
    filteredAssistants,
  };
}
