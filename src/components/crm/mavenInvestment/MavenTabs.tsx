import React from 'react';
import type { MavenTabType } from './types';
import { tabsNavStyle, getTabButtonStyle } from './MavenInvestmentCRM.styles';

export interface MavenTabsProps {
  activeTab: MavenTabType;
  onSelectTab: (tab: MavenTabType) => void;
}

export const MavenTabs: React.FC<MavenTabsProps> = ({ activeTab, onSelectTab }) => {
  return (
    <div style={tabsNavStyle}>
      <button onClick={() => onSelectTab('dcf')} style={getTabButtonStyle(activeTab === 'dcf')}>
        3.26.1 10-Year DCF & IRR Model
      </button>
      <button onClick={() => onSelectTab('yield')} style={getTabButtonStyle(activeTab === 'yield')}>
        3.26.2 Short vs Long-Term Yields
      </button>
      <button
        onClick={() => onSelectTab('rebalancer')}
        style={getTabButtonStyle(activeTab === 'rebalancer')}
      >
        3.26.3 Portfolio Rebalancer
      </button>
      <button
        onClick={() => onSelectTab('appreciation')}
        style={getTabButtonStyle(activeTab === 'appreciation')}
      >
        3.26.4 Capital Appreciation
      </button>
    </div>
  );
};
