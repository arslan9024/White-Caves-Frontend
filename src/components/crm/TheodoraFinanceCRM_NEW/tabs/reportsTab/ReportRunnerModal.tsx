import React from 'react';
import { X } from 'lucide-react';
import type { EnterpriseReport } from '../../../../../data/theodoraReportsRegistry';
import { ReportRunnerControlsBar } from './ReportRunnerControlsBar';
import { ReportRunnerPreviewTable } from './ReportRunnerPreviewTable';

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
            type="button"
            aria-label="Close report viewer"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary, #64748B)',
              cursor: 'pointer',
              padding: '4px 8px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <ReportRunnerControlsBar
            report={report}
            reportDateRange={reportDateRange}
            onDateRangeChange={onDateRangeChange}
            onExportPDF={onExportPDF}
            onExportCSV={onExportCSV}
          />
          <ReportRunnerPreviewTable report={report} reportDateRange={reportDateRange} />
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
            type="button"
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
