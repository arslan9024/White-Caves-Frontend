import React, { FC } from 'react';
import type { EnterpriseReport } from '../../../../../data/theodoraReportsRegistry';

interface ReportRunnerPreviewTableProps {
  report: EnterpriseReport;
  reportDateRange: string;
}

export const ReportRunnerPreviewTable: FC<ReportRunnerPreviewTableProps> = ({
  report,
  reportDateRange,
}) => (
  <>
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
              <tr key={rIdx} style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}>
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
  </>
);
