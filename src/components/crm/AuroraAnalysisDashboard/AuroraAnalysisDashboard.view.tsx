/**
 * Aurora Analysis Dashboard — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component
 */

import React from 'react';
import { useAuroraAnalysisLogic } from './AuroraAnalysisDashboard.logic';
import { AURORA_TABS } from './AuroraAnalysisDashboard.types';
import { OverviewTab, AuditTab } from './AuroraAnalysisDashboard.tabs';
import '../AuroraAnalysisDashboard.css';

export const AuroraAnalysisDashboardView: React.FC = () => {
  const { dispatch, providers, analysis, audit, ui, handleTabChange } = useAuroraAnalysisLogic();

  return (
    <div className="aurora-analysis-dashboard">
      <div className="aurora-tabs">
        {AURORA_TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`aurora-tab ${ui.activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="aurora-content">
        {ui.activeTab === 'audit' ? (
          <AuditTab audit={audit} analysis={analysis} dispatch={dispatch} />
        ) : (
          <OverviewTab analysis={analysis} providers={providers} dispatch={dispatch} />
        )}
      </div>
    </div>
  );
};

export default AuroraAnalysisDashboardView;

