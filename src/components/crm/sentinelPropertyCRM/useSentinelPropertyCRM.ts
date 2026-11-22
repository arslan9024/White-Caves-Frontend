import { useState, useEffect } from 'react';
import type { SentinelTabKey, SentinelProperty, SentinelChecklist } from './types';
import { INITIAL_PROPERTIES, INITIAL_CHECKLIST, STAGE_ORDER } from './sentinelData';

export function useSentinelPropertyCRM(moduleId?: string) {
  const [activeTab, setActiveTab] = useState<SentinelTabKey>('lifecycle');
  const [properties, setProperties] = useState<SentinelProperty[]>(INITIAL_PROPERTIES);
  const [checklist, setChecklist] = useState<SentinelChecklist>(INITIAL_CHECKLIST);
  const [sensorStatus, setSensorStatus] = useState<string>('ALL_SENSORS_NORMAL');

  useEffect(() => {
    if (!moduleId) return;
    if (moduleId.includes('lifecycle')) setActiveTab('lifecycle');
    else if (moduleId.includes('verification')) setActiveTab('verification');
    else if (moduleId.includes('decommission')) setActiveTab('decommission');
    else if (moduleId.includes('telemetry')) setActiveTab('telemetry');
  }, [moduleId]);

  const advanceStage = (id: string) => {
    setProperties(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const nextIdx = (STAGE_ORDER.indexOf(p.currentStage) + 1) % STAGE_ORDER.length;
        return { ...p, currentStage: STAGE_ORDER[nextIdx] };
      })
    );
  };

  const toggleChecklistItem = (key: keyof SentinelChecklist, val: boolean) => {
    setChecklist(prev => ({ ...prev, [key]: val }));
  };

  const passedCount = Object.values(checklist).filter(Boolean).length;
  const isGateApproved = passedCount === 6;

  return {
    activeTab,
    setActiveTab,
    properties,
    advanceStage,
    checklist,
    toggleChecklistItem,
    passedCount,
    isGateApproved,
    sensorStatus,
    setSensorStatus,
  };
}
