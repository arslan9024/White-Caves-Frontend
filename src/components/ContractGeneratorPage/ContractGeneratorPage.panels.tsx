/**
 * Contract Generator Page — Panels Layer (Mary Allen Wilkes Architecture)
 * Wizard stepper, Offer summary card, and Contract preview container
 */

import React from 'react';
import type {
  ContractGenStep,
  OfferPayload,
  GeneratedContract,
} from './ContractGeneratorPage.types';

export const ContractGenStepper: React.FC<{ currentStep: ContractGenStep }> = ({ currentStep }) => {
  const steps: { id: ContractGenStep; label: string }[] = [
    { id: 'preview', label: '1. Offer Review' },
    { id: 'review', label: '2. Contract Clauses' },
    { id: 'customize', label: '3. Special Addenda' },
    { id: 'ready', label: '4. Ready for Sign' },
  ];

  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
      {steps.map(s => (
        <div
          key={s.id}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 6,
            background: currentStep === s.id ? '#B03737' : '#F1F5F9',
            color: currentStep === s.id ? '#FFFFFF' : '#475569',
            fontWeight: 800,
            fontSize: '0.8rem',
            textAlign: 'center',
          }}
        >
          {s.label}
        </div>
      ))}
    </div>
  );
};

export const OfferSummaryCard: React.FC<{
  offer: OfferPayload | null;
  onGenerate: () => void;
}> = ({ offer, onGenerate }) => (
  <div
    style={{
      background: '#FFFFFF',
      padding: '1.5rem',
      borderRadius: 8,
      border: '1px solid #E2E8F0',
      marginBottom: 20,
    }}
  >
    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1E293B' }}>
      Verified Offer Parameters
    </h3>
    {offer ? (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Offer Amount</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F766E' }}>
            AED {offer.offerAmount?.toLocaleString() || '0'}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Property Target</span>
          <div style={{ fontWeight: 700, color: '#1E293B', marginTop: 4 }}>
            {offer.propertyTitle || 'Palm Jumeirah Luxury Villa'}
          </div>
        </div>
      </div>
    ) : (
      <p style={{ color: '#64748B', fontSize: '0.85rem' }}>
        No active offer selected or viewing demo mode.
      </p>
    )}
    <button
      onClick={onGenerate}
      style={{
        marginTop: 16,
        padding: '10px 20px',
        background: '#B03737',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: 6,
        fontWeight: 800,
        fontSize: '0.85rem',
        cursor: 'pointer',
      }}
    >
      Generate Official DLD Contract Form F
    </button>
  </div>
);

export const ContractPreviewPanel: React.FC<{ contract: GeneratedContract | null }> = ({
  contract,
}) => (
  <div
    style={{
      background: '#FFFFFF',
      padding: '1.5rem',
      borderRadius: 8,
      border: '1px solid #E2E8F0',
    }}
  >
    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#1E293B' }}>
      Official DLD Contract Preview
    </h3>
    {contract ? (
      <div>
        <div
          style={{
            padding: '8px 12px',
            background: '#DCFCE7',
            color: '#166534',
            borderRadius: 4,
            fontWeight: 700,
            fontSize: '0.85rem',
            marginBottom: 12,
          }}
        >
          Contract {contract.contractNumber} successfully compiled ({contract.templateType})
        </div>
        <pre
          style={{
            background: '#F8FAFC',
            padding: '1rem',
            borderRadius: 6,
            border: '1px solid #E2E8F0',
            fontSize: '0.78rem',
            whiteSpace: 'pre-wrap',
            maxHeight: 350,
            overflowY: 'auto',
          }}
        >
          {contract.htmlContent || 'Dubai Land Department official tenancy / sales terms verified.'}
        </pre>
      </div>
    ) : (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#94A3B8', fontSize: '0.85rem' }}>
        Click &quot;Generate Official DLD Contract Form F&quot; above to preview clauses.
      </div>
    )}
  </div>
);
