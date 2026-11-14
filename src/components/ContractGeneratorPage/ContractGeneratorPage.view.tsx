/**
 * Contract Generator Page — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { useContractGeneratorLogic } from './ContractGeneratorPage.logic';
import {
  ContractGenStepper,
  OfferSummaryCard,
  ContractPreviewPanel,
} from './ContractGeneratorPage.panels';
import '../ContractGeneratorPage.css';

export const ContractGeneratorPageView: React.FC = () => {
  const { offerId } = useParams<{ offerId?: string }>();
  const { step, contract, offer, loading, error, generateError, generateContract } =
    useContractGeneratorLogic(offerId);

  return (
    <div className="contract-generator-container" style={{ padding: '1rem', maxWidth: '100%' }}>
      {/* Stepper */}
      <ContractGenStepper currentStep={step} />

      {/* Error Banners */}
      {(error || generateError) && (
        <div
          style={{
            padding: '10px 14px',
            background: '#FEE2E2',
            color: '#991B1B',
            borderRadius: 6,
            marginBottom: 16,
            fontSize: '0.85rem',
          }}
        >
          {error || generateError}
        </div>
      )}

      {/* Offer Summary */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
          Loading offer data...
        </div>
      ) : (
        <OfferSummaryCard offer={offer} onGenerate={generateContract} />
      )}

      {/* Contract Preview */}
      <ContractPreviewPanel contract={contract} />
    </div>
  );
};

export default ContractGeneratorPageView;
