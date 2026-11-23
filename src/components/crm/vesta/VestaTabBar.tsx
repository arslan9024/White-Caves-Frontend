import React from 'react';
import type { VestaTab } from './types';
import { VESTA_TAB_CONFIG } from './constants';
import { vestaStyles } from './styles';

interface VestaTabBarProps {
  activeTab: VestaTab;
  onTabChange: (tab: VestaTab) => void;
}

export const VestaTabBar: React.FC<VestaTabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div style={vestaStyles.tabBar}>
      {VESTA_TAB_CONFIG.map(tab => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          style={activeTab === tab.id ? vestaStyles.tabButtonActive : vestaStyles.tabButtonInactive}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
