import React from 'react';
import {
  THEODORA_REPORT_CATEGORIES,
  EnterpriseReport,
} from '../../../../../data/theodoraReportsRegistry';

interface ReportsTableProps {
  reports: EnterpriseReport[];
  favorites: Record<string, boolean>;
  schedules: Record<string, boolean>;
  onSelectReport: (report: EnterpriseReport) => void;
  onToggleFavorite: (reportId: string, e: React.MouseEvent) => void;
  onToggleSchedule: (reportId: string, e: React.MouseEvent) => void;
  onExportPDF: (report: EnterpriseReport, e?: React.MouseEvent) => void;
  onExportCSV: (report: EnterpriseReport, e?: React.MouseEvent) => void;
}

export const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  favorites,
  schedules,
  onSelectReport,
  onToggleFavorite,
  onToggleSchedule,
  onExportPDF,
  onExportCSV,
}) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          background: 'var(--color-f8fafc, #F8FAFC)',
          borderBottom: '1px solid var(--border-color, #E2E8F0)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary, #334155)' }}
        >
          Showing {reports.length} of 67 Reports
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #64748B)' }}>
          Click on any report to open interactive viewer &amp; metrics
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.85rem',
          }}
        >
          <thead>
            <tr
              style={{
                background: 'var(--color-f1f5f9, #F1F5F9)',
                borderBottom: '1px solid var(--border-color, #E2E8F0)',
                color: 'var(--text-secondary, #475569)',
                fontWeight: 800,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <th style={{ padding: '12px 16px', width: '40px', textAlign: 'center' }}>★</th>
              <th style={{ padding: '12px 16px' }}>Report Name</th>
              <th style={{ padding: '12px 16px' }}>Report Category</th>
              <th style={{ padding: '12px 16px' }}>Created By</th>
              <th style={{ padding: '12px 16px' }}>Last Visited</th>
              <th style={{ padding: '12px 16px' }}>Schedule</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>More Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: '3rem',
                    textAlign: 'center',
                    color: 'var(--text-secondary, #64748B)',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: 'var(--text-primary, #1E293B)',
                    }}
                  >
                    No reports matched your search
                  </div>
                  <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                    Try searching with different keywords or reset category filters.
                  </div>
                </td>
              </tr>
            ) : (
              reports.map((report, idx) => {
                const isFav = favorites[report.id];
                const isScheduled = schedules[report.id];
                const catMeta = THEODORA_REPORT_CATEGORIES.find(c => c.id === report.categoryKey);

                return (
                  <tr
                    key={report.id}
                    onClick={() => onSelectReport(report)}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0FDF4')}
                    onMouseLeave={e =>
                      (e.currentTarget.style.backgroundColor =
                        idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA')
                    }
                  >
                    {/* Favorite Star */}
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={e => onToggleFavorite(report.id, e)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          color: isFav ? '#F59E0B' : '#CBD5E1',
                        }}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        {isFav ? '★' : '☆'}
                      </button>
                    </td>

                    {/* Report Name & ID */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--color-eef2f6, #EEF2F6)',
                            color: 'var(--text-secondary, #475569)',
                            fontFamily: 'monospace',
                          }}
                        >
                          {report.id}
                        </span>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary, #0F172A)' }}>
                          {report.name}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary, #64748B)',
                          marginTop: '2px',
                        }}
                      >
                        {report.description}
                      </div>
                    </td>

                    {/* Report Category */}
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: `${catMeta?.badgeColor || '#64748B'}15`,
                          color: catMeta?.badgeColor || '#64748B',
                        }}
                      >
                        <span>{catMeta?.icon}</span>
                        <span>{report.categoryName}</span>
                      </span>
                    </td>

                    {/* Created By */}
                    <td
                      style={{
                        padding: '12px 16px',
                        color: 'var(--text-secondary, #475569)',
                        fontSize: '0.8rem',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <span>🤖</span>
                        <span>{report.createdBy}</span>
                      </span>
                    </td>

                    {/* Last Visited */}
                    <td
                      style={{
                        padding: '12px 16px',
                        color: 'var(--text-secondary, #64748B)',
                        fontSize: '0.8rem',
                      }}
                    >
                      {report.lastVisited === '-' ? (
                        <span style={{ color: 'var(--color-94a3b8, #94A3B8)' }}>— Not Visited</span>
                      ) : (
                        report.lastVisited
                      )}
                    </td>

                    {/* Schedule */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={e => onToggleSchedule(report.id, e)}
                          style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            backgroundColor: isScheduled
                              ? 'var(--color-dcfce7, #DCFCE7)'
                              : 'var(--color-f1f5f9, #F1F5F9)',
                            color: isScheduled
                              ? 'var(--color-15803d, #15803D)'
                              : 'var(--text-secondary, #64748B)',
                          }}
                        >
                          {isScheduled ? '● Active' : '○ Off'}
                        </button>
                        <span
                          style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #64748B)' }}
                        >
                          {report.schedule}
                        </span>
                      </div>
                    </td>

                    {/* More Actions */}
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div
                        style={{
                          display: 'flex',
                          gap: '6px',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}
                      >
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            onSelectReport(report);
                          }}
                          style={{
                            background: 'var(--accent-blue, #2563EB)',
                            color: 'var(--white, #FFFFFF)',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '5px 10px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                          title="Run / Preview Report"
                        >
                          ▶ Run
                        </button>
                        <button
                          type="button"
                          onClick={e => onExportPDF(report, e)}
                          style={{
                            background: '#F1F5F9',
                            color: '#334155',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '5px 8px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                          }}
                          title="Download Certified PDF"
                        >
                          📄
                        </button>
                        <button
                          type="button"
                          onClick={e => onExportCSV(report, e)}
                          style={{
                            background: '#F1F5F9',
                            color: '#334155',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '5px 8px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                          }}
                          title="Export CSV"
                        >
                          📥
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
