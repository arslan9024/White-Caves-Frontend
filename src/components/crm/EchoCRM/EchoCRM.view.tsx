import React from 'react';
import { MessageSquare, Clock, User, Calendar } from 'lucide-react';
import AssistantDocsTab from '../shared/AssistantDocsTab';
import AssistantLifecycleTab from '../shared/AssistantLifecycleTab';
import '../AssistantDashboard.css';
import { useEchoCRM } from './EchoCRM.logic';
import { CLIENTS, CHANNEL_STATS } from './EchoCRM.data';
import { TimelineTabPanel, ClientsTabPanel, ChannelsTabPanel } from './EchoCRM.panels';

export const EchoCRMView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedClient,
    setSelectedClient,
    search,
    setSearch,
    filteredClients,
    clientTimeline,
    tabs,
  } = useEchoCRM();

  return (
    <div className="assistant-dashboard echo">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--color-06b6d4, #06B6D4) 0%, var(--color-0891b2, #0891B2) 100%)',
          }}
        >
          <MessageSquare size={28} />
        </div>
        <div className="assistant-info">
          <h2>Echo — Client Communication History & Timeline</h2>
          <p>Complete interaction history across all channels for every client</p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>
          Recording
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(6,182,212,0.15)',
              color: 'var(--color-06b6d4, #06B6D4)',
            }}
          >
            <MessageSquare size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">63</span>
            <span className="stat-label">Interactions Today</span>
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
            <User size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{CLIENTS.length}</span>
            <span className="stat-label">Active Clients</span>
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
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">1.8h</span>
            <span className="stat-label">Avg Response Time</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(139,92,246,0.15)',
              color: 'var(--accent-purple, #8B5CF6)',
            }}
          >
            <Calendar size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">8</span>
            <span className="stat-label">Viewings Logged</span>
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

      {activeTab === 'timeline' && (
        <TimelineTabPanel
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          timeline={clientTimeline}
        />
      )}

      {activeTab === 'clients' && (
        <ClientsTabPanel
          search={search}
          setSearch={setSearch}
          filteredClients={filteredClients}
          onSelectClient={c => {
            setSelectedClient(c);
            setActiveTab('timeline');
          }}
        />
      )}

      {activeTab === 'channels' && <ChannelsTabPanel channelStats={CHANNEL_STATS} />}

      {activeTab === 'docs' && (
        <AssistantDocsTab assistantId="echo" assistantColor="#06B6D4" assistantName="Echo" />
      )}
      {activeTab === 'lifecycle' && (
        <AssistantLifecycleTab assistantId="echo" color="#06B6D4" assistantName="Echo" />
      )}
    </div>
  );
};

