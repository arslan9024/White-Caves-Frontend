import React from 'react';
import './AssistantDashboard.css';
import type { SentinelPropertyCRMProps } from './sentinelPropertyCRM/types';
import { useSentinelPropertyCRM } from './sentinelPropertyCRM/useSentinelPropertyCRM';
import { containerStyle } from './sentinelPropertyCRM/sentinelCRMStyles';
import { SentinelHeaderTabs } from './sentinelPropertyCRM/SentinelHeaderTabs';
import { LifecycleTabPanel } from './sentinelPropertyCRM/LifecycleTabPanel';
import { QualityGateTabPanel } from './sentinelPropertyCRM/QualityGateTabPanel';
import {
  DecommissionTabPanel,
  TelemetryTabPanel,
} from './sentinelPropertyCRM/DecommissionAndTelemetryPanels';

export const SentinelPropertyCRM: React.FC<SentinelPropertyCRMProps> = ({ moduleId }) => {
  const {
    activeTab,
    setActiveTab,
    properties,
    advanceStage,
    checklist,
    toggleChecklistItem,
    passedCount,
    isGateApproved,
  } = useSentinelPropertyCRM(moduleId);

  return (
    <div className="crm-container" style={containerStyle}>
      <SentinelHeaderTabs activeTab={activeTab} onSelectTab={setActiveTab} />

      {activeTab === 'lifecycle' && (
        <LifecycleTabPanel properties={properties} onAdvanceStage={advanceStage} />
      )}

      {activeTab === 'verification' && (
        <QualityGateTabPanel
          checklist={checklist}
          onToggleItem={toggleChecklistItem}
          passedCount={passedCount}
          isGateApproved={isGateApproved}
        />
      )}

      {activeTab === 'decommission' && <DecommissionTabPanel />}

      {activeTab === 'telemetry' && <TelemetryTabPanel />}
    </div>
  );
};

export default SentinelPropertyCRM;

// Re-export submodules for full backwards compatibility and modular access
export * from './sentinelPropertyCRM/index';
