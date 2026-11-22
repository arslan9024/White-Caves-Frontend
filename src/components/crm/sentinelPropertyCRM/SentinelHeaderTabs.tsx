import React from 'react';
import {
  headerBannerStyle,
  headerIconContainerStyle,
  headerBadgeStyle,
  tabsContainerStyle,
  getTabButtonStyle,
} from './sentinelCRMStyles';
import type { SentinelTabKey } from './types';

interface SentinelHeaderTabsProps {
  activeTab: SentinelTabKey;
  onSelectTab: (tab: SentinelTabKey) => void;
}

export const SentinelHeaderTabs: React.FC<SentinelHeaderTabsProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <>
      {/* Header */}
      <div style={headerBannerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={headerIconContainerStyle}>🏢</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                Sentinel AI — Property State Machine & Quality
              </h2>
              <span style={headerBadgeStyle}>Inventory Quality Control</span>
            </div>
            <p
              style={{
                margin: '0.2rem 0 0 0',
                fontSize: '0.82rem',
                color: 'var(--color-dbeafe, #DBEAFE)',
              }}
            >
              Property state transition engine, mandatory RERA listing verification gate, and IoT
              sensor telemetry monitoring.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={tabsContainerStyle}>
        <button
          onClick={() => onSelectTab('lifecycle')}
          style={getTabButtonStyle(activeTab === 'lifecycle')}
        >
          3.20.1 Lifecycle State Machine
        </button>
        <button
          onClick={() => onSelectTab('verification')}
          style={getTabButtonStyle(activeTab === 'verification')}
        >
          3.20.2 Listing Quality Gate
        </button>
        <button
          onClick={() => onSelectTab('decommission')}
          style={getTabButtonStyle(activeTab === 'decommission')}
        >
          3.20.3 Decommission Flow
        </button>
        <button
          onClick={() => onSelectTab('telemetry')}
          style={getTabButtonStyle(activeTab === 'telemetry')}
        >
          3.20.4 IoT Telemetry Hub
        </button>
      </div>
    </>
  );
};
