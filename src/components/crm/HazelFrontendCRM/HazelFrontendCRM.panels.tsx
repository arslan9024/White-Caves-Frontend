import React from 'react';
import {
  Package,
  CheckCircle,
  TrendingUp,
  Zap,
  FileCode,
  Palette,
  Code,
  Sun,
  Moon,
  BarChart3,
  Accessibility,
  AlertTriangle,
} from 'lucide-react';
import {
  COMPONENT_LIBRARY,
  DESIGN_TOKENS,
  PERFORMANCE_METRICS,
  ACCESSIBILITY_AUDIT,
} from './HazelFrontendCRM.data';
import { ComponentStats } from './HazelFrontendCRM.types';

export const OverviewPanel: React.FC<{ componentStats: ComponentStats }> = ({ componentStats }) => (
  <div className="overview-grid">
    <div className="overview-section">
      <h3>
        <Package size={16} /> Component Library Status
      </h3>
      <div className="status-grid">
        <div className="status-item success">
          <CheckCircle size={16} />
          <span>{componentStats.stable} Stable</span>
        </div>
        <div className="status-item info">
          <TrendingUp size={16} />
          <span>{componentStats.new} New</span>
        </div>
      </div>
    </div>
    <div className="overview-section">
      <h3>
        <Zap size={16} /> Performance Summary
      </h3>
      <div className="metrics-list">
        {PERFORMANCE_METRICS.slice(0, 3).map(m => (
          <div key={m.metric} className="metric-row">
            <span className="metric-name">{m.metric}</span>
            <span className={`metric-value ${m.trend}`}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ComponentsPanel: React.FC = () => (
  <div className="components-view">
    <div className="components-header">
      <h3>Component Library</h3>
      <button className="add-btn">
        <Package size={14} /> Add Component
      </button>
    </div>
    <div className="components-grid">
      {COMPONENT_LIBRARY.map(component => (
        <div key={component.name} className={`component-card ${component.status}`}>
          <div className="component-header">
            <FileCode size={18} />
            <span className="component-name">{component.name}</span>
            <span className={`status-badge ${component.status}`}>{component.status}</span>
          </div>
          <div className="component-meta">
            <span className="category">{component.category}</span>
            <span className="usage">{component.usage} usages</span>
            <span className={`a11y-badge ${component.a11y.toLowerCase()}`}>
              {component.a11y}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DesignSystemPanel: React.FC<{
  themeMode: string;
  setThemeMode: (mode: string) => void;
}> = ({ themeMode, setThemeMode }) => (
  <div className="design-system-view">
    <div className="token-section">
      <h3>
        <Palette size={16} /> Color Tokens
      </h3>
      <div className="color-tokens">
        {Object.entries(DESIGN_TOKENS.colors).map(([name, value]) => (
          <div key={name} className="color-token">
            <div className="color-swatch" style={{ background: value }}></div>
            <span className="token-name">{name}</span>
            <span className="token-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="token-section">
      <h3>
        <Code size={16} /> Typography
      </h3>
      <div className="typography-tokens">
        {Object.entries(DESIGN_TOKENS.typography).map(([role, font]) => (
          <div key={role} className="typography-token">
            <span className="token-name">{role}</span>
            <span className="token-value" style={{ fontFamily: font }}>
              {font}
            </span>
          </div>
        ))}
      </div>
    </div>
    <div className="theme-toggle">
      <h3>
        <Sun size={16} /> Theme Mode
      </h3>
      <div className="toggle-buttons">
        <button
          className={themeMode === 'light' ? 'active' : ''}
          onClick={() => setThemeMode('light')}
        >
          <Sun size={14} /> Light
        </button>
        <button
          className={themeMode === 'dark' ? 'active' : ''}
          onClick={() => setThemeMode('dark')}
        >
          <Moon size={14} /> Dark
        </button>
      </div>
    </div>
  </div>
);

export const PerformancePanel: React.FC = () => (
  <div className="performance-view">
    <h3>
      <BarChart3 size={16} /> Performance Metrics
    </h3>
    <div className="performance-grid">
      {PERFORMANCE_METRICS.map(metric => (
        <div key={metric.metric} className="performance-card">
          <div className="perf-header">
            <span className="perf-name">{metric.metric}</span>
            <span className={`trend-indicator ${metric.trend}`}>
              {metric.trend === 'up' && <TrendingUp size={14} />}
              {metric.trend === 'down' && (
                <TrendingUp size={14} style={{ transform: 'rotate(180deg)' }} />
              )}
              {metric.trend === 'stable' && <span>—</span>}
            </span>
          </div>
          <div className="perf-value">{metric.value}</div>
          <div className="perf-target">Target: {metric.target}</div>
        </div>
      ))}
    </div>
  </div>
);

export const AccessibilityPanel: React.FC = () => (
  <div className="accessibility-view">
    <h3>
      <Accessibility size={16} /> Accessibility Audit
    </h3>
    <div className="audit-grid">
      {ACCESSIBILITY_AUDIT.map(audit => (
        <div key={audit.category} className={`audit-card ${audit.status}`}>
          <div className="audit-header">
            <span className="audit-category">{audit.category}</span>
            <span className={`audit-status ${audit.status}`}>
              {audit.status === 'pass' && <CheckCircle size={16} />}
              {audit.status === 'warning' && <AlertTriangle size={16} />}
            </span>
          </div>
          <div className="audit-score">{audit.score}%</div>
          <div className="audit-issues">{audit.issues} issues</div>
        </div>
      ))}
    </div>
  </div>
);

