import React, { useState } from 'react';
import { Rocket, Building2, TrendingUp, Star } from 'lucide-react';
import AssistantDocsTab from '../shared/AssistantDocsTab';
import AssistantLifecycleTab from '../shared/AssistantLifecycleTab';
import '../AssistantDashboard.css';
import { DEVELOPMENTS, NOVA_TABS, PIPELINE } from './NovaCRM.data';
import { DevelopmentsTabPanel, PipelineTabPanel, TrackerTabPanel } from './NovaCRM.panels';
import type { NovaTabId } from './NovaCRM.types';

export const NovaCRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NovaTabId>('developments');
  const [search, setSearch] = useState('');

  const filtered = DEVELOPMENTS.filter(
    d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.developer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="assistant-dashboard nova">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-gold, #F59E0B) 0%, var(--color-b45309, #B45309) 100%)',
          }}
        >
          <Rocket size={28} />
        </div>
        <div className="assistant-info">
          <h2>Nova — New Development & Off-Plan Tracker</h2>
          <p>Live monitoring of Dubai off-plan launches, developer pipelines, and sales rates</p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>
          Tracking
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--accent-gold, #F59E0B)' }}
          >
            <Building2 size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{DEVELOPMENTS.length}</span>
            <span className="stat-label">Active Launches</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--accent-blue, #3B82F6)' }}
          >
            <Rocket size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{PIPELINE.length}</span>
            <span className="stat-label">Pipeline Projects</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(34,197,94,0.15)', color: 'var(--accent-green, #22C55E)' }}
          >
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">64%</span>
            <span className="stat-label">Avg Sold Rate</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(227,30,36,0.15)', color: 'var(--color-e31e24, #E31E24)' }}
          >
            <Star size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">1,680</span>
            <span className="stat-label">Total Units Tracked</span>
          </div>
        </div>
      </div>

      <div className="crm-tabs">
        {NOVA_TABS.map(t => (
          <button
            key={t.id}
            className={`crm-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'developments' && (
        <DevelopmentsTabPanel search={search} onSearchChange={setSearch} filtered={filtered} />
      )}
      {activeTab === 'pipeline' && <PipelineTabPanel />}
      {activeTab === 'tracker' && <TrackerTabPanel />}
      {activeTab === 'docs' && (
        <AssistantDocsTab assistantId="nova" assistantColor="#F59E0B" assistantName="Nova" />
      )}
      {activeTab === 'lifecycle' && (
        <AssistantLifecycleTab assistantId="nova" color="#F59E0B" assistantName="Nova" />
      )}
    </div>
  );
};

export default NovaCRM;

