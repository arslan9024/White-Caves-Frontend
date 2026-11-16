import { useState, useMemo } from 'react';
import { SageTab } from './SageCRM.types';

export const useSageCRM = () => {
  const [activeTab, setActiveTab] = useState<SageTab>('applications');
  const [calcPrice, setCalcPrice] = useState(2000000);
  const [calcDown, setCalcDown] = useState(20);
  const [calcRate, setCalcRate] = useState(4.25);
  const [calcYears, setCalcYears] = useState(25);

  const loanAmt = useMemo(() => calcPrice * (1 - calcDown / 100), [calcPrice, calcDown]);
  const monthly = useMemo(() => {
    const monthlyRate = calcRate / 100 / 12;
    const n = calcYears * 12;
    return monthlyRate === 0
      ? loanAmt / n
      : (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  }, [calcRate, calcYears, loanAmt]);

  const totalCost = useMemo(() => monthly * (calcYears * 12), [monthly, calcYears]);

  const tabs: { id: SageTab; label: string }[] = [
    { id: 'applications', label: '📋 Applications' },
    { id: 'calculator', label: '🧮 Calculator' },
    { id: 'banks', label: '🏦 Banks' },
    { id: 'docs', label: '📚 Docs' },
    { id: 'lifecycle', label: '🔄 Lifecycle' },
  ];

  return {
    activeTab,
    setActiveTab,
    calcPrice,
    setCalcPrice,
    calcDown,
    setCalcDown,
    calcRate,
    setCalcRate,
    calcYears,
    setCalcYears,
    loanAmt,
    monthly,
    totalCost,
    tabs,
  };
};

