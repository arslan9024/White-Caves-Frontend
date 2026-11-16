import { useState, useCallback } from 'react';
import { TheodoraTab, FinanceInvoice } from './TheodoraFinanceCRM.types';

export const useTheodoraFinanceCRM = (
  propActiveTab: TheodoraTab = 'overview',
  onTabChange?: (tab: TheodoraTab) => void
) => {
  const [activeTab, setActiveTab] = useState<TheodoraTab>(propActiveTab);
  const [selectedInvoice, setSelectedInvoice] = useState<FinanceInvoice | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState('');

  const handleTabClick = useCallback(
    (tab: TheodoraTab) => {
      setActiveTab(tab);
      onTabChange?.(tab);
    },
    [onTabChange]
  );

  const handleGeneratePaymentMessage = useCallback(
    (message: string | { channel: string; message: string }) => {
      setGeneratedMessage(typeof message === 'string' ? message : message.message);
    },
    []
  );

  return {
    activeTab,
    setActiveTab,
    handleTabClick,
    selectedInvoice,
    setSelectedInvoice,
    generatedMessage,
    handleGeneratePaymentMessage,
  };
};

