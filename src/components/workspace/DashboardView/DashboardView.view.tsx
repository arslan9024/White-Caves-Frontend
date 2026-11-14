import React from 'react';
import GamifiedAnalyticsPodium from '../../analytics/GamifiedAnalyticsPodium/GamifiedAnalyticsPodium';
import { useDashboardView } from './DashboardView.logic';
import {
  PerformanceCardsRow,
  DataPipelinesRow,
  AICommandCenterModal,
} from './DashboardView.panels';

export const DashboardViewMain: React.FC = () => {
  const {
    user,
    perf,
    tierInfo,
    runway,
    gwcPercent,
    circumference,
    strokeDashoffset,
    lbTab,
    setLbTab,
    leaderboardData,
    leads,
    aiModalOpen,
    setAiModalOpen,
    aiPrompt,
    setAiPrompt,
    handleAiExecute,
  } = useDashboardView();

  return (
    <div className="ws-dashboard">
      {/* Dashboard Title */}
      <div>
        <div className="ws-dashboard-title">Welcome back, {user?.name?.split(' ')[0]} 👋</div>
        <div className="ws-dashboard-subtitle">
          {new Date().toLocaleDateString('en-AE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          {' · '}
          {user?.department_label}
        </div>
      </div>

      {/* ═══ ROW 1: Performance Cards ═══ */}
      <PerformanceCardsRow
        tierInfo={tierInfo}
        circumference={circumference}
        strokeDashoffset={strokeDashoffset}
        gwcPercent={gwcPercent}
        perf={perf}
        user={user}
        runway={runway}
      />

      {/* ═══ ROW 2: Data Pipelines ═══ */}
      <DataPipelinesRow
        leads={leads}
        lbTab={lbTab}
        setLbTab={setLbTab}
        leaderboardData={leaderboardData}
      />

      {/* ═══ S-Tier Gamified Analytics Podiums & 15-Min SLA Watchdog ═══ */}
      <div className="mb-6">
        <GamifiedAnalyticsPodium />
      </div>

      {/* ═══ ROW 3: AI Quick-Action ═══ */}
      <div className="ws-row-3">
        <div
          className="ws-ai-trigger"
          onClick={() => setAiModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && setAiModalOpen(true)}
        >
          <div className="ws-ai-trigger-left">
            <div className="ws-ai-trigger-icon">🧠</div>
            <div className="ws-ai-trigger-text">
              <h3>AI Command Center</h3>
              <p>Run queries through the intelligence ingestion pipeline</p>
            </div>
          </div>
          <div className="ws-ai-trigger-shortcut">⌘ + K</div>
        </div>
      </div>

      {/* ═══ AI Command Center Modal ═══ */}
      <AICommandCenterModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        aiPrompt={aiPrompt}
        setAiPrompt={setAiPrompt}
        onExecute={handleAiExecute}
      />
    </div>
  );
};
