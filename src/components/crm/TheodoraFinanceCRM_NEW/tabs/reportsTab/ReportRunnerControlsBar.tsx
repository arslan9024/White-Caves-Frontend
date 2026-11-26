import React, { FC } from 'react';
import { Download, FileText, Landmark } from 'lucide-react';
import type { EnterpriseReport } from '../../../../../data/theodoraReportsRegistry';
import { REPORT_DATE_RANGES } from './types';

interface ReportRunnerControlsBarProps {
  report: EnterpriseReport;
  reportDateRange: string;
  onDateRangeChange: (range: string) => void;
  onExportPDF: (report: EnterpriseReport, e?: React.MouseEvent) => void;
  onExportCSV: (report: EnterpriseReport, e?: React.MouseEvent) => void;
}

export const ReportRunnerControlsBar: FC<ReportRunnerControlsBarProps> = ({
  report,
  reportDateRange,
  onDateRangeChange,
  onExportPDF,
  onExportCSV,
}) => (
  <>
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
      <Landmark size={18} color="#92400E" style={{ flexShrink: 0 }} />
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
            type="button"
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
          type="button"
          onClick={() => onExportPDF(report)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
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
          <FileText size={14} />
          <span>Download PDF</span>
        </button>
        <button
          type="button"
          onClick={() => onExportCSV(report)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
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
          <Download size={14} />
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  </>
);
