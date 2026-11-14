import React from 'react';
import { Globe, FileText, CheckCircle, Clock } from 'lucide-react';
import AssistantDocsTab from '../shared/AssistantDocsTab';
import AssistantLifecycleTab from '../shared/AssistantLifecycleTab';
import { TRANSLATIONS, MIRA_TABS } from './MiraCRM.data';
import { useMiraCRMLogic } from './MiraCRM.logic';
import { TranslationQueuePanel, LiveTranslatePanel, LanguagesGridPanel } from './MiraCRM.panels';
import '../AssistantDashboard.css';

export const MiraCRMView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    inputText,
    setInputText,
    fromLang,
    setFromLang,
    toLang,
    setToLang,
  } = useMiraCRMLogic();

  return (
    <div className="assistant-dashboard mira">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-green, #10B981) 0%, var(--color-047857, #047857) 100%)',
          }}
        >
          <Globe size={28} />
        </div>
        <div className="assistant-info">
          <h2>Mira — Multilingual Translation Engine</h2>
          <p>Real-time Arabic ↔ English and 6-language document translation for Dubai clients</p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>6 Languages Active
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(16,185,129,0.15)',
              color: 'var(--accent-green, #10B981)',
            }}
          >
            <FileText size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{TRANSLATIONS.length}</span>
            <span className="stat-label">Jobs Today</span>
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
              {TRANSLATIONS.filter(t => t.status === 'completed').length}
            </span>
            <span className="stat-label">Completed</span>
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
            <Globe size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">6</span>
            <span className="stat-label">Languages</span>
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
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">12m</span>
            <span className="stat-label">Avg Turnaround</span>
          </div>
        </div>
      </div>

      <div className="crm-tabs">
        {MIRA_TABS.map(t => (
          <button
            key={t.id}
            className={`crm-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id as any)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'queue' && <TranslationQueuePanel />}

      {activeTab === 'live' && (
        <LiveTranslatePanel
          fromLang={fromLang}
          setFromLang={setFromLang}
          toLang={toLang}
          setToLang={setToLang}
          inputText={inputText}
          setInputText={setInputText}
        />
      )}

      {activeTab === 'languages' && <LanguagesGridPanel />}

      {activeTab === 'docs' && (
        <AssistantDocsTab assistantId="mira" assistantColor="#10B981" assistantName="Mira" />
      )}
      {activeTab === 'lifecycle' && (
        <AssistantLifecycleTab assistantId="mira" color="#10B981" assistantName="Mira" />
      )}
    </div>
  );
};
