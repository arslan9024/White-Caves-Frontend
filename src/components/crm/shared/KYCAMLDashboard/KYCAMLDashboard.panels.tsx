/**
 * KYC & AML Dashboard — Panels Layer (Mary Allen Wilkes Architecture)
 * Modular presentation panels for verification queues, alerts, and reports
 */

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { KycProfileItem, KycAlertItem, KycAuditLogItem } from './KYCAMLDashboard.types';
import {
  RISK_COLORS,
  STATUS_COLORS,
  ALERT_SEVERITY_COLORS,
  formatDate,
  formatDateTime,
} from './KYCAMLDashboard.data';

export const QueuePanel: React.FC<{
  profiles: KycProfileItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}> = ({ profiles, onApprove, onReject }) => (
  <div className="kyc-panel-card">
    <div className="kyc-panel-header">
      <h3>Active Customer Verification Queue</h3>
    </div>
    <div className="kyc-table-wrapper">
      <table className="kyc-table">
        <thead>
          <tr>
            <th>Entity / Name</th>
            <th>ID / Passport</th>
            <th>Risk Rating</th>
            <th>Status</th>
            <th>Submission Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(p => {
            const risk = RISK_COLORS[p.riskRating] || RISK_COLORS.LOW;
            const status = STATUS_COLORS[p.status] || STATUS_COLORS.pending;
            return (
              <tr key={p.id}>
                <td>
                  <strong>{p.fullName}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{p.jurisdiction}</div>
                </td>
                <td>{p.idDocumentNumber || '—'}</td>
                <td>
                  <span
                    style={{
                      backgroundColor: risk.bg,
                      color: risk.text,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  >
                    {p.riskRating} ({p.riskScore})
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      backgroundColor: status.bg,
                      color: status.text,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                    }}
                  >
                    {p.status}
                  </span>
                </td>
                <td>{formatDate(p.createdAt)}</td>
                <td>
                  {p.status !== 'approved' && (
                    <button
                      onClick={() => onApprove(p.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#16A34A',
                        marginRight: 8,
                      }}
                      title="Approve"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  {p.status !== 'rejected' && (
                    <button
                      onClick={() => onReject(p.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#DC2626',
                      }}
                      title="Reject / Escalate"
                    >
                      <XCircle size={18} />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export const AlertsPanel: React.FC<{ alerts: KycAlertItem[] }> = ({ alerts }) => (
  <div className="kyc-panel-card">
    <div className="kyc-panel-header">
      <h3>Automated AML Compliance Alerts</h3>
    </div>
    <div
      className="kyc-alerts-list"
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
    >
      {alerts.map(a => {
        const severity = ALERT_SEVERITY_COLORS[a.severity] || ALERT_SEVERITY_COLORS.LOW;
        return (
          <div
            key={a.id}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              background: '#F8FAFC',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: severity.bg,
                    color: severity.text,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                  }}
                >
                  {a.severity}
                </span>
                <strong style={{ fontSize: '0.9rem' }}>{a.ruleCode}</strong>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>— {a.entityName}</span>
              </div>
              <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.82rem', color: '#334155' }}>
                {a.description}
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              {formatDateTime(a.createdAt)}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

export const AuditPanel: React.FC<{ logs: KycAuditLogItem[] }> = ({ logs }) => (
  <div className="kyc-panel-card">
    <div className="kyc-panel-header">
      <h3>Statutory Audit Trail (goAML & UAE Central Bank)</h3>
    </div>
    <div
      className="kyc-audit-list"
      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
    >
      {logs.map(log => (
        <div
          key={log.id}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
            background: '#FFFFFF',
            fontSize: '0.8rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#64748B',
              fontSize: '0.75rem',
            }}
          >
            <span>{log.actor}</span>
            <span>{formatDateTime(log.timestamp)}</span>
          </div>
          <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>{log.action}</div>
          <div style={{ color: '#475569', marginTop: '2px' }}>{log.details}</div>
        </div>
      ))}
    </div>
  </div>
);

