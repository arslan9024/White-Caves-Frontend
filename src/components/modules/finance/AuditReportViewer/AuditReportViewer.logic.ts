import { useState, useMemo } from 'react';
import { AuditReportData, FindingSeverity } from './AuditReportViewer.types';
import { DEFAULT_AUDIT_REPORT } from './AuditReportViewer.data';

export const useAuditReportViewer = (initialReport?: AuditReportData) => {
  const report = initialReport || DEFAULT_AUDIT_REPORT;
  const [activeTab, setActiveTab] = useState<'findings' | 'actions'>('findings');
  const [selectedSeverity, setSelectedSeverity] = useState<FindingSeverity>('all');
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);

  const filteredFindings = useMemo(() => {
    if (selectedSeverity === 'all') return report.findings;
    return report.findings.filter(f => f.severity === selectedSeverity);
  }, [report.findings, selectedSeverity]);

  const toggleExpandedFinding = (id: string) => {
    setExpandedFinding(prev => (prev === id ? null : id));
  };

  return {
    report,
    activeTab,
    setActiveTab,
    selectedSeverity,
    setSelectedSeverity,
    expandedFinding,
    toggleExpandedFinding,
    filteredFindings,
  };
};

