import { useState, useEffect } from 'react';
import type { VestaTab, SnagItem, HandoverChecklistState } from './types';
import { INITIAL_SNAGS, INITIAL_CHECKLIST } from './constants';

export function useVestaHandover(moduleId?: string) {
  const [activeTab, setActiveTab] = useState<VestaTab>('snagging');
  const [snags, setSnags] = useState<SnagItem[]>(INITIAL_SNAGS);
  const [checklist, setChecklist] = useState<HandoverChecklistState>(INITIAL_CHECKLIST);

  useEffect(() => {
    if (!moduleId) return;
    if (moduleId.includes('snagging')) setActiveTab('snagging');
    else if (moduleId.includes('checklist')) setActiveTab('checklist');
    else if (moduleId.includes('certificate') || moduleId.includes('key'))
      setActiveTab('certificate');
    else if (moduleId.includes('contractor')) setActiveTab('contractor');
  }, [moduleId]);

  return {
    activeTab,
    setActiveTab,
    snags,
    setSnags,
    checklist,
    setChecklist,
  };
}
