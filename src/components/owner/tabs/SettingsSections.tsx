import React from 'react';

export interface IntegrationItem {
  id: string;
  name: string;
  status: string;
  icon: string;
}

export interface ServiceHealthItem {
  name: string;
  status: string;
  uptime: string;
}

export const IntegrationsSection: React.FC<{
  integrations: IntegrationItem[];
  onAction?: (action: string, data?: unknown) => void;
}> = ({ integrations, onAction }) => (
  <div className="settings-card">
    <h4>Integrations Status</h4>
    <div className="integrations-list">
      {integrations.map(int => (
        <div key={int.id} className={`integration-item ${int.status}`}>
          <div className="integration-info">
            <span className="integration-icon">{int.icon}</span>
            <span className="integration-name">{int.name}</span>
          </div>
          <span className={`integration-status ${int.status}`}>
            {int.status === 'connected' ? '● Connected' : '○ Pending'}
          </span>
          <button
            className="icon-btn"
            onClick={() => onAction?.('configureIntegration', int.id)}
          >
            ⚙️
          </button>
        </div>
      ))}
    </div>
  </div>
);

export const SystemHealthSection: React.FC<{
  systemHealth: ServiceHealthItem[];
  onAction?: (action: string, data?: unknown) => void;
}> = ({ systemHealth, onAction }) => (
  <div className="settings-card">
    <h4>System Health</h4>
    <div className="health-list">
      {systemHealth.map(service => (
        <div key={service.name} className="health-item">
          <div className="health-info">
            <span className={`health-indicator ${service.status}`}></span>
            <span className="health-name">{service.name}</span>
          </div>
          <div className="health-details">
            <span className="health-status">{service.status}</span>
            <span className="health-uptime">{service.uptime}</span>
          </div>
        </div>
      ))}
    </div>
    <button
      className="secondary-btn full-width"
      onClick={() => onAction?.('viewSystemHealth')}
    >
      <span>🩺</span> View Detailed Health
    </button>
  </div>
);

export const DangerZoneSection: React.FC<{
  onAction?: (action: string, data?: unknown) => void;
}> = ({ onAction }) => (
  <div className="settings-card full-width danger-zone">
    <h4>⚠️ Danger Zone</h4>
    <p>These actions are irreversible. Please proceed with caution.</p>
    <div className="danger-actions">
      <button className="danger-btn" onClick={() => onAction?.('clearCache')}>
        <span>🗑️</span> Clear Cache
      </button>
      <button className="danger-btn" onClick={() => onAction?.('resetAnalytics')}>
        <span>📊</span> Reset Analytics
      </button>
      <button className="danger-btn" onClick={() => onAction?.('exportData')}>
        <span>📥</span> Export All Data
      </button>
    </div>
  </div>
);

