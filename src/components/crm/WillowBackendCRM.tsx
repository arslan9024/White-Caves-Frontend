import React, { useState } from 'react';
import {
  BarChart3,
  Server,
  Database,
  Zap,
  Shield,
  Wifi,
} from 'lucide-react';
import { AssistantDocsTab } from './shared';
import './AssistantDashboard.css';
import {
  useWillowBackendCRM,
  WillowHeaderAndStats,
  OverviewTab,
  ApisTab,
  DatabaseTab,
  CachingTab,
  SecurityTab,
  RealtimeTab,
} from './willow';

// Re-export all companion data, types, hooks, and tabs for backwards-compatibility
export * from './willow';

export const WillowBackendCRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { apiStats } = useWillowBackendCRM();

  return (
    <div className="assistant-dashboard willow">
      <WillowHeaderAndStats apiStats={apiStats} />

      <div className="assistant-tabs">
        {['overview', 'apis', 'database', 'caching', 'security', 'realtime', 'docs'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'overview' && <BarChart3 size={14} />}
            {tab === 'apis' && <Server size={14} />}
            {tab === 'database' && <Database size={14} />}
            {tab === 'caching' && <Zap size={14} />}
            {tab === 'security' && <Shield size={14} />}
            {tab === 'realtime' && <Wifi size={14} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && <OverviewTab apiStats={apiStats} />}
        {activeTab === 'apis' && <ApisTab />}
        {activeTab === 'database' && <DatabaseTab />}
        {activeTab === 'caching' && <CachingTab />}
        {activeTab === 'security' && <SecurityTab />}
        {activeTab === 'realtime' && <RealtimeTab />}
        {activeTab === 'docs' && <AssistantDocsTab assistantId="willow" />}
      </div>
    </div>
  );
};

export default WillowBackendCRM;
