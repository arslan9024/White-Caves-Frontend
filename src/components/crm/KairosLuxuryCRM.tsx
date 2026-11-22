import React, { useEffect, useState } from 'react';
import './AssistantDashboard.css';
import { INITIAL_VIP_GUESTS, KAIROS_TABS, resolveTabFromModuleId } from './kairosLuxury/constants';
import { GoldenVisaTab } from './kairosLuxury/GoldenVisaTab';
import { CryptoFxTab } from './kairosLuxury/CryptoFxTab';
import { ChauffeurTab } from './kairosLuxury/ChauffeurTab';
import { FamilyOfficeTab } from './kairosLuxury/FamilyOfficeTab';
import type { KairosLuxuryCRMProps, KairosTabId } from './kairosLuxury/types';

export const KairosLuxuryCRM: React.FC<KairosLuxuryCRMProps> = ({ moduleId }) => {
  const [activeTab, setActiveTab] = useState<KairosTabId>('golden-visa');

  useEffect(() => {
    const resolvedTab = resolveTabFromModuleId(moduleId);
    if (resolvedTab) setActiveTab(resolvedTab);
  }, [moduleId]);

  return (
    <div className="crm-container" style={{ maxWidth: '100%', padding: '0.5rem' }}>
      {/* Header */}
      <div
        style={{
          background:
            'linear-gradient(135deg, var(--color-831843, #831843) 0%, var(--color-500724, #500724) 100%)',
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
                'linear-gradient(135deg, var(--color-ec4899, #EC4899) 0%, var(--color-be185d, #BE185D) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            💎
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                Kairos AI — Luxury HNWI Wealth Advisory
              </h2>
              <span
                style={{
                  fontSize: '0.7rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  color: 'var(--color-fbcfe8, #FBCFE8)',
                  fontWeight: 800,
                }}
              >
                Ultra-Luxury Private Client Group
              </span>
            </div>
            <p
              style={{
                margin: '0.2rem 0 0 0',
                fontSize: '0.82rem',
                color: 'var(--color-fce7f3, #FCE7F3)',
              }}
            >
              UAE 10-Year Golden Visa qualification calculator, crypto real estate payment locks,
              and VIP jet/chauffeur viewings.
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
        {KAIROS_TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: isActive
                  ? '1px solid var(--color-be185d, #BE185D)'
                  : '1px solid transparent',
                background: isActive
                  ? 'var(--color-be185d, #BE185D)'
                  : 'var(--color-f8fafc, #F8FAFC)',
                color: isActive ? 'var(--white, #FFF)' : 'var(--color-334155, #334155)',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'golden-visa' && <GoldenVisaTab />}
      {activeTab === 'crypto' && <CryptoFxTab />}
      {activeTab === 'chauffeur' && <ChauffeurTab vipGuests={INITIAL_VIP_GUESTS} />}
      {activeTab === 'family-office' && <FamilyOfficeTab />}
    </div>
  );
};

export default KairosLuxuryCRM;
