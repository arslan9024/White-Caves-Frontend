/**
 * Evangeline Legal CRM — Logic Layer (Mary Allen Wilkes Architecture)
 * State coordination hook for DLD contracts, POA checks, NDAs, and eviction tracking
 */

import { useState, useEffect, useMemo } from 'react';
import type {
  EvangelineTab,
  DldFormType,
  PoaValidationResult,
  EvictionDispute,
} from './EvangelineLegalCRM.types';
import { INITIAL_DISPUTES, generateContractText } from './EvangelineLegalCRM.data';

export function useEvangelineLegalLogic(moduleId?: string) {
  const [activeTab, setActiveTab] = useState<EvangelineTab>('contracts');

  // Synchronize sub-item moduleId from sidebar
  useEffect(() => {
    if (!moduleId) return;
    if (moduleId.includes('poa')) setActiveTab('poa');
    else if (moduleId.includes('nda')) setActiveTab('nda');
    else if (moduleId.includes('dispute')) setActiveTab('disputes');
    else if (moduleId.includes('contract')) setActiveTab('contracts');
  }, [moduleId]);

  // Feature 1: Form A/B/F Assembler
  const [selectedForm, setSelectedForm] = useState<DldFormType>('Form F');
  const [partyA, setPartyA] = useState('White Caves Real Estate LLC');
  const [partyB, setPartyB] = useState('Emaar Properties PJSC');
  const [propertyRef, setPropertyRef] = useState('Downtown Heights Penthouse 5201');
  const [depositPercent, setDepositPercent] = useState('10');
  const [includeMortgageClause, setIncludeMortgageClause] = useState(true);
  const [includeDldFeeClause, setIncludeDldFeeClause] = useState(true);
  const [copiedContract, setCopiedContract] = useState(false);

  const compiledContractText = useMemo(() => {
    return generateContractText({
      selectedForm,
      partyA,
      partyB,
      propertyRef,
      depositPercent,
      includeMortgageClause,
      includeDldFeeClause,
    });
  }, [
    selectedForm,
    partyA,
    partyB,
    propertyRef,
    depositPercent,
    includeMortgageClause,
    includeDldFeeClause,
  ]);

  const copyContractText = () => {
    navigator.clipboard.writeText(compiledContractText);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 3000);
  };

  // Feature 2: POA Validator
  const [poaNumber, setPoaNumber] = useState('POA-DXB-2026-8891');
  const [poaPrincipal, setPoaPrincipal] = useState('Rashid Al Maktoum Investment Trust');
  const [poaAttorney, setPoaAttorney] = useState('Arsalan Malik (Managing Director)');
  const [poaExpiry, setPoaExpiry] = useState('2027-12-31');
  const [poaHasSellPower, setPoaHasSellPower] = useState(true);
  const [poaValidationResult, setPoaValidationResult] = useState<PoaValidationResult | null>(null);

  const handleValidatePoa = () => {
    const isExpired = new Date(poaExpiry) < new Date();
    setPoaValidationResult({
      status: !isExpired && poaHasSellPower ? 'VALID_APPROVED' : 'REJECTED_RISK',
      validity: !isExpired ? 'Active & Notarized' : 'EXPIRED',
      authorityCheck: poaHasSellPower
        ? 'Explicit Real Estate Selling Power Granted'
        : 'Missing Real Estate Disposition Rights',
      notaryRegistry: 'Dubai Courts Notary Public e-Registry Verified',
      riskScore: !isExpired && poaHasSellPower ? 'LOW_RISK' : 'HIGH_RISK_BLOCK',
    });
  };

  // Feature 3: NDA Studio
  const [ndaParty, setNdaParty] = useState('Royal Horizon Capital Holdings');
  const [ndaPurpose, setNdaPurpose] = useState(
    'Off-Market Palm Jumeirah Ultra-Luxury Villa Portfolio Evaluation (AED 120M+)'
  );
  const [ndaDamages, setNdaDamages] = useState('5,000,000');

  // Feature 4: Form 12 Eviction Notice Tracker
  const [disputes] = useState<EvictionDispute[]>(INITIAL_DISPUTES);

  return {
    activeTab,
    setActiveTab,
    selectedForm,
    setSelectedForm,
    partyA,
    setPartyA,
    partyB,
    setPartyB,
    propertyRef,
    setPropertyRef,
    depositPercent,
    setDepositPercent,
    includeMortgageClause,
    setIncludeMortgageClause,
    includeDldFeeClause,
    setIncludeDldFeeClause,
    copiedContract,
    compiledContractText,
    copyContractText,
    poaNumber,
    setPoaNumber,
    poaPrincipal,
    setPoaPrincipal,
    poaAttorney,
    setPoaAttorney,
    poaExpiry,
    setPoaExpiry,
    poaHasSellPower,
    setPoaHasSellPower,
    poaValidationResult,
    handleValidatePoa,
    ndaParty,
    setNdaParty,
    ndaPurpose,
    setNdaPurpose,
    ndaDamages,
    setNdaDamages,
    disputes,
  };
}

