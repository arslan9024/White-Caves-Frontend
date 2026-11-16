/**
 * Cipher Market CRM — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component composing Header, Tabs, and Panels
 */

import React from 'react';
import type { CipherMarketCRMProps, CipherTab } from './CipherMarketCRM.types';
import { useCipherMarketLogic } from './CipherMarketCRM.logic';
import {
  CmaBuilderPanel,
  DldRegressorPanel,
  TrendsPanel,
  ForecastPanel,
} from './CipherMarketCRM.panels';
import '../AssistantDashboard.css';

export const CipherMarketCRMView: React.FC<CipherMarketCRMProps> = ({ moduleId }) => {
  const {
    activeTab,
    setActiveTab,
    community,
    setCommunity,
    propertyType,
    setPropertyType,
    bedrooms,
    setBedrooms,
    builtUpArea,
    setBuiltUpArea,
    cmaValuation,
    calculateCma,
    dldCluster,
  } = useCipherMarketLogic(moduleId);

  const tabs: { id: CipherTab; label: string }[] = [
    { id: 'cma', label: '3.22.3 Automated CMA Builder' },
    { id: 'dld', label: '3.22.1 DLD Transaction Regressor' },
    { id: 'trends', label: '3.22.2 Community Price-Per-SqFt Trends' },
    { id: 'forecast', label: '3.22.4 12-Month Price Projection' },
  ];

  return (
    <div className="crm-container" style={{ maxWidth: '100%', padding: '0.5rem' }}>
      {/* Header */}
      <div
        style={{
          background:
            'linear-gradient(135deg, var(--accent-teal, #0F766E) 0%, var(--color-115e59, #115E59) 100%)',
          color: 'var(--white, #FFFFFF)',
          padding: '1.25rem 1.5rem',
          borderRadius: '16px',
          marginBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg, var(--accent-teal, #14B8A6) 0%, var(--accent-teal, #0D9488) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            📊
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                Cipher AI — Market Pricing & CMA Valuations
              </h2>
              <span
                style={{
                  fontSize: '0.7rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  color: 'var(--color-ccfbf1, #CCFBF1)',
                  fontWeight: 800,
                }}
              >
                DLD Transaction Regression Engine
              </span>
            </div>
            <p
              style={{
                margin: '0.2rem 0 0 0',
                fontSize: '0.82rem',
                color: 'var(--color-ccfbf1, #CCFBF1)',
              }}
            >
              Automated Comparative Market Analysis (CMA), DLD historical transaction regressions,
              and price projection models.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          background: 'var(--white, #FFFFFF)',
          padding: '8px 12px',
          borderRadius: '12px',
          border: '1px solid var(--text-secondary, #E2E8F0)',
          marginBottom: '1.25rem',
        }}
      >
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border:
                activeTab === t.id
                  ? '1px solid var(--accent-teal, #0D9488)'
                  : '1px solid transparent',
              background:
                activeTab === t.id ? 'var(--accent-teal, #0D9488)' : 'var(--color-f8fafc, #F8FAFC)',
              color: activeTab === t.id ? 'var(--white, #FFF)' : 'var(--color-334155, #334155)',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'cma' && (
        <CmaBuilderPanel
          community={community}
          setCommunity={setCommunity}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          bedrooms={bedrooms}
          setBedrooms={setBedrooms}
          builtUpArea={builtUpArea}
          setBuiltUpArea={setBuiltUpArea}
          cmaValuation={cmaValuation}
          onCalculateCma={calculateCma}
        />
      )}

      {activeTab === 'dld' && <DldRegressorPanel dldCluster={dldCluster} />}

      {activeTab === 'trends' && <TrendsPanel />}

      {activeTab === 'forecast' && <ForecastPanel />}
    </div>
  );
};

export default CipherMarketCRMView;

