/**
 * KYC & AML Dashboard — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component composing Tabs, StatCards, and Panels
 */

import React from 'react';
import type { KYCAMLDashboardProps } from './KYCAMLDashboard.types';
import { TABS } from './KYCAMLDashboard.data';
import { useKycAmlLogic } from './KYCAMLDashboard.logic';
import { QueuePanel, AlertsPanel, AuditPanel } from './KYCAMLDashboard.panels';
import { SanctionsScreeningWidget } from '../../../compliance/SanctionsScreeningWidget/SanctionsScreeningWidget';
import { AMLRiskAssessmentReport } from '../../../compliance/AMLRiskAssessmentReport/AMLRiskAssessmentReport';
import { NOCDeveloperWidget } from '../../../compliance/NOCDeveloperWidget/NOCDeveloperWidget';
import '../KYCAMLDashboard.css';

export const KYCAMLDashboardView: React.FC<KYCAMLDashboardProps> = ({
  showTabs = ['queue', 'profiles', 'alerts', 'pep', 'sanctions', 'audit', 'reports'],
}) => {
  const {
    activeTab,
    setActiveTab,
    loading,
    stats,
    pendingProfiles,
    alerts,
    auditLogs,
    handleApprove,
    handleReject,
  } = useKycAmlLogic(showTabs);

  const availableTabs = TABS.filter(t => showTabs.includes(t.id));

  return (
    <div className="kyc-dashboard-container">
      {/* Quick Stats Header */}
      {stats && (
        <div
          className="kyc-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>
              PENDING VERIFICATIONS
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#D97706', marginTop: 4 }}>
              {stats.totalPending}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>
              HIGH-RISK ENTITIES
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DC2626', marginTop: 4 }}>
              {stats.highRiskCount}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>
              ACTIVE AML ALERTS
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7C3AED', marginTop: 4 }}>
              {stats.openAlerts}
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>
              FLAGGED PEP MATCHES
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284C7', marginTop: 4 }}>
              {stats.pepCount}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div
        className="kyc-tabs-bar"
        style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}
      >
        {availableTabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`kyc-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: activeTab === tab.id ? '1px solid #7C3AED' : '1px solid #E2E8F0',
                background: activeTab === tab.id ? '#7C3AED' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : '#334155',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>
          Loading compliance records...
        </div>
      ) : (
        <>
          {activeTab === 'queue' && (
            <QueuePanel
              profiles={pendingProfiles}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}

          {activeTab === 'alerts' && <AlertsPanel alerts={alerts} />}

          {activeTab === 'sanctions' && <SanctionsScreeningWidget />}

          {activeTab === 'audit' && <AuditPanel logs={auditLogs} />}

          {activeTab === 'noc' && <NOCDeveloperWidget />}

          {activeTab === 'reports' && <AMLRiskAssessmentReport />}

          {activeTab === 'profiles' && (
            <QueuePanel
              profiles={pendingProfiles}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}

          {activeTab === 'pep' && (
            <div className="kyc-panel-card">
              <div className="kyc-panel-header">
                <h3>Politically Exposed Persons (PEP) Register</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                All PEP assessments are screened against UAE Central Bank AML decree (Law 20/2018).
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default KYCAMLDashboardView;
