import React, { useState, useEffect } from 'react';
import { EscrowMilestoneTracker } from './EscrowMilestoneTracker';
import { INITIAL_ATLAS_PROJECTS, type AtlasTabId } from './atlasProjects/types';
import { DeveloperTrackerTab } from './atlasProjects/DeveloperTrackerTab';
import { DelayEstimatorTab } from './atlasProjects/DelayEstimatorTab';
import { PaymentPlanBuilderTab } from './atlasProjects/PaymentPlanBuilderTab';
import { RoiSimulatorTab } from './atlasProjects/RoiSimulatorTab';
import './AssistantDashboard.css';

interface AtlasProjectsCRMProps {
  moduleId?: string;
  role?: string;
  user?: Record<string, unknown>;
}

const ATLAS_TABS: Array<{ id: AtlasTabId; label: string; testId?: string }> = [
  { id: 'tracker', label: '3.7.3 Developer Tracker' },
  { id: 'escrow', label: '3.7.5 DLD Escrow Stepper', testId: 'tab-escrow-milestone' },
  { id: 'delay', label: '3.7.1 Construction Delay Estimator' },
  { id: 'payment-plans', label: '3.7.2 Payment Plan Builder' },
  { id: 'roi', label: '3.7.4 Off-Plan ROI Simulator' },
];

export const AtlasProjectsCRM: React.FC<AtlasProjectsCRMProps> = ({ moduleId }) => {
  const [activeTab, setActiveTab] = useState<AtlasTabId>('tracker');
  const [projects] = useState(INITIAL_ATLAS_PROJECTS);

  useEffect(() => {
    if (!moduleId) return;
    if (moduleId.includes('delay')) setActiveTab('delay');
    else if (moduleId.includes('payment')) setActiveTab('payment-plans');
    else if (moduleId.includes('roi')) setActiveTab('roi');
    else if (moduleId.includes('tracker')) setActiveTab('tracker');
  }, [moduleId]);

  return (
    <div className="crm-container" style={{ maxWidth: '100%', padding: '0.5rem' }}>
      <div
        style={{
          background:
            'linear-gradient(135deg, var(--color-7c2d12, #7C2D12) 0%, var(--color-451a03, #451A03) 100%)',
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
                'linear-gradient(135deg, var(--color-f97316, #F97316) 0%, var(--color-ea580c, #EA580C) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            🏛️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                Atlas AI — Off-Plan Projects & Construction
              </h2>
              <span
                style={{
                  fontSize: '0.7rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  color: 'var(--color-fed7aa, #FED7AA)',
                  fontWeight: 800,
                }}
              >
                Escrow & DLD Milestone Radar
              </span>
            </div>
            <p
              style={{
                margin: '0.2rem 0 0 0',
                fontSize: '0.82rem',
                color: 'var(--color-ffedd5, #FFEDD5)',
              }}
            >
              Real-time developer milestone tracking, construction delay variance algorithms,
              payment plan generators & ROI models.
            </p>
          </div>
        </div>
      </div>

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
        {ATLAS_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            data-testid={tab.testId}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border:
                activeTab === tab.id
                  ? '1px solid var(--color-ea580c, #EA580C)'
                  : '1px solid transparent',
              background:
                activeTab === tab.id
                  ? 'var(--color-ea580c, #EA580C)'
                  : 'var(--color-f8fafc, #F8FAFC)',
              color: activeTab === tab.id ? 'var(--white, #FFF)' : 'var(--color-334155, #334155)',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'tracker' && <DeveloperTrackerTab projects={projects} />}
      {activeTab === 'escrow' && (
        <div style={{ marginTop: '0.5rem' }}>
          <EscrowMilestoneTracker />
        </div>
      )}
      {activeTab === 'delay' && <DelayEstimatorTab projects={projects} />}
      {activeTab === 'payment-plans' && <PaymentPlanBuilderTab />}
      {activeTab === 'roi' && <RoiSimulatorTab />}
    </div>
  );
};

export default AtlasProjectsCRM;
