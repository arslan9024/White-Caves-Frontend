import React from 'react';
import { FileEdit, CheckCircle, Clock, Layers, FileText } from 'lucide-react';
import AssistantDocsTab from '../shared/AssistantDocsTab';
import AssistantLifecycleTab from '../shared/AssistantLifecycleTab';
import '../AssistantDashboard.css';
import { useQuillCRM } from './QuillCRM.logic';
import { RECENT_DOCS, TEMPLATES } from './QuillCRM.data';
import { RecentDocsTabPanel, TemplatesTabPanel, GenerateTabPanel } from './QuillCRM.panels';

export const QuillCRMView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    catFilter,
    setCatFilter,
    filteredTemplates,
    tabs,
  } = useQuillCRM();

  return (
    <div className="assistant-dashboard quill">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--text-secondary, #64748B) 0%, var(--color-334155, #334155) 100%)',
          }}
        >
          <FileEdit size={28} />
        </div>
        <div className="assistant-info">
          <h2>Quill — Document Generator Engine</h2>
          <p>RERA-compliant document generation from CRM data in seconds</p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>
          Ready
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(100,116,139,0.15)',
              color: 'var(--text-secondary, #64748B)',
            }}
          >
            <FileText size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{RECENT_DOCS.length}</span>
            <span className="stat-label">Docs This Week</span>
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
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">
              {RECENT_DOCS.filter(d => d.status === 'signed').length}
            </span>
            <span className="stat-label">Signed</span>
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
            <Layers size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{TEMPLATES.length}</span>
            <span className="stat-label">Templates</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(245,158,11,0.15)',
              color: 'var(--accent-gold, #F59E0B)',
            }}
          >
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">8s</span>
            <span className="stat-label">Avg Gen Time</span>
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

      {activeTab === 'recent' && <RecentDocsTabPanel recentDocs={RECENT_DOCS} />}

      {activeTab === 'templates' && (
        <TemplatesTabPanel
          search={search}
          setSearch={setSearch}
          catFilter={catFilter}
          setCatFilter={setCatFilter}
          filteredTemplates={filteredTemplates}
        />
      )}

      {activeTab === 'generate' && <GenerateTabPanel />}

      {activeTab === 'docs' && (
        <AssistantDocsTab assistantId="quill" assistantColor="#64748B" assistantName="Quill" />
      )}
      {activeTab === 'lifecycle' && (
        <AssistantLifecycleTab assistantId="quill" color="#64748B" assistantName="Quill" />
      )}
    </div>
  );
};

