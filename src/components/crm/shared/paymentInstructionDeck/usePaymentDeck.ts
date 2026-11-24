import { useState, useCallback, useEffect, useRef } from 'react';
import { TIMING } from '../../../../constants/app';
import { requestPaymentIntent, buildPaymentMessage } from './services';

export interface UsePaymentDeckParams {
  amount?: number;
  reference?: string;
  clientName?: string;
  invoiceId?: string;
  onGenerateMessage?: (message: string, method: string) => void;
}

export function usePaymentDeck({
  amount = 0,
  reference = '',
  clientName = '',
  invoiceId = '',
  onGenerateMessage,
}: UsePaymentDeckParams) {
  const [selectedMethod, setSelectedMethod] = useState('transfer');
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [intentLoading, setIntentLoading] = useState(false);
  const [intentStatus, setIntentStatus] = useState<string | null>(null);
  const [intentError, setIntentError] = useState<string | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback((text: string, field?: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field ?? null);
    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = setTimeout(() => setCopied(null), TIMING.COPY_FEEDBACK);
  }, []);

  const generateMessage = useCallback(() => {
    const message = buildPaymentMessage({
      selectedMethod,
      clientName,
      amount,
      reference,
      invoiceId,
    });

    if (onGenerateMessage) {
      onGenerateMessage(message, selectedMethod);
    }

    navigator.clipboard.writeText(message);
    setCopied('message');
    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = setTimeout(() => setCopied(null), TIMING.COPY_FEEDBACK);
  }, [selectedMethod, amount, reference, clientName, invoiceId, onGenerateMessage]);

  const createPaymentIntent = useCallback(async () => {
    setIntentStatus(null);
    setIntentError(null);

    if (!amount || amount <= 0) {
      setIntentError('Please provide a valid amount before generating a payment link.');
      return;
    }

    setIntentLoading(true);
    try {
      const payload = await requestPaymentIntent({
        amount,
        reference,
        invoiceId,
        clientName,
      });

      if (!payload.success) {
        setIntentError(payload.error || 'Failed to generate payment link.');
        return;
      }

      setIntentStatus(`Payment link generated (${payload.data?.paymentIntentId ?? 'stub'}).`);
    } catch {
      setIntentError('Failed to generate payment link. Please try again.');
    } finally {
      setIntentLoading(false);
    }
  }, [amount, clientName, invoiceId, reference]);

  const toggleExpanded = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  return {
    selectedMethod,
    setSelectedMethod,
    copied,
    expanded,
    toggleExpanded,
    intentLoading,
    intentStatus,
    intentError,
    handleCopy,
    generateMessage,
    createPaymentIntent,
  };
}
