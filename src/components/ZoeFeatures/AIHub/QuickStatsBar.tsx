import React from 'react';
import { Users, Activity, AlertCircle, Zap } from 'lucide-react';
import { ASSISTANT_PROGRESS_SUMMARY } from '../../../config/assistantImplementationProgress';

interface QuickStatsBarProps {
  totalAssistants: number;
  activeTasks: number;
  criticalAlertsCount: number;
}

export const QuickStatsBar: React.FC<QuickStatsBarProps> = ({
  totalAssistants,
  activeTasks,
  criticalAlertsCount,
}) => {
  return (
    <div className="quick-stats-bar">
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'var(--primary-color)' }}>
          <Users size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{totalAssistants}</span>
          <span className="stat-label">AI Assistants</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'var(--green-500, #10B981)' }}>
          <Activity size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{ASSISTANT_PROGRESS_SUMMARY.complete}</span>
          <span className="stat-label">Complete</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'var(--error-color, #EF4444)' }}>
          <AlertCircle size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{ASSISTANT_PROGRESS_SUMMARY.incomplete}</span>
          <span className="stat-label">Incomplete</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'var(--accent-color, #8B5CF6)' }}>
          <Zap size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{activeTasks}</span>
          <span className="stat-label">Active Tasks</span>
        </div>
      </div>

      {criticalAlertsCount > 0 && (
        <div className="stat-card alert">
          <div className="stat-icon" style={{ background: 'var(--error-color, #EF4444)' }}>
            <AlertCircle size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{criticalAlertsCount}</span>
            <span className="stat-label">Alerts</span>
          </div>
        </div>
      )}
    </div>
  );
};
