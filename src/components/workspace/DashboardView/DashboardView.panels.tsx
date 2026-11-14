import React from 'react';
import {
  WorkspaceLead,
  WorkspaceLeaderboardEntry,
  RunwayData,
  LeaderboardTab,
} from './DashboardView.types';
import { getSLAInfo } from './DashboardView.data';

interface PerformanceCardsRowProps {
  tierInfo: { className: string; label: string };
  circumference: number;
  strokeDashoffset: number;
  gwcPercent: number;
  perf: any;
  user: any;
  runway: RunwayData | null;
}

export const PerformanceCardsRow: React.FC<PerformanceCardsRowProps> = ({
  tierInfo,
  circumference,
  strokeDashoffset,
  gwcPercent,
  perf,
  user,
  runway,
}) => (
  <div className="ws-row-1">
    {/* Card A: Target Progress Meter */}
    <div className="ws-card">
      <div className="ws-card-header">
        <span className="ws-card-title">Monthly GWC Target</span>
        <span className={`ws-card-badge ${tierInfo.className}`}>{tierInfo.label}</span>
      </div>

      <div className="ws-progress-ring-container">
        <div className="ws-progress-ring">
          <svg viewBox="0 0 110 110">
            <circle className="ws-progress-ring-bg" cx="55" cy="55" r="46" />
            <circle
              className="ws-progress-ring-fill"
              cx="55"
              cy="55"
              r="46"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="ws-progress-ring-label">
            <span className="ws-progress-ring-value">{Math.round(gwcPercent)}%</span>
            <span className="ws-progress-ring-unit">of target</span>
          </div>
        </div>

        <div className="ws-progress-stats">
          <div className="ws-progress-stat">
            <span className="ws-progress-stat-label">Current GWC</span>
            <span className="ws-progress-stat-value">
              AED {perf?.current_gwc?.toLocaleString()}
            </span>
          </div>
          <div className="ws-progress-stat">
            <span className="ws-progress-stat-label">Target GWC</span>
            <span className="ws-progress-stat-value">AED {perf?.target_gwc?.toLocaleString()}</span>
          </div>
          <div className="ws-progress-stat">
            <span className="ws-progress-stat-label">Deals Closed</span>
            <span className="ws-progress-stat-value">{perf?.deals_closed}</span>
          </div>
          <div className="ws-progress-stat">
            <span className="ws-progress-stat-label">Pipeline</span>
            <span className="ws-progress-stat-value">{perf?.deals_pipeline} active</span>
          </div>
          <div className="ws-progress-stat">
            <span className="ws-progress-stat-label">Conversion</span>
            <span className="ws-progress-stat-value">{perf?.conversion_rate}%</span>
          </div>
        </div>
      </div>
    </div>

    {/* Card B: Onboarding Runway Tracker */}
    <div className="ws-card">
      <div className="ws-card-header">
        <span className="ws-card-title">Onboarding Runway</span>
        <span className="ws-card-badge ws-badge-gold">
          {user?.promo_split ? `${user.promo_split}% Split` : 'Standard'}
        </span>
      </div>

      {runway ? (
        <div className="ws-runway">
          <div className="ws-runway-counter">
            <span className={`ws-runway-days ${runway.urgency}`}>{runway.remaining}</span>
            <span className="ws-runway-label-text">days remaining</span>
          </div>

          <div className="ws-runway-bar-container">
            <div
              className="ws-runway-bar-fill"
              style={{
                width: `${runway.percentage}%`,
                background: runway.barColor,
              }}
            />
          </div>

          <div className="ws-runway-meta">
            <span>
              Started:{' '}
              {new Date(runway.startDate).toLocaleDateString('en-AE', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>
              Day {runway.elapsed} of {runway.total}
            </span>
          </div>

          <div className="ws-runway-promo">
            <span className="ws-runway-promo-icon">💰</span>
            <span className="ws-runway-promo-text">
              High-tier {user?.promo_split || 50}% commission split active during onboarding window
            </span>
          </div>
        </div>
      ) : (
        <div className="ws-runway">
          <div className="ws-runway-counter">
            <span className="ws-runway-days ws-safe">∞</span>
            <span className="ws-runway-label-text">
              No onboarding window — Standard split active
            </span>
          </div>
          <div className="ws-runway-promo">
            <span className="ws-runway-promo-icon">⭐</span>
            <span className="ws-runway-promo-text">
              You have graduated from the onboarding program. Standard commission tiers apply.
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
);

interface DataPipelinesRowProps {
  leads: WorkspaceLead[];
  lbTab: LeaderboardTab;
  setLbTab: (tab: LeaderboardTab) => void;
  leaderboardData: WorkspaceLeaderboardEntry[];
}

export const DataPipelinesRow: React.FC<DataPipelinesRowProps> = ({
  leads,
  lbTab,
  setLbTab,
  leaderboardData,
}) => (
  <div className="ws-row-2">
    {/* Left: Active Leads Feed */}
    <div className="ws-card">
      <div className="ws-card-header">
        <span className="ws-card-title">Active Leads Feed</span>
        <span className="ws-card-badge ws-badge-executive">{leads.length} Active</span>
      </div>

      <table className="ws-leads-table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>SLA</th>
            <th>Stage</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => {
            const sla = getSLAInfo(lead.sla_mins);
            return (
              <tr key={lead.id}>
                <td>
                  <div className="ws-lead-name">{lead.name}</div>
                  <div className="ws-lead-source">{lead.source}</div>
                </td>
                <td>
                  <span className={`ws-sla-badge ${sla.className}`}>{sla.label}</span>
                </td>
                <td>
                  <span className="ws-pipeline-badge">{lead.stage}</span>
                </td>
                <td>
                  <button className="ws-contact-btn">Call</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* Right: Live Company Standings */}
    <div className="ws-card">
      <div className="ws-card-header">
        <span className="ws-card-title">Company Standings</span>
      </div>

      <div className="ws-lb-tabs">
        <button
          className={`ws-lb-tab ${lbTab === 'sales' ? 'active' : ''}`}
          onClick={() => setLbTab('sales')}
        >
          Sales
        </button>
        <button
          className={`ws-lb-tab ${lbTab === 'leasing' ? 'active' : ''}`}
          onClick={() => setLbTab('leasing')}
        >
          Leasing
        </button>
      </div>

      <div className="ws-leaderboard-list">
        {leaderboardData.map(entry => (
          <div key={entry.rank} className="ws-leaderboard-entry">
            <span className="ws-lb-rank">{entry.rank}</span>
            <div className="ws-lb-avatar">{entry.initials}</div>
            <div className="ws-lb-info">
              <div className="ws-lb-name">{entry.name}</div>
              <div className="ws-lb-dept">{entry.dept}</div>
            </div>
            <span className="ws-lb-score">{entry.points.toLocaleString()}</span>
            <span className={`ws-lb-change ${entry.change}`}>
              {entry.change === 'up' ? '▲' : '▼'}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface AICommandCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiPrompt: string;
  setAiPrompt: (p: string) => void;
  onExecute: () => void;
}

export const AICommandCenterModal: React.FC<AICommandCenterModalProps> = ({
  isOpen,
  onClose,
  aiPrompt,
  setAiPrompt,
  onExecute,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="ws-modal-overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ws-modal" role="dialog" aria-label="AI Command Center">
        <div className="ws-modal-header">
          <h2>
            <span>🧠</span>
            AI Command Center
          </h2>
          <button className="ws-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="ws-modal-body">
          <textarea
            className="ws-ai-textarea"
            placeholder="Enter your query or paste unformatted text for AI ingestion processing…"
            value={aiPrompt}
            onChange={e => setAiPrompt(e.target.value)}
            autoFocus
          />
        </div>

        <div className="ws-modal-footer">
          <span className="ws-modal-footer-hint">Press Ctrl+Enter to execute · Esc to close</span>
          <button className="ws-ai-execute-btn" onClick={onExecute} disabled={!aiPrompt.trim()}>
            <span>⚡</span>
            Execute
          </button>
        </div>
      </div>
    </div>
  );
};
