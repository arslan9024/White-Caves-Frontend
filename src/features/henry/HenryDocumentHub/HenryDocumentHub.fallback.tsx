/**
 * Henry Document Hub — Fallback & Sub-panels Layer (Mary Allen Wilkes Architecture)
 * Fallback empty states, Compliance results viewer, and Archive records table
 */

import React from 'react';
import type { ComplianceReport, HenryRecord } from './HenryDocumentHub.types';
import { severityColorMap, severityIconMap } from './HenryDocumentHub.styles';

export const HenryEmptyState: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-555, #555)' }}>
    <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
    <div style={{ fontSize: 16, color: 'var(--color-888, #888)' }}>
      Select a document template from the left panel
    </div>
    <div style={{ fontSize: 13, color: 'var(--color-555, #555)', marginTop: 8 }}>
      Henry generates RERA/DLD-compliant documents for Dubai real estate transactions
    </div>
  </div>
);

export const CompliancePanel: React.FC<{ report: ComplianceReport }> = ({ report }) => (
  <div>
    <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
      {[
        { label: 'Passed', value: report.passedCount, color: '#22c55e' },
        { label: 'Errors', value: report.errorCount, color: '#ef4444' },
        { label: 'Warnings', value: report.warningCount, color: '#f59e0b' },
        { label: 'Total', value: report.totalRules, color: '#aaa' },
      ].map(stat => (
        <div
          key={stat.label}
          style={{
            background: '#1a1a1a',
            borderRadius: 8,
            padding: '12px 20px',
            textAlign: 'center',
            flex: 1,
          }}
        >
          <div style={{ color: stat.color, fontSize: 24, fontWeight: 700 }}>{stat.value}</div>
          <div style={{ color: 'var(--color-888, #888)', fontSize: 12 }}>{stat.label}</div>
        </div>
      ))}
    </div>

    <div
      style={{
        background: report.isCompliant ? '#1a3a1a' : '#3a1a1a',
        border: `1px solid ${report.isCompliant ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
        borderRadius: 8,
        padding: '12px 16px',
        marginBottom: 20,
        fontSize: 14,
        color: report.isCompliant ? '#8f8' : '#f88',
      }}
    >
      {report.isCompliant
        ? '✅ Document is compliant — no blocking errors found'
        : `❌ ${report.errorCount} compliance error(s) must be fixed before this document can be finalised`}
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {report.results
        .filter(r => !r.passed)
        .map(result => (
          <div
            key={result.ruleId}
            style={{
              background: '#1a1a1a',
              border: `1px solid ${severityColorMap[result.severity]}30`,
              borderLeft: `3px solid ${severityColorMap[result.severity]}`,
              borderRadius: 6,
              padding: '10px 14px',
            }}
          >
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
              <div>
                <span style={{ marginRight: 8 }}>{severityIconMap[result.severity]}</span>
                <strong style={{ color: 'var(--white, #fff)', fontSize: 13 }}>
                  {result.title}
                </strong>
                {result.uaeLawReference && (
                  <span style={{ marginLeft: 8, color: 'var(--color-666, #666)', fontSize: 11 }}>
                    ({result.uaeLawReference})
                  </span>
                )}
              </div>
              <span
                style={{
                  color: 'var(--color-666, #666)',
                  fontSize: 11,
                  whiteSpace: 'nowrap',
                  marginLeft: 8,
                }}
              >
                {result.ruleId}
              </span>
            </div>
            <p style={{ color: 'var(--color-aaa, #aaa)', margin: '6px 0 0 24px', fontSize: 12 }}>
              {result.message}
            </p>
          </div>
        ))}
      {report.results
        .filter(r => r.passed)
        .map(result => (
          <div
            key={result.ruleId}
            style={{
              background: '#111',
              border: '1px solid #1a3a1a',
              borderLeft: '3px solid #2e7d32',
              borderRadius: 6,
              padding: '8px 14px',
              opacity: 0.7,
            }}
          >
            <span style={{ marginRight: 8 }}>✅</span>
            <strong style={{ color: 'var(--color-666, #666)', fontSize: 12 }}>
              {result.title}
            </strong>
          </div>
        ))}
    </div>
  </div>
);

export const ArchivePanel: React.FC<{
  records: HenryRecord[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onRefresh: () => void;
  onMarkSigned: (id: string) => void;
}> = ({ records, isLoading, onDelete, onRefresh, onMarkSigned }) => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}
    >
      <h3 style={{ color: 'var(--white, #fff)', margin: 0 }}>
        📁 Document Archive ({records.length})
      </h3>
      <button
        onClick={onRefresh}
        style={{
          padding: '6px 14px',
          background: '#222',
          border: '1px solid #444',
          borderRadius: 4,
          color: '#aaa',
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        🔄 Refresh
      </button>
    </div>

    {isLoading ? (
      <div style={{ color: 'var(--color-888, #888)', textAlign: 'center', padding: 40 }}>
        Loading records...
      </div>
    ) : records.length === 0 ? (
      <div style={{ color: 'var(--color-555, #555)', textAlign: 'center', padding: 40 }}>
        No archived documents yet. Generate and save a document to start the archive.
      </div>
    ) : (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-333, #333)' }}>
              {[
                'Template',
                'File Name',
                'Department',
                'Owner',
                'Unit',
                'Community',
                'Tenant',
                'Status',
                'Signed At',
                'Created',
                '',
              ].map(h => (
                <th
                  key={h}
                  style={{
                    color: 'var(--color-888, #888)',
                    fontWeight: 600,
                    padding: '8px 12px',
                    textAlign: 'left',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--color-1a1a1a, #1a1a1a)' }}>
                <td style={{ color: 'var(--color-c9a84c, #C9A84C)', padding: '8px 12px' }}>
                  {r.templateLabel}
                </td>
                <td
                  style={{
                    color: '#ccc',
                    padding: '8px 12px',
                    maxWidth: 180,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r.fileName}
                </td>
                <td style={{ color: 'var(--color-aaa, #aaa)', padding: '8px 12px' }}>
                  {r.departmentTag ?? '—'}
                </td>
                <td style={{ color: 'var(--color-aaa, #aaa)', padding: '8px 12px' }}>
                  {r.ownerUserEmail ?? '—'}
                </td>
                <td style={{ color: 'var(--color-aaa, #aaa)', padding: '8px 12px' }}>
                  {r.unit ?? '—'}
                </td>
                <td style={{ color: 'var(--color-aaa, #aaa)', padding: '8px 12px' }}>
                  {r.community ?? '—'}
                </td>
                <td style={{ color: 'var(--color-aaa, #aaa)', padding: '8px 12px' }}>
                  {r.tenantName ?? '—'}
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <span
                    style={{
                      background:
                        (r.status ?? (r.isDraft ? 'draft' : 'signed')) === 'signed'
                          ? '#1a2a1a'
                          : '#2a2a1a',
                      color:
                        (r.status ?? (r.isDraft ? 'draft' : 'signed')) === 'signed'
                          ? '#22c55e'
                          : '#f59e0b',
                      padding: '2px 8px',
                      borderRadius: 12,
                      fontSize: 11,
                    }}
                  >
                    {r.status ?? (r.isDraft ? 'draft' : 'signed')}
                  </span>
                </td>
                <td
                  style={{
                    color: 'var(--color-666, #666)',
                    padding: '8px 12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r.signedAt ? new Date(r.signedAt).toLocaleString() : '—'}
                </td>
                <td
                  style={{
                    color: 'var(--color-666, #666)',
                    padding: '8px 12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '8px 12px' }}>
                  {r.status !== 'signed' && (
                    <button
                      onClick={() => onMarkSigned(r.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#22c55e',
                        cursor: 'pointer',
                        fontSize: 14,
                        padding: 2,
                        marginRight: 8,
                      }}
                      title="Mark signed"
                    >
                      ✅
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this record?')) onDelete(r.id);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: 16,
                      padding: 2,
                    }}
                    title="Delete record"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

