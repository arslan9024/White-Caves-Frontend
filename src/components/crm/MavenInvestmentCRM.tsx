import React from 'react';
import './AssistantDashboard.css';
import {
  MavenHeader,
  MavenTabs,
  MavenDcfTab,
  MavenYieldTab,
  MavenOverviewTab,
  useMavenInvestment,
  containerStyle,
  type MavenInvestmentCRMProps,
} from './mavenInvestment';

export const MavenInvestmentCRM: React.FC<MavenInvestmentCRMProps> = ({ moduleId }) => {
  const {
    activeTab,
    setActiveTab,
    initialInvestment,
    setInitialInvestment,
    holdingYears,
    setHoldingYears,
    annualRentalGrowth,
    setAnnualRentalGrowth,
    initialRent,
    setInitialRent,
    dcfResults,
    yieldResults,
  } = useMavenInvestment(moduleId);

  return (
    <div className="crm-container" style={containerStyle}>
      <MavenHeader />
      <MavenTabs activeTab={activeTab} onSelectTab={setActiveTab} />

      {activeTab === 'dcf' && (
        <MavenDcfTab
          initialInvestment={initialInvestment}
          setInitialInvestment={setInitialInvestment}
          holdingYears={holdingYears}
          setHoldingYears={setHoldingYears}
          annualRentalGrowth={annualRentalGrowth}
          setAnnualRentalGrowth={setAnnualRentalGrowth}
          initialRent={initialRent}
          setInitialRent={setInitialRent}
          dcfResults={dcfResults}
        />
      )}

      {activeTab === 'yield' && (
        <MavenYieldTab
          longTermRent={yieldResults.longTermRent}
          longTermYield={yieldResults.longTermYield}
          shortTermGross={yieldResults.shortTermGross}
          shortTermNet={yieldResults.shortTermNet}
          shortTermYield={yieldResults.shortTermYield}
        />
      )}

      {(activeTab === 'rebalancer' || activeTab === 'appreciation') && (
        <MavenOverviewTab activeTab={activeTab} />
      )}
    </div>
  );
};

export default MavenInvestmentCRM;

// Re-export subcomponents, hooks, styles, types for backwards-compatibility & companion access
export * from './mavenInvestment';
