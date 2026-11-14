import React from 'react';
import {
  Palette,
  Package,
  Accessibility,
  Zap,
  Box,
  BarChart3,
} from 'lucide-react';
import { AssistantDocsTab } from '../shared';
import '../AssistantDashboard.css';
import { useHazelFrontendCRM } from './HazelFrontendCRM.logic';
import {
  OverviewPanel,
  ComponentsPanel,
  DesignSystemPanel,
  PerformancePanel,
  AccessibilityPanel,
} from './HazelFrontendCRM.panels';

export const HazelFrontendCRMView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    themeMode,
    setThemeMode,
    componentStats,
  } = useHazelFrontendCRM();

  return (
    <div className="assistant-dashboard hazel">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--color-f472b6, #F472B6) 0%, var(--color-ec4899, #EC4899) 100%)',
          }}
        >
          <Palette size={28} />
        </div>
        <div className="assistant-info">
          <h2>Hazel - Elite Frontend Engineer</h2>
          <p>Design system, component library, and UI performance optimization</p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>
          Active
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card highlight">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(244, 114, 182, 0.2)',
              color: 'var(--color-f472b6, #F472B6)',
            }}
          >
            <Package size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{componentStats.total}</span>
            <span className="stat-label">Components</span>
          </div>
          <span className="stat-change positive">+{componentStats.new} new</span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(34, 197, 94, 0.2)', color: 'var(--accent-green, #22C55E)' }}
          >
            <Accessibility size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">98%</span>
            <span className="stat-label">A11y Score</span>
          </div>
          <span className="stat-change positive">AAA</span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(251, 146, 60, 0.2)', color: 'var(--color-fb923c, #FB923C)' }}
          >
            <Zap size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">94</span>
            <span className="stat-label">Lighthouse</span>
          </div>
          <span className="stat-change positive">+2</span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(139, 92, 246, 0.2)',
              color: 'var(--accent-purple, #8B5CF6)',
            }}
          >
            <Box size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{componentStats.totalUsage}</span>
            <span className="stat-label">Usages</span>
          </div>
        </div>
      </div>

      <div className="assistant-tabs">
        {['overview', 'components', 'design-system', 'performance', 'accessibility', 'docs'].map(
          tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' && <BarChart3 size={14} />}
              {tab === 'components' && <Package size={14} />}
              {tab === 'design-system' && <Palette size={14} />}
              {tab === 'performance' && <Zap size={14} />}
              {tab === 'accessibility' && <Accessibility size={14} />}
              {tab
                .split('-')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')}
            </button>
          )
        )}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && <OverviewPanel componentStats={componentStats} />}
        {activeTab === 'components' && <ComponentsPanel />}
        {activeTab === 'design-system' && (
          <DesignSystemPanel themeMode={themeMode} setThemeMode={setThemeMode} />
        )}
        {activeTab === 'performance' && <PerformancePanel />}
        {activeTab === 'accessibility' && <AccessibilityPanel />}
        {activeTab === 'docs' && <AssistantDocsTab assistantId="hazel" />}
      </div>
    </div>
  );
};
