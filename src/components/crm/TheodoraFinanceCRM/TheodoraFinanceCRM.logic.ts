import { useState, useCallback } from 'react';
import { TheodoraTab, FinanceInvoice } from './TheodoraFinanceCRM.types';

export const useTheodoraFinanceCRM = () => {
  const [activeTab, setActiveTab] = useState<TheodoraTab>('overview');
  const [selectedInvoice, setSelectedInvoice] = useState<FinanceInvoice | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState('');

  const handleGeneratePaymentMessage = useCallback((message: string) => {
    setGeneratedMessage(message);
  }, []);

  return {
    activeTab,
    setActiveTab,
    selectedInvoice,
    setSelectedInvoice,
    generatedMessage,
    handleGeneratePaymentMessage,
  };
};
