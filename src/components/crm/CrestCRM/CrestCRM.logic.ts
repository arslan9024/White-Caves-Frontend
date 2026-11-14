import { useState, useMemo } from 'react';
import { CrestTab } from './CrestCRM.types';
import { AREA_RATES } from './CrestCRM.data';

export const useCrestCRM = () => {
  const [activeTab, setActiveTab] = useState<CrestTab>('valuations');
  const [calcSqft, setCalcSqft] = useState(1500);
  const [calcBeds, setCalcBeds] = useState(2);
  const [calcArea, setCalcArea] = useState('Dubai Marina');

  const estVal = useMemo(() => {
    return (AREA_RATES[calcArea] || 1500) * calcSqft;
  }, [calcArea, calcSqft]);

  const tabs: { id: CrestTab; label: string }[] = [
    { id: 'valuations', label: '🏷️ Valuations' },
    { id: 'comparables', label: '🔍 Comparables' },
    { id: 'calculator', label: '🧮 Estimator' },
    { id: 'docs', label: '📚 Docs' },
    { id: 'lifecycle', label: '🔄 Lifecycle' },
  ];

  return {
    activeTab,
    setActiveTab,
    calcSqft,
    setCalcSqft,
    calcBeds,
    setCalcBeds,
    calcArea,
    setCalcArea,
    estVal,
    tabs,
  };
};
