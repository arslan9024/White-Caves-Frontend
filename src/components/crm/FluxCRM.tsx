import React, { useState } from 'react';
import {
  Activity,
  Zap,
  Bell,
  BarChart2,
  ArrowUp,
  ArrowDown,
  Wifi,
} from 'lucide-react';
import AssistantDocsTab from './shared/AssistantDocsTab';
import AssistantLifecycleTab from './shared/AssistantLifecycleTab';
import './AssistantDashboard.css';
import { FluxFeedPanel, FluxIndicesPanel, FluxAlertsPanel } from './FluxCRM/FluxCRM.panels';

const FluxCRM = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const tabs = [
    { id: 'feed', label: '⚡ Live Feed' },
    { id: 'indices', label: '📊 Indices' },
    { id: 'alerts', label: '🔔 Alerts' },
    { id: 'docs', label: '📖 Documentation' },
    { id: 'lifecycle', label: '🧬 Lifecycle' },
  ];

  return (
    <div className="assistant-dashboard">
      <div className="assistant-header" style={{ borderColor: 'var(--accent-purple, #7C3AED)' }}>
        <div
          className="assistant-avatar"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}
        >
          <Zap size={28} color="#fff" />
        </div>
        <div className="assistant-info">
          <h2>Flux — Real-Time Market Intelligence</h2>
          <p>
            Sub-second price feeds, Bayut/PropertyFinder aggregations & DLD transaction stream
          </p>
        </div>
        <div className="assistant-status">
          <span className="status-badge" style={{ background: '#f5f3ff', color: 'var(--accent-purple, #7C3AED)' }}>
            <Wifi size={12} /> Live Stream Connected
          </span>
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <span className="stat-label">Feed Latency</span>
          <span className="stat-val" style={{ color: '#22C55E' }}>
            <Zap size={14} style={{ display: 'inline' }} /> 180ms
          </span>
          <span className="stat-sub">WebSocket active</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Transactions Today</span>
          <span className="stat-val">348</span>
          <span className="stat-sub" style={{ color: '#22C55E' }}>
            <ArrowUp size={12} style={{ display: 'inline' }} /> +12% vs yesterday
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Tracked Areas</span>
          <span className="stat-val">28</span>
          <span className="stat-sub">Dubai prime & secondary</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Alerts</span>
          <span className="stat-val" style={{ color: '#F59E0B' }}>
            5
          </span>
          <span className="stat-sub">2 triggered today</span>
        </div>
      </div>

      <div className="assistant-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
            style={activeTab === t.id ? { borderColor: 'var(--accent-purple, #7C3AED)', color: 'var(--accent-purple, #7C3AED)' } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'feed' && <FluxFeedPanel />}
      {activeTab === 'indices' && <FluxIndicesPanel />}
      {activeTab === 'alerts' && <FluxAlertsPanel />}
      {activeTab === 'docs' && (
        <AssistantDocsTab assistantId="flux" color="#7C3AED" assistantName="Flux" />
      )}
      {activeTab === 'lifecycle' && (
        <AssistantLifecycleTab assistantId="flux" color="#7C3AED" assistantName="Flux" />
      )}
    </div>
  );
};

export default FluxCRM;

