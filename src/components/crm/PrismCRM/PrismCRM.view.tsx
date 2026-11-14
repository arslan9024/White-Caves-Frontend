import React from 'react';
import { Layers, CheckCircle, TrendingUp, Home, Star } from 'lucide-react';
import AssistantDocsTab from '../shared/AssistantDocsTab';
import AssistantLifecycleTab from '../shared/AssistantLifecycleTab';
import '../AssistantDashboard.css';
import { usePrismCRM } from './PrismCRM.logic';
import { ALGORITHM_STEPS } from './PrismCRM.data';
import { MatchesTabPanel, AlgorithmTabPanel, InventoryTabPanel } from './PrismCRM.panels';

export const PrismCRMView: React.FC = () => {
  const { activeTab, setActiveTab, areaFilter, setAreaFilter, filteredMatches, tabs } =
    usePrismCRM();

  return (
    <div className="assistant-dashboard prism">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-purple, #8B5CF6) 0%, var(--accent-purple, #6D28D9) 100%)',
          }}
        >
          <Layers size={28} />
        </div>
        <div className="assistant-info">
          <h2>Prism — AI Property Matching Engine</h2>
          <p>Instant property–lead matching using multi-vector similarity scoring</p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>
          Matching Active
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(139,92,246,0.15)',
              color: 'var(--accent-purple, #8B5CF6)',
            }}
          >
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">5</span>
            <span className="stat-label">Matches Today</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(34,197,94,0.15)',
              color: 'var(--accent-green, #22C55E)',
            }}
          >
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">87%</span>
            <span className="stat-label">Avg Match Score</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(59,130,246,0.15)',
              color: 'var(--accent-blue, #3B82F6)',
            }}
          >
            <Home size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">124</span>
            <span className="stat-label">Active Listings</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(227,30,36,0.15)',
              color: 'var(--color-e31e24, #E31E24)',
            }}
          >
            <Star size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">62%</span>
            <span className="stat-label">Viewing Conversion</span>
          </div>
        </div>
      </div>

      <div className="crm-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`crm-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'matches' && (
        <MatchesTabPanel
          areaFilter={areaFilter}
          setAreaFilter={setAreaFilter}
          matches={filteredMatches}
        />
      )}

      {activeTab === 'algorithm' && <AlgorithmTabPanel steps={ALGORITHM_STEPS} />}

      {activeTab === 'inventory' && <InventoryTabPanel />}

      {activeTab === 'docs' && (
        <AssistantDocsTab assistantId="prism" color="#8B5CF6" assistantName="Prism" />
      )}
      {activeTab === 'lifecycle' && (
        <AssistantLifecycleTab assistantId="prism" color="#8B5CF6" assistantName="Prism" />
      )}
    </div>
  );
};
