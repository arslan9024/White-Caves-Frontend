import React, { useState, useMemo } from 'react';
import { THEODORA_67_REPORTS, EnterpriseReport } from '../../../../data/theodoraReportsRegistry';
import { INITIAL_FAVORITES, INITIAL_SCHEDULES, ReportsTabProps } from './reportsTab/types';
import { downloadReportCSV, filterReports } from './reportsTab/utils';
import { ReportsHeaderBanner } from './reportsTab/ReportsHeaderBanner';
import { ReportsFilterBar } from './reportsTab/ReportsFilterBar';
import { ReportsTable } from './reportsTab/ReportsTable';
import { ReportRunnerModal } from './reportsTab/ReportRunnerModal';

export const ReportsTab: React.FC<ReportsTabProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>(INITIAL_FAVORITES);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [activeReportModal, setActiveReportModal] = useState<EnterpriseReport | null>(null);
  const [reportDateRange, setReportDateRange] = useState<string>('ytd');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Record<string, boolean>>(INITIAL_SCHEDULES);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFavorite = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [reportId]: !prev[reportId],
    }));
  };

  const toggleSchedule = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSchedules(prev => {
      const next = !prev[reportId];
      showToast(
        next
          ? `Automated schedule enabled for ${reportId}`
          : `Automated schedule paused for ${reportId}`
      );
      return { ...prev, [reportId]: next };
    });
  };

  const filteredReports = useMemo(
    () =>
      filterReports({
        reports: THEODORA_67_REPORTS,
        searchQuery,
        selectedCategory,
        showFavoritesOnly,
        favorites,
      }),
    [searchQuery, selectedCategory, showFavoritesOnly, favorites]
  );

  const handleExportCSV = (report: EnterpriseReport, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    downloadReportCSV(report, reportDateRange);
    showToast(`Exported ${report.name} as CSV`);
  };

  const handleExportPDF = (report: EnterpriseReport, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    showToast(`Generating certified PDF report for ${report.name} (${report.id})...`);
    setTimeout(() => {
      showToast(`✅ PDF Download Ready: ${report.name}.pdf`);
    }, 1200);
  };

  const activeSchedulesCount = Object.values(schedules).filter(Boolean).length;
  const favoritesCount = Object.values(favorites).filter(Boolean).length;

  return (
    <div
      className="reports-tab-container"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 9999,
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #334155',
          }}
        >
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <ReportsHeaderBanner activeSchedulesCount={activeSchedulesCount} />

      <ReportsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        favoritesCount={favoritesCount}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onExportSummary={() => handleExportCSV(THEODORA_67_REPORTS[0])}
      />

      <ReportsTable
        reports={filteredReports}
        favorites={favorites}
        schedules={schedules}
        onSelectReport={setActiveReportModal}
        onToggleFavorite={toggleFavorite}
        onToggleSchedule={toggleSchedule}
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
      />

      {activeReportModal && (
        <ReportRunnerModal
          report={activeReportModal}
          reportDateRange={reportDateRange}
          onDateRangeChange={setReportDateRange}
          onClose={() => setActiveReportModal(null)}
          onExportPDF={handleExportPDF}
          onExportCSV={handleExportCSV}
        />
      )}
    </div>
  );
};

export default ReportsTab;
