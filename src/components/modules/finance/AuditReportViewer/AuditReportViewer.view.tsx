import React from 'react';
import { AuditReportViewerProps } from './AuditReportViewer.types';
import { useAuditReportViewer } from './AuditReportViewer.logic';
import { SummaryCard, FindingsTabPanel, ActionsTabPanel } from './AuditReportViewer.panels';

export const AuditReportViewerView: React.FC<AuditReportViewerProps> = ({
  report: initialReport,
  onDownload = () => {},
  onExport = () => {},
}) => {
  const {
    report,
    activeTab,
    setActiveTab,
    selectedSeverity,
    setSelectedSeverity,
    expandedFinding,
    toggleExpandedFinding,
    filteredFindings,
  } = useAuditReportViewer(initialReport);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {report.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {report.period} • Audited by {report.auditedBy}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onDownload}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white rounded-lg transition-colors text-sm font-medium"
              >
                📥 Download
              </button>
              <button
                onClick={onExport}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
              >
                📊 Export
              </button>
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard
              icon="📊"
              label="Compliance Score"
              value={`${report.summary.complianceScore}%`}
              color="text-blue-600 dark:text-blue-400"
            />
            <SummaryCard
              icon="🔍"
              label="Review Progress"
              value={`${report.summary.reviewProgress}%`}
              color="text-green-600 dark:text-green-400"
            />
            <SummaryCard
              icon="⚠️"
              label="Total Findings"
              value={report.summary.totalFindings}
              color="text-orange-600 dark:text-orange-400"
            />
            <SummaryCard
              icon="📈"
              label="Risk Level"
              value={
                report.summary.riskLevel.charAt(0).toUpperCase() + report.summary.riskLevel.slice(1)
              }
              color={`text-${
                report.summary.riskLevel === 'low' ? 'green' : 'orange'
              }-600 dark:text-${report.summary.riskLevel === 'low' ? 'green' : 'orange'}-400`}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700">
            {(['findings', 'actions'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'text-red-600 dark:text-red-400 border-red-600 dark:border-red-400'
                    : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Findings Tab */}
        {activeTab === 'findings' && (
          <FindingsTabPanel
            findings={report.findings}
            filteredFindings={filteredFindings}
            selectedSeverity={selectedSeverity}
            setSelectedSeverity={setSelectedSeverity}
            expandedFinding={expandedFinding}
            toggleExpandedFinding={toggleExpandedFinding}
            criticalCount={report.summary.criticalFindings}
            majorCount={report.summary.majorFindings}
            minorCount={report.summary.minorFindings}
          />
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && <ActionsTabPanel actions={report.actions} />}
      </div>
    </div>
  );
};

