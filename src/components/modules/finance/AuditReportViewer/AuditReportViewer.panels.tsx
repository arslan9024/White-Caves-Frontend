import React from 'react';
import { AuditFinding, AuditAction, FindingSeverity } from './AuditReportViewer.types';
import {
  getSeverityColor,
  getSeverityIcon,
  getStatusIcon,
  getProgressColor,
} from './AuditReportViewer.data';

interface SummaryCardProps {
  icon: string;
  label: string;
  value: string | number;
  color: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{icon}</span>
      <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">{label}</span>
    </div>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

interface FindingsTabPanelProps {
  findings: AuditFinding[];
  filteredFindings: AuditFinding[];
  selectedSeverity: FindingSeverity;
  setSelectedSeverity: (severity: FindingSeverity) => void;
  expandedFinding: string | null;
  toggleExpandedFinding: (id: string) => void;
  criticalCount: number;
  majorCount: number;
  minorCount: number;
}

export const FindingsTabPanel: React.FC<FindingsTabPanelProps> = ({
  findings,
  filteredFindings,
  selectedSeverity,
  setSelectedSeverity,
  expandedFinding,
  toggleExpandedFinding,
  criticalCount,
  majorCount,
  minorCount,
}) => (
  <div>
    <div className="mb-6 flex gap-2">
      <button
        onClick={() => setSelectedSeverity('all')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          selectedSeverity === 'all'
            ? 'bg-red-600 text-white'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
        }`}
      >
        All ({findings.length})
      </button>
      <button
        onClick={() => setSelectedSeverity('critical')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          selectedSeverity === 'critical'
            ? 'bg-red-600 text-white'
            : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
        }`}
      >
        Critical ({criticalCount})
      </button>
      <button
        onClick={() => setSelectedSeverity('major')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          selectedSeverity === 'major'
            ? 'bg-orange-600 text-white'
            : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30'
        }`}
      >
        Major ({majorCount})
      </button>
      <button
        onClick={() => setSelectedSeverity('minor')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          selectedSeverity === 'minor'
            ? 'bg-yellow-600 text-white'
            : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
        }`}
      >
        Minor ({minorCount})
      </button>
    </div>

    <div className="space-y-4">
      {filteredFindings.length > 0 ? (
        filteredFindings.map(finding => (
          <div
            key={finding.id}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <button
              onClick={() => toggleExpandedFinding(finding.id)}
              className="w-full p-4 flex items-start justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-start gap-4 flex-1 text-left">
                <span className="text-xl mt-1">{getSeverityIcon(finding.severity)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white">{finding.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(
                        finding.severity
                      )}`}
                    >
                      {finding.severity.toUpperCase()}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      {finding.category}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {finding.description}
                  </p>
                </div>
              </div>
              <div className="text-xl">{expandedFinding === finding.id ? '▼' : '▶'}</div>
            </button>

            {expandedFinding === finding.id && (
              <div className="px-4 pb-4 pt-0 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                      Recommendation
                    </p>
                    <p className="text-slate-900 dark:text-white">{finding.recommendation}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                      Status
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getStatusIcon(finding.status)}</span>
                      <span className="text-slate-900 dark:text-white font-medium capitalize">
                        {finding.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8 bg-white dark:bg-slate-800 rounded-lg">
          <p className="text-slate-600 dark:text-slate-400">
            No findings with selected severity level
          </p>
        </div>
      )}
    </div>
  </div>
);

interface ActionsTabPanelProps {
  actions: AuditAction[];
}

export const ActionsTabPanel: React.FC<ActionsTabPanelProps> = ({ actions }) => (
  <div className="space-y-4">
    {actions.map(action => (
      <div
        key={action.id}
        className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">{action.action}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Owner: <span className="font-medium">{action.owner}</span> • Due:{' '}
              <span className="font-medium">{action.dueDate}</span>
            </p>
          </div>
          <div className="text-xl">{getStatusIcon(action.status)}</div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
                Progress
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {action.progress}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all ${getProgressColor(action.progress)}`}
                style={{ width: `${action.progress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                action.status === 'completed'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              }`}
            >
              {action.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);
