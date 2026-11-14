/**
 * Contract Generator Page — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing offer loading, contract compilation, and step transitions
 */

import { useState, useEffect, useCallback } from 'react';
import { authFetch } from '../../utils/authFetch';
import type {
  ContractGenStep,
  OfferPayload,
  GeneratedContract,
} from './ContractGeneratorPage.types';

export function useContractGeneratorLogic(offerId?: string) {
  const [step, setStep] = useState<ContractGenStep>('preview');
  const [contract, setContract] = useState<GeneratedContract | null>(null);
  const [offer, setOffer] = useState<OfferPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [customizations, setCustomizations] = useState<Record<string, unknown>>({});

  const fetchOffer = useCallback(async () => {
    if (!offerId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await authFetch(`/api/offers/${offerId}`);
      if (!response.ok) throw new Error('Failed to fetch offer');

      const data = (await response.json()) as { data?: OfferPayload } & OfferPayload;
      setOffer(data.data || data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading offer');
      setLoading(false);
    }
  }, [offerId]);

  useEffect(() => {
    fetchOffer();
  }, [fetchOffer]);

  const generateContract = async () => {
    if (!offerId) return;
    try {
      setGenerateError(null);
      const response = await authFetch(`/api/contract-generator/from-offer/${offerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: 'White Caves Real Estate LLC' }),
      });

      if (!response.ok) throw new Error('Failed to generate contract');

      const data = (await response.json()) as { data: GeneratedContract };
      setContract(data.data);
      setStep('review');
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : 'Failed to generate contract');
    }
  };

  const updateCustomization = (field: string, value: unknown) => {
    setCustomizations(prev => ({ ...prev, [field]: value }));
  };

  return {
    step,
    setStep,
    contract,
    offer,
    loading,
    error,
    generateError,
    customizations,
    generateContract,
    updateCustomization,
  };
}
