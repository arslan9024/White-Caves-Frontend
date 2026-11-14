/**
 * Aurora Analysis Dashboard — Tabs Layer (Mary Allen Wilkes Architecture)
 * Modular presentation panels for Overview, Audit, SRS, Documents, Components, and Actions
 */

import React from 'react';
import {
  Code,
  FileText,
  Layers,
  Server,
  Database,
  Zap,
  TrendingUp,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Shield,
  Clock,
  BarChart2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { AppDispatch } from '../../../store/store';
import { fetchAnalysis, generateAudit, generateSRS } from '../../../store/slices/auroraSlice';

export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}> = ({ title, value, icon: Icon, color }) => (
  <div className="metric-card" style={{ borderLeft: `4px solid ${color}` }}>
    <div className="metric-icon" style={{ backgroundColor: `${color}15`, color }}>
      <Icon size={20} />
    </div>
    <div className="metric-content">
      <span className="metric-value">{value}</span>
      <span className="metric-title">{title}</span>
    </div>
  </div>
);

export const OverviewTab: React.FC<{
  analysis: any;
  providers: any;
  dispatch: AppDispatch;
}> = ({ analysis, providers, dispatch }) => {
  const summary = analysis.summary || {};

  const handleRefresh = () => {
    dispatch(fetchAnalysis({ refresh: true } as any));
  };

  return (
    <div className="overview-tab">
      <div className="overview-header">
        <h2>System Overview</h2>
        <button className="btn-refresh" onClick={handleRefresh} disabled={analysis.loading}>
          <RefreshCw size={16} className={analysis.loading ? 'spinning' : ''} />
          {analysis.loading ? 'Analyzing...' : 'Refresh Analysis'}
        </button>
      </div>

      <div className="metrics-grid">
        <MetricCard
          title="Total Files"
          value={summary.totalFiles || 0}
          icon={Code}
          color="#3B82F6"
        />
        <MetricCard
          title="Total Lines"
          value={(summary.totalLines || 0).toLocaleString()}
          icon={FileText}
          color="#10B981"
        />
        <MetricCard
          title="Components"
          value={summary.components || 0}
          icon={Layers}
          color="#8B5CF6"
        />
        <MetricCard title="Routes" value={summary.routes || 0} icon={Server} color="#F59E0B" />
        <MetricCard title="Models" value={summary.models || 0} icon={Database} color="#EF4444" />
        <MetricCard title="Services" value={summary.services || 0} icon={Zap} color="#06B6D4" />
        <MetricCard
          title="Redux Slices"
          value={summary.reduxSlices || 0}
          icon={Layers}
          color="#EC4899"
        />
        <MetricCard
          title="Completion Score"
          value={`${summary.completionScore || 0}%`}
          icon={TrendingUp}
          color={
            summary.completionScore >= 80
              ? '#10B981'
              : summary.completionScore >= 50
                ? '#F59E0B'
                : '#EF4444'
          }
        />
      </div>

      <div className="overview-sections">
        <div className="section">
          <h3>AI Providers Status</h3>
          <div className="providers-list">
            {providers.list.map((p: any) => (
              <div
                key={p.id}
                className={`provider-item ${p.available ? 'available' : 'unavailable'}`}
              >
                <div className="provider-info">
                  {p.available ? (
                    <CheckCircle size={16} color="#10B981" />
                  ) : (
                    <AlertCircle size={16} color="#EF4444" />
                  )}
                  <span className="provider-name">{p.name}</span>
                  <span className="provider-model">{p.model}</span>
                </div>
                <div className="provider-stats">
                  <span className="stat success">{p.stats?.success || 0} success</span>
                  <span className="stat failure">{p.stats?.failure || 0} failed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Code Quality Indicators</h3>
          <div className="quality-indicators">
            <div className="indicator">
              <span className="label">TODO Comments</span>
              <span className="value warning">{summary.todos || 0}</span>
            </div>
            <div className="indicator">
              <span className="label">Event Handlers</span>
              <span className="value">{summary.eventHandlers || 0}</span>
            </div>
            <div className="indicator">
              <span className="label">Last Analysis</span>
              <span className="value">
                {summary.timestamp ? new Date(summary.timestamp).toLocaleTimeString() : 'Never'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuditTab: React.FC<{
  audit: any;
  analysis: any;
  dispatch: AppDispatch;
}> = ({ audit, dispatch }) => {
  const handleRunAudit = () => {
    dispatch(generateAudit() as any);
  };

  return (
    <div className="audit-tab">
      <div className="audit-header">
        <h2>System Audit</h2>
        <button className="btn-run-audit" onClick={handleRunAudit} disabled={audit.generating}>
          <Shield size={16} />
          {audit.generating ? 'Generating Audit...' : 'Run Full Audit'}
        </button>
      </div>

      {audit.generating && (
        <div className="audit-progress">
          <div className="progress-spinner"></div>
          <p>AI is analyzing your codebase. This may take a minute...</p>
        </div>
      )}

      {audit.report && (
        <div className="audit-report">
          <div className="report-meta">
            <span>
              <Clock size={14} /> Generated by {audit.provider}
            </span>
            <span>
              <BarChart2 size={14} /> Score: {audit.analysisData?.completionScore}%
            </span>
          </div>
          <div className="report-content">
            <pre>{audit.report}</pre>
          </div>
        </div>
      )}

      {!audit.report && !audit.generating && (
        <div className="audit-empty">
          <Shield size={48} />
          <h3>No Audit Generated Yet</h3>
          <p>
            Click &quot;Run Full Audit&quot; to generate a comprehensive analysis of your codebase.
          </p>
        </div>
      )}
    </div>
  );
};
