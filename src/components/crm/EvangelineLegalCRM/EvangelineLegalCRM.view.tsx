/**
 * Evangeline Legal CRM — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component composing Header, Tabs, and Panels
 */

import React from 'react';
import KYCAMLDashboard from '../shared/KYCAMLDashboard';
import type { EvangelineLegalCRMProps, EvangelineTab } from './EvangelineLegalCRM.types';
import { useEvangelineLegalLogic } from './EvangelineLegalCRM.logic';
import {
  ContractAssemblerPanel,
  PoaValidatorPanel,
  NdaStudioPanel,
  EvictionTrackerPanel,
} from './EvangelineLegalCRM.panels';
import { containerStyle, headerBannerStyle, tabBarStyle } from './EvangelineLegalCRM.styles';
import '../AssistantDashboard.css';

export const EvangelineLegalCRMView: React.FC<EvangelineLegalCRMProps> = ({ moduleId }) => {
  const {
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
    ndaDamages,
    setNdaDamages,
    disputes,
  } = useEvangelineLegalLogic(moduleId);

  const tabDefs: { id: EvangelineTab; label: string }[] = [
    { id: 'contracts', label: '3.5.1 Form A/B/F Assembler' },
    { id: 'poa', label: '3.5.2 Notarized POA Validator' },
    { id: 'nda', label: '3.5.3 VIP NDA Studio' },
    { id: 'disputes', label: '3.5.4 Form 12 & Dispute Manager' },
    { id: 'kyc', label: 'KYC & AML Radar' },
  ];

  return (
    <div className="crm-container" style={containerStyle}>
      {/* Header */}
      <div style={headerBannerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg, var(--accent-purple, #7C3AED) 0%, var(--color-6366f1, #6366F1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            ⚖️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                Evangeline AI — Legal & Contract Intelligence
              </h2>
              <span
                style={{
                  fontSize: '0.7rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  color: 'var(--color-c7d2fe, #C7D2FE)',
                  fontWeight: 800,
                }}
              >
                DLD & Dubai Courts Compliance
              </span>
            </div>
            <p
              style={{
                margin: '0.2rem 0 0 0',
                fontSize: '0.82rem',
                color: 'var(--color-c7d2fe, #C7D2FE)',
              }}
            >
              Interactive Unified Form A/B/F Assembler, Notarized POA Validator, VIP NDA Studio &
              Form 12 Eviction Manager.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={tabBarStyle}>
        {tabDefs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border:
                activeTab === t.id
                  ? '1px solid var(--accent-purple, #7C3AED)'
                  : '1px solid transparent',
              background:
                activeTab === t.id
                  ? 'var(--accent-purple, #7C3AED)'
                  : 'var(--color-f8fafc, #F8FAFC)',
              color: activeTab === t.id ? 'var(--white, #FFFFFF)' : 'var(--color-334155, #334155)',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Active Tab Panel */}
      {activeTab === 'contracts' && (
        <ContractAssemblerPanel
          selectedForm={selectedForm}
          setSelectedForm={setSelectedForm}
          partyA={partyA}
          setPartyA={setPartyA}
          partyB={partyB}
          setPartyB={setPartyB}
          propertyRef={propertyRef}
          setPropertyRef={setPropertyRef}
          includeMortgageClause={includeMortgageClause}
          setIncludeMortgageClause={setIncludeMortgageClause}
          includeDldFeeClause={includeDldFeeClause}
          setIncludeDldFeeClause={setIncludeDldFeeClause}
          copiedContract={copiedContract}
          compiledContractText={compiledContractText}
          onCopyContract={copyContractText}
        />
      )}

      {activeTab === 'poa' && (
        <PoaValidatorPanel
          poaNumber={poaNumber}
          setPoaNumber={setPoaNumber}
          poaPrincipal={poaPrincipal}
          setPoaPrincipal={setPoaPrincipal}
          poaAttorney={poaAttorney}
          setPoaAttorney={setPoaAttorney}
          poaExpiry={poaExpiry}
          setPoaExpiry={setPoaExpiry}
          poaHasSellPower={poaHasSellPower}
          setPoaHasSellPower={setPoaHasSellPower}
          poaValidationResult={poaValidationResult}
          onValidatePoa={handleValidatePoa}
        />
      )}

      {activeTab === 'nda' && (
        <NdaStudioPanel
          ndaParty={ndaParty}
          setNdaParty={setNdaParty}
          ndaDamages={ndaDamages}
          setNdaDamages={setNdaDamages}
        />
      )}

      {activeTab === 'disputes' && <EvictionTrackerPanel disputes={disputes} />}

      {activeTab === 'kyc' && <KYCAMLDashboard />}
    </div>
  );
};

export default EvangelineLegalCRMView;

