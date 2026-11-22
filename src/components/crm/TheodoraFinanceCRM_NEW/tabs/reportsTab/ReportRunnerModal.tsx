import React from 'react';
import { EnterpriseReport } from '../../../../../data/theodoraReportsRegistry';
import { REPORT_DATE_RANGES } from './types';

interface ReportRunnerModalProps {
  report: EnterpriseReport;
  reportDateRange: string;
  onDateRangeChange: (range: string) => void;
  onClose: () => void;
  onExportPDF: (report: EnterpriseReport, e?: React.MouseEvent) => void;
  onExportCSV: (report: EnterpriseReport, e?: React.MouseEvent) => void;
}

export const ReportRunnerModal: React.FC<ReportRunnerModalProps> = ({
  report,
  reportDateRange,
  onDateRangeChange,
  onClose,
  onExportPDF,
  onExportCSV,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--accent-blue, #2563EB)',
                  color: 'var(--white, #FFFFFF)',
                }}
              >
                {report.id}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-primary, #0F172A)',
                }}
              >
                {report.name}
              </h3>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-eef2f6, #EEF2F6)',
                  color: 'var(--text-secondary, #475569)',
                }}
              >
                {report.categoryName}
              </span>
            </div>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '0.85rem',
                color: 'var(--text-secondary, #475569)',
              }}
            >
              {report.description}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              color: 'var(--text-secondary, #64748B)',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {/* Statutory UAE Relevance Notice */}
          <div
            style={{
              backgroundColor: 'var(--color-fef3c7, #FEF3C7)',
              border: '1px solid var(--color-fcd34d, #FCD34D)',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.82rem',
              color: 'var(--color-92400e, #92400E)',
              fontWeight: 600,
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🏛️</span>
            <span>
              <strong>UAE Compliance Framework:</strong> {report.uaeRelevance}
            </span>
          </div>

          {/* Date Filter & Export Controls Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary, #475569)',
                }}
              >
                Period:
              </span>
              {REPORT_DATE_RANGES.map(range => (
                <button
                  key={range}
                  onClick={() => onDateRangeChange(range)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border:
                      reportDateRange === range
                        ? '1px solid var(--accent-blue, #2563EB)'
                        : '1px solid var(--text-secondary, #E2E8F0)',
                    backgroundColor:
                      reportDateRange === range
                        ? 'var(--color-eff6ff, #EFF6FF)'
                        : 'var(--white, #FFFFFF)',
                    color:
                      reportDateRange === range
                        ? 'var(--color-1d4ed8, #1D4ED8)'
                        : 'var(--text-secondary, #64748B)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  {range}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onExportPDF(report)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--text-secondary, #CBD5E1)',
                  backgroundColor: 'var(--white, #FFFFFF)',
                  color: 'var(--text-primary, #0F172A)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                📄 Download PDF
              </button>
              <button
                onClick={() => onExportCSV(report)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'var(--accent-green, #10B981)',
                  color: 'var(--white, #FFFFFF)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                📥 Export CSV
              </button>
            </div>
          </div>

          {/* Summary KPIs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '10px',
            }}
          >
            {Object.entries(report.mockSummary).map(([key, val]) => (
              <div
                key={key}
                style={{
                  background: 'var(--color-f8fafc, #F8FAFC)',
                  border: '1px solid var(--text-secondary, #E2E8F0)',
                  borderRadius: '10px',
                  padding: '12px',
                }}
              >
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-secondary, #64748B)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {key}
                </div>
                <div
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: 'var(--text-primary, #0F172A)',
                    marginTop: '4px',
                  }}
                >
                  {val}
                </div>
              </div>
            ))}
          </div>

          {/* Data Table Preview */}
          <div
            style={{
              border: '1px solid var(--text-secondary, #E2E8F0)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '8px 12px',
                background: 'var(--color-f1f5f9, #F1F5F9)',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: 'var(--text-secondary, #475569)',
              }}
            >
              Report Data Preview ({reportDateRange.toUpperCase()})
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr
                    style={{
                      background: 'var(--color-f8fafc, #F8FAFC)',
                      borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
                      textAlign: 'left',
                      color: 'var(--text-secondary, #64748B)',
                      fontWeight: 700,
                    }}
                  >
                    {report.columns.map((col, idx) => (
                      <th key={idx} style={{ padding: '10px 12px' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.sampleRows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}
                    >
                      {report.columns.map((col, cIdx) => (
                        <td
                          key={cIdx}
                          style={{ padding: '10px 12px', color: 'var(--text-primary, #1E293B)' }}
                        >
                          {row[col] ?? '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--text-secondary, #E2E8F0)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--color-f8fafc, #F8FAFC)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #64748B)' }}>
            Generated autonomously by <strong>Theodora AI (CFO Intelligence)</strong>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              backgroundColor: 'var(--white, #FFFFFF)',
              color: 'var(--text-secondary, #334155)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
