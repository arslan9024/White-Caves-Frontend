import React from 'react';
import './AssistantDashboard.css';
import {
  VestaHeader,
  VestaTabBar,
  VestaSnaggingTable,
  VestaChecklistTab,
  VestaCertificateTab,
  VestaContractorSlaTab,
  useVestaHandover,
  vestaStyles,
  type VestaHandoverCRMProps,
} from './vesta';

// Re-export all sub-modules for backwards-compatibility and consumers
export * from './vesta';

export const VestaHandoverCRM: React.FC<VestaHandoverCRMProps> = ({ moduleId, role, user }) => {
  const { activeTab, setActiveTab, snags, checklist, setChecklist } = useVestaHandover(moduleId);

  return (
    <div className="crm-container" style={vestaStyles.container}>
      {/* Header */}
      <VestaHeader />

      {/* Tabs */}
      <VestaTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab 1: Snagging */}
      {activeTab === 'snagging' && <VestaSnaggingTable snags={snags} />}

      {/* Tab 2: Checklist */}
      {activeTab === 'checklist' && (
        <VestaChecklistTab
          checklist={checklist}
          onChecklistChange={setChecklist}
          onProceedToCertificate={() => setActiveTab('certificate')}
        />
      )}

      {/* Tab 3: Key Certificate */}
      {activeTab === 'certificate' && <VestaCertificateTab />}

      {/* Tab 4: Contractor SLA */}
      {activeTab === 'contractor' && <VestaContractorSlaTab />}
    </div>
  );
};

export default VestaHandoverCRM;
