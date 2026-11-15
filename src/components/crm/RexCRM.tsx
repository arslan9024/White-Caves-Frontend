import React, { useState } from 'react';
import AssistantDocsTab from './shared/AssistantDocsTab';
import AssistantLifecycleTab from './shared/AssistantLifecycleTab';
import { REX_DOCUMENTS, REX_CHECKS, REX_STATUS_COLORS, REX_RISK_COLORS } from './RexCRM.data';
import { RexHeader, RexDocumentsTab, RexChecksTab, RexAlertsTab } from './RexCRMViews';
import './AssistantDashboard.css';

const RexCRM = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [search, setSearch] = useState('');

  const filtered = REX_DOCUMENTS.filter(
    d =>
      d.client.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { id: 'documents', label: '📄 Documents' },
    { id: 'checks', label: '✅ Compliance Checks' },
    { id: 'alerts', label: '⚠️ Alerts' },
    { id: 'docs', label: '📚 Docs' },
    { id: 'lifecycle', label: '🔄 Lifecycle' },
  ];

  const flagged = REX_DOCUMENTS.filter(d => d.status === 'flagged' || d.status === 'expiring');

  return (
    <div className="assistant-dashboard rex">
      <RexHeader
        documentsCount={REX_DOCUMENTS.length}
        verifiedCount={REX_DOCUMENTS.filter(d => d.status === 'verified').length}
        flaggedCount={flagged.length}
      />

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

      {activeTab === 'documents' && (
        <RexDocumentsTab
          search={search}
          onSearchChange={setSearch}
          filtered={filtered}
          riskColors={REX_RISK_COLORS}
          statusColors={REX_STATUS_COLORS}
        />
      )}

      {activeTab === 'checks' && <RexChecksTab checks={REX_CHECKS} />}

      {activeTab === 'alerts' && <RexAlertsTab flagged={flagged} />}

      {activeTab === 'docs' && (
        <AssistantDocsTab assistantId="rex" color="#6366F1" assistantName="Rex" />
      )}
      {activeTab === 'lifecycle' && (
        <AssistantLifecycleTab assistantId="rex" color="#6366F1" assistantName="Rex" />
      )}
    </div>
  );
};

export default RexCRM;
